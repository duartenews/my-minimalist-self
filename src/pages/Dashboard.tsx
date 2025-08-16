import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { AreaCard } from '@/components/ui/area-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoalType, Schedule, Task } from '@/types';

interface DashboardProps {
  userName?: string;
}

// Mock data for demonstration
const mockTasks: Task[] = [
  { id: '1', title: 'Drink 2L water', frequency: 'DAILY', duration: 5, anchor: true, preferredWindow: 'any' },
  { id: '2', title: '6k steps', frequency: 'DAILY', duration: 30, anchor: false, preferredWindow: 'morning' },
  { id: '3', title: 'Plan 3 meals', frequency: 'WEEKLY', duration: 15, anchor: false, preferredWindow: 'evening' },
  { id: '4', title: '10-min reset', frequency: 'DAILY', duration: 10, anchor: true, preferredWindow: 'evening' },
  { id: '5', title: 'Skincare routine', frequency: 'DAILY', duration: 7, anchor: true, preferredWindow: 'evening' }
];

const mockSchedules: Schedule[] = [
  { id: '1', taskId: '1', task: mockTasks[0], date: new Date(), status: 'PENDING' },
  { id: '2', taskId: '2', task: mockTasks[1], date: new Date(), status: 'DONE' },
  { id: '3', taskId: '3', task: mockTasks[2], date: new Date(), status: 'PENDING' },
  { id: '4', taskId: '4', task: mockTasks[3], date: new Date(), status: 'PENDING' },
  { id: '5', taskId: '5', task: mockTasks[4], date: new Date(), status: 'PENDING' }
];

export function Dashboard({ userName = 'Sarah' }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'projects' | 'profile'>('today');

  // Group schedules by goal type (mock assignment)
  const schedulesByArea: Record<GoalType, Schedule[]> = {
    BODY: [mockSchedules[0], mockSchedules[1]],
    FOOD: [mockSchedules[2]],
    SLEEP: [],
    HOME: [mockSchedules[3]],
    LOOKS: [mockSchedules[4]],
    FINANCE: [],
    CAREER: []
  };

  const activeAreas = Object.entries(schedulesByArea)
    .filter(([_, schedules]) => schedules.length > 0)
    .map(([area, _]) => area as GoalType);

  const totalCompleted = mockSchedules.filter(s => s.status === 'DONE').length;
  const totalTasks = mockSchedules.length;

  const renderTodayView = () => (
    <div className="space-y-6 pb-24">
      {/* Daily Summary */}
      <Card className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Today's Progress</h2>
              <p className="text-primary-foreground/80 text-sm">You're doing great!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{totalCompleted}/{totalTasks}</div>
              <div className="text-xs text-primary-foreground/80">tasks completed</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-primary-foreground/20 rounded-full h-2">
              <div 
                className="bg-primary-foreground rounded-full h-2 transition-all duration-500"
                style={{ width: `${(totalCompleted / totalTasks) * 100}%` }}
              />
            </div>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
              {Math.round((totalCompleted / totalTasks) * 100)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          What should I do now?
        </Button>
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Area Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Your Focus Areas</h3>
        <div className="grid grid-cols-1 gap-4">
          {activeAreas.map((area) => (
            <AreaCard
              key={area}
              goalType={area}
              schedules={schedulesByArea[area]}
              onClick={() => {
                // Navigate to area detail
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick Check-in */}
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="p-6 text-center">
          <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Quick Check-in</h3>
          <p className="text-sm text-muted-foreground mb-4">
            How are you feeling today? This helps us adjust your plan.
          </p>
          <Button variant="outline" size="sm">
            2-minute check-in
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderWeekView = () => (
    <div className="space-y-6 pb-24">
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Week View</h3>
        <p className="text-muted-foreground">Coming soon! Plan your entire week here.</p>
      </div>
    </div>
  );

  const renderProjectsView = () => (
    <div className="space-y-6 pb-24">
      <div className="text-center py-12">
        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Projects</h3>
        <p className="text-muted-foreground">Browse curated transformation packages.</p>
      </div>
    </div>
  );

  const renderProfileView = () => (
    <div className="space-y-6 pb-24">
      <div className="text-center py-12">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Profile</h3>
        <p className="text-muted-foreground">Manage your preferences and settings.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'today': return renderTodayView();
      case 'week': return renderWeekView();
      case 'projects': return renderProjectsView();
      case 'profile': return renderProfileView();
      default: return renderTodayView();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userName={userName} notificationCount={2} />
      
      <main className="px-6">
        {renderContent()}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

// Import the missing icons
import { Calendar, Target, User } from 'lucide-react';