import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Bell, BarChart2, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SidebarNav = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <nav className="flex flex-col h-full justify-between bg-[#FEF7CD] text-background-darker">
      <div className="flex flex-col space-y-2 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-background-darker hover:bg-background-darker/10"
          onClick={() => navigate('/dashboard')}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-background-darker hover:bg-background-darker/10"
          onClick={() => navigate('/materials')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Course Materials
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-background-darker hover:bg-background-darker/10"
          onClick={() => navigate('/reminders')}
        >
          <Bell className="mr-2 h-4 w-4" />
          Reminders
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-background-darker hover:bg-background-darker/10"
          onClick={() => navigate('/progress')}
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Progress
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-background-darker hover:bg-background-darker/10"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
      <div className="p-4 border-t border-background-darker/20">
        <Button
          variant="ghost"
          className="w-full justify-start text-background-darker hover:bg-background-darker/10"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default SidebarNav;