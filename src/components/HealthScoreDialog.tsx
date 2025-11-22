import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Target, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthScoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  score: number;
  category: "exercise" | "nutrition" | "sleep";
}

const HealthScoreDialog = ({ open, onOpenChange, score, category }: HealthScoreDialogProps) => {
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! Keep up the great work!";
    if (score >= 60) return "Good job! There's room for improvement.";
    return "Let's work on improving this!";
  };

  const getSuggestions = (category: string, score: number) => {
    const suggestions: { [key: string]: string[] } = {
      exercise: [
        "Try to increase your workout duration gradually",
        "Mix different types of exercises for better results",
        "Stay consistent with your exercise routine",
        "Don't forget to warm up and cool down properly",
      ],
      nutrition: [
        "Balance your macronutrients: 30% protein, 40% carbs, 30% fats",
        "Eat more whole foods and reduce processed foods",
        "Stay hydrated throughout the day",
        "Include more vegetables and fruits in your diet",
      ],
      sleep: [
        "Aim for 7-9 hours of sleep each night",
        "Maintain a consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Avoid screens 1 hour before bedtime",
      ],
    };

    return score >= 80 
      ? suggestions[category].slice(0, 2)
      : suggestions[category];
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/share/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share your health score with friends!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Your Health Score
          </DialogTitle>
          <DialogDescription>
            Here's how you did with your {category} tracking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Score Display */}
          <div className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              {getScoreMessage(score)}
            </p>
          </div>

          {/* Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Target className="w-5 h-5" />
              <h4 className="font-semibold">Suggestions to Improve:</h4>
            </div>
            <ul className="space-y-2">
              {getSuggestions(category, score).map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleShare} variant="outline" className="flex-1 gap-2">
              <Share2 className="w-4 h-4" />
              Share Score
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealthScoreDialog;
