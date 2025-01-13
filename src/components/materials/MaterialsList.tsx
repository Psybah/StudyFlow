import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import MaterialCard from "./MaterialCard";
import MaterialViewer from "./MaterialViewer";
import { Skeleton } from "@/components/ui/skeleton";

interface Material {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  file_type: string | null;
  file_url: string | null;
  external_link: string | null;
  tags: string[] | null;
  created_at: string;
}

interface MaterialsListProps {
  materials: Material[];
  onAddClick?: () => void;
  isLoading?: boolean;
}

const MaterialsList = ({ materials, onAddClick, isLoading }: MaterialsListProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("course_materials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Material deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["materials"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleView = (material: Material) => {
    setSelectedMaterial(material);
    setIsViewerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Materials</h2>
        {onAddClick && (
          <Button onClick={onAddClick}>
            Add Material
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            onView={handleView}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <MaterialViewer
        material={selectedMaterial}
        isOpen={isViewerOpen}
        onOpenChange={setIsViewerOpen}
      />
    </>
  );
};

export default MaterialsList;