import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import {
  ScrollProgressBar,
  ScrollToTop,
  SmoothAnchors,
} from "@/components/motion/scroll-ui";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgressBar />
      <CursorSpotlight />
      <SmoothAnchors />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </SmoothScrollProvider>
  );
}
