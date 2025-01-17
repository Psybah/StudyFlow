import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import MaterialSidebar from "./MaterialSidebar";
import NotesContainer from "./NotesContainer";

interface Material {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
}

export interface Note {
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
            <NotesContainer
              notes={notes}
              materialId={material?.id || ""}
              onDelete={deleteNote}
              onPositionChange={updateNotePosition}
              onMinimize={(noteId) => toggleNoteMinimized(noteId, true)}
            />
          </div>
          <MaterialSidebar
            notes={notes}
            material={material}
            isLoading={isLoading}
            onAddNote={addNote}
            onMaximizeNote={(noteId) => toggleNoteMinimized(noteId, false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialViewer;