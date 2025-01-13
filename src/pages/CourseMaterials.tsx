import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import MaterialsList from "@/components/materials/MaterialsList";
import AddMaterialForm from "@/components/materials/AddMaterialForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CourseMaterials = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view course materials",
          variant: "destructive",
        });
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate, toast]);

  const { data: materials, isLoading, error, refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_materials")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching materials:", error);
        throw error;
      }
      return data || [];
    },
  });

  const filteredMaterials = materials?.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load course materials. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <div className="w-64 transition-all duration-300" />}
      <SidebarNav />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-12">
        <div className="mx-auto space-y-8 max-w-5xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <MaterialsList 
            materials={filteredMaterials || []} 
            onAddClick={() => setIsAddFormOpen(true)}
            isLoading={isLoading}
          />
          
          <AddMaterialForm 
            isOpen={isAddFormOpen}
            onClose={() => setIsAddFormOpen(false)}
            onSuccess={refetch}
          />
        </div>
      </main>

      {isMobile && <div className="h-20" />}
      {isMobile && <MobileNav />}
    </div>
  );
};

export default CourseMaterials;