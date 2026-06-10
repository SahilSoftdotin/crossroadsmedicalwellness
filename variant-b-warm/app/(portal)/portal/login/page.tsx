"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, LogIn, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PORTAL_AUTH_COOKIE } from "@/lib/auth";

export default function PortalLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Mock auth: any email/password combination signs the demo user in.
    document.cookie = `${PORTAL_AUTH_COOKIE}=true; path=/; max-age=${60 * 60 * 24 * 7}`;
    setTimeout(() => {
      router.push("/portal");
      router.refresh();
    }, 400);
  }

  return (
    <div className="container-narrow flex flex-1 items-center py-16 sm:py-24">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-primary-foreground shadow-soft"
          >
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </Link>
          <h1 className="mt-5 font-display text-3xl font-extrabold text-brown">
            Patient Portal
          </h1>
          <p className="mt-2 text-sm text-brown-soft">
            Sign in to view your labs, protocol, and care team messages.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft-md sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full shadow-soft"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign in
              </>
            )}
          </Button>
          <div className="flex items-start gap-2 rounded-2xl bg-cream-soft p-4 text-xs leading-relaxed text-brown-soft">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" />
            <p>
              <strong className="text-brown">Demo mode:</strong> any email
              and password will sign you in to a sample patient account. No
              real accounts, PHI, or data are used.
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-brown-soft">
          <Link href="/" className="font-semibold text-terracotta-dark hover:underline">
            &larr; Back to crossroadsmedicalwellness.com
          </Link>
        </p>
      </div>
    </div>
  );
}
