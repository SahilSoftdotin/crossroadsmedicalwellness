import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Patient Dashboard — Coming Soon",
  robots: { index: false, follow: false },
};

// The patient dashboard is being built. Until it launches, every /portal route
// redirects to the Coming Soon page. (The demo portal code is kept for later.)
export default function PortalLayout() {
  redirect("/coming-soon");
}
