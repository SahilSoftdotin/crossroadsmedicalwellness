"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>
      {pending ? "Signing in…" : "Sign in to portal"}
    </Button>
  );
}

export function LoginForm({ signInAction }: { signInAction: (formData: FormData) => Promise<void> }) {
  const [email, setEmail] = useState("jordan.avery@example.com");
  const [password, setPassword] = useState("demo1234");

  return (
    <form action={signInAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <span className="text-xs text-[var(--muted-foreground)]">Forgot?</span>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <SubmitButton />

      <p className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--forest-100)] px-3 py-2.5 text-center text-xs text-[var(--forest-800)]">
        <Mail className="size-3.5 shrink-0" aria-hidden="true" />
        Demo portal — any email & password works. Credentials are pre-filled.
      </p>
    </form>
  );
}
