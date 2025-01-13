import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Link as LinkIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

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

interface MaterialCardProps {
  material: Material;
  onView: (material: Material) => void;
  onDelete: (id: string) => void;
}

const MaterialCard = ({ material, onView, onDelete }: MaterialCardProps) => {
  const { toast } = useToast();

  return (
    <Card 
      className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onView(material)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-xl font-semibold line-clamp-2">
          {material.title}
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toast({
                title: "Coming Soon",
                description: "Edit functionality will be available soon!",
              });
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(material.id);
            }}
          >
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
  );
};

export default MaterialCard;