"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PortalSidebar } from "./portal-sidebar";
import { cn } from "@/lib/utils";

type PortalShellProps = {
  children: React.ReactNode;
  patientName: string;
  patientInitials: string;
  patientProgram: string;
  signOutAction: () => Promise<void>;
};

function Brand() {
  return (
    <Link
      href="/portal"
      className="group inline-flex items-center gap-2.5"
      aria-label="Crossroads Patient Portal — dashboard"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--forest-700)] text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] ring-1 ring-[var(--forest-600)]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2v20M2 12h20" stroke="var(--brass-500)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.4" stroke="var(--primary-foreground)" strokeWidth="1.6" />
        </svg>
      </span>
      <span className="flex flex-col leading-none text-[var(--primary-foreground)]">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight">
          Crossroads
        </span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[var(--brass-400)]">
          Patient Portal
        </span>
      </span>
    </Link>
  );
}

function SignOutButton({
  signOutAction,
  className,
}: {
  signOutAction: () => Promise<void>;
  className?: string;
}) {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className={cn(
          "inline-flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-[var(--brass-200)] transition-colors hover:bg-[var(--forest-700)]/60 hover:text-[var(--primary-foreground)]",
          className,
        )}
      >
        <LogOut className="size-[1.15rem] shrink-0 text-[var(--forest-400)]" aria-hidden="true" />
        Sign out
      </button>
    </form>
  );
}

export function PortalShell({
  children,
  patientName,
  patientInitials,
  patientProgram,
  signOutAction,
}: PortalShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-[var(--background)] lg:grid lg:grid-cols-[17rem_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh flex-col bg-[var(--forest-900)] lg:flex">
        <div className="flex h-16 items-center border-b border-[var(--forest-700)]/60 px-5">
          <Brand />
        </div>
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-5">
          <PortalSidebar />
          <div className="mt-6 border-t border-[var(--forest-700)]/60 pt-3">
            <SignOutButton signOutAction={signOutAction} />
            <Link
              href="/"
              className="mt-1 block rounded-[var(--radius-md)] px-3 py-2 text-xs text-[var(--forest-400)] transition-colors hover:text-[var(--brass-200)]"
            >
              ← Back to main site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Portal menu">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[var(--forest-950)]/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-72 max-w-[85%] flex-col bg-[var(--forest-900)] shadow-[var(--shadow-lg)]">
            <div className="flex h-16 items-center justify-between border-b border-[var(--forest-700)]/60 px-5">
              <Brand />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--brass-200)] hover:bg-[var(--forest-700)]/60"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-5">
              <PortalSidebar onNavigate={() => setOpen(false)} />
              <div className="mt-6 border-t border-[var(--forest-700)]/60 pt-3">
                <SignOutButton signOutAction={signOutAction} />
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-[var(--radius-md)] px-3 py-2 text-xs text-[var(--forest-400)] transition-colors hover:text-[var(--brass-200)]"
                >
                  ← Back to main site
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main column */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--cream-100)]/90 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] text-[var(--foreground)] hover:bg-[var(--cream-200)] lg:hidden"
            >
              <Menu className="size-6" />
            </button>
            <p className="hidden text-sm text-[var(--muted-foreground)] sm:block">
              <span className="font-medium text-[var(--foreground)]">{patientProgram}</span> program
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              className="relative inline-flex size-10 items-center justify-center rounded-full text-[var(--charcoal-500)] transition-colors hover:bg-[var(--cream-200)] hover:text-[var(--foreground)]"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span
                className="absolute right-2 top-2 size-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--cream-100)]"
                aria-hidden="true"
              />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium leading-tight text-[var(--foreground)]">
                  {patientName}
                </p>
                <p className="text-xs leading-tight text-[var(--muted-foreground)]">Patient</p>
              </div>
              <Avatar className="size-9 ring-2 ring-[var(--brass-200)]">
                <AvatarFallback>{patientInitials}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main id="main" className="flex-1 px-4 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
