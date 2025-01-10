import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import TasksOverview from "@/components/dashboard/TasksOverview";
import StudyPlanOverview from "@/components/dashboard/StudyPlanOverview";

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
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/');
          return;
        }
        
        const { data: studyPlanData, error: studyPlanError } = await supabase
          .from('study_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (studyPlanError) {
          console.error('Error fetching study plan:', studyPlanError);
          toast({
            title: "Error",
            description: "Failed to load study plan. Please try again later.",
            variant: "destructive",
          });
        } else {
          setStudyPlan(studyPlanData?.[0] || null);
        }

        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('due_date', { ascending: true })
          .limit(5);

        if (tasksError) {
          console.error('Error fetching tasks:', tasksError);
          toast({
            title: "Error",
            description: "Failed to load tasks. Please try again later.",
            variant: "destructive",
          });
        } else {
          setTasks(tasksData || []);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error in checkAuth:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="hidden md:flex w-60">
          <SidebarNav />
        </aside>

        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <DashboardGreeting nickname={studyPlan?.nickname} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TasksOverview tasks={tasks} />
              <StudyPlanOverview studyPlan={studyPlan} />
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
};

export default Dashboard;