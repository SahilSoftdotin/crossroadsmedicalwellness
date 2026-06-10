import {
  Activity,
  Scale,
  Sparkles,
  RefreshCw,
  LifeBuoy,
  User,
  UserRound,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  scale: Scale,
  sparkles: Sparkles,
  "refresh-cw": RefreshCw,
  "life-buoy": LifeBuoy,
  user: User,
  "user-round": UserRound,
  infinity: InfinityIcon,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Activity;
}
