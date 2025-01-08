import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudyPlanForm from "@/components/StudyPlanForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (!user) {
      navigate("/auth");
    } else {
      setIsFormOpen(true);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Study Planner", path: "/planner" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">StudyFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="hover:text-secondary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={handleGetStarted}
                >
                  Create Study Plan
                </Button>
                <Button
                  variant="outline"
                  className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Button
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    onClick={() => {
                      setIsOpen(false);
                      handleGetStarted();
                    }}
                  >
                    Create Study Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() => {
                    setIsOpen(false);
                    handleGetStarted();
                  }}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <StudyPlanForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </nav>
  );
};

export default Navigation;