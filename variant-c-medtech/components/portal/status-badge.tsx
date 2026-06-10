import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LabStatus } from "@/lib/data/labs";

const statusConfig: Record<LabStatus, { label: string; className: string }> = {
  "in-range": {
    label: "Optimal",
    className: "bg-success/15 text-success",
  },
  borderline: {
    label: "Borderline",
    className: "bg-warning/20 text-warning-foreground",
  },
  low: {
    label: "Below range",
    className: "bg-destructive/10 text-destructive",
  },
  high: {
    label: "Above range",
    className: "bg-destructive/10 text-destructive",
  },
};

export function LabStatusBadge({ status, className }: { status: LabStatus; className?: string }) {
  const config = statusConfig[status];
  return <Badge className={cn(config.className, className)}>{config.label}</Badge>;
}
