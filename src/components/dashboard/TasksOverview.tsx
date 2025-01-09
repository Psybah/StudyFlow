import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  due_date: string;
  status: string;
  course: string;
}

interface TasksOverviewProps {
  tasks: Task[];
}

const TasksOverview = ({ tasks }: TasksOverviewProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/10"
              >
                <span className="font-medium">{task.title}</span>
                <span className="text-sm text-muted-foreground">
                  {task.course}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-4">No tasks for today</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksOverview;