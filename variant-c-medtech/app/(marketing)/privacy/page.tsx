import type { Metadata } from "next";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Privacy Policy & Notice of Privacy Practices",
  description:
    "How THRIVE Longevity Center collects, uses, and protects your information, including your rights regarding protected health information (PHI) under HIPAA.",
};

const lastUpdated = "June 2026";

/**
 * SCAFFOLD — standard HIPAA Notice of Privacy Practices + website Privacy Policy
 * structure. Blocks marked [REVIEW] must be completed/confirmed with the
 * practice's compliance officer and legal counsel before going live. This is
 * not legal advice.
 */
export default function PrivacyPage() {
  return (
    <article className="container-page section-y max-w-3xl">
      <header>
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">Privacy</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Privacy Policy &amp; Notice of Privacy Practices
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Effective date: {lastUpdated}</p>
      </header>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-foreground">
        <p className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-foreground">
          <strong>Notice:</strong> This page is a working scaffold. Sections marked{" "}
          <span className="font-mono text-xs">[REVIEW]</span> must be completed and approved by the
          practice&rsquo;s Privacy Officer and legal counsel before publication. It does not
          constitute legal advice.
        </p>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Introduction</h2>
          <p className="mt-3">
            This notice describes how medical information about you may be used and disclosed and how
            you can get access to this information. <strong>Please review it carefully.</strong>{" "}
            {clinic.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
            protecting the privacy and security of your information, including protected health
            information (PHI) governed by the Health Insurance Portability and Accountability Act
            (HIPAA).
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">
            Information we collect on this website
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-accent">
            <li>
              <strong>Information you provide</strong> through forms (for example, the health
              assessment, contact, and appointment-request forms): your name, email, phone, preferred
              contact method, health goals, and any details you choose to share.
            </li>
            <li>
              <strong>Limited technical data</strong> required to operate and secure the site. This
              site does not load third-party advertising or analytics trackers. [REVIEW: confirm no
              tracking technologies are added later without a HIPAA review.]
            </li>
          </ul>
          <p className="mt-3">
            Please do not include sensitive medical details in free-text fields unless necessary. For
            urgent or detailed clinical matters, contact the office directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">
            How we use and disclose health information
          </h2>
          <p className="mt-3">
            We may use and disclose your PHI for treatment, payment, and health care operations as
            permitted by HIPAA, and as otherwise authorized or required by law. [REVIEW: complete the
            full list of permitted uses and disclosures with counsel — e.g., appointment reminders,
            treatment alternatives, required public-health reporting.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Your rights</h2>
          <p className="mt-3">Under HIPAA, you generally have the right to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-accent">
            <li>Inspect and obtain a copy of your health information.</li>
            <li>Request a correction or amendment to your health information.</li>
            <li>Request an accounting of certain disclosures.</li>
            <li>Request restrictions on certain uses and disclosures.</li>
            <li>Request confidential communications by alternative means or location.</li>
            <li>Obtain a paper copy of this notice on request.</li>
            <li>Be notified following a breach of unsecured PHI.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">How we protect your data</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-accent">
            <li>Encryption of data in transit (HTTPS/TLS) across the site.</li>
            <li>Security headers and a strict content-security policy that blocks third-party trackers.</li>
            <li>Access controls and the patient portal protected behind authentication. [REVIEW]</li>
            <li>Business Associate Agreements (BAAs) with vendors handling PHI. [REVIEW]</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Complaints</h2>
          <p className="mt-3">
            If you believe your privacy rights have been violated, you may file a complaint with us
            using the contact information below, or with the U.S. Department of Health and Human
            Services, Office for Civil Rights. We will not retaliate against you for filing a
            complaint.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-primary">Contact &amp; Privacy Officer</h2>
          <ul className="mt-3 space-y-1">
            <li>Privacy Officer: [REVIEW — name / title]</li>
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
        </section>
      </div>
    </article>
  );
}
