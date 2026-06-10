import {
  Sparkles,
  Activity,
  Sun,
  Leaf,
  HeartHandshake,
  Flame,
  Flower2,
  TrendingDown,
  Infinity as InfinityIcon,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Sparkles,
  Activity,
  Sun,
  Leaf,
  HeartHandshake,
  Flame,
  Flower2,
  TrendingDown,
  Infinity: InfinityIcon,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
