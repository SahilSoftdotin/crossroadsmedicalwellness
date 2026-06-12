import { SectionHeading } from "@/components/marketing/section-heading";
import { Reveal } from "@/components/motion/motion-primitives";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export function Gallery() {
  return (
    <section className="section-y overflow-hidden">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Life, optimized"
            title="What feeling well looks like"
            description="Real energy, strength, and clarity — the everyday moments our patients reclaim through complete integrative care."
            align="center"
            className="mx-auto"
          />
        </Reveal>
      </div>

      <div className="mt-12">
        <ImageAutoSlider />
      </div>
    </section>
  );
}
