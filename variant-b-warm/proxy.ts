import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PORTAL_AUTH_COOKIE } from "@/lib/auth";

// Mock auth gate for the demo patient portal. Redirects unauthenticated
// visitors to /portal/login, and signed-in demo users away from /login.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = request.cookies.get(PORTAL_AUTH_COOKIE)?.value === "true";
  const isLoginPage = pathname === "/portal/login";

  if (!isAuthed && pathname.startsWith("/portal") && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/login";
    return NextResponse.redirect(url);
  }

  if (isAuthed && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
