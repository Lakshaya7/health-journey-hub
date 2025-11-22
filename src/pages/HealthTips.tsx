import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Heart, Dumbbell, Apple, Moon, Droplets, Brain, Users, Smile } from "lucide-react";

const HealthTips = () => {
  const tips = [
    {
      icon: Dumbbell,
      title: "Stay Active Daily",
      description: "Aim for at least 30 minutes of moderate exercise every day. This can include walking, jogging, cycling, or any activity you enjoy.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Apple,
      title: "Eat Balanced Meals",
      description: "Include a variety of fruits, vegetables, whole grains, and lean proteins. Follow the 30-40-30 rule for protein, carbs, and fats.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Moon,
      title: "Prioritize Sleep",
      description: "Get 7-9 hours of quality sleep each night. Maintain a consistent sleep schedule and create a relaxing bedtime routine.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily. Proper hydration improves energy levels, skin health, and bodily functions.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Brain,
      title: "Practice Mindfulness",
      description: "Take time for meditation, deep breathing, or yoga. Mental health is just as important as physical health.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Users,
      title: "Build Social Connections",
      description: "Spend quality time with friends and family. Strong social ties contribute to better mental and physical health.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Heart,
      title: "Regular Check-ups",
      description: "Schedule annual health screenings and check-ups. Prevention is better than cure when it comes to health issues.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Smile,
      title: "Practice Gratitude",
      description: "Keep a gratitude journal or reflect on positive aspects of your life. Positive thinking improves overall well-being.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pb-20 md:pb-8">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-fade-in space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Health & Wellness Tips
            </h1>
            <p className="text-muted-foreground text-lg">
              Simple steps to improve your health and fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 ${tip.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${tip.color}`} />
                    </div>
                    <CardTitle className="text-xl font-heading">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-2 bg-gradient-primary text-white mt-8">
            <CardContent className="py-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 animate-float" />
              <h3 className="text-2xl font-heading font-bold mb-2">
                Remember: Consistency is Key!
              </h3>
              <p className="text-white/90 max-w-2xl mx-auto">
                Small, consistent changes lead to big results over time. Start with one tip today 
                and gradually incorporate more healthy habits into your lifestyle.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HealthTips;
