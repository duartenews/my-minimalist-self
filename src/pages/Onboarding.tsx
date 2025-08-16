import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOAL_TYPE_LABELS, GoalType } from '@/types';

// +++ NOVO +++
type TimeWindowKey = 'morning' | 'lunch' | 'evening' | 'night';
const PRESETS: Record<TimeWindowKey, { label: string; start: string; end: string }> = {
  morning: { label: 'Morning (6–9 AM)', start: '06:00', end: '09:00' },
  lunch:   { label: 'Lunch (12–2 PM)',   start: '12:00', end: '14:00' },
  evening: { label: 'Evening (6–9 PM)',  start: '18:00', end: '21:00' },
  night:   { label: 'Night (9–11 PM)',   start: '21:00', end: '23:00' },
};
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const UTILIZATION: Record<1|2|3, number> = { 1: 0.35, 2: 0.5, 3: 0.75 };
const diffMin = (s: string, e: string) =>
  (new Date(`1970-01-01T${e}:00Z`).getTime() - new Date(`1970-01-01T${s}:00Z`).getTime()) / 60000;

type Availability = {
  day: number;
  windows: {
    [key in TimeWindowKey]: (typeof PRESETS)[key] & { enabled: boolean };
  };
};

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
  const [availabilities, setAvailabilities] = useState<Availability[]>(() =>
    Array.from({ length: 7 }).map((_, i) => ({
      day: i, // 0..6
      windows: {
        morning: { ...PRESETS.morning, enabled: i > 0 && i < 6 }, // Weekdays
        lunch:   { ...PRESETS.lunch,   enabled: false },
        evening: { ...PRESETS.evening, enabled: i > 0 && i < 6 }, // Weekdays
        night:   { ...PRESETS.night,   enabled: false },
      },
    }))
  );
  const [isCustomizing, setIsCustomizing] = useState(false);

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const goalTypes = Object.keys(GOAL_TYPE_LABELS) as GoalType[];

  const hasAnyWindow = React.useMemo(
    () => availabilities.some((d) => Object.values(d.windows).some((w) => w.enabled)),
    [availabilities]
  );

  function toggleWindow(dayIdx: number, key: TimeWindowKey) {
    setAvailabilities((prev) =>
      prev.map((d, idx) =>
        idx === dayIdx
          ? { ...d, windows: { ...d.windows, [key]: { ...d.windows[key], enabled: !d.windows[key].enabled } } }
          : d
      )
    );
  }

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
      const flat: string[] = availabilities.flatMap((d) =>
        (Object.entries(d.windows) as [TimeWindowKey, { enabled: boolean }][])
          .filter(([, w]) => w.enabled)
          .map(([k]) => `${d.day}:${k}`)
      );

      onComplete({
        selectedAreas,
        priorities,
        weeklyMinutes: 0,
        intensity: 2,
        availabilities: flat,
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return selectedAreas.length > 0;
      case 2: return selectedAreas.every(area => priorities[area] !== undefined);
      case 3: return hasAnyWindow;
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
                Design your perfect week with the minimum effective dose across all life areas.
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
              <h2 className="text-2xl font-bold text-foreground">Which areas matter most?</h2>
              <p className="text-muted-foreground">Select the areas you want to focus on.</p>
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
              <p className="text-muted-foreground">How important is each area? (0-10)</p>
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
              <h2 className="text-2xl font-bold text-foreground">When are you usually free?</h2>
              <p className="text-muted-foreground">
                Start with a default schedule and customize if needed.
              </p>
            </div>

            {isCustomizing ? (
              <div className="space-y-4">
                {availabilities.map((d, di) => (
                  <Card key={di}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{DAYS[d.day]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {(Object.keys(PRESETS) as TimeWindowKey[]).map((k) => {
                        const enabled = d.windows[k].enabled;
                        return (
                          <button
                            key={k}
                            onClick={() => toggleWindow(di, k)}
                            className={cn(
                              'px-3 py-2 rounded-xl border text-sm transition-colors',
                              enabled ? 'bg-foreground text-background' : 'bg-background'
                            )}
                          >
                            {PRESETS[k].label}
                          </button>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <Card className="text-left">
                  <CardContent className="p-4 space-y-1">
                    <p className="font-medium">Default Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      Weekdays, during morning and evening.
                    </p>
                  </CardContent>
                </Card>
                <Button variant="outline" onClick={() => setIsCustomizing(true)}>
                  Customize Schedule
                </Button>
              </div>
            )}
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