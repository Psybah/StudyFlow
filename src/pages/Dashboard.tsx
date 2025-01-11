import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Target, Clock } from "lucide-react";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import TasksOverview from "@/components/dashboard/TasksOverview";
import StudyPlanOverview from "@/components/dashboard/StudyPlanOverview";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";

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
  course?: string;
}

const motivationalQuotes = [
  "Books and all forms of writing have always been objects of terror to those who seek to suppress the truth and knowledge. - Wole Soyinka",
  "To succeed in life, education is a necessity, but more importantly, it is the character you build through that process. - Chinua Achebe",
  "Stories have been used to dispossess and to malign, but stories can also be used to empower and to humanize. - Chimamanda Ngozi Adichie",
  "Education is not just about the acquisition of knowledge but about the transformation of society through disciplined and enlightened minds. - Grace Alele-Williams",
  "Development is about learning and applying knowledge to improve the quality of life. It starts with the courage to dream and plan. - Adebayo Adedeji"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: reminders } = useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from("reminders")
        .select("*")
        .gte("due_date", today.toISOString())
        .lt("due_date", new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString())
        .order("due_date", { ascending: true });

      if (error) throw error;

      // Map reminders to Task interface
      const mappedTasks: Task[] = (data || []).map(reminder => ({
        id: reminder.id,
        title: reminder.title,
        due_date: reminder.due_date || "",
        status: reminder.status || "pending"
      }));

      return mappedTasks;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(prev => {
        const currentIndex = motivationalQuotes.indexOf(prev);
        const nextIndex = (currentIndex + 1) % motivationalQuotes.length;
        return motivationalQuotes[nextIndex];
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

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

  const handleAddTask = () => {
    navigate('/reminders');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {!isMobile && <div className="w-64 transition-all duration-300" />}
        <SidebarNav />

        <main className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <DashboardGreeting nickname={studyPlan?.nickname} quote={<span className="text-sm italic">{quote}</span>} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Today's Tasks
                  </h2>
                  <Button onClick={() => navigate('/reminders')} variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
                {(!reminders || reminders.length === 0) ? (
                  <div className="text-center p-8 bg-secondary/10 rounded-lg">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-secondary" />
                    <h3 className="font-semibold mb-2">No tasks for today</h3>
                    <p className="text-sm text-muted-foreground">
                      Start organizing your study schedule by adding your first task!
                    </p>
                    <Button onClick={() => navigate('/reminders')} variant="secondary" className="mt-4">
                      Create Task
                    </Button>
                  </div>
                ) : (
                  <TasksOverview tasks={reminders} />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Study Plan
                  </h2>
                </div>
                <StudyPlanOverview 
                  studyPlan={studyPlan} 
                  onEditClick={() => navigate('/dashboard/study-plan')} 
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {isMobile && <div className="h-20" />}
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Dashboard;
