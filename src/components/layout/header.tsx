import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  userName?: string;
  notificationCount?: number;
}

export function Header({ userName = 'there', notificationCount = 0 }: HeaderProps) {
  const today = new Date();
  const greeting = getGreeting();

  return (
    <header className="flex items-center justify-between py-6 px-6 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Good {greeting}, {userName}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {format(today, 'EEEE, MMMM d')}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              {notificationCount}
            </Badge>
          )}
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}