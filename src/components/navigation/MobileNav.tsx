import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Bell, BarChart2, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FEF7CD] text-background-darker border-t">
      <div className="flex justify-around p-2">
        <Button 
          variant={location.pathname === '/dashboard' ? "default" : "ghost"} 
          size="icon" 
          onClick={() => navigate('/dashboard')}
        >
          <BookOpen className="h-5 w-5" />
        </Button>
        <Button 
          variant={location.pathname === '/materials' ? "default" : "ghost"} 
          size="icon" 
          onClick={() => navigate('/materials')}
        >
          <FileText className="h-5 w-5" />
        </Button>
        <Button 
          variant={location.pathname === '/reminders' ? "default" : "ghost"} 
          size="icon" 
          onClick={() => navigate('/reminders')}
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant={location.pathname === '/progress' ? "default" : "ghost"} 
          size="icon" 
          onClick={() => navigate('/progress')}
        >
          <BarChart2 className="h-5 w-5" />
        </Button>
        <Button 
          variant={location.pathname === '/settings' ? "default" : "ghost"} 
          size="icon" 
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default MobileNav;