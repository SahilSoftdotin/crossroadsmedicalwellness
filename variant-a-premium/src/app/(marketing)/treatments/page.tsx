import type { Metadata } from "next";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { TreatmentsTabs } from "@/components/marketing/treatments-tabs";
import { MotionBackground } from "@/components/marketing/motion-background";
import { CtaBand } from "@/components/marketing/cta-band";

export const metadata: Metadata = {
  title: "Treatments — Medicines, Supplements & Labs",
  description:
    "Explore the medicines, supplements and lab panels available through Crossroads Medical Wellness — physician-prescribed and dosed to your bloodwork.",
};

export default function TreatmentsPage() {
  return (
    <>
      <Section className="relative overflow-hidden pb-0">
        <MotionBackground soft />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow="Treatments"
            title="Everything we use to optimize your health"
            description="Browse the therapies, supplements and testing behind every Crossroads protocol. Medicines are prescribed only after a physician review of your labs and history."
          />
          <TreatmentsTabs />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
