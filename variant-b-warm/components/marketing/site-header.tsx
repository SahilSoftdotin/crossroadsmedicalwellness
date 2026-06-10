"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { clinic } from "@/lib/data/clinic";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/70">
      <div className="container-wide flex h-18 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-brown"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            Crossroads
            <span className="block text-xs font-semibold tracking-[0.2em] text-sage-dark">
              MEDICAL WELLNESS
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-clay/60 hover:text-terracotta-dark",
                  active ? "bg-clay text-terracotta-dark" : "text-brown-soft"
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={clinic.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-brown-soft hover:text-terracotta"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {clinic.phone}
          </a>
          <Button asChild className="rounded-full shadow-soft">
            <Link href="/assessment">Start Your Assessment</Link>
          </Button>
        </div>

        <div className="flex items-center lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-sm bg-cream-soft"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between font-display text-lg">
                  Menu
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <nav
                className="mt-2 flex flex-col gap-1 px-4"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base font-semibold text-brown hover:bg-clay/60",
                      (pathname === link.href ||
                        pathname.startsWith(link.href + "/")) &&
                        "bg-clay text-terracotta-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-3 px-4">
                  <a
                    href={clinic.phoneHref}
                    className="flex items-center gap-2 text-sm font-semibold text-brown-soft"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {clinic.phone}
                  </a>
                  <Button
                    asChild
                    className="w-full rounded-full shadow-soft"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/assessment">Start Your Assessment</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
