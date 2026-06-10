import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </SmoothScrollProvider>
  );
}
