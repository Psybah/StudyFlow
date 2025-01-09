import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  hasStudyPlan: boolean;
  onGetStarted: () => void;
}

const MobileMenu = ({ isOpen, onClose, user, hasStudyPlan, onGetStarted }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <Link
          to="/about"
          className="hover:text-white/90 transition-colors"
          onClick={onClose}
        >
          About
        </Link>
        <Link
          to="/features"
          className="hover:text-white/90 transition-colors"
          onClick={onClose}
        >
          Features
        </Link>
        <Link
          to="/community"
          className="hover:text-white/90 transition-colors"
          onClick={onClose}
        >
          Community
        </Link>
        <Link
          to="/contact"
          className="hover:text-white/90 transition-colors"
          onClick={onClose}
        >
          Contact
        </Link>
        <AuthButtons 
          user={user}
          hasStudyPlan={hasStudyPlan}
          onGetStarted={() => {
            onClose();
            onGetStarted();
          }}
        />
      </div>
    </div>
  );
};

export default MobileMenu;