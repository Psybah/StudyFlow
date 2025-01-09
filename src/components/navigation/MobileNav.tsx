import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Bell, BarChart2, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#9b87f5] text-white border-t">
      <div className="flex justify-around p-2">
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
  );
};

export default MobileNav;