import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOAL_TYPE_LABELS, GoalType } from '@/types';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  selectedAreas: GoalType[];
  priorities: Record<GoalType, number>;
  weeklyMinutes: number;
  intensity: 1 | 2 | 3;
  availabilities: string[];
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAreas, setSelectedAreas] = useState<GoalType[]>([]);
  const [priorities, setPriorities] = useState<Record<GoalType, number>>({} as Record<GoalType, number>);
  const [weeklyMinutes, setWeeklyMinutes] = useState([120]);
  const [intensity, setIntensity] = useState<1 | 2 | 3>(1);
  const [availabilities, setAvailabilities] = useState<string[]>([]);

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const goalTypes = Object.keys(GOAL_TYPE_LABELS) as GoalType[];

  const handleAreaToggle = (area: GoalType) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete({
        selectedAreas,
        priorities,
        weeklyMinutes: weeklyMinutes[0],
        intensity,
        availabilities
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true; // Welcome
      case 1: return selectedAreas.length > 0; // Areas
      case 2: return selectedAreas.every(area => priorities[area] !== undefined); // Priorities
      case 3: return weeklyMinutes[0] > 0; // Time
      case 4: return availabilities.length > 0; // Availability
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome to Balance</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Design your perfect week with the minimum effective dose across all life areas
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Takes about 2 minutes</span>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Which areas matter most right now?</h2>
              <p className="text-muted-foreground">Select the areas you want to focus on</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {goalTypes.map((area) => (
                <Card
                  key={area}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-soft",
                    selectedAreas.includes(area) 
                      ? "ring-2 ring-primary bg-primary/5" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleAreaToggle(area)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="font-medium">{GOAL_TYPE_LABELS[area]}</span>
                    {selectedAreas.includes(area) && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Set your priorities</h2>
              <p className="text-muted-foreground">How important is each area? (0 = none, 10 = highest)</p>
            </div>
            
            <div className="space-y-6">
              {selectedAreas.map((area) => (
                <div key={area} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{GOAL_TYPE_LABELS[area]}</span>
                    <Badge variant="outline">{priorities[area] || 0}</Badge>
                  </div>
                  <Slider
                    value={[priorities[area] || 0]}
                    onValueChange={([value]) => setPriorities(prev => ({ ...prev, [area]: value }))}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">How much time per week?</h2>
              <p className="text-muted-foreground">Total time for all your self-improvement activities</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {weeklyMinutes[0]} minutes
                </div>
                <div className="text-sm text-muted-foreground">
                  About {Math.round(weeklyMinutes[0] / 60 * 10) / 10} hours per week
                </div>
              </div>
              
              <Slider
                value={weeklyMinutes}
                onValueChange={setWeeklyMinutes}
                min={30}
                max={300}
                step={15}
                className="w-full"
              />
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 60, label: 'Light', desc: '~9min/day' },
                  { value: 120, label: 'Balanced', desc: '~17min/day' },
                  { value: 180, label: 'Focused', desc: '~26min/day' }
                ].map(({ value, label, desc }) => (
                  <Button
                    key={value}
                    variant={weeklyMinutes[0] === value ? "default" : "outline"}
                    className="h-auto flex-col py-3"
                    onClick={() => setWeeklyMinutes([value])}
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-xs opacity-70">{desc}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">When are you usually free?</h2>
              <p className="text-muted-foreground">Select your preferred time windows</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'morning', label: 'Morning (6-9 AM)', desc: 'Start your day strong' },
                { id: 'lunch', label: 'Lunch break (12-2 PM)', desc: 'Midday reset' },
                { id: 'evening', label: 'Evening (6-9 PM)', desc: 'Wind down routine' },
                { id: 'night', label: 'Night (9-11 PM)', desc: 'Before bed activities' }
              ].map(({ id, label, desc }) => (
                <Card
                  key={id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-soft",
                    availabilities.includes(id) 
                      ? "ring-2 ring-primary bg-primary/5" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => setAvailabilities(prev => 
                    prev.includes(id) 
                      ? prev.filter(a => a !== id)
                      : [...prev, id]
                  )}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                    {availabilities.includes(id) && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <Progress value={progress} className="w-full h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg">
            {renderStep()}
          </div>
        </div>
        
        <div className="flex justify-between pt-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="min-w-[120px]"
          >
            {currentStep === totalSteps - 1 ? 'Generate Plan' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}