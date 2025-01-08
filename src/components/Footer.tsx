import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background-darker text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StudyFlow</h3>
            <p className="text-sm opacity-80">
              Empowering Nigerian students to achieve academic excellence through
              smart study tools and collaboration.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-secondary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-secondary transition-colors">
                  Study Planner
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-secondary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Stay updated with our latest features and tips.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-secondary"
            />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} StudyFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;