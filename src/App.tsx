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

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showFooter = !location.pathname.includes('/auth');

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
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;