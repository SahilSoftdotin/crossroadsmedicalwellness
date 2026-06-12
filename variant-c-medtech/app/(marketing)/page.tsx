import type { Metadata } from "next";
import { Hero } from "@/components/marketing/home/hero";
import { Metrics } from "@/components/marketing/home/metrics";
import { ProgramsPricing } from "@/components/marketing/home/programs-pricing";
import { FeaturedServices } from "@/components/marketing/home/featured-services";
import { WhyChooseUs } from "@/components/marketing/home/why-choose-us";
import { MeetTheDoctor } from "@/components/marketing/home/meet-the-doctor";
import { Gallery } from "@/components/marketing/home/gallery";
import { ReviewsMarquee } from "@/components/marketing/home/reviews-marquee";
import { ProcessTimeline } from "@/components/marketing/home/process-timeline";
import { InsuranceFinancing } from "@/components/marketing/home/insurance-financing";
import { CtaSection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "THRIVE Longevity Center | Physician-Led Longevity Medicine in Athens, AL",
  description:
    "Physician-led longevity medicine with Dr. Gary Adams. The Sentinel Longevity framework — advanced diagnostics, biological-age scoring, and personalized optimization, from Baseline assessment to Executive-level programs in Athens, AL.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <ProgramsPricing />
      <FeaturedServices />
      <WhyChooseUs />
      <MeetTheDoctor />
      <Gallery />
      <ReviewsMarquee />
      <ProcessTimeline />
      <InsuranceFinancing />
      <CtaSection
        title="Ready for complete care under one roof?"
        description="Take our short health assessment or call us directly — our team will follow up to schedule your consultation with Dr. Adams."
      />
    </>
  );
}
