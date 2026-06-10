import type { Metadata } from "next";
import { SectionHeading } from "@/components/marketing/section-heading";
import { AssessmentWizard } from "@/components/marketing/assessment-wizard";

export const metadata: Metadata = {
  title: "Free Health Assessment",
  description:
    "Take Crossroads Medical Wellness's free, 5-minute health assessment to help our care team recommend the right program for your goals.",
};

export default function AssessmentPage() {
  return (
    <section className="section-py">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Free Health Assessment"
          title="Let's find your starting point"
          description="This short assessment takes about 5 minutes. There's no cost and no obligation — it simply helps our care team understand your goals so we can recommend next steps."
          align="center"
          className="mx-auto"
        />
        <div className="mt-12">
          <AssessmentWizard />
        </div>
      </div>
    </section>
  );
}
