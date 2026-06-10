# Crossroads Medical Wellness — Website Prototypes

Three independent prototype variants of a Healthspan-style website for **Crossroads Medical
Wellness** (Dr. Gary Adams, Athens, AL). Each is a standalone, deployable Next.js app with the
**same features and content** (see [`BRIEF.md`](./BRIEF.md)) but a **distinct design system**.

After comparing the three, we promote the chosen direction to a production-grade build.

## Variants

| Folder | Direction | Palette | Type | Notes |
|---|---|---|---|---|
| [`variant-a-premium/`](./variant-a-premium) | **Clinical Premium** | Forest green · cream · gold | Serif display + sans body | **Flagship — full Healthspan feature set, deepest polish** |
| [`variant-b-warm/`](./variant-b-warm) | **Warm Wellness** | Terracotta · sage · cream | Friendly rounded sans | Approachable, spa-like |
| [`variant-c-medtech/`](./variant-c-medtech) | **Modern Med-Tech** | Navy · bright teal | Geometric sans | Data-forward, dashboard-native |

## Stack (all variants)

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Recharts · lucide-react.
Design-token-driven theming, responsive, accessible (WCAG AA), SEO basics, Vercel-ready.

## Run a variant

```bash
cd variant-a-premium   # or variant-b-warm / variant-c-medtech
npm install
npm run dev            # http://localhost:3000
npm run build          # production build
```

## Scope notes

- **Marketing site:** home, services (+detail), programs (+detail), about, reviews, research
  (blog), FAQ, contact, and a multi-step **health-assessment intake wizard** (lead capture).
- **Patient portal (demo):** mock sign-in + dashboard, labs/biomarkers (charts), protocol,
  progress, messages, appointments, account — all seeded data, **no real PHI / no real auth**.
- Booking is **phone/text/contact-form** (lead capture to a mock API). Not a real scheduler.

This is a **prototype**. Production hardening (real auth, database, HIPAA/PHI handling,
payments, lab integrations, e-prescribing, CMS) is a separate later phase.

## Deployment & CI

Repo: https://github.com/SahilSoftdotin/crossroadsmedicalwellness

Each variant is its own Vercel project, connected to this repo with its **Root Directory**
set to the variant folder. Pushes to `main` trigger an automatic production deployment of
each project.

| Variant | Vercel project | Root Directory |
|---|---|---|
| A · Premium | `variant-a-premium` | `variant-a-premium` |
| B · Warm | `variant-b-warm` | `variant-b-warm` |
| C · Med-Tech | `variant-c-medtech` | `variant-c-medtech` |
