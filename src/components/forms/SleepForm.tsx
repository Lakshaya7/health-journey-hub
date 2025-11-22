import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Moon } from "lucide-react";
import HealthScoreDialog from "@/components/HealthScoreDialog";

const SleepForm = () => {
  const { toast } = useToast();
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [formData, setFormData] = useState({
    sleepHours: "",
    sleepQuality: "",
    bedTime: "",
    wakeTime: "",
    date: new Date().toISOString().split("T")[0],
  });

  const calculateHealthScore = () => {
    const hours = parseFloat(formData.sleepHours) || 0;
    const qualityMultiplier = 
      formData.sleepQuality === "excellent" ? 1.2 :
      formData.sleepQuality === "good" ? 1.0 :
      formData.sleepQuality === "fair" ? 0.8 : 0.6;

    // Ideal sleep is 7-9 hours
    let hoursScore = 0;
    if (hours >= 7 && hours <= 9) {
      hoursScore = 100;
    } else if (hours >= 6 && hours < 7) {
      hoursScore = 80;
    } else if (hours > 9 && hours <= 10) {
      hoursScore = 80;
    } else {
      hoursScore = Math.max(0, 100 - Math.abs(8 - hours) * 15);
    }

    const score = Math.min(100, Math.round(hoursScore * qualityMultiplier));
    return score;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const score = calculateHealthScore();
    setHealthScore(score);
    
    // Store in localStorage - Replace with MySQL API call
    const existingData = JSON.parse(localStorage.getItem("healthyio_sleep") || "[]");
    existingData.push({ ...formData, score, timestamp: new Date().toISOString() });
    localStorage.setItem("healthyio_sleep", JSON.stringify(existingData));
    
    setShowScoreDialog(true);
    
    // Reset form
    setFormData({
      sleepHours: "",
      sleepQuality: "",
      bedTime: "",
      wakeTime: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4 text-accent">
          <Moon className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Track Your Sleep</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sleepHours">Hours Slept</Label>
            <Input
              id="sleepHours"
              type="number"
              step="0.5"
              min="0"
              max="24"
              placeholder="8"
              value={formData.sleepHours}
              onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepQuality">Sleep Quality</Label>
            <Select
              value={formData.sleepQuality}
              onValueChange={(value) => setFormData({ ...formData, sleepQuality: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedTime">Bed Time</Label>
            <Input
              id="bedTime"
              type="time"
              value={formData.bedTime}
              onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wakeTime">Wake Time</Label>
            <Input
              id="wakeTime"
              type="time"
              value={formData.wakeTime}
              onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
              required
            />
          </div>
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

        <Button type="submit" className="w-full">Log Sleep Data</Button>
      </form>

      <HealthScoreDialog
        open={showScoreDialog}
        onOpenChange={setShowScoreDialog}
        score={healthScore}
        category="sleep"
      />
    </>
  );
};

export default SleepForm;
