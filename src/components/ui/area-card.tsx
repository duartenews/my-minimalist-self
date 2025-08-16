import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOAL_TYPE_GRADIENTS, GOAL_TYPE_LABELS, GoalType, Schedule } from '@/types';

interface AreaCardProps {
  goalType: GoalType;
  schedules: Schedule[];
  onClick?: () => void;
  onQuickComplete?: (scheduleId: string) => void; // << NOVO
  className?: string;
}

export function AreaCard({ goalType, schedules, onQuickComplete, className }: AreaCardProps) {
  const completedCount = schedules.filter(s => s.status === 'DONE').length;
  const totalCount = schedules.length;
  const label = GOAL_TYPE_LABELS[goalType];
  const nextTask = schedules.find(s => s.status === 'PENDING');

  return (
    <Card className={cn("border rounded-2xl", className)}>
      {/* linha de acento fina no topo */}
      <div className={cn("h-1 w-full", GOAL_TYPE_GRADIENTS[goalType])} />

      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{label}</h3>
          <Badge variant="outline" className="text-xs">
            {completedCount}/{totalCount}
          </Badge>
        </div>

        {nextTask ? (
          <div className="flex items-center gap-3">
            <Checkbox
              aria-label="Mark complete"
              onCheckedChange={(checked) => {
                if (checked && onQuickComplete) onQuickComplete(nextTask.id);
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{nextTask.task.title}</p>
              {nextTask.task.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {nextTask.task.duration}min
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-success" /> All done for today!
          </div>
        )}
      </CardContent>
    </Card>
  );
}