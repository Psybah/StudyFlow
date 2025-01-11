import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NotificationSettingsProps {
  notifications: {
    reminders: boolean;
    progress: boolean;
    tips: boolean;
  };
  onNotificationToggle: (type: "reminders" | "progress" | "tips") => void;
}

const NotificationSettings = ({
  notifications,
  onNotificationToggle,
}: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage your notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="reminders">Reminders</Label>
          <Switch
            id="reminders"
            checked={notifications.reminders}
            onCheckedChange={() => onNotificationToggle("reminders")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="progress">Progress Updates</Label>
          <Switch
            id="progress"
            checked={notifications.progress}
            onCheckedChange={() => onNotificationToggle("progress")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="tips">Motivational Tips</Label>
          <Switch
            id="tips"
            checked={notifications.tips}
            onCheckedChange={() => onNotificationToggle("tips")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;