import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, List, CheckCircle } from "lucide-react";

const Planner = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8">Study Planner</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Daily Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create and manage your daily study routines with our intuitive scheduler.
            </p>
            <Button variant="secondary" className="w-full">
              Plan Your Day
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Pomodoro Timer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Stay focused with our Pomodoro timer. Alternate between study and break periods.
            </p>
            <Button variant="secondary" className="w-full">
              Start Timer
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              Task Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Keep track of your assignments and study goals with our task manager.
            </p>
            <Button variant="secondary" className="w-full">
              View Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-background-darker text-white p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-secondary mt-1" />
            <div>
              <h3 className="font-semibold">AI-Powered Recommendations</h3>
              <p className="text-gray-300">Get personalized study suggestions based on your performance</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-secondary mt-1" />
            <div>
              <h3 className="font-semibold">Progress Analytics</h3>
              <p className="text-gray-300">Visualize your study patterns and improvements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;