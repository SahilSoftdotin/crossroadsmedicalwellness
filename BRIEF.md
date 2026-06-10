# Crossroads Medical Wellness — Shared Build Brief

This file is the single source of truth for all three prototype variants. Every agent
building a variant MUST read this file and use this exact content/feature set so the three
builds stay consistent. Only the **visual design system** differs per variant.

---

## 1. The Customer (real data — use this, do not invent)

- **Clinic:** Crossroads Medical Wellness
- **Provider:** Dr. Gary Adams — 30+ years experience; physician-owned, integrative care
- **Positioning:** "Physician-owned integrative care blending traditional medicine with
  functional, root-cause approaches."
- **Location:** 1207 East Forrest St, Suite E, Athens, AL  *(treat exact ZIP as placeholder —
  use `Athens, AL`)*
- **Phone:** (256) 434-9301  · **Text:** (256) 608-4111 · **Email:** info@crossroadsmedicalwellness.com
- **Hours:** Mon–Thu 10am–5pm, Fri 9am–3pm  *(present cleanly; mark as illustrative)*
- **Social:** Facebook, Instagram, X (Twitter), TikTok
- **Booking model:** Appointments happen via **phone/text/contact form** — NOT real online
  scheduling. The "request appointment" and "assessment" forms are **lead capture only**
  (POST to a mock API route that logs/echoes; no real backend).

### Real services offered (these are the clinic's actual service lines)
1. **Bioidentical Hormone Therapy (BioTE)** — hormone optimization for men & women
2. **Medical Weight Loss** — GLP-1 medications (semaglutide / tirzepatide)
3. **Aesthetics** — laser hair restoration & related aesthetic treatments
4. **Regenerative & Anti-Aging Therapies**
5. **Addiction Therapy** — specialized treatment services

---

## 2. What we are copying (conceptually) from gethealthspan.com

Healthspan is a digital longevity clinic (Next.js + Strapi). We are NOT copying their code,
copy, or assets — we build original UI/content for Crossroads, **inspired by their model**:

- Premium, science-led, trustworthy brochure design with heavy whitespace
- Clear treatment catalog → individual treatment detail pages
- Themed **Programs** (bundles) rather than just à-la-carte services
- An online **health assessment / intake wizard** that funnels to consultation (lead capture)
- A patient **portal/dashboard** ("MySpan" equivalent) with labs/biomarkers, protocol
  tracking, progress, and care-team messaging
- Trust signals: star ratings, press logos, clinician credentials, patient counts, HSA/FSA note
- A research/education content library (blog)

---

## 3. Feature & page spec (build ALL of these)

### Marketing site (public)
- `/` **Home** — hero, trust bar (ratings/press/stats), services overview grid,
  how-it-works (4 steps: Assessment → Physician protocol → Treatment/delivery → Ongoing care),
  featured programs, testimonials carousel, FAQ teaser, final CTA.
- `/services` **Services index** + `/services/[slug]` **detail pages** for all 5 service lines
  (hero, what it is, who it's for, what to expect, benefits, FAQ, CTA).
- `/programs` **Programs index** + `/programs/[slug]` for themed bundles:
  **Men's Hormone Health, Women's Health (perimenopause/menopause), Medical Weight Loss,
  Longevity & Anti-Aging.**
- `/about` — Dr. Gary Adams bio, clinic philosophy, integrative approach, credentials.
- `/reviews` — testimonials grid + aggregate rating.
- `/research` (blog index) + `/research/[slug]` sample articles.
- `/faq` — categorized accordions.
- `/contact` — address, hours, phone/text/email, social, embedded map (static/iframe ok),
  contact form (lead capture → mock `/api/lead`).
- `/assessment` — **multi-step intake wizard** (goals → health basics → service interest →
  contact details → review/submit) → mock `/api/lead`. This is the key Healthspan-style funnel.
- `/get-started` or CTA buttons route into `/assessment`.

### Patient portal (demo — seed data, mock auth)
Mount under a route group, e.g. `/(portal)/portal/...`. Mock sign-in (any email/password →
sets a cookie or localStorage flag; this is a DEMO, no real PHI, no real auth backend).
Seed all data from `lib/data/`.
- `/portal/login` — mock sign-in screen.
- `/portal` (dashboard) — greeting, next appointment, current protocol summary, latest lab
  highlights, progress snapshot, quick actions.
- `/portal/labs` — biomarker results with **charts** (trend lines, in/out of range),
  grouped by system. (Use a chart lib: Recharts.)
- `/portal/protocol` — current treatment protocol: medications/supplements, dosing, schedule,
  refills, adherence tracking.
- `/portal/progress` — weight / biomarker / goal progress over time with charts.
- `/portal/messages` — mock care-team message thread.
- `/portal/appointments` — upcoming/past visits.
- `/portal/account` — profile, plan/subscription (mock), billing placeholder.

### Mock API routes (Next.js route handlers)
- `POST /api/lead` — accepts assessment/contact submissions, validates, returns success JSON.
- (Portal reads from local seed data, not APIs.)

---

## 4. Data (seed — put in `lib/data/`)
Create typed TS modules: `services.ts`, `programs.ts`, `testimonials.ts`, `faqs.ts`,
`articles.ts`, `clinic.ts` (contact/hours/social), and portal seed: `patient.ts`,
`labs.ts` (biomarker panels with values + ranges + history), `protocol.ts`, `appointments.ts`,
`messages.ts`, `progress.ts`. Make seed data realistic and consistent.

---

## 5. Tech & architecture (identical across variants)
- **Next.js (latest, App Router) + TypeScript + Tailwind CSS + shadcn/ui + Recharts + lucide-react.**
- Strict TS. ESLint. Clean component boundaries: `components/ui` (shadcn),
  `components/marketing`, `components/portal`, `lib/` (data + utils).
- **Design tokens drive the theme** — define palette/typography/radii as CSS variables in
  `globals.css` + Tailwind theme, so the look is centralized and swappable. This is what makes
  the variants differ and keeps things maintainable.
- Responsive (mobile-first), accessible (WCAG AA: semantic HTML, focus states, alt text,
  color contrast), SEO basics (metadata, titles), fast (next/image, fonts via next/font).
- Each variant is a **standalone deployable app**: `npm run dev`, `npm run build`, Vercel-ready.
  Include a short `README.md` in the variant root (run + deploy steps) and `.gitignore`.
- All copy is original marketing copy written for Crossroads. No Lorem ipsum in hero/primary
  sections; concise placeholder is ok deep in articles.

## 6. Quality bar
- Use the **ui-ux-pro-max** skill (and ui-styling/frontend-design as helpful) to plan layout,
  spacing, type scale, color system, and component states before building.
- Polished, production-feeling marketing pages; cohesive design system; consistent spacing
  scale; real interaction states (hover/focus/active); tasteful motion is fine but optional.
- It must `npm run build` cleanly.
