import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuthButtonsProps {
  user: any;
  hasStudyPlan: boolean;
  onGetStarted: () => void;
}

const AuthButtons = ({ user, hasStudyPlan, onGetStarted }: AuthButtonsProps) => {
  const navigate = useNavigate();

  return (
    <>
      {user && (
        hasStudyPlan ? (
          <Button
            variant="secondary"
            className="bg-white text-[#1A5D1A] hover:bg-white/90"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="bg-white text-[#1A5D1A] hover:bg-white/90"
            onClick={onGetStarted}
          >
            Create Study Plan
          </Button>
        )
      )}
    </>
  );
};

export default AuthButtons;