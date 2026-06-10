import { cookies } from "next/headers";
import { PortalShell } from "@/components/portal/portal-shell";
import { PORTAL_AUTH_COOKIE } from "@/lib/auth";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get(PORTAL_AUTH_COOKIE)?.value === "true";

  // The login page is rendered without the portal shell (no sidebar/nav).
  // Authenticated routes are protected by proxy.ts, which redirects to
  // /portal/login when the demo auth cookie is missing.
  if (!isAuthed) {
    return <>{children}</>;
  }

  return <PortalShell>{children}</PortalShell>;
}
