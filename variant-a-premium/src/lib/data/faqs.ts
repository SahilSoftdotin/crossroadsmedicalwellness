export type FAQ = { question: string; answer: string };
export type FAQCategory = { category: string; items: FAQ[] };

export const faqCategories: FAQCategory[] = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I become a patient?",
        answer:
          "Start by completing our online health assessment or reaching out by phone, text or our contact form. We'll schedule an initial consultation with Dr. Adams to review your goals and design a plan. Note: appointments are arranged by phone, text or form — we don't offer real-time online scheduling.",
      },
      {
        question: "Do I need a referral?",
        answer:
          "No referral is required. You can reach out to us directly to get started.",
      },
      {
        question: "What happens at the first visit?",
        answer:
          "Your first visit is a thorough conversation about your symptoms, history and goals, usually paired with comprehensive lab work. From there, Dr. Adams builds an individualized, root-cause plan.",
      },
    ],
  },
  {
    category: "Our Approach",
    items: [
      {
        question: "What does 'integrative medicine' mean?",
        answer:
          "Integrative medicine blends conventional, evidence-based medicine with functional, root-cause approaches. Rather than only managing symptoms, we look at hormones, metabolism, nutrition, sleep and lifestyle to understand why you feel the way you do — and treat that.",
      },
      {
        question: "Is this 'alternative' medicine?",
        answer:
          "No. Crossroads is physician-owned and led by Dr. Gary Adams, a physician with 30+ years of experience. We practice real, evidence-informed medicine — we simply take the time to address root causes alongside conventional care.",
      },
      {
        question: "Will you work with my other doctors?",
        answer:
          "Yes. We're happy to coordinate with your existing providers as part of your overall care.",
      },
    ],
  },
  {
    category: "Treatments & Programs",
    items: [
      {
        question: "Which services do you offer?",
        answer:
          "We offer bioidentical hormone therapy (BioTE), medical weight loss with GLP-1 medications, aesthetics including laser hair restoration, regenerative and anti-aging therapies, and specialized addiction therapy. These can also be combined into structured programs.",
      },
      {
        question: "What's the difference between a service and a program?",
        answer:
          "A service is a specific treatment (like hormone therapy). A program is a structured, goal-oriented bundle — such as Men's Hormone Health or Longevity & Anti-Aging — that combines testing, treatment and ongoing care around a specific outcome.",
      },
      {
        question: "How are protocols personalized?",
        answer:
          "Every protocol begins with comprehensive lab work and a physician consultation. Dr. Adams interprets your results in the context of your symptoms and goals, then doses and adjusts based on follow-up testing — never a one-size-fits-all template.",
      },
    ],
  },
  {
    category: "Billing & Logistics",
    items: [
      {
        question: "Do you take insurance?",
        answer:
          "Many of our integrative and wellness services are offered on a self-pay basis. HSA and FSA funds can often be used. We'll always be transparent about costs before you begin.",
      },
      {
        question: "Can I use my HSA or FSA?",
        answer:
          "In many cases, yes. HSA/FSA eligibility depends on your plan and the specific service. We're glad to provide documentation to support your claim.",
      },
      {
        question: "Where are you located and what are your hours?",
        answer:
          "We're at 1207 East Forrest St, Suite E, Athens, AL. Our hours are Monday–Thursday 10am–5pm and Friday 9am–3pm. (Hours are illustrative — please confirm when you reach out.)",
      },
    ],
  },
];

/** Flattened teaser set for the home page. */
export const faqTeaser: FAQ[] = [
  faqCategories[0].items[0],
  faqCategories[1].items[0],
  faqCategories[2].items[2],
  faqCategories[3].items[0],
];
