import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Apple } from "lucide-react";
import HealthScoreDialog from "@/components/HealthScoreDialog";

const FoodIntakeForm = () => {
  const { toast } = useToast();
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [healthScore, setHealthScore] = useState(0);
  const [formData, setFormData] = useState({
    mealType: "",
    protein: "",
    carbs: "",
    fats: "",
    calories: "",
    date: new Date().toISOString().split("T")[0],
  });

  const calculateHealthScore = () => {
    const protein = parseInt(formData.protein) || 0;
    const carbs = parseInt(formData.carbs) || 0;
    const fats = parseInt(formData.fats) || 0;
    const calories = parseInt(formData.calories) || 0;

    // Ideal ratios: 30% protein, 40% carbs, 30% fats
    const totalMacros = protein + carbs + fats;
    const proteinRatio = totalMacros > 0 ? (protein / totalMacros) : 0;
    const carbRatio = totalMacros > 0 ? (carbs / totalMacros) : 0;
    const fatRatio = totalMacros > 0 ? (fats / totalMacros) : 0;

    // Calculate deviation from ideal ratios
    const proteinScore = 100 - Math.abs(proteinRatio - 0.30) * 200;
    const carbScore = 100 - Math.abs(carbRatio - 0.40) * 200;
    const fatScore = 100 - Math.abs(fatRatio - 0.30) * 200;

    const score = Math.max(0, Math.min(100, Math.round((proteinScore + carbScore + fatScore) / 3)));
    return score;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const score = calculateHealthScore();
    setHealthScore(score);
    
    // Store in localStorage - Replace with MySQL API call
    const existingData = JSON.parse(localStorage.getItem("healthyio_meals") || "[]");
    existingData.push({ ...formData, score, timestamp: new Date().toISOString() });
    localStorage.setItem("healthyio_meals", JSON.stringify(existingData));
    
    setShowScoreDialog(true);
    
    // Reset form
    setFormData({
      mealType: "",
      protein: "",
      carbs: "",
      fats: "",
      calories: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4 text-secondary">
          <Apple className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Track Your Nutrition</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealType">Meal Type</Label>
          <Select
            value={formData.mealType}
            onValueChange={(value) => setFormData({ ...formData, mealType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              min="0"
              placeholder="25"
              value={formData.protein}
              onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input
              id="carbs"
              type="number"
              min="0"
              placeholder="45"
              value={formData.carbs}
              onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fats">Fats (g)</Label>
            <Input
              id="fats"
              type="number"
              min="0"
              placeholder="15"
              value={formData.fats}
              onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calories">Total Calories</Label>
            <Input
              id="calories"
              type="number"
              min="0"
              placeholder="400"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
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

        <Button type="submit" className="w-full">Log Nutrition Data</Button>
      </form>

      <HealthScoreDialog
        open={showScoreDialog}
        onOpenChange={setShowScoreDialog}
        score={healthScore}
        category="nutrition"
      />
    </>
  );
};

export default FoodIntakeForm;
