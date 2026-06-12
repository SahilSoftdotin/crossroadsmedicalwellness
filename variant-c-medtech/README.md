# Crossroads Medical Wellness

Marketing website and demo patient portal for **Crossroads Medical Wellness** —
a physician-owned integrative wellness clinic (Dr. Gary Adams, Athens, AL).

## Tech stack

- **Next.js** (App Router) · **TypeScript** · **Tailwind CSS** · **shadcn/ui**
- **Framer Motion**, **Lenis** (smooth scroll), **GSAP** for motion
- **Recharts** for the portal data visualizations

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `app/(marketing)/` — public site: home, services (+ detail), programs, about,
  reviews, research, FAQ, contact, and the health-assessment intake.
- `app/(portal)/` — demo patient portal (dashboard, labs, protocol, progress,
  messages, appointments, account).
- `components/` — UI primitives, marketing sections, and motion helpers.
- `lib/data/` — site content and seed data.

## Notes

The patient portal is a demonstration experience using seed data. Production
hardening (authentication, database, payments, and integrations) is handled
separately.
