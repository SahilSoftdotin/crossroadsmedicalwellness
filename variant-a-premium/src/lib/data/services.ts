import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Scale,
  Sparkles,
  Dna,
  HeartHandshake,
} from "lucide-react";

export type ServiceFAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  heroDescription: string;
  whatItIs: string;
  whoItsFor: string[];
  whatToExpect: { title: string; description: string }[];
  benefits: string[];
  faqs: ServiceFAQ[];
};

export const services: Service[] = [
  {
    slug: "bioidentical-hormone-therapy",
    name: "Bioidentical Hormone Therapy (BioTE)",
    shortName: "Hormone Therapy",
    icon: Activity,
    tagline: "Hormone optimization for men & women",
    summary:
      "Restore energy, mood, sleep and vitality with physician-supervised bioidentical hormone optimization using BioTE pellet therapy.",
    heroDescription:
      "As hormones decline with age, the symptoms — fatigue, brain fog, weight gain, low libido — are real and measurable. We test, interpret and treat at the root using bioidentical hormones identical to the ones your body makes.",
    whatItIs:
      "Bioidentical hormone replacement therapy (BHRT) uses plant-derived hormones that are molecularly identical to those your body produces naturally. As a BioTE-certified practice, we offer subcutaneous pellet therapy that delivers steady, consistent levels — avoiding the peaks and crashes of pills or creams. Every protocol begins with comprehensive lab work and is dosed to your individual physiology, not a one-size-fits-all chart.",
    whoItsFor: [
      "Women navigating perimenopause or menopause",
      "Men experiencing symptoms of low testosterone (andropause)",
      "Anyone with persistent fatigue, low libido, mood changes or poor sleep",
      "Patients who want a data-driven, monitored approach to hormone health",
    ],
    whatToExpect: [
      {
        title: "Comprehensive lab panel",
        description:
          "We measure the full hormone picture — not just a single value — alongside thyroid, metabolic and inflammatory markers.",
      },
      {
        title: "Physician interpretation",
        description:
          "Dr. Adams reviews your results in the context of your symptoms and goals to design an individualized protocol.",
      },
      {
        title: "Pellet insertion",
        description:
          "A quick in-office procedure places bioidentical pellets that release hormones steadily over 3–5 months.",
      },
      {
        title: "Follow-up & titration",
        description:
          "We re-test and fine-tune dosing so your levels stay in an optimal, symptom-free range.",
      },
    ],
    benefits: [
      "Improved energy and mental clarity",
      "Better sleep quality",
      "Restored libido and sexual function",
      "More stable mood",
      "Support for lean muscle and bone density",
      "Steady delivery without daily pills",
    ],
    faqs: [
      {
        question: "Is bioidentical hormone therapy safe?",
        answer:
          "When prescribed and monitored by a physician with appropriate lab work, BHRT is a well-established therapy. We individualize dosing and re-test regularly to keep you in a safe, optimal range. We'll review your personal and family history before recommending treatment.",
      },
      {
        question: "How soon will I feel a difference?",
        answer:
          "Many patients notice improvements in energy and sleep within 2–4 weeks, with fuller benefits over the first few months as levels stabilize.",
      },
      {
        question: "Do pellets need to be removed?",
        answer:
          "No. The pellets fully dissolve over time. We simply schedule your next insertion when levels begin to taper, typically every 3–5 months.",
      },
    ],
  },
  {
    slug: "medical-weight-loss",
    name: "Medical Weight Loss",
    shortName: "Weight Loss",
    icon: Scale,
    tagline: "GLP-1 medications (semaglutide / tirzepatide)",
    summary:
      "Physician-guided weight loss combining GLP-1 medications, nutrition and metabolic care for sustainable, lasting results.",
    heroDescription:
      "Sustainable weight loss is a medical process, not a willpower contest. We pair the latest GLP-1 medications with metabolic testing and real coaching so the weight comes off — and stays off.",
    whatItIs:
      "Our medical weight loss program is built around GLP-1 receptor agonists — semaglutide and tirzepatide — the same class of medication that has transformed obesity medicine. But medication is only part of it. We evaluate the metabolic, hormonal and lifestyle drivers behind your weight, then build a monitored plan that protects lean muscle, manages side effects and creates habits that hold.",
    whoItsFor: [
      "Adults with a BMI in the overweight or obese range",
      "Patients who've struggled to lose weight despite diet and exercise",
      "People with metabolic markers like insulin resistance or prediabetes",
      "Anyone wanting medically supervised, sustainable weight management",
    ],
    whatToExpect: [
      {
        title: "Metabolic evaluation",
        description:
          "Labs and body composition help us understand what's actually driving your weight, from insulin to thyroid to hormones.",
      },
      {
        title: "Personalized medication plan",
        description:
          "If appropriate, we prescribe and titrate GLP-1 therapy to minimize side effects while maximizing results.",
      },
      {
        title: "Nutrition & muscle protection",
        description:
          "We coach protein, strength and habit changes so you lose fat — not muscle — and feel good doing it.",
      },
      {
        title: "Ongoing monitoring",
        description:
          "Regular check-ins track progress, adjust dosing and keep momentum going long term.",
      },
    ],
    benefits: [
      "Clinically meaningful, sustained weight loss",
      "Reduced appetite and food noise",
      "Improved blood sugar and metabolic markers",
      "Protection of lean muscle mass",
      "Physician supervision and side-effect management",
      "Support beyond the prescription",
    ],
    faqs: [
      {
        question: "How much weight can I expect to lose?",
        answer:
          "Results vary, but patients on GLP-1 therapy combined with our coaching commonly see 12–20% of body weight over the program. We set realistic, personalized targets at your first visit.",
      },
      {
        question: "Are the medications safe?",
        answer:
          "GLP-1 medications are FDA-approved and extensively studied. We screen for contraindications, start low and titrate slowly, and monitor you throughout to manage any side effects.",
      },
      {
        question: "What happens when I reach my goal?",
        answer:
          "We design a maintenance plan — which may include a lower dose or transition off medication — to help you hold your results with the habits you've built.",
      },
    ],
  },
  {
    slug: "aesthetics",
    name: "Aesthetics",
    shortName: "Aesthetics",
    icon: Sparkles,
    tagline: "Laser hair restoration & aesthetic treatments",
    summary:
      "Look as vital as you feel with physician-overseen aesthetic treatments, including laser hair restoration.",
    heroDescription:
      "Aesthetic care at Crossroads is medical-grade and physician-overseen. We focus on natural, healthy results that match your overall wellness — never overdone.",
    whatItIs:
      "Our aesthetics services bring medical oversight to treatments that are too often delivered without it. Laser hair restoration uses targeted light energy to stimulate dormant follicles and support thicker, healthier hair. Because everything is supervised within an integrative practice, we also look at the internal factors — hormones, nutrition, thyroid — that influence how you look and feel.",
    whoItsFor: [
      "Men and women experiencing thinning hair",
      "Patients wanting medically supervised aesthetic care",
      "Anyone interested in pairing aesthetic results with whole-body wellness",
      "People who prefer non-surgical, low-downtime treatments",
    ],
    whatToExpect: [
      {
        title: "Consultation & assessment",
        description:
          "We evaluate your concern and any underlying contributors before recommending a treatment plan.",
      },
      {
        title: "Tailored treatment plan",
        description:
          "Sessions are mapped to your goals, with clear expectations on timing and results.",
      },
      {
        title: "Comfortable in-office sessions",
        description:
          "Treatments are quick, well-tolerated and require little to no downtime.",
      },
      {
        title: "Progress review",
        description:
          "We track your response over time and adjust the plan as needed.",
      },
    ],
    benefits: [
      "Physician-supervised, medical-grade care",
      "Natural-looking results",
      "Minimal downtime",
      "Integrated with your overall wellness plan",
      "Personalized treatment timelines",
    ],
    faqs: [
      {
        question: "How many sessions will I need?",
        answer:
          "It depends on the treatment and your goals. We'll give you a clear, personalized estimate at your consultation rather than a generic package.",
      },
      {
        question: "Is there any downtime?",
        answer:
          "Most aesthetic treatments we offer require little to no downtime, so you can typically return to your day right after.",
      },
      {
        question: "Do you address the root cause of hair thinning?",
        answer:
          "Yes. As an integrative practice, we also assess hormones, thyroid and nutrition that can contribute to hair changes — so treatment isn't just surface-level.",
      },
    ],
  },
  {
    slug: "regenerative-anti-aging",
    name: "Regenerative & Anti-Aging Therapies",
    shortName: "Regenerative & Anti-Aging",
    icon: Dna,
    tagline: "Therapies that support how you age",
    summary:
      "Evidence-informed regenerative and longevity therapies designed to support healthy aging from the inside out.",
    heroDescription:
      "Aging is inevitable — but how you age is not. Our regenerative and anti-aging therapies target the biology of aging to help you stay strong, sharp and resilient for decades.",
    whatItIs:
      "Regenerative and anti-aging care focuses on optimizing the systems that decline over time — hormones, metabolism, cellular energy, inflammation and recovery. Through advanced lab testing and targeted therapies, supplementation and lifestyle protocols, we work to extend not just lifespan but healthspan: the years you live with strength, clarity and independence.",
    whoItsFor: [
      "Adults focused on healthy aging and prevention",
      "Patients wanting a proactive, data-driven longevity plan",
      "People recovering vitality after illness, stress or burnout",
      "Anyone interested in optimizing energy, recovery and resilience",
    ],
    whatToExpect: [
      {
        title: "Longevity lab panel",
        description:
          "We measure biomarkers of aging — metabolic, hormonal and inflammatory — to establish your baseline.",
      },
      {
        title: "Personalized protocol",
        description:
          "Dr. Adams designs a plan combining therapies, supplementation and lifestyle medicine tailored to your biology.",
      },
      {
        title: "Targeted therapies",
        description:
          "We deliver and supervise the interventions most likely to move your specific markers.",
      },
      {
        title: "Track & optimize",
        description:
          "Periodic re-testing shows what's working and lets us refine your longevity strategy over time.",
      },
    ],
    benefits: [
      "Proactive, prevention-focused care",
      "Improved energy and recovery",
      "Support for cognitive sharpness",
      "Reduced inflammation",
      "Data-driven longevity strategy",
      "Whole-system optimization",
    ],
    faqs: [
      {
        question: "What does 'healthspan' mean?",
        answer:
          "Healthspan is the portion of your life spent in good health — strong, clear-headed and independent. Our goal is to extend it, not just add years.",
      },
      {
        question: "Is this just supplements?",
        answer:
          "No. Supplementation may be part of a plan, but it's built on lab data, hormone and metabolic optimization, and lifestyle medicine — all physician-directed.",
      },
      {
        question: "How do you measure progress?",
        answer:
          "We track concrete biomarkers over time and pair them with how you actually feel and function, adjusting your protocol accordingly.",
      },
    ],
  },
  {
    slug: "addiction-therapy",
    name: "Addiction Therapy",
    shortName: "Addiction Therapy",
    icon: HeartHandshake,
    tagline: "Specialized, compassionate treatment",
    summary:
      "Confidential, physician-led addiction treatment that treats the whole person with dignity and medical support.",
    heroDescription:
      "Recovery deserves real medicine and real compassion. Our addiction therapy services combine evidence-based medical treatment with a whole-person approach in a private, judgment-free setting.",
    whatItIs:
      "Addiction is a medical condition, and we treat it like one. Our specialized addiction therapy provides physician-supervised, evidence-based treatment delivered with dignity and discretion. Because we're an integrative practice, we also address the underlying drivers — hormones, sleep, nutrition, mental health and chronic stress — that affect both recovery and relapse, supporting the whole person, not just the diagnosis.",
    whoItsFor: [
      "Individuals seeking confidential, medically supervised treatment",
      "Patients who want a whole-person, non-judgmental approach",
      "People looking to address underlying health drivers of addiction",
      "Those seeking ongoing support through recovery",
    ],
    whatToExpect: [
      {
        title: "Private consultation",
        description:
          "A confidential, compassionate conversation to understand your history, needs and goals.",
      },
      {
        title: "Medical evaluation",
        description:
          "We assess your health comprehensively, including the factors that influence recovery.",
      },
      {
        title: "Individualized treatment plan",
        description:
          "Dr. Adams builds an evidence-based plan that supports your physical and mental health together.",
      },
      {
        title: "Ongoing support",
        description:
          "Recovery is a process. We provide continued medical care and check-ins along the way.",
      },
    ],
    benefits: [
      "Confidential, judgment-free care",
      "Physician-supervised treatment",
      "Whole-person, integrative approach",
      "Support for underlying health drivers",
      "Ongoing care through recovery",
    ],
    faqs: [
      {
        question: "Is treatment confidential?",
        answer:
          "Absolutely. Your care is private and delivered with discretion and respect. We're here to support you, not to judge.",
      },
      {
        question: "What makes an integrative approach different?",
        answer:
          "We don't treat addiction in isolation. We address the hormonal, nutritional, sleep and mental-health factors that influence recovery, supporting your whole health.",
      },
      {
        question: "How do I get started?",
        answer:
          "Reach out by phone, text or our contact form for a private consultation. We'll take it one confidential step at a time.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
