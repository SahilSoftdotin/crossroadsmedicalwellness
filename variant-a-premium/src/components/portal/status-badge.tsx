import { Badge } from "@/components/ui/badge";
import { type LabStatus, labStatusLabel } from "@/lib/data/labs";

const statusVariant: Record<LabStatus, "success" | "default" | "warning" | "danger"> = {
  optimal: "success",
  "in-range": "default",
  borderline: "warning",
  "out-of-range": "danger",
};

export function LabStatusBadge({ status }: { status: LabStatus }) {
  return (
    <Badge variant={statusVariant[status]}>
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-current opacity-70"
      />
      {labStatusLabel[status]}
    </Badge>
  );
}
