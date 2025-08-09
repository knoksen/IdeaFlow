import {
  type LucideIcon,
  ListChecks,
  Hourglass,
  CheckCircle2,
  PauseCircle,
  Lightbulb,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  planned: ListChecks,
  inProgress: Hourglass,
  completed: CheckCircle2,
  onHold: PauseCircle,
  logo: Lightbulb,
};
