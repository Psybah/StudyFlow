import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft } from "lucide-react"; // Import Chevron Left icon
import type { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="container max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to StudyFlow</h1>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  }
                }
              }
            }}
            theme="light"
            providers={[]}
          />
        </div>
        {/* Back button with Chevron Left icon */}
        <button 
          onClick={() => navigate("/")} 
          className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center space-x-2"
        >
          <ChevronLeft size={20} /> {/* Chevron Left icon */}
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
