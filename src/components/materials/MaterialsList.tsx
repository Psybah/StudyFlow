import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Link as LinkIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
}

const MaterialsList = ({ materials }: MaterialsListProps) => {
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <Card key={material.id} className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleView(material)}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-xl font-semibold line-clamp-2">
                {material.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit - To be implemented
                          toast({
                            title: "Coming Soon",
                            description: "Edit functionality will be available soon!",
                          });
                        }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(material.id);
                        }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
            {material.description && (
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                {material.description}
              </p>
            )}
            {material.file_url && material.file_type === "application/pdf" && (
              <div className="mb-4 border rounded-lg overflow-hidden" style={{ height: '200px' }}>
                <iframe
                  src={material.file_url}
                  className="w-full h-full"
                  title={material.title}
                />
              </div>
            )}
            <div className="space-y-4">
              {material.subject && (
                <Badge variant="secondary" className="mr-2">
                  {material.subject}
                </Badge>
              )}
              {material.file_type && (
                <Badge variant="outline" className="mr-2">
                  <FileText className="h-3 w-3 mr-1" />
                  {material.file_type.split('/')[1].toUpperCase()}
                </Badge>
              )}
              {material.external_link && (
                <Badge variant="outline">
                  <LinkIcon className="h-3 w-3 mr-1" />
                  External Link
                </Badge>
              )}
              <div className="flex flex-wrap gap-2">
                {material.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Added {format(new Date(material.created_at), "MMM d, yyyy")}
              </p>
            </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl h-[90vh]">
          {selectedMaterial?.file_url && (
            <iframe
              src={selectedMaterial.file_url}
              className="w-full h-full"
              title={selectedMaterial.title}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MaterialsList;