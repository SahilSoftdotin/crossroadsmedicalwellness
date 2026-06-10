"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * DEMO-ONLY mock authentication.
 * No real backend, no password checks, no PHI. A signed-in "session" is just a
 * cookie flag. Any email/password is accepted. Do not use this for anything real.
 */

const SESSION_COOKIE = "crx_portal_session";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === "1";
}

export async function signIn(formData: FormData): Promise<void> {
  // Mock: accept anything. (Email is read only to feel real; not validated/stored.)
  void formData.get("email");

  const store = await cookies();
  store.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK,
  });

  redirect("/portal");
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/portal/login");
}
