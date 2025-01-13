import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Brain, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AIFeaturesProps {
  materialId: string;
  content: string;
}

const AIFeatures = ({ materialId, content }: AIFeaturesProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { toast } = useToast();

  const generateSummary = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('summarize-material', {
        body: { content },
      });

      if (error) {
        // Check if it's a quota exceeded error (status 429)
        if (error.status === 429) {
          toast({
            title: "API Quota Exceeded",
            description: "The AI service is currently unavailable due to high demand. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
      setSummary(data.summary);
    } catch (error: any) {
      toast({
        title: "Error generating summary",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateQuiz = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz', {
        body: { content },
      });

      if (error) {
        // Check if it's a quota exceeded error (status 429)
        if (error.status === 429) {
          toast({
            title: "API Quota Exceeded",
            description: "The AI service is currently unavailable due to high demand. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
      setQuizQuestions(data.questions);
      setIsQuizOpen(true);
    } catch (error: any) {
      toast({
        title: "Error generating quiz",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const submitQuiz = async () => {
    const score = quizQuestions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from("quiz_results")
        .insert({
          material_id: materialId,
          user_id: user.id,
          score,
          total_questions: quizQuestions.length,
        });

      if (error) throw error;

      setQuizSubmitted(true);
      toast({
        title: "Quiz submitted!",
        description: `You scored ${score} out of ${quizQuestions.length}`,
      });
    } catch (error: any) {
      toast({
        title: "Error saving quiz results",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={generateSummary}
            disabled={isGenerating}
            className="w-full"
          >
            <Brain className="mr-2 h-4 w-4" />
            Generate Summary
          </Button>

          {summary && (
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Summary
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm">
                {summary}
              </CollapsibleContent>
            </Collapsible>
          )}

          <Button
            onClick={generateQuiz}
            disabled={isGenerating}
            className="w-full"
          >
            Generate Quiz
          </Button>

          {quizQuestions.length > 0 && (
            <Collapsible open={isQuizOpen} onOpenChange={setIsQuizOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Quiz
                {isQuizOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                {quizQuestions.map((question, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="font-medium">{question.question}</p>
                    <div className="space-y-1">
                      {question.options.map((option: string, optIdx: number) => (
                        <label
                          key={optIdx}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name={`question-${idx}`}
                            value={option}
                            checked={selectedAnswers[idx] === option}
                            onChange={() =>
                              setSelectedAnswers({
                                ...selectedAnswers,
                                [idx]: option,
                              })
                            }
                            disabled={quizSubmitted}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {!quizSubmitted && (
                  <Button
                    onClick={submitQuiz}
                    disabled={
                      Object.keys(selectedAnswers).length !==
                      quizQuestions.length
                    }
                    className="w-full"
                  >
                    Submit Quiz
                  </Button>
                )}
              </CollapsibleContent>
            </Collapsible>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeatures;