import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import PhysicalExerciseForm from "@/components/forms/PhysicalExerciseForm";
import FoodIntakeForm from "@/components/forms/FoodIntakeForm";
import SleepForm from "@/components/forms/SleepForm";

const LogData = () => {
  return (
    <div className="min-h-screen bg-gradient-hero pb-20 md:pb-8">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-fade-in space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Log Your Health Data
            </h1>
            <p className="text-muted-foreground">
              Track your exercise, nutrition, and sleep to improve your health score
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">What would you like to track?</CardTitle>
              <CardDescription>Select a category to start logging your data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="exercise" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="exercise">Physical Exercise</TabsTrigger>
                  <TabsTrigger value="food">Food Intake</TabsTrigger>
                  <TabsTrigger value="sleep">Sleep</TabsTrigger>
                </TabsList>

                <TabsContent value="exercise" className="mt-6">
                  <PhysicalExerciseForm />
                </TabsContent>

                <TabsContent value="food" className="mt-6">
                  <FoodIntakeForm />
                </TabsContent>

                <TabsContent value="sleep" className="mt-6">
                  <SleepForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LogData;
