import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import {
  ScrollProgressBar,
  ScrollToTop,
  SmoothAnchors,
} from "@/components/motion/scroll-ui";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { ChatWidget } from "@/components/chatbot/chat-widget";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {/* WCAG 2.4.1 — bypass blocks: visible-on-focus skip link */}
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <ScrollProgressBar />
      <CursorSpotlight />
      <SmoothAnchors />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <ScrollToTop />
      <ChatWidget />
    </SmoothScrollProvider>
  );
}
