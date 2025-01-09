import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardGreetingProps {
  nickname: string | null;
}

const DashboardGreeting = ({ nickname }: DashboardGreetingProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl">
          Welcome back, {nickname || 'Student'}! 🎓
        </CardTitle>
        <CardDescription className="text-lg">
          Let's make progress on your study goals today.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DashboardGreeting;