import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Heart, Target, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Health Score", value: "85", icon: Heart, color: "text-primary" },
    { label: "Days Streak", value: "12", icon: TrendingUp, color: "text-secondary" },
    { label: "Goals Met", value: "8/10", icon: Target, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-fade-in space-y-8">
          {/* Hero Section */}
          <section className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl mb-6 animate-float">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
              Welcome to HealthyIO
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your personal health companion supporting SDG 3: Good Health and Well-being
            </p>
            <Button size="lg" onClick={() => navigate("/log-data")} className="gap-2">
              <Plus className="w-5 h-5" />
              Add Health Data
            </Button>
          </section>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* SDG 3 Information */}
          <section className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary" />
                  Why Health Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Health is the foundation of everything we do. When we're healthy, we can pursue our dreams, 
                  contribute to our communities, and enjoy life to the fullest.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Increases productivity and energy levels</li>
                  <li>Improves mental well-being and mood</li>
                  <li>Reduces risk of chronic diseases</li>
                  <li>Enhances quality of life</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-heading flex items-center gap-2">
                  <Target className="w-6 h-6 text-secondary" />
                  About SDG 3
                </CardTitle>
                <CardDescription className="text-base">
                  Good Health and Well-being
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  SDG 3 aims to ensure healthy lives and promote well-being for all at all ages. 
                  HealthyIO helps you contribute to this goal by:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Tracking your daily health metrics</li>
                  <li>Promoting healthy lifestyle choices</li>
                  <li>Providing actionable health insights</li>
                  <li>Building sustainable health habits</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section>
            <Card className="border-2 bg-gradient-primary text-white">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-2">
                      Ready to track your health?
                    </h3>
                    <p className="text-white/90">
                      Start logging your exercise, nutrition, and sleep data now!
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => navigate("/log-data")}
                    className="gap-2 whitespace-nowrap"
                  >
                    <Plus className="w-5 h-5" />
                    Log Data Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
