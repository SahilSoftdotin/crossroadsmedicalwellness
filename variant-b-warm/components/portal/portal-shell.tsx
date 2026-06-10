"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FlaskConical,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  CalendarDays,
  UserCircle,
  Menu,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { patient } from "@/lib/data/patient";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/labs", label: "Labs", icon: FlaskConical },
  { href: "/portal/protocol", label: "Protocol", icon: ClipboardList },
  { href: "/portal/progress", label: "Progress", icon: TrendingUp },
  { href: "/portal/messages", label: "Messages", icon: MessageSquare },
  { href: "/portal/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/portal/account", label: "Account", icon: UserCircle },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1" aria-label="Portal navigation">
      {navItems.map((item) => {
        const active =
          item.href === "/portal"
            ? pathname === "/portal"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-terracotta text-primary-foreground shadow-soft"
                : "text-brown-soft hover:bg-clay/60 hover:text-terracotta-dark"
            )}
          >
            <item.icon className="h-4.5 w-4.5 h-[18px] w-[18px]" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function PortalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    document.cookie =
      "crossroads_portal_demo_auth=; path=/; max-age=0";
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <div className="container-wide flex flex-1 gap-8 py-8">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-3 px-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-light/40 font-display text-sm font-bold text-terracotta-dark">
              {patient.avatarInitials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-brown">
                {patient.fullName}
              </p>
              <p className="truncate text-xs text-brown-soft">
                {patient.plan}
              </p>
            </div>
          </div>
          <NavLinks />
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="justify-start gap-3 rounded-2xl px-4 text-sm font-semibold text-brown-soft hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Sign out
          </Button>
          <p className="rounded-2xl bg-cream-soft px-4 py-3 text-xs leading-relaxed text-brown-soft">
            Demo portal — sample data only. Not a real medical record.
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed inset-x-0 top-16 z-40 flex items-center justify-between border-b border-border bg-cream/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/portal" className="flex items-center gap-2 font-display text-sm font-bold text-brown">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          Patient Portal
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open portal menu" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm bg-cream-soft">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between font-display text-lg">
                {patient.fullName}
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              <NavLinks onNavigate={() => setOpen(false)} />
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="justify-start gap-3 rounded-2xl px-4 text-sm font-semibold text-brown-soft hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
                Sign out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1 pt-14 lg:pt-0">{children}</div>
    </div>
  );
}
