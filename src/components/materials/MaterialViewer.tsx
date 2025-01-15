import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Maximize2 } from "lucide-react";
import PomodoroTimer from "./PomodoroTimer";
import StickyNote from "./StickyNote";
import AIFeatures from "./AIFeatures";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Material {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
}

interface Note {
  id: string;
  content: string;
  position_x: number;
  position_y: number;
  is_minimized: boolean;
}

interface MaterialViewerProps {
  material: Material | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MaterialViewer = ({ material, isOpen, onOpenChange }: MaterialViewerProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (material && isOpen) {
      fetchNotes();
    }
  }, [material, isOpen]);

  const fetchNotes = async () => {
    if (!material) return;
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("material_notes")
        .select("*")
        .eq("material_id", material.id)
        .eq("user_id", user.id);

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching notes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async () => {
    if (!material) return;
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const randomX = Math.floor(Math.random() * (window.innerWidth * 0.4));
      const randomY = Math.floor(Math.random() * (window.innerHeight * 0.4));

      const { data, error } = await supabase
        .from("material_notes")
        .insert({
          material_id: material.id,
          user_id: user.id,
          content: "",
          position_x: randomX,
          position_y: randomY,
          is_minimized: false
        })
        .select()
        .single();

      if (error) throw error;
      setNotes([...notes, data]);
      
      toast({
        title: "Success",
        description: "Note added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error adding note",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("material_notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;
      setNotes(notes.filter((note) => note.id !== noteId));
      
      toast({
        title: "Success",
        description: "Note deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting note",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotePosition = async (noteId: string, x: number, y: number) => {
    try {
      const { error } = await supabase
        .from("material_notes")
        .update({
          position_x: x,
          position_y: y
        })
        .eq("id", noteId);

      if (error) throw error;
      setNotes(notes.map(note => 
        note.id === noteId 
          ? { ...note, position_x: x, position_y: y }
          : note
      ));
    } catch (error: any) {
      toast({
        title: "Error updating note position",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleNoteMinimized = async (noteId: string, isMinimized: boolean) => {
    try {
      const { error } = await supabase
        .from("material_notes")
        .update({
          is_minimized: isMinimized
        })
        .eq("id", noteId);

      if (error) throw error;
      setNotes(notes.map(note => 
        note.id === noteId 
          ? { ...note, is_minimized: isMinimized }
          : note
      ));
    } catch (error: any) {
      toast({
        title: "Error updating note",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const minimizedNotes = notes.filter(note => note.is_minimized);
  const visibleNotes = notes.filter(note => !note.is_minimized);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full md:max-w-7xl h-[90vh] p-0 overflow-y-auto">
        <div className="flex flex-col md:flex-row h-full gap-4 p-4">
          <div className="flex-1 relative">
            {material?.file_url && (
              <iframe
                src={material.file_url}
                className="w-full h-full"
                title={material.title}
                style={{ minHeight: isMobile ? '70vh' : 'auto' }}
              />
            )}
            <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
              {visibleNotes.map((note) => (
                <div key={note.id} style={{ pointerEvents: 'auto' }}>
                  <StickyNote
                    id={note.id}
                    content={note.content}
                    position={{ x: note.position_x, y: note.position_y }}
                    isMinimized={note.is_minimized}
                    materialId={material?.id || ""}
                    onDelete={deleteNote}
                    onPositionChange={(x, y) => updateNotePosition(note.id, x, y)}
                    onMinimize={() => toggleNoteMinimized(note.id, true)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-80 space-y-4 pt-10 pb-5 md:pb-0">
            <div className="flex flex-row md:flex-col gap-4">
              <Button 
                onClick={addNote} 
                className="flex-1"
                disabled={isLoading}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Note
              </Button>
              <PomodoroTimer />
            </div>
            {minimizedNotes.length > 0 && (
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg border">
                <h3 className="text-sm font-semibold mb-2">Minimized Notes</h3>
                <div className="space-y-2">
                  {minimizedNotes.map((note) => (
                    <div key={note.id} className="flex items-center justify-between p-2 bg-background rounded border">
                      <span className="text-sm truncate flex-1">
                        {note.content || "Empty note"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleNoteMinimized(note.id, false)}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {material && <AIFeatures materialId={material.id} content={material.description || ""} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialViewer;