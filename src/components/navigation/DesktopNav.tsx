import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";

interface DesktopNavProps {
  user: any;
  hasStudyPlan: boolean;
  onGetStarted: () => void;
}

const DesktopNav = ({ user, hasStudyPlan, onGetStarted }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="hover:text-white/90 transition-colors">
        Home
      </Link>
      <Link to="/about" className="hover:text-white/90 transition-colors">
        About
      </Link>
      <Link to="/features" className="hover:text-white/90 transition-colors">
        Features
      </Link>
      <Link to="/community" className="hover:text-white/90 transition-colors">
        Community
      </Link>
      <Link to="/contact" className="hover:text-white/90 transition-colors">
        Contact
      </Link>
      <AuthButtons 
        user={user}
        hasStudyPlan={hasStudyPlan}
        onGetStarted={onGetStarted}
      />
    </div>
  );
};

export default DesktopNav;