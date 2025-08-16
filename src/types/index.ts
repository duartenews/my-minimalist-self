export type GoalType = 'BODY' | 'FOOD' | 'SLEEP' | 'HOME' | 'LOOKS' | 'FINANCE' | 'CAREER';

export type Frequency = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

export type ScheduleStatus = 'PENDING' | 'DONE' | 'SKIPPED' | 'MOVED';

export interface Goal {
  id: string;
  type: GoalType;
  title: string;
  priority: number; // 0-10
  active: boolean;
  startAt: Date;
  endAt?: Date;
  color: string;
}

export interface Task {
  id: string;
  goalId?: string;
  title: string;
  frequency: Frequency;
  duration: number; // minutes
  anchor: boolean;
  why?: string;
  preferredWindow: 'morning' | 'evening' | 'any';
}

export interface Schedule {
  id: string;
  taskId: string;
  task: Task;
  date: Date;
  start?: string;
  end?: string;
  status: ScheduleStatus;
}

export interface UserProfile {
  id: string;
  firstName?: string;
  timezone: string;
  intensity: 1 | 2 | 3; // min, mod, aggressive
  weeklyMinutes: number;
  locale: 'en-US' | 'pt-BR';
  availabilities: Availability[];
}

export interface Availability {
  dayOfWeek: number; // 0-6
  windows: string[]; // ["07:00-09:00", "20:00-22:00"]
}

export interface Checkin {
  id: string;
  date: Date;
  energy?: number; // 1-5
  sleep?: number; // 1-5
  stress?: number; // 1-5
  note?: string;
}

export const GOAL_TYPE_LABELS = {
  BODY: 'Body & Health',
  FOOD: 'Nutrition',
  SLEEP: 'Sleep',
  HOME: 'Home & Organization',
  LOOKS: 'Appearance & Self-Care',
  FINANCE: 'Personal Finance',
  CAREER: 'Career & Focus'
} as const;

export const GOAL_TYPE_GRADIENTS = {
  BODY: 'gradient-body',
  FOOD: 'gradient-food',
  SLEEP: 'gradient-sleep',
  HOME: 'gradient-home',
  LOOKS: 'gradient-looks',
  FINANCE: 'gradient-finance',
  CAREER: 'gradient-career'
} as const;