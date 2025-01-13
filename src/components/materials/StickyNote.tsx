import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minimize2, Maximize2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StickyNoteProps {
  id: string;
  content: string;
  position: { x: number; y: number };
  materialId: string;
  onDelete: (id: string) => void;
}

const StickyNote = ({ id, content: initialContent, position, materialId, onDelete }: StickyNoteProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position_, setPosition] = useState(position);
  const [content, setContent] = useState(initialContent);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const updateNote = async () => {
      const { error } = await supabase
        .from("material_notes")
        .update({
          content,
          position_x: position_.x,
          position_y: position_.y,
          is_minimized: isMinimized,
        })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error saving note",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    const debounceTimeout = setTimeout(updateNote, 500);
    return () => clearTimeout(debounceTimeout);
  }, [content, position_, isMinimized, id, toast]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position_.x,
      y: e.clientY - position_.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Card
      className={`absolute shadow-lg ${isMinimized ? "w-12 h-12" : "w-64"}`}
      style={{
        transform: `translate(${position_.x}px, ${position_.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 1000 : 1,
      }}
    >
      <div
        className="bg-yellow-100 p-2 flex justify-between items-center cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <Maximize2 className="h-4 w-4" />
          ) : (
            <Minimize2 className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {!isMinimized && (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 resize-none border-0 bg-yellow-50"
          placeholder="Type your note here..."
        />
      )}
    </Card>
  );
};

export default StickyNote;