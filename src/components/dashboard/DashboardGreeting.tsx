import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface DashboardGreetingProps {
  nickname: string | null;
  quote: string;
}

const DashboardGreeting = ({ nickname, quote }: DashboardGreetingProps) => {
  return (
    <Card className="border-none shadow-lg animate-fade-in">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-3xl">
              Welcome back, {nickname || 'Student'}! 🎓
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Let's make progress on your study goals today.
            </CardDescription>
          </div>
        </div>
        <CardDescription className="text-lg italic border-l-4 border-primary pl-4 mt-4">
          "{quote}"
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DashboardGreeting;