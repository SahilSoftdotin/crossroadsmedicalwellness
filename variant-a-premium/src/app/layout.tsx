import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_URL = "https://crossroadsmedicalwellness.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crossroads Medical Wellness — Physician-Owned Integrative Care",
    template: "%s · Crossroads Medical Wellness",
  },
  description:
    "Physician-owned integrative medicine in Athens, AL. Dr. Gary Adams blends traditional medicine with functional, root-cause care — hormone therapy, medical weight loss, regenerative medicine, aesthetics and more.",
  keywords: [
    "integrative medicine Athens AL",
    "bioidentical hormone therapy",
    "BioTE",
    "medical weight loss",
    "GLP-1",
    "functional medicine",
    "regenerative medicine",
  ],
  authors: [{ name: "Crossroads Medical Wellness" }],
  openGraph: {
    type: "website",
    title: "Crossroads Medical Wellness — Physician-Owned Integrative Care",
    description:
      "Root-cause, physician-led care for hormones, weight, longevity and more. Athens, AL.",
    siteName: "Crossroads Medical Wellness",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crossroads Medical Wellness",
    description: "Physician-owned integrative care in Athens, AL.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
