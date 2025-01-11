import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import StudyPreferences from "@/components/settings/StudyPreferences";
import DangerZone from "@/components/settings/DangerZone";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import { FormData, StudyStyle, PreferredTime, NotificationType } from "@/types/settings";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    studyStyle: "pomodoro" as StudyStyle,
    preferredTime: "morning" as PreferredTime,
    notifications: {
      reminders: true,
      progress: true,
      tips: true,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (type: NotificationType) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleStudyStyleChange = (value: StudyStyle) => {
    setFormData((prev) => ({
      ...prev,
      studyStyle: value,
    }));
  };

  const handlePreferredTimeChange = (value: PreferredTime) => {
    setFormData((prev) => ({
      ...prev,
      preferredTime: value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          name: formData.name,
          study_style: formData.studyStyle,
          preferred_time: formData.preferredTime,
          notifications: formData.notifications,
        },
      });

      if (error) throw error;

      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;

      await supabase.auth.signOut();
      navigate("/auth");
      
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {!isMobile && <SidebarNav />}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 md:ml-64">
          <div className="container max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="account">
                <AccordionTrigger>Account Settings</AccordionTrigger>
                <AccordionContent>
                  <AccountSettings
                    name={formData.name}
                    email={formData.email}
                    onInputChange={handleInputChange}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="notifications">
                <AccordionTrigger>Notification Preferences</AccordionTrigger>
                <AccordionContent>
                  <NotificationSettings
                    notifications={formData.notifications}
                    onNotificationToggle={handleNotificationToggle}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="personalization">
                <AccordionTrigger>Personalization</AccordionTrigger>
                <AccordionContent>
                  <StudyPreferences
                    studyStyle={formData.studyStyle}
                    preferredTime={formData.preferredTime}
                    onStudyStyleChange={handleStudyStyleChange}
                    onPreferredTimeChange={handlePreferredTimeChange}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger>Privacy & Security</AccordionTrigger>
                <AccordionContent>
                  <DangerZone onDeleteAccount={handleDeleteAccount} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="sticky bottom-4 flex justify-end bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg shadow-lg">
              <Button
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </main>
      </div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Settings;