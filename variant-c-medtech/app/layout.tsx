import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thrivelongevitycenter.example"),
  title: {
    default: "THRIVE Longevity Center | Athens, AL",
    template: "%s | THRIVE Longevity Center",
  },
  description:
    "Physician-led longevity medicine in Athens, AL with Dr. Gary Adams — the Sentinel Longevity framework, advanced diagnostics, hormone optimization, medical weight loss, regenerative therapies, aesthetics, and sleep & brain health.",
  keywords: [
    "THRIVE Longevity Center",
    "Dr. Gary Adams",
    "Athens AL hormone therapy",
    "BioTE",
    "medical weight loss Athens AL",
    "functional medicine Alabama",
  ],
  openGraph: {
    title: "THRIVE Longevity Center",
    description:
      "Physician-owned integrative care blending traditional medicine with functional, root-cause approaches.",
    siteName: "THRIVE Longevity Center",
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
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
