import { clinic } from "@/lib/data/clinic";
import { services } from "@/lib/data/services";
import { faqCategories } from "@/lib/data/faqs";

/**
 * A single answerable knowledge-base entry. Each entry carries a set of
 * "questions" (phrasings that should match it) plus keywords that boost
 * the match score even if they don't appear verbatim in the question list.
 */
export type KbEntry = {
  id: string;
  /** Example phrasings — used to compute token overlap against user input. */
  questions: string[];
  /** Extra high-value keywords that strongly indicate this topic. */
  keywords?: string[];
  answer: string;
  /** Optional links shown as chips/buttons under the answer. */
  links?: { label: string; href: string }[];
};

const hoursText = clinic.hours
  .map((h) => `${h.days}: ${h.time}`)
  .join(" · ");

const servicesList = services.map((s) => s.shortName).join(", ");

/**
 * Built-in knowledge base sourced from clinic.ts and services.ts, covering
 * the topics the prompt calls out explicitly: hours, location, contact
 * methods, services overview, pricing, and insurance/HSA-FSA.
 */
const builtInEntries: KbEntry[] = [
  {
    id: "hours",
    questions: [
      "what are your hours",
      "when are you open",
      "office hours",
      "what time do you open",
      "what time do you close",
      "are you open today",
      "are you open on weekends",
    ],
    keywords: ["hours", "open", "close", "closed", "weekend", "schedule", "time"],
    answer: `Our hours are ${hoursText}. ${clinic.hoursNote}`,
    links: [{ label: "Contact us", href: "/contact" }],
  },
  {
    id: "location",
    questions: [
      "where are you located",
      "what is your address",
      "where is your office",
      "directions to your office",
      "what city are you in",
    ],
    keywords: ["location", "address", "directions", "where", "athens", "office", "map"],
    answer: `We're located at ${clinic.address.full}.`,
    links: [{ label: "Get directions", href: "/contact" }],
  },
  {
    id: "contact",
    questions: [
      "how do I contact you",
      "what is your phone number",
      "can I text you",
      "what is your email",
      "how can I reach the office",
    ],
    keywords: ["phone", "call", "text", "email", "contact", "reach", "number"],
    answer: `You can call or text us at ${clinic.phone}, or email ${clinic.email}. We're happy to help!`,
    links: [{ label: "Contact page", href: "/contact" }],
  },
  {
    id: "services-overview",
    questions: [
      "what services do you offer",
      "what do you treat",
      "what programs do you have",
      "what kind of care do you provide",
      "tell me about your services",
    ],
    keywords: ["services", "programs", "offer", "treatments", "treat", "provide"],
    answer: `We offer: ${servicesList}. Each program is physician-led by Dr. Adams and tailored to your goals.`,
    links: [{ label: "View all services", href: "/services" }],
  },
  {
    id: "pricing",
    questions: [
      "how much does it cost",
      "what is the price",
      "is this expensive",
      "how much do you charge",
      "what are your prices",
      "cost of treatment",
    ],
    keywords: ["cost", "price", "pricing", "expensive", "fee", "fees", "charge", "afford"],
    answer:
      "Pricing is quoted at your consultation, since every plan is personalized to you. Many patients use HSA/FSA funds toward services. Our team is happy to talk through costs before you begin any treatment.",
    links: [{ label: "Book a consultation", href: "/contact" }],
  },
  {
    id: "insurance",
    questions: [
      "do you take insurance",
      "is this covered by insurance",
      "can I use my hsa",
      "can I use my fsa",
      "do you accept my insurance plan",
    ],
    keywords: ["insurance", "hsa", "fsa", "covered", "coverage", "plan", "copay"],
    answer:
      "Many of our integrative services are typically self-pay, since insurance coverage varies widely. Many patients use HSA/FSA funds — we recommend checking with your plan administrator. Our team can walk you through pricing during your consultation.",
    links: [{ label: "Billing & insurance FAQs", href: "/faq" }],
  },
  {
    id: "new-patients",
    questions: [
      "do you accept new patients",
      "are you taking new patients",
      "can I become a patient",
    ],
    keywords: ["new", "patients", "accepting", "become"],
    answer:
      "Yes! We're happy to welcome new patients. The fastest way to get started is to call, text, or use our contact form, and our team will help you get scheduled.",
    links: [{ label: "Get started", href: "/contact" }],
  },
  {
    id: "first-visit",
    questions: [
      "what should I expect at my first visit",
      "what happens at my first appointment",
      "what do I need to bring",
    ],
    keywords: ["first", "visit", "appointment", "expect", "bring"],
    answer:
      "Your first visit typically includes a thorough conversation with Dr. Adams about your health history and goals, and often baseline labs depending on the services you're interested in.",
    links: [{ label: "Read more FAQs", href: "/faq" }],
  },
  {
    id: "telehealth",
    questions: [
      "do you offer telehealth",
      "can I have a virtual visit",
      "do you do video appointments",
    ],
    keywords: ["telehealth", "virtual", "video", "online", "remote"],
    answer:
      "Some follow-up visits may be available virtually depending on the service. Call our office to ask about options for your specific situation.",
    links: [{ label: "Contact us", href: "/contact" }],
  },
];

// Pull each service's own FAQs into the knowledge base so the bot can
// answer service-specific questions (e.g. "how often are pellet
// insertions?", "what side effects does semaglutide have?").
const serviceFaqEntries: KbEntry[] = services.flatMap((service) =>
  service.faqs.map((faq, index) => ({
    id: `service-${service.slug}-${index}`,
    questions: [faq.question],
    keywords: [service.shortName.toLowerCase(), service.name.toLowerCase()],
    answer: faq.answer,
    links: [{ label: `${service.shortName} details`, href: `/services/${service.slug}` }],
  }))
);

// Pull the general FAQ page entries into the knowledge base too.
const generalFaqEntries: KbEntry[] = faqCategories.flatMap((category, ci) =>
  category.items.map((item, ii) => ({
    id: `faq-${ci}-${ii}`,
    questions: [item.question],
    answer: item.answer,
    links: [{ label: "More FAQs", href: "/faq" }],
  }))
);

export const knowledgeBase: KbEntry[] = [
  ...builtInEntries,
  ...generalFaqEntries,
  ...serviceFaqEntries,
];

/** A handful of FAQ questions to surface as quick-reply chips. */
export const topFaqQuestions: string[] = [
  "What are your hours?",
  "Do you accept insurance?",
  "What services do you offer?",
];

export { clinic, services };
