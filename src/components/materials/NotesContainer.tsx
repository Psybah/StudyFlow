import StickyNote from "./StickyNote";

interface Note {
  id: string;
  content: string;
  position_x: number;
  position_y: number;
  is_minimized: boolean;
}

interface NotesContainerProps {
  notes: Note[];
  materialId: string;
  onDelete: (noteId: string) => void;
  onPositionChange: (noteId: string, x: number, y: number) => void;
  onMinimize: (noteId: string) => void;
}

const NotesContainer = ({
  notes,
  materialId,
  onDelete,
  onPositionChange,
  onMinimize,
}: NotesContainerProps) => {
  const visibleNotes = notes.filter(note => !note.is_minimized);

  return (
    <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
      {visibleNotes.map((note) => (
        <div key={note.id} style={{ pointerEvents: 'auto' }}>
          <StickyNote
            id={note.id}
            content={note.content}
            position={{ x: note.position_x, y: note.position_y }}
            isMinimized={note.is_minimized}
            materialId={materialId}
            onDelete={onDelete}
            onPositionChange={(x, y) => onPositionChange(note.id, x, y)}
            onMinimize={() => onMinimize(note.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotesContainer;