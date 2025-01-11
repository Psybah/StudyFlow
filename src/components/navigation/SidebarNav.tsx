import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Bell, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SidebarNav = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <nav className={`hidden md:flex flex-col h-screen bg-[#FEF7CD] shadow-lg text-background-darker fixed left-0 top-0 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col space-y-2 p-4 flex-grow pt-20">
        <Button
          variant="ghost"
          className={`w-full justify-start text-background-darker hover:bg-background-darker/10 ${isCollapsed ? 'px-2' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <BookOpen className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Dashboard</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-background-darker hover:bg-background-darker/10 ${isCollapsed ? 'px-2' : ''}`}
          onClick={() => navigate('/materials')}
        >
          <FileText className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Course Materials</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-background-darker hover:bg-background-darker/10 ${isCollapsed ? 'px-2' : ''}`}
          onClick={() => navigate('/reminders')}
        >
          <Bell className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Reminders</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-background-darker hover:bg-background-darker/10 ${isCollapsed ? 'px-2' : ''}`}
          onClick={() => navigate('/progress')}
        >
          <BarChart2 className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Progress</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-background-darker hover:bg-background-darker/10 ${isCollapsed ? 'px-2' : ''}`}
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </Button>
      </div>
      <div className="p-4 border-t border-background-darker/20">
        <Button
          variant="ghost"
          className={`w-full justify-start text-background-darker hover:bg-background-darker/10 ${isCollapsed ? 'px-2' : ''}`}
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-40 bg-[#FEF7CD] rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </nav>
  );
};

export default SidebarNav;