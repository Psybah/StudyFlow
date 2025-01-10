import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddReminderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddReminderForm = ({ isOpen, onClose }: AddReminderFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
    priority: "",
    category: "",
    tags: "",
    recurring_type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to create a reminder.",
          variant: "destructive",
        });
        return;
      }

      const combinedDateTime = new Date(`${formData.due_date}T${formData.due_time}`);

      const { error } = await supabase.from("reminders").insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        due_date: combinedDateTime.toISOString(),
        priority: formData.priority,
        category: formData.category,
        recurring_type: formData.recurring_type || null,
        tags: formData.tags ? formData.tags.split(",").map((tag) => tag.trim()) : null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add New Reminder</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  required
                  value={formData.due_date}
                  onChange={(e) =>
                    setFormData({ ...formData, due_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_time">Due Time</Label>
                <Input
                  id="due_time"
                  type="time"
                  required
                  value={formData.due_time}
                  onChange={(e) =>
                    setFormData({ ...formData, due_time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., Exam, Assignment, Meeting"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recurring_type">Recurring Schedule</Label>
              <Select
                value={formData.recurring_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, recurring_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g., important, study, project"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Reminder"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminderForm;