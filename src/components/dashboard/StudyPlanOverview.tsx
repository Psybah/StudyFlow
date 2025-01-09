import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudyPlan {
  nickname: string;
  courses: string[];
  academic_goals: string[];
  preferred_study_times: string[];
  study_style: string;
}

interface StudyPlanOverviewProps {
  studyPlan: StudyPlan | null;
}

const StudyPlanOverview = ({ studyPlan }: StudyPlanOverviewProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Study Plan</CardTitle>
      </CardHeader>
      <CardContent>
        {studyPlan ? (
          <div className="space-y-4">
            <p className="flex justify-between">
              <strong>Goal:</strong>
              <span>{studyPlan.academic_goals[0]}</span>
            </p>
            <p className="flex justify-between">
              <strong>Style:</strong>
              <span>{studyPlan.study_style}</span>
            </p>
            <p className="flex justify-between">
              <strong>Preferred Times:</strong>
              <span>{studyPlan.preferred_study_times.join(", ")}</span>
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">No study plan created yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StudyPlanOverview;