import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import EditReminderForm from "./EditReminderForm";

interface Reminder {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  priority: string;
  category: string | null;
  status: string;
  tags: string[] | null;
  recurring_type: string | null;
}

interface RemindersListProps {
  reminders: Reminder[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "overdue":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

const RemindersList = ({ reminders }: RemindersListProps) => {
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reminders")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("reminders")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder status updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map((reminder) => (
          <Card key={reminder.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-xl font-semibold line-clamp-2">
                {reminder.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedReminder(reminder);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(reminder.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {reminder.description && (
                <p className="text-sm text-gray-500 line-clamp-3">
                  {reminder.description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {format(new Date(reminder.due_date), "PPP")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {format(new Date(reminder.due_date), "p")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`${getPriorityColor(
                    reminder.priority
                  )} text-white capitalize`}
                >
                  {reminder.priority}
                </Badge>
                <Badge
                  className={`${getStatusColor(
                    reminder.status
                  )} text-white capitalize`}
                >
                  {reminder.status}
                </Badge>
                {reminder.category && (
                  <Badge variant="outline">{reminder.category}</Badge>
                )}
              </div>
              {reminder.tags && (
                <div className="flex flex-wrap gap-2">
                  {reminder.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              {reminder.status !== "completed" && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    handleStatusUpdate(reminder.id, "completed")
                  }
                >
                  Mark as Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <EditReminderForm
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedReminder(null);
        }}
        reminder={selectedReminder}
      />
    </>
  );
};

export default RemindersList;
