import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Patient Portal",
    template: "%s | Patient Portal | THRIVE Longevity Center",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-secondary/40">{children}</div>;
}
