import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Bell, Folder, Users, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StudyPlanForm from "@/components/StudyPlanForm";
import { supabase } from "@/integrations/supabase/client";

const Features = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFeatureClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    navigate("/dashboard");
  };

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Study Planner",
      description: "Create and manage personalized study schedules that adapt to your learning pace and goals.",
      image: "study.svg",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Reminders",
      description: "AI-powered notifications that keep you on track with your study goals and deadlines.",
      image: "/notification.svg",
    },
    {
      icon: <Folder className="h-8 w-8" />,
      title: "Content Organization",
      description: "Efficiently organize and retrieve your study materials with smart tagging and categorization.",
      image: "/content.svg",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Group Collaboration",
      description: "Connect with peers, form study groups, and share resources seamlessly.",
      image: "/collaboration.svg",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Visualize your learning journey with detailed analytics and performance insights.",
      image: "/progress.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the tools and features that make StudyFlow the perfect companion for your academic journey.
        </p>
      </div>

      <div className="space-y-16">
        {features.map((feature, index) => (
          <div key={feature.title} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 space-y-4">
              <Card className="bg-background-darker text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span className="text-secondary">{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6">{feature.description}</p>
                  <Button 
                    variant="secondary"
                    onClick={handleFeatureClick}
                  >
                    Try This Feature
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <StudyPlanForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Features;