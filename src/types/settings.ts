export type StudyStyle = "pomodoro" | "timeblocking" | "spaced" | "active" | "passive";
export type PreferredTime = "morning" | "afternoon" | "evening" | "night";
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