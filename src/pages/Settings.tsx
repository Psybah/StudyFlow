import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsContent from "@/components/settings/SettingsContent";
import { FormData, StudyStyle, PreferredTime } from "@/types/settings";

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

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { user } = session;
      if (user?.email) {
        setFormData(prev => ({
          ...prev,
          email: user.email || "",
          name: user.user_metadata.name || "",
          studyStyle: (user.user_metadata.study_style as StudyStyle) || "pomodoro",
          preferredTime: (user.user_metadata.preferred_time as PreferredTime) || "morning",
        }));
      }
    };

    checkSession();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationToggle = (type: keyof FormData["notifications"]) => {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
            <SettingsHeader />
            <SettingsContent
              formData={formData}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onNotificationToggle={handleNotificationToggle}
              onStudyStyleChange={handleStudyStyleChange}
              onPreferredTimeChange={handlePreferredTimeChange}
              onSaveChanges={handleSaveChanges}
              onDeleteAccount={handleDeleteAccount}
            />
          </div>
        </main>
      </div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Settings;