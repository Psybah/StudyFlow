import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Brain, ChevronDown, ChevronUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AIFeaturesProps {
  materialId: string;
  content: string;
}

const AIFeatures = ({ materialId, content }: AIFeaturesProps) => {
  const { toast } = useToast();

  const handleGenerateSummary = () => {
    toast({
      title: "Coming Soon",
      description: "The AI summary generation feature will be available soon!",
    });
  };

  const handleGenerateQuiz = () => {
    toast({
      title: "Coming Soon",
      description: "The AI quiz generation feature will be available soon!",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGenerateSummary}
            className="w-full"
          >
            <Brain className="mr-2 h-4 w-4" />
            Generate Summary
          </Button>

          <Button
            onClick={handleGenerateQuiz}
            className="w-full"
          >
            Generate Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeatures;