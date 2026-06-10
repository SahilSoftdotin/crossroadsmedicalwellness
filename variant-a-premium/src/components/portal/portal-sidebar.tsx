"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TestTube,
  Pill,
  TrendingUp,
  MessageSquare,
  CalendarDays,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { portalNav, type PortalNavItem } from "@/lib/portal-nav";
import { cn } from "@/lib/utils";

const icons: Record<PortalNavItem["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  labs: TestTube,
  protocol: Pill,
  progress: TrendingUp,
  messages: MessageSquare,
  appointments: CalendarDays,
  account: UserRound,
};

export function PortalSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Portal" className="flex flex-col gap-1">
      {portalNav.map((item) => {
        const Icon = icons[item.icon];
        const active =
          item.href === "/portal"
            ? pathname === "/portal"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-[var(--forest-700)] text-[var(--primary-foreground)] shadow-[var(--shadow-sm)]"
                : "text-[var(--brass-200)] hover:bg-[var(--forest-700)]/60 hover:text-[var(--primary-foreground)]",
            )}
          >
            <Icon
              className={cn(
                "size-[1.15rem] shrink-0 transition-colors",
                active ? "text-[var(--brass-400)]" : "text-[var(--forest-400)] group-hover:text-[var(--brass-400)]",
              )}
              aria-hidden="true"
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
