import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import StudyPreferences from "./StudyPreferences";
import DangerZone from "./DangerZone";
import { FormData, StudyStyle, PreferredTime } from "@/types/settings";

interface SettingsContentProps {
  formData: FormData;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNotificationToggle: (type: "reminders" | "progress" | "tips") => void;
  onStudyStyleChange: (value: StudyStyle) => void;
  onPreferredTimeChange: (value: PreferredTime) => void;
  onSaveChanges: () => Promise<void>;
  onDeleteAccount: () => Promise<void>;
}

const SettingsContent = ({
  formData,
  isLoading,
  onInputChange,
  onNotificationToggle,
  onStudyStyleChange,
  onPreferredTimeChange,
  onSaveChanges,
  onDeleteAccount,
}: SettingsContentProps) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="account">
          <AccordionTrigger>Account Settings</AccordionTrigger>
          <AccordionContent>
            <AccountSettings
              name={formData.name}
              email={formData.email}
              onInputChange={onInputChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger>Notification Preferences</AccordionTrigger>
          <AccordionContent>
            <NotificationSettings
              notifications={formData.notifications}
              onNotificationToggle={onNotificationToggle}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="personalization">
          <AccordionTrigger>Personalization</AccordionTrigger>
          <AccordionContent>
            <StudyPreferences
              studyStyle={formData.studyStyle}
              preferredTime={formData.preferredTime}
              onStudyStyleChange={onStudyStyleChange}
              onPreferredTimeChange={onPreferredTimeChange}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger>Privacy & Security</AccordionTrigger>
          <AccordionContent>
            <DangerZone onDeleteAccount={onDeleteAccount} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="sticky bottom-4 flex justify-end bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg shadow-lg">
        <Button onClick={onSaveChanges} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </>
  );
};

export default SettingsContent;