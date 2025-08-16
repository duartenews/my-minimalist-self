import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOAL_TYPE_GRADIENTS, GOAL_TYPE_LABELS, GoalType, Schedule } from '@/types';

interface AreaCardProps {
  goalType: GoalType;
  schedules: Schedule[];
  onClick?: () => void;
  onQuickComplete?: (scheduleId: string) => void; // +++
  className?: string;
}

export function AreaCard({ goalType, schedules, onClick, onQuickComplete, className }: AreaCardProps) {
  const completedCount = schedules.filter(s => s.status === 'DONE').length;
  const totalCount = schedules.length;
  const gradientClass = GOAL_TYPE_GRADIENTS[goalType];
  const label = GOAL_TYPE_LABELS[goalType];

  const nextTask = schedules.find(s => s.status === 'PENDING');

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1",
        "border-0 shadow-card overflow-hidden",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className={cn("pb-2", gradientClass)}>
        <div className="flex items-center justify-between text-white">
          <h3 className="font-semibold text-sm">{label}</h3>
          <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
            {completedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-3">
        {nextTask ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Circle className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {nextTask.task.title}
                </p>
                {nextTask.task.duration && (
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {nextTask.task.duration}min
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="w-full justify-start text-xs h-8"
              onClick={(e) => {
                e.stopPropagation();
                if (nextTask && onQuickComplete) onQuickComplete(nextTask.id); // +++ chama o pai
              }}
            >
              <CheckCircle2 className="w-3 h-3 mr-2" />
              Mark Complete
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All done for today!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}