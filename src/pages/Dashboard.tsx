import React, { useEffect, useState } from 'react';
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
  // +++ NOVO +++
  const [schedules, setSchedules] = useState<Schedule[]>(() => mockSchedules);

  // opcional: carregar de localStorage
  useEffect(() => {
    const raw = localStorage.getItem('schedules');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setSchedules(parsed as Schedule[]);
        }
      } catch {
        /* ignore parsing errors */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  function toggleSchedule(id: string) {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'DONE' ? 'PENDING' : 'DONE' } : s));
  }
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'projects' | 'profile'>('today');

  // Group schedules by goal type (mock assignment)
  const schedulesByArea: Record<GoalType, Schedule[]> = {
    BODY: schedules.filter(s => ['1','2'].includes(s.id)),
    FOOD: schedules.filter(s => s.id === '3'),
    SLEEP: [],
    HOME: schedules.filter(s => s.id === '4'),
    LOOKS: schedules.filter(s => s.id === '5'),
    FINANCE: [],
    CAREER: []
  };

  const activeAreas = Object.entries(schedulesByArea)
    .filter(([_, schedules]) => schedules.length > 0)
    .map(([area, _]) => area as GoalType);

  const totalCompleted = schedules.filter(s => s.status === 'DONE').length;
  const totalTasks = schedules.length;

  const renderTodayView = () => {
    const nextGlobal = mockSchedules.find(s => s.status === 'PENDING');

    return (
      <div className="space-y-4 pb-20">
        {/* Daily Summary (NEW – compacto) */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Good morning, {userName}</h1>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { weekday:'long', month:'long', day:'numeric' })}
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-muted">
              {totalCompleted}/{totalTasks}
            </span>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-foreground transition-all"
              style={{ width: `${(totalCompleted / Math.max(totalTasks,1)) * 100}%` }}
            />
          </div>
        </div>

        <Button variant="secondary" size="sm" className="w-full">
          {nextGlobal ? `Do now: ${nextGlobal.task.title} • ${nextGlobal.task.duration}m` : 'You’re clear for now'}
        </Button>

        {/* Area Cards */}
        <div className="grid grid-cols-1 gap-3">
          {activeAreas.map((area) => (
            <AreaCard
              key={area}
              goalType={area}
              schedules={schedulesByArea[area]}
              onQuickComplete={(id) => toggleSchedule(id)}
            />
          ))}
        </div>

        {/* Quick Check-in */}
        <Card className="border-dashed">
          <CardContent className="p-4 text-center">
            <p className="text-sm font-medium mb-1">Quick Check-in</p>
            <Button variant="outline" size="sm">2-minute check-in</Button>
          </CardContent>
        </Card>
      </div>
    );
  };

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