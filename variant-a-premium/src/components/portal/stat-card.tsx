import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  sublabel,
  icon,
  accent = "forest",
}: {
  label: string;
  value: React.ReactNode;
  sublabel?: React.ReactNode;
  icon?: React.ReactNode;
  accent?: "forest" | "brass" | "success" | "warning";
}) {
  const ring: Record<string, string> = {
    forest: "bg-[var(--forest-100)] text-[var(--forest-700)]",
    brass: "bg-[var(--brass-200)] text-[var(--brass-700)]",
    success: "bg-[var(--forest-100)] text-[var(--success)]",
    warning: "bg-[#f6ecd9] text-[var(--warning)]",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
            {label}
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold leading-none text-[var(--foreground)]">
            {value}
          </p>
          {sublabel ? (
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">{sublabel}</p>
          ) : null}
        </div>
        {icon ? (
          <span className={cn("grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)]", ring[accent])}>
            {icon}
          </span>
        ) : null}
      </div>
    </Card>
  );
}
