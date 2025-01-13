import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Clock, BookOpen } from "lucide-react";
import StudyPlanForm from "@/components/StudyPlanForm";
import { useState } from "react";

interface StudyPlan {
  nickname: string;
  courses: string[];
  academic_goals: string[];
  preferred_study_times: string[];
  study_style: string;
}

interface StudyPlanOverviewProps {
  studyPlan: StudyPlan | null;
  onEditClick: () => void;
}

const StudyPlanOverview = ({ studyPlan }: StudyPlanOverviewProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  if (!studyPlan) {
    return (
      <Card className="border-none shadow-lg h-full">
        <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
          <Target className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create Your Study Plan</h3>
          <p className="text-muted-foreground mb-4">
            Set your academic goals and organize your study schedule effectively.
          </p>
          <Button onClick={() => setIsUpdateModalOpen(true)}>Get Started</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-none shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Current Goal</p>
                <p className="font-medium">{studyPlan.academic_goals[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Study Style</p>
                <p className="font-medium">{studyPlan.study_style}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Preferred Times</p>
                <p className="font-medium">{studyPlan.preferred_study_times.join(", ")}</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsUpdateModalOpen(true)}
            >
              Update Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <StudyPlanForm
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        initialData={studyPlan}
      />
    </>
  );
};

export default StudyPlanOverview;