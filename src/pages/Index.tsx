import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Heart, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-3xl mb-8 animate-float">
          <Activity className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6">
          HealthyIO
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your personal health companion supporting{" "}
          <span className="font-semibold text-primary">SDG 3: Good Health and Well-being</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-lg px-8">
            Sign In
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">Track Health</h3>
            <p className="text-muted-foreground text-sm">
              Monitor exercise, nutrition, and sleep patterns
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <TrendingUp className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">Get Insights</h3>
            <p className="text-muted-foreground text-sm">
              Receive personalized health scores and suggestions
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Users className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg mb-2">Build Habits</h3>
            <p className="text-muted-foreground text-sm">
              Develop sustainable healthy lifestyle practices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
