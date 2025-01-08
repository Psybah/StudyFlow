import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Bell, FileText, BarChart2, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StudyPlan {
  nickname: string;
  courses: string[];
  academic_goals: string[];
  preferred_study_times: string[];
  study_style: string;
}

interface Task {
  id: string;
  title: string;
  due_date: string;
  status: string;
  course: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }
      
      // Fetch study plan
      const { data: studyPlanData, error: studyPlanError } = await supabase
        .from('study_plans')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (studyPlanError && studyPlanError.code !== 'PGRST116') {
        console.error('Error fetching study plan:', studyPlanError);
      } else {
        setStudyPlan(studyPlanData);
      }

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true })
        .limit(5);

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError);
      } else {
        setTasks(tasksData || []);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar Navigation */}
        <aside className="space-y-4 md:border-r md:pr-6">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/dashboard')}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/materials')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Course Materials
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/reminders')}
          >
            <Bell className="mr-2 h-4 w-4" />
            Reminders
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/progress')}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Progress
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </aside>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Welcome Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                Welcome back, {studyPlan?.nickname || 'Student'}! 🎓
              </CardTitle>
              <CardDescription>
                Let's make progress on your study goals today.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tasks Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length > 0 ? (
                  <ul className="space-y-2">
                    {tasks.map((task) => (
                      <li
                        key={task.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/10"
                      >
                        <span>{task.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {task.course}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No tasks for today</p>
                )}
              </CardContent>
            </Card>

            {/* Study Plan Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Plan</CardTitle>
              </CardHeader>
              <CardContent>
                {studyPlan ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Goal:</strong>{" "}
                      {studyPlan.academic_goals[0]}
                    </p>
                    <p>
                      <strong>Style:</strong>{" "}
                      {studyPlan.study_style}
                    </p>
                    <p>
                      <strong>Preferred Times:</strong>{" "}
                      {studyPlan.preferred_study_times.join(", ")}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No study plan created yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/materials')}>
            <FileText className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/reminders')}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/progress')}>
            <BarChart2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;