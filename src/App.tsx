import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import CourseMaterials from "./pages/CourseMaterials";
import Reminders from "./pages/Reminders";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showFooter = !location.pathname.includes('/auth') && 
                    !location.pathname.includes('/dashboard') && 
                    !location.pathname.includes('/materials') &&
                    !location.pathname.includes('/reminders') &&
                    !location.pathname.includes('/progress') &&
                    !location.pathname.includes('/settings');

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className={`flex-grow pt-16 ${location.pathname.includes('/auth') ? 'bg-background' : ''}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/materials" element={<CourseMaterials />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppContent />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;