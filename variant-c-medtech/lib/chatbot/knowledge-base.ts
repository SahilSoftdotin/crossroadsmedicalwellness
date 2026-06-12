import { faqCategories } from "@/lib/data/faqs";
import { clinic } from "@/lib/data/clinic";
import { services } from "@/lib/data/services";
import type { KnowledgeEntry } from "@/lib/chatbot/types";

/**
 * Builds the full knowledge base the chatbot can search:
 *  - Every FAQ entry from lib/data/faqs.ts
 *  - Every per-service FAQ from lib/data/services.ts
 *  - A handful of "site facts" derived from lib/data/clinic.ts (hours,
 *    location, contact info, pricing/insurance policy, services overview)
 *
 * All keyword lists are lowercase for case-insensitive matching.
 */

function entryFromFaq(
  id: string,
  question: string,
  answer: string,
  extraKeywords: string[] = [],
  link?: KnowledgeEntry["link"]
): KnowledgeEntry {
  const keywords = new Set<string>(extraKeywords.map((k) => k.toLowerCase()));
  // Seed keywords from the question itself (significant words only).
  for (const word of question.toLowerCase().split(/[^a-z0-9]+/)) {
    if (word.length > 2) keywords.add(word);
  }
  return { id, question, answer, keywords: [...keywords], link };
}

const faqEntries: KnowledgeEntry[] = faqCategories.flatMap((category, ci) =>
  category.items.map((item, ii) =>
    entryFromFaq(`faq-${ci}-${ii}`, item.question, item.answer, [category.category.toLowerCase()])
  )
);

const serviceFaqEntries: KnowledgeEntry[] = services.flatMap((service, si) =>
  service.faqs.map((item, ii) =>
    entryFromFaq(
      `service-faq-${si}-${ii}`,
      item.question,
      item.answer,
      [service.name, service.shortName, service.category, ...service.slug.split("-")],
      { href: `/services/${service.slug}`, label: `${service.shortName} details` }
    )
  )
);

/** "Site fact" entries derived from clinic.ts + services.ts (hours, contact, pricing, etc). */
const siteFactEntries: KnowledgeEntry[] = [
  {
    id: "fact-hours",
    question: "What are your hours?",
    keywords: [
      "hours",
      "open",
      "opening",
      "close",
      "closing",
      "time",
      "today",
      "weekend",
      "saturday",
      "sunday",
      "monday",
      "friday",
      "schedule",
    ],
    answer: `We're open ${clinic.hours
      .map((h) => `${h.days}: ${h.time}`)
      .join(", ")}. ${clinic.hoursNote}`,
    link: { href: "/contact", label: "Contact us" },
  },
  {
    id: "fact-location",
    question: "Where are you located?",
    keywords: [
      "location",
      "address",
      "where",
      "directions",
      "office",
      "athens",
      "alabama",
      "find",
      "located",
      "map",
    ],
    answer: `We're located at ${clinic.address.full}. Use the map and directions on our contact page to plan your visit.`,
    link: { href: "/contact", label: "Map & directions" },
  },
  {
    id: "fact-contact",
    question: "How can I contact the clinic?",
    keywords: [
      "phone",
      "call",
      "text",
      "email",
      "contact",
      "reach",
      "number",
      "sms",
    ],
    answer: `You can call us at ${clinic.phone}, text ${clinic.text}, or email ${clinic.email}. Our team typically responds quickly during business hours.`,
    link: { href: "/contact", label: "Contact page" },
  },
  {
    id: "fact-services-list",
    question: "What services do you offer?",
    keywords: [
      "services",
      "offer",
      "treatments",
      "programs",
      "provide",
      "do you do",
      "what do you treat",
    ],
    answer: `We offer ${services
      .map((s) => s.shortName)
      .join(
        ", "
      )} — all physician-led and built around your individual goals and labs.`,
    link: { href: "/services", label: "Explore our services" },
  },
  {
    id: "fact-pricing",
    question: "How much do your services cost?",
    keywords: [
      "price",
      "pricing",
      "cost",
      "costs",
      "how much",
      "fee",
      "fees",
      "rate",
      "rates",
      "expensive",
      "afford",
    ],
    answer:
      "Pricing depends on your individual plan and is reviewed during your consultation, since labs and protocols vary by patient. Many services are cash-pay, and HSA/FSA funds may be eligible for use — our front desk can confirm specifics.",
    link: { href: "/contact", label: "Book a consultation" },
  },
  {
    id: "fact-insurance",
    question: "Do you accept insurance or HSA/FSA?",
    keywords: [
      "insurance",
      "hsa",
      "fsa",
      "covered",
      "coverage",
      "cash pay",
      "cash-pay",
      "billing",
    ],
    answer:
      "Many of our integrative services are cash-pay since they're not always covered by insurance, but many patients use HSA/FSA funds toward eligible services. Check with your plan administrator and our front desk for specifics.",
    link: { href: "/faq", label: "Billing & insurance FAQs" },
  },
  {
    id: "fact-provider",
    question: "Who is the doctor?",
    keywords: [
      "doctor",
      "provider",
      "physician",
      "dr",
      "adams",
      "who",
      "credentials",
      "experience",
    ],
    answer: `${clinic.provider.name}, ${clinic.provider.credentials}, leads care at THRIVE Longevity Center. ${clinic.provider.bio}`,
    link: { href: "/about", label: "About Dr. Adams" },
  },
  {
    id: "fact-booking",
    question: "How do I book a consultation?",
    keywords: [
      "book",
      "booking",
      "appointment",
      "consult",
      "consultation",
      "schedule",
      "scheduling",
      "get started",
      "sign up",
      "new patient",
    ],
    answer:
      "I can help you get started right here — I just need a few details (name, service of interest, and the best way to reach you), and our team will follow up to confirm a time. You can also call or text us directly.",
    link: { href: "/get-started", label: "Get started" },
  },
];

// Per-service "what is X" entries so questions like "tell me about weight loss"
// surface a useful summary even if it doesn't match a specific FAQ.
const serviceSummaryEntries: KnowledgeEntry[] = services.map((service, si) => ({
  id: `service-summary-${si}`,
  question: `Tell me about ${service.shortName}`,
  keywords: [
    service.name.toLowerCase(),
    service.shortName.toLowerCase(),
    service.category.toLowerCase(),
    ...service.slug.split("-"),
    "tell me about",
    "what is",
    "info",
    "information",
  ],
  answer: `${service.summary} ${service.whatItIs}`,
  link: { href: `/services/${service.slug}`, label: `${service.shortName} page` },
}));

export const knowledgeBase: KnowledgeEntry[] = [
  ...siteFactEntries,
  ...faqEntries,
  ...serviceFaqEntries,
  ...serviceSummaryEntries,
];

/** A short list of FAQ-style questions surfaced as quick-reply chips on greeting. */
export const topSuggestedQuestions: string[] = [
  "What are your hours?",
  "What services do you offer?",
  "Do you accept insurance or HSA/FSA?",
];
