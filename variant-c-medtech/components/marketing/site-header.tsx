"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clinic } from "@/lib/data/clinic";
import { PageEntrance } from "@/components/motion/page-entrance";

const navLinks = [
  { href: "/pricing", label: "Programs & Pricing" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-border/80 bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_-12px_rgb(13_31_60_/_0.18)]"
          : "border-transparent bg-background/40 backdrop-blur-md"
      )}
    >
      <PageEntrance className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="THRIVE Longevity Center — go to homepage"
          className="flex items-center gap-2.5"
          onClick={(e) => {
            setOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            src="/thrive-logo.png"
            alt=""
            width={120}
            height={120}
            priority
            className="h-12 w-auto sm:h-14"
          />
          <span className="leading-tight font-display text-lg font-semibold tracking-tight text-primary">
            THRIVE
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Longevity Center
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  active ? "text-primary" : "text-muted-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://www.gethealthie.com/" target="_blank" rel="noopener noreferrer">Patient Portal</a>
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/assessment">
              Get Started
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </PageEntrance>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile navigation" className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="outline" asChild>
                <a
                  href="https://www.gethealthie.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Patient Portal
                </a>
              </Button>
              <Button asChild>
                <Link href="/assessment" onClick={() => setOpen(false)}>
                  Get Started
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <a
                href={clinic.phoneHref}
                className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground"
              >
                <Phone className="size-4" />
                {clinic.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
