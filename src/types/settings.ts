export type StudyStyle = "pomodoro" | "continuous" | "flexible";
export type PreferredTime = "morning" | "afternoon" | "evening";
export type NotificationType = "reminders" | "progress" | "tips";

export interface FormData {
  name: string;
  email: string;
  studyStyle: StudyStyle;
  preferredTime: PreferredTime;
  notifications: {
    reminders: boolean;
    progress: boolean;
    tips: boolean;
  };
}