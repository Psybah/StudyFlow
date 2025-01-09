import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import StudyPlanForm from "@/components/StudyPlanForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DesktopNav from "./navigation/DesktopNav";
import MobileMenu from "./navigation/MobileMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hasStudyPlan, setHasStudyPlan] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkStudyPlan(session.user.id);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
          setUser(session?.user ?? null);
          if (session?.user) {
            await checkStudyPlan(session.user.id);
          }
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error in setupAuth:', error);
        toast({
          title: "Error",
          description: "Failed to initialize authentication. Please try again later.",
          variant: "destructive",
        });
      }
    };

    setupAuth();
  }, [toast]);

  const checkStudyPlan = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (error) {
        console.error('Error checking study plan:', error);
        toast({
          title: "Error",
          description: "Failed to check study plan status. Please try again later.",
          variant: "destructive",
        });
        return;
      }
      
      setHasStudyPlan(data && data.length > 0);
    } catch (error) {
      console.error('Error checking study plan:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleGetStarted = () => {
    if (!user) {
      navigate("/auth");
    } else {
      setIsFormOpen(true);
    }
  };

  if (location.pathname.includes('/dashboard')) {
    return null;
  }

  return (
    <nav className="bg-primary text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">StudyFlow</span>
          </Link>

          <DesktopNav 
            user={user}
            hasStudyPlan={hasStudyPlan}
            onGetStarted={handleGetStarted}
          />

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <MobileMenu 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
          hasStudyPlan={hasStudyPlan}
          onGetStarted={handleGetStarted}
        />
      </div>

      <StudyPlanForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </nav>
  );
};

export default Navigation;
