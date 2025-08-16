import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Home, Target, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: 'today' | 'week' | 'projects' | 'profile';
  onTabChange: (tab: 'today' | 'week' | 'projects' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'today' as const, label: 'Today', icon: Home },
    { id: 'week' as const, label: 'Week', icon: Calendar },
    { id: 'projects' as const, label: 'Projects', icon: Target },
    { id: 'profile' as const, label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 px-3 gap-1",
              "transition-colors duration-200",
              activeTab === id 
                ? "text-primary bg-primary/5" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onTabChange(id)}
          >
            <Icon className={cn(
              "w-5 h-5",
              activeTab === id && "text-primary"
            )} />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}