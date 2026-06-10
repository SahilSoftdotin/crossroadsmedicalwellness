import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--forest-100)] text-[var(--forest-800)]",
        accent: "border-transparent bg-[var(--brass-200)] text-[var(--brass-700)]",
        outline: "border-[var(--border-strong)] text-[var(--muted-foreground)]",
        success: "border-transparent bg-[var(--forest-100)] text-[var(--success)]",
        warning: "border-transparent bg-[#f6ecd9] text-[var(--warning)]",
        danger: "border-transparent bg-[#f6e2df] text-[var(--danger)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
