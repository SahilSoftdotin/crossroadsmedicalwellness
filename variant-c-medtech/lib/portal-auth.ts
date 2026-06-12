"use client";

const SESSION_KEY = "thrive-portal-session";
const SESSION_COOKIE = "thrive_portal_session";

export type PortalSession = {
  email: string;
  signedInAt: string;
};

export function setPortalSession(email: string): void {
  if (typeof window === "undefined") return;

  const session: PortalSession = {
    email,
    signedInAt: new Date().toISOString(),
  };

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  // Also set a lightweight cookie so a server check could read it if needed.
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function getPortalSession(): PortalSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PortalSession;
  } catch {
    return null;
  }
}

export function clearPortalSession(): void {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SESSION_KEY);
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
