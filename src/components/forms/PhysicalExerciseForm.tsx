import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dumbbell } from "lucide-react";
import HealthScoreDialog from "@/components/HealthScoreDialog";

const PhysicalExerciseForm = () => {
  const { toast } = useToast();
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [formData, setFormData] = useState({
    exerciseType: "",
    duration: "",
    intensity: "",
    caloriesBurned: "",
    date: new Date().toISOString().split("T")[0],
  });

  const calculateHealthScore = () => {
    const duration = parseInt(formData.duration) || 0;
    const calories = parseInt(formData.caloriesBurned) || 0;
    const intensityMultiplier = formData.intensity === "high" ? 1.5 : formData.intensity === "medium" ? 1.2 : 1.0;
    
    const score = Math.min(100, Math.round((duration * 0.5 + calories * 0.1) * intensityMultiplier));
    return score;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate health score
    const score = calculateHealthScore();
    setHealthScore(score);
    
    // Store in localStorage - Replace with MySQL API call
    const existingData = JSON.parse(localStorage.getItem("healthyio_exercises") || "[]");
    existingData.push({ ...formData, score, timestamp: new Date().toISOString() });
    localStorage.setItem("healthyio_exercises", JSON.stringify(existingData));
    
    setShowScoreDialog(true);
    
    // Reset form
    setFormData({
      exerciseType: "",
      duration: "",
      intensity: "",
      caloriesBurned: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Dumbbell className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Track Your Physical Activity</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exerciseType">Exercise Type</Label>
          <Select
            value={formData.exerciseType}
            onValueChange={(value) => setFormData({ ...formData, exerciseType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select exercise type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workout">Gym Workout</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="jogging">Jogging</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="swimming">Swimming</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="30"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity</Label>
            <Select
              value={formData.intensity}
              onValueChange={(value) => setFormData({ ...formData, intensity: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="caloriesBurned">Calories Burned</Label>
            <Input
              id="caloriesBurned"
              type="number"
              min="0"
              placeholder="200"
              value={formData.caloriesBurned}
              onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full">Log Exercise Data</Button>
      </form>

      <HealthScoreDialog
        open={showScoreDialog}
        onOpenChange={setShowScoreDialog}
        score={healthScore}
        category="exercise"
      />
    </>
  );
};

export default PhysicalExerciseForm;
