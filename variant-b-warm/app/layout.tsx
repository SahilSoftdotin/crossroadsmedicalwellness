import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Toaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crossroadsmedicalwellness.example"),
  title: {
    default: "Crossroads Medical Wellness | Athens, AL",
    template: "%s | Crossroads Medical Wellness",
  },
  description:
    "Physician-owned integrative care in Athens, AL. Bioidentical hormone therapy, medical weight loss, aesthetics, regenerative medicine, and addiction therapy with Dr. Gary Adams.",
  keywords: [
    "Crossroads Medical Wellness",
    "Dr. Gary Adams",
    "Athens AL hormone therapy",
    "BioTE",
    "medical weight loss Athens AL",
    "integrative medicine Alabama",
  ],
  openGraph: {
    title: "Crossroads Medical Wellness | Athens, AL",
    description:
      "Physician-owned integrative care blending traditional medicine with functional, root-cause approaches.",
    siteName: "Crossroads Medical Wellness",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
