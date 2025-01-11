import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StudyStyle = "pomodoro" | "continuous" | "flexible";
type PreferredTime = "morning" | "afternoon" | "evening";

interface StudyPreferencesProps {
  studyStyle: StudyStyle;
  preferredTime: PreferredTime;
  onStudyStyleChange: (value: StudyStyle) => void;
  onPreferredTimeChange: (value: PreferredTime) => void;
}

const StudyPreferences = ({
  studyStyle,
  preferredTime,
  onStudyStyleChange,
  onPreferredTimeChange,
}: StudyPreferencesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Preferences</CardTitle>
        <CardDescription>
          Customize your study experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studyStyle">Study Style</Label>
          <Select
            value={studyStyle}
            onValueChange={onStudyStyleChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your study style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pomodoro">Pomodoro</SelectItem>
              <SelectItem value="continuous">Continuous</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Study Time</Label>
          <Select
            value={preferredTime}
            onValueChange={onPreferredTimeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preferred time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPreferences;