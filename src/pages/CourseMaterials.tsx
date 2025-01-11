import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SidebarNav from "@/components/navigation/SidebarNav";
import MobileNav from "@/components/navigation/MobileNav";
import MaterialsList from "@/components/materials/MaterialsList";
import AddMaterialForm from "@/components/materials/AddMaterialForm";
import { useIsMobile } from "@/hooks/use-mobile";

const CourseMaterials = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data: materials, refetch } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_materials")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <div className="w-64 transition-all duration-300" />}
      <SidebarNav />
      
      <main className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12">
        <div className="container mx-auto space-y-8">
          <MaterialsList 
            materials={materials || []} 
            onAddClick={() => setIsAddFormOpen(true)} 
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