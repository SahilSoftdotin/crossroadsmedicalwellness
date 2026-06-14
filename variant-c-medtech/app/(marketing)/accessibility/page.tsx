import type { Metadata } from "next";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "THRIVE Longevity Center is committed to digital accessibility and conformance with WCAG 2.1 Level AA. Learn how to request accommodations.",
};

const lastUpdated = "June 2026";

export default function AccessibilityPage() {
  return (
    <article className="container-page section-y max-w-3xl">
      <header>
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">Accessibility</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Accessibility Statement
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </header>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground">
        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Our commitment</h2>
          <p className="mt-3">
            THRIVE Longevity Center is committed to ensuring digital accessibility for people with
            disabilities. We are continually improving the user experience for everyone and applying
            the relevant accessibility standards so that the information and services on this website
            are available to the widest possible audience, regardless of ability or technology.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Conformance status</h2>
          <p className="mt-3">
            We aim to conform to the{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </a>
            . These guidelines explain how to make web content more accessible for people with a wide
            range of disabilities. This website is also designed to support the accessibility
            expectations of the Americans with Disabilities Act (ADA) and Section 508.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">
            Measures we have taken
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-accent">
            <li>Semantic HTML structure with logical heading order and landmark regions.</li>
            <li>A &ldquo;Skip to main content&rdquo; link for keyboard and screen-reader users.</li>
            <li>Visible keyboard focus indicators throughout the site.</li>
            <li>Text alternatives and accessible names for icons, images, and controls.</li>
            <li>Form fields with associated labels and clear error messaging.</li>
            <li>Color contrast tuned to meet AA contrast ratios.</li>
            <li>
              Full support for the <code>prefers-reduced-motion</code> setting — animations are
              minimized for users who request reduced motion.
            </li>
            <li>Responsive layouts that support zoom and reflow on small screens.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Ongoing effort</h2>
          <p className="mt-3">
            Accessibility is an ongoing effort. We regularly review the site and welcome feedback. If
            you encounter any barrier or have a suggestion, please let us know — we treat accessibility
            issues as a priority.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">
            Requesting accommodations or reporting a barrier
          </h2>
          <p className="mt-3">
            If you need information from this website in an alternative format, or you experience
            difficulty accessing any part of it, contact us and we will work with you to provide the
            information or service you need:
          </p>
          <ul className="mt-3 space-y-1">
            <li>
              Phone:{" "}
              <a href={clinic.phoneHref} className="font-medium text-accent underline-offset-4 hover:underline">
                {clinic.phone}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={clinic.emailHref} className="font-medium text-accent underline-offset-4 hover:underline">
                {clinic.email}
              </a>
            </li>
            <li>Address: {clinic.address.full}</li>
          </ul>
          <p className="mt-3">
            We aim to respond to accessibility feedback within a reasonable timeframe.
          </p>
        </section>

        <p className="rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          This statement should be reviewed and finalized with your compliance team or legal counsel
          before launch to confirm response timeframes and accommodation procedures.
        </p>
      </div>
    </article>
  );
}
