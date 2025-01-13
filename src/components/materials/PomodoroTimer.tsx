import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        toast({
          title: "Time for a break!",
          description: "Take 5 minutes to rest.",
        });
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      } else {
        toast({
          title: "Break finished!",
          description: "Ready to start another session?",
        });
        setTimeLeft(25 * 60);
        setIsBreak(false);
      }
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, toast]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTimer}
              aria-label={isRunning ? "Pause" : "Start"}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              aria-label="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;