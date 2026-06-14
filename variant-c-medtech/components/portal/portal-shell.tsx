"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  MessageSquare,
  TrendingUp,
  User,
  X,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { clearPortalSession, getPortalSession } from "@/lib/portal-auth";
import { patient } from "@/lib/data/patient";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/portal/labs", label: "Labs", icon: FlaskConical },
  { href: "/portal/protocol", label: "Protocol", icon: ListChecks },
  { href: "/portal/progress", label: "Progress", icon: TrendingUp },
  { href: "/portal/messages", label: "Messages", icon: MessageSquare },
  { href: "/portal/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/portal/account", label: "Account", icon: User },
];

export function PortalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Mock auth guard: redirect to login if there's no demo session. This is a
  // side effect on the router (an external system), not a plain setState.
  useEffect(() => {
    if (!getPortalSession()) {
      router.replace("/portal/login");
    }
  }, [router, pathname]);

  // Close the mobile nav whenever the route changes, without a dedicated
  // effect (avoids cascading setState-in-effect renders).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (mobileNavOpen) setMobileNavOpen(false);
  }

  function handleSignOut() {
    clearPortalSession();
    router.push("/portal/login");
  }

  return (
    <div className="lg:flex lg:min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <SidebarContent pathname={pathname} onSignOut={handleSignOut} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-sidebar px-4 py-3 text-sidebar-foreground lg:hidden">
        <Link href="/portal" className="flex items-center gap-2 font-display text-base font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Activity className="size-4" aria-hidden="true" />
          </span>
          THRIVE
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-sidebar-border text-sidebar-foreground"
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileNavOpen}
        >
          {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="border-b border-sidebar-border bg-sidebar text-sidebar-foreground lg:hidden">
          <SidebarContent pathname={pathname} onSignOut={handleSignOut} mobile />
        </div>
      )}

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="hidden items-center justify-between border-b border-border bg-card px-8 py-4 lg:flex">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {patient.programName}
            </p>
            <h1 className="font-display text-lg font-semibold text-primary">
              Welcome back, {patient.firstName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{patient.fullName}</p>
              <p className="text-xs text-muted-foreground">{patient.email}</p>
            </div>
            <Avatar size="lg">
              <AvatarFallback className="bg-primary-soft font-display font-semibold text-primary">
                {patient.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  onSignOut,
  mobile = false,
}: {
  pathname: string | null;
  onSignOut: () => void;
  mobile?: boolean;
}) {
  return (
    <div className={cn("flex flex-1 flex-col", mobile ? "px-4 pb-4" : "px-4 py-6")}>
      {!mobile && (
        <Link href="/portal" className="mb-8 flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Activity className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            THRIVE
            <span className="block text-xs font-medium tracking-[0.2em] text-sidebar-foreground/60 uppercase">
              Patient Portal
            </span>
          </span>
        </Link>
      )}

      <nav aria-label="Portal navigation" className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <item.icon className="size-4.5 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-3 border-t border-sidebar-border pt-4">
        <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/40 px-3 py-2.5">
          <Avatar>
            <AvatarFallback className="bg-sidebar-primary font-display text-sm font-semibold text-sidebar-primary-foreground">
              {patient.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{patient.fullName}</p>
            <p className="truncate text-xs text-sidebar-foreground/60">{patient.plan.name}</p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-3 border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          onClick={onSignOut}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </Button>
        <Link
          href="/"
          className="block text-center text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
        >
          Back to thrivelongevitycenter.org
        </Link>
      </div>
    </div>
  );
}
