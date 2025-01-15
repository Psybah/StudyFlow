import { Button } from "@/components/ui/button";
import { Plus, Maximize2 } from "lucide-react";
import PomodoroTimer from "./PomodoroTimer";
import AIFeatures from "./AIFeatures";
import { Note } from "./MaterialViewer";

interface MaterialSidebarProps {
  notes: Note[];
  material: {
    id: string;
    description: string | null;
  } | null;
  isLoading: boolean;
  onAddNote: () => void;
  onMaximizeNote: (noteId: string) => void;
}

const MaterialSidebar = ({
  notes,
  material,
  isLoading,
  onAddNote,
  onMaximizeNote,
}: MaterialSidebarProps) => {
  const minimizedNotes = notes.filter(note => note.is_minimized);

  return (
    <div className="w-full md:w-80 space-y-4 pt-10 pb-5 md:pb-0">
      <div className="flex flex-row md:flex-col gap-4">
        <Button 
          onClick={onAddNote} 
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
                  onClick={() => onMaximizeNote(note.id)}
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
  );
};

export default MaterialSidebar;