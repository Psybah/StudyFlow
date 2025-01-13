import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StudyPlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    nickname: string;
    courses: string[];
    academic_goals: string[];
    preferred_study_times: string[];
    study_style: string;
  };
}

const StudyPlanForm = ({ isOpen, onClose, initialData }: StudyPlanFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(initialData?.nickname || "");
  const [courses, setCourses] = useState<string[]>(initialData?.courses || [""]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(initialData?.preferred_study_times || []);
  const [academicGoal, setAcademicGoal] = useState(initialData?.academic_goals?.[0] || "");
  const [studyStyle, setStudyStyle] = useState(initialData?.study_style || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNickname(initialData.nickname);
      setCourses(initialData.courses);
      setSelectedTimes(initialData.preferred_study_times);
      setAcademicGoal(initialData.academic_goals[0]);
      setStudyStyle(initialData.study_style);
    }
  }, [initialData]);

  const handleAddCourse = () => {
    setCourses([...courses, ""]);
  };

  const handleCourseChange = (index: number, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = value;
    setCourses(newCourses);
  };

  const handleTimeToggle = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "Please sign in to create a study plan.",
          variant: "destructive",
        });
        return;
      }

      const studyPlanData = {
        user_id: session.user.id,
        nickname,
        academic_goals: [academicGoal],
        courses: courses.filter(course => course.trim() !== ""),
        preferred_study_times: selectedTimes,
        study_style: studyStyle,
      };

      let error;
      if (initialData) {
        // Update existing study plan
        const { error: updateError } = await supabase
          .from('study_plans')
          .update(studyPlanData)
          .eq('user_id', session.user.id);
        error = updateError;
      } else {
        // Create new study plan
        const { error: insertError } = await supabase
          .from('study_plans')
          .insert(studyPlanData);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: initialData ? "Study Plan Updated!" : "Study Plan Created!",
        description: initialData ? "Your study plan has been updated." : "Your personalized study plan is ready.",
      });
      
      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error('Error with study plan:', error);
      toast({
        title: "Error",
        description: `Failed to ${initialData ? 'update' : 'create'} study plan. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {initialData ? "Update Your Study Plan" : "Let's Customize Your Study Plan!"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name or Nickname</label>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="What should we call you?"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Academic Goals</label>
            <Select value={academicGoal} onValueChange={setAcademicGoal} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exams">Preparing for semester exams</SelectItem>
                <SelectItem value="lectures">Catching up on missed lectures</SelectItem>
                <SelectItem value="balance">Balancing coursework and projects</SelectItem>
                <SelectItem value="consistency">Improving study consistency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Courses or Subjects</label>
            {courses.map((course, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={course}
                  onChange={(e) => handleCourseChange(index, e.target.value)}
                  placeholder="Add your course (e.g., CSC 101, ENG 203)"
                  className="flex-1"
                  required={index === 0}
                />
                {index === courses.length - 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddCourse}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Study Times</label>
            <div className="flex flex-wrap gap-2">
              {["Early Morning", "Afternoon", "Evening", "Overnight"].map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTimes.includes(time) ? "secondary" : "outline"}
                  onClick={() => handleTimeToggle(time)}
                  className="flex gap-2"
                >
                  {selectedTimes.includes(time) && <Check className="h-4 w-4" />}
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Study Style</label>
            <Select value={studyStyle} onValueChange={setStudyStyle} required>
              <SelectTrigger>
                <SelectValue placeholder="Choose your preferred study style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo Study</SelectItem>
                <SelectItem value="group">Group Study</SelectItem>
                <SelectItem value="pomodoro">Pomodoro Method</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Generate My Study Plan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanForm;