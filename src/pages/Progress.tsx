import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import ProgressOverview from "@/components/progress/ProgressOverview";
import StudyChart from "@/components/progress/StudyChart";
import TasksChart from "@/components/progress/TasksChart";

const Progress = () => {
  const [timeframe, setTimeframe] = useState("week");

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: studyPlans } = useQuery({
    queryKey: ["study_plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Progress</h1>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProgressOverview tasks={tasks || []} studyPlans={studyPlans || []} />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Study Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <StudyChart timeframe={timeframe} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasks Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <TasksChart tasks={tasks || []} timeframe={timeframe} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Progress;