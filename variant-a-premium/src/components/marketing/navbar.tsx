"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/data/nav";
import { clinic } from "@/lib/data/clinic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--cream-100)]/85 backdrop-blur-md">
      {/* Utility bar */}
      <div className="hidden border-b border-[var(--border)]/70 bg-[var(--forest-800)] text-[var(--primary-foreground)] md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="text-[var(--brass-200)]">
            Physician-owned integrative care · Athens, AL
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${clinic.phone.replace(/[^\d]/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-[var(--brass-400)]">
              <Phone className="size-3.5" aria-hidden="true" />
              {clinic.phone}
            </a>
            <Link href="/portal/login" className="hover:text-[var(--brass-400)]">
              Patient Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Primary">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-[var(--primary)]"
                      : "text-[var(--charcoal-700)] hover:text-[var(--primary)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="primary" size="sm">
            <Link href="/assessment">Start Assessment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] text-[var(--foreground)] hover:bg-[var(--cream-200)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div id="mobile-menu" className="border-t border-[var(--border)] bg-[var(--cream-50)] lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-[var(--radius-md)] px-3 py-3 text-base font-medium",
                      active ? "bg-[var(--forest-100)] text-[var(--primary)]" : "text-[var(--charcoal-700)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 flex flex-col gap-2 px-1 pb-2">
              <Button asChild variant="primary" className="w-full">
                <Link href="/assessment" onClick={() => setOpen(false)}>
                  Start Assessment
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/portal/login" onClick={() => setOpen(false)}>
                  Patient Portal
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
