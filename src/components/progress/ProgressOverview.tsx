import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, BookOpen, Target } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
}

interface StudyPlan {
  id: string;
  academic_goals: string[];
}

interface ProgressOverviewProps {
  tasks: Task[];
  studyPlans: StudyPlan[];
}

const ProgressOverview = ({ tasks, studyPlans }: ProgressOverviewProps) => {
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const totalGoals = studyPlans.reduce((acc, plan) => acc + (plan.academic_goals?.length || 0), 0);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Tasks Completed
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
          <Progress value={completionRate} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Study Plans
          </CardTitle>
          <BookOpen className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studyPlans.length}</div>
          <Progress value={studyPlans.length > 0 ? 100 : 0} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Goals
          </CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGoals}</div>
          <Progress value={totalGoals > 0 ? 100 : 0} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;