import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Portal",
  description: "Secure demo patient portal for Crossroads Medical Wellness.",
  robots: { index: false, follow: false },
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-[var(--primary-foreground)]"
      >
        Skip to content
      </a>
      {children}
    </>
  );
}
