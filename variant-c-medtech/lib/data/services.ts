export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceCategory =
  | "Hormone & Metabolic"
  | "Weight"
  | "Aesthetics"
  | "Longevity"
  | "Behavioral";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon:
    | "activity"
    | "scale"
    | "sparkles"
    | "refresh-cw"
    | "life-buoy";
  category: ServiceCategory;
  featured?: boolean;
  image: string;
  imageAlt: string;
  summary: string;
  heroStat: { value: string; label: string };
  whatItIs: string;
  whoItsFor: string[];
  whatToExpect: { title: string; description: string }[];
  benefits: string[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "bioidentical-hormone-therapy",
    name: "Bioidentical Hormone Therapy (BioTE)",
    shortName: "Hormone Therapy",
    icon: "activity",
    category: "Hormone & Metabolic",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Two hikers on a mountain trail with snow-capped peaks, representing restored energy and vitality from hormone optimization",
    summary:
      "Restore optimal hormone levels with personalized, lab-guided BioTE pellet therapy for men and women.",
    heroStat: { value: "3-5 months", label: "Typical pellet duration" },
    whatItIs:
      "Bioidentical hormone replacement therapy (BHRT) using BioTE pellet therapy delivers hormones that are molecularly identical to the ones your body produces naturally. Tiny pellets, smaller than a grain of rice, are inserted just under the skin and release a steady, consistent dose of hormones over several months — avoiding the peaks and valleys common with creams, patches, or injections.",
    whoItsFor: [
      "Men experiencing low testosterone: fatigue, low libido, brain fog, or loss of muscle mass",
      "Women navigating perimenopause or menopause: hot flashes, mood swings, sleep disruption, or low energy",
      "Adults with lab-confirmed hormone imbalances affecting quality of life",
      "Patients who have tried creams or injections and found them inconvenient or inconsistent",
    ],
    whatToExpect: [
      {
        title: "Comprehensive lab work",
        description:
          "We start with a full hormone panel and metabolic labs to understand your current baseline before recommending any treatment.",
      },
      {
        title: "Physician consultation",
        description:
          "Dr. Adams reviews your labs, symptoms, and health history to design a personalized hormone optimization plan.",
      },
      {
        title: "In-office pellet insertion",
        description:
          "A quick, minimally invasive in-office procedure places the pellets under the skin, typically in the hip area, using local anesthetic.",
      },
      {
        title: "Ongoing monitoring",
        description:
          "Follow-up labs and check-ins every 3-5 months let us fine-tune your dosing as your body responds.",
      },
    ],
    benefits: [
      "Steady, consistent hormone levels — no daily creams or injections",
      "Improved energy, mood, and mental clarity",
      "Better sleep quality and stress resilience",
      "Support for lean muscle mass and metabolism",
      "Improved libido and sexual health",
      "Bone density support over the long term",
    ],
    faqs: [
      {
        question: "How long does pellet therapy last?",
        answer:
          "Most patients return for new pellets every 3-5 months, depending on individual metabolism, activity level, and how the body processes hormones.",
      },
      {
        question: "Is BHRT safe?",
        answer:
          "BioTE pellets use bioidentical hormones that are structurally identical to what your body produces. Dr. Adams uses lab-guided dosing and ongoing monitoring to keep your levels in a healthy, personalized range.",
      },
      {
        question: "Will insurance cover hormone therapy?",
        answer:
          "Coverage varies by plan. Our team can help you understand cash-pay pricing, and many patients use HSA/FSA funds toward treatment — ask our front desk for current details.",
      },
      {
        question: "What does the insertion procedure feel like?",
        answer:
          "The pellet insertion is a brief in-office procedure performed under local anesthetic. Most patients describe mild pressure with minimal downtime — you can typically resume normal activity the same day with minor restrictions.",
      },
    ],
  },
  {
    slug: "medical-weight-loss",
    name: "Medical Weight Loss",
    shortName: "Weight Loss",
    icon: "scale",
    category: "Weight",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Fresh, colorful nutritious meal supporting a physician-guided weight loss plan",
    summary:
      "Physician-supervised weight loss using GLP-1 medications like semaglutide and tirzepatide, paired with lab monitoring and lifestyle coaching.",
    heroStat: { value: "Physician-led", label: "GLP-1 protocols" },
    whatItIs:
      "Our medical weight loss program combines GLP-1 receptor agonist medications — semaglutide and tirzepatide — with physician oversight, baseline lab work, and ongoing support. These medications help regulate appetite, slow gastric emptying, and support steady, sustainable fat loss when paired with nutrition and lifestyle guidance.",
    whoItsFor: [
      "Adults with a BMI that qualifies for medically supervised weight management",
      "Patients with weight-related health concerns such as prediabetes, high blood pressure, or joint stress",
      "Anyone who has struggled with diet and exercise alone and wants medical support",
      "Patients seeking a structured, monitored approach rather than self-directed online prescriptions",
    ],
    whatToExpect: [
      {
        title: "Initial evaluation & labs",
        description:
          "We review your health history, current medications, and run baseline labs to ensure GLP-1 therapy is appropriate and safe for you.",
      },
      {
        title: "Personalized dosing plan",
        description:
          "Dr. Adams starts you on a conservative dose and titrates gradually based on your response and tolerance, minimizing side effects.",
      },
      {
        title: "Weekly self-administered dosing",
        description:
          "Most protocols use a once-weekly injection that you can self-administer at home after in-office training.",
      },
      {
        title: "Ongoing check-ins",
        description:
          "Regular follow-ups track weight, labs, and how you're feeling — with adjustments to dose and lifestyle support as you progress.",
      },
    ],
    benefits: [
      "Reduced appetite and food noise",
      "Steady, sustainable weight loss with physician supervision",
      "Improved blood sugar and metabolic markers",
      "Support for blood pressure and cardiovascular risk factors",
      "Lifestyle and nutrition coaching alongside medication",
      "Lab monitoring to track progress and safety",
    ],
    faqs: [
      {
        question: "Semaglutide vs. tirzepatide — what's the difference?",
        answer:
          "Both are GLP-1-based medications that support appetite regulation and weight loss. Tirzepatide also acts on a second receptor (GIP), which some patients find leads to additional benefit. Dr. Adams will help determine which option fits your health profile and goals.",
      },
      {
        question: "What side effects are common?",
        answer:
          "The most common side effects are mild nausea, constipation, or fatigue, especially when starting or increasing a dose. Gradual titration and nutrition guidance help minimize these effects for most patients.",
      },
      {
        question: "How is the medication administered?",
        answer:
          "Most patients use a simple once-weekly subcutaneous injection that can be self-administered at home after a brief in-office training session.",
      },
      {
        question: "Do I need to change my diet?",
        answer:
          "Yes — medication works best alongside protein-focused nutrition and consistent habits. Our team provides practical guidance to support your results and help maintain muscle mass while losing fat.",
      },
    ],
  },
  {
    slug: "aesthetics",
    name: "Aesthetics",
    shortName: "Aesthetics",
    icon: "sparkles",
    category: "Aesthetics",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Woman receiving a calm, professional facial treatment in a serene spa setting",
    summary:
      "Laser hair restoration and aesthetic treatments designed to help you look as good as you feel.",
    heroStat: { value: "In-office", label: "Laser treatments" },
    whatItIs:
      "Our aesthetics services focus on non-invasive, evidence-based treatments — including low-level laser hair restoration — to support healthy hair growth and overall appearance. These treatments are offered alongside our wellness programs because looking your best is part of feeling your best.",
    whoItsFor: [
      "Men and women experiencing thinning hair or early-stage hair loss",
      "Patients on hormone optimization or weight loss programs who want to support overall appearance",
      "Anyone seeking non-surgical, low-downtime aesthetic options",
      "Patients who want care coordinated with their broader wellness plan",
    ],
    whatToExpect: [
      {
        title: "Consultation & assessment",
        description:
          "We evaluate your hair and scalp health (or aesthetic goals) and discuss realistic expectations and timelines.",
      },
      {
        title: "Customized treatment plan",
        description:
          "Treatments are scheduled on a recommended cadence, often combined with supportive supplements or topical care.",
      },
      {
        title: "Comfortable in-office sessions",
        description:
          "Laser hair restoration sessions are quick, painless, and require no downtime — many patients relax or work during treatment.",
      },
      {
        title: "Progress tracking",
        description:
          "We monitor changes over time with photos and check-ins so you can see real progress.",
      },
    ],
    benefits: [
      "Non-invasive, low-downtime treatment options",
      "Supports healthier-looking hair growth over time",
      "Treatments coordinated with your overall wellness plan",
      "Comfortable, relaxing in-office sessions",
      "No needles or surgery required for laser hair restoration",
    ],
    faqs: [
      {
        question: "How many sessions will I need?",
        answer:
          "Most laser hair restoration plans involve regular sessions over several months, since hair growth happens in cycles. Dr. Adams and our team will recommend a cadence based on your goals.",
      },
      {
        question: "Is laser hair restoration painful?",
        answer:
          "No — low-level laser therapy is painless and non-invasive. Most patients describe the sessions as relaxing, with no needles, heat, or downtime.",
      },
      {
        question: "Can I combine this with hormone therapy or weight loss programs?",
        answer:
          "Yes. Many patients incorporate aesthetics into a broader wellness plan, since hormone balance and metabolic health both play a role in hair and skin appearance.",
      },
    ],
  },
  {
    slug: "regenerative-anti-aging",
    name: "Regenerative & Anti-Aging Therapies",
    shortName: "Regenerative Medicine",
    icon: "refresh-cw",
    category: "Longevity",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Adults in a bright yoga and mobility class, representing resilience and healthy aging",
    summary:
      "Therapies focused on supporting the body's natural repair processes — designed to help you feel resilient, recover faster, and age on your terms.",
    heroStat: { value: "Root-cause", label: "Integrative approach" },
    whatItIs:
      "Our regenerative and anti-aging services take an integrative approach to healthy aging — addressing hormonal balance, inflammation, recovery, and nutrient status together rather than treating symptoms in isolation. Dr. Adams builds individualized plans that may combine lab-guided supplementation, hormone optimization, and lifestyle strategies designed to support how your body repairs and renews itself.",
    whoItsFor: [
      "Adults focused on long-term healthspan, not just symptom relief",
      "Patients recovering from injury, illness, or periods of high stress",
      "Anyone noticing reduced energy, slower recovery, or changes in resilience with age",
      "Patients who want a coordinated, whole-body plan rather than a single quick fix",
    ],
    whatToExpect: [
      {
        title: "In-depth intake & labs",
        description:
          "We assess key biomarkers related to inflammation, hormones, metabolic health, and nutrient status to build a complete picture.",
      },
      {
        title: "Individualized plan",
        description:
          "Dr. Adams designs a plan that may include targeted supplementation, hormone support, and recovery-focused strategies.",
      },
      {
        title: "Coordinated care",
        description:
          "Regenerative therapies are often paired with hormone optimization or weight management for a whole-body approach.",
      },
      {
        title: "Periodic re-assessment",
        description:
          "We re-check labs and how you're feeling at regular intervals to refine your plan over time.",
      },
    ],
    benefits: [
      "Supports the body's natural recovery and repair processes",
      "Addresses root causes rather than masking symptoms",
      "Personalized, lab-guided plans — not one-size-fits-all",
      "Coordinated with hormone and metabolic care",
      "Focus on long-term healthspan and resilience",
    ],
    faqs: [
      {
        question: "What does 'integrative' mean in this context?",
        answer:
          "It means Dr. Adams looks at the whole picture — hormones, inflammation, nutrition, and lifestyle — rather than treating each symptom separately. The goal is to identify and address root causes.",
      },
      {
        question: "How soon will I notice a difference?",
        answer:
          "Timelines vary by individual and the specific plan, but many patients report improvements in energy and recovery within the first few months, with continued gains as labs and habits are optimized.",
      },
      {
        question: "Do these therapies replace my regular doctor?",
        answer:
          "No — these services complement your primary care. We recommend keeping your primary care physician informed of any new therapies, and we're happy to coordinate as needed.",
      },
    ],
  },
  {
    slug: "addiction-therapy",
    name: "Addiction Therapy",
    shortName: "Addiction Therapy",
    icon: "life-buoy",
    category: "Behavioral",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
    imageAlt:
      "Anatomical model of the human brain, representing the clinical, whole-person approach to physician-led recovery care",
    summary:
      "Compassionate, physician-led addiction treatment focused on long-term recovery, not just short-term symptom control.",
    heroStat: { value: "Confidential", label: "Physician-led care" },
    whatItIs:
      "THRIVE Longevity Center offers specialized addiction therapy services rooted in the same integrative philosophy that guides our other care lines — treating the whole person, not just the addiction. Dr. Adams works with patients to develop individualized treatment plans that may include medical support, monitoring, and coordination with counseling resources.",
    whoItsFor: [
      "Adults seeking medical support for substance use concerns",
      "Patients looking for a private, physician-led starting point for recovery",
      "Individuals who want care integrated with their broader health picture (hormones, sleep, mood, nutrition)",
      "Family members seeking guidance on next steps for a loved one",
    ],
    whatToExpect: [
      {
        title: "Confidential consultation",
        description:
          "A private, judgment-free conversation with Dr. Adams to understand your situation, history, and goals.",
      },
      {
        title: "Medical evaluation",
        description:
          "We assess overall health, including any conditions that may be contributing factors or require coordinated care.",
      },
      {
        title: "Individualized care plan",
        description:
          "Dr. Adams develops a plan that may include medical management and coordination with counseling or support programs.",
      },
      {
        title: "Ongoing support",
        description:
          "Regular follow-ups provide accountability, medical monitoring, and adjustments to your plan as you progress.",
      },
    ],
    benefits: [
      "Private, physician-led, and compassionate approach",
      "Care plans that consider your whole health picture",
      "Confidential consultations in a clinical, professional setting",
      "Coordination with counseling and community support resources",
      "A starting point for patients unsure where to turn next",
    ],
    faqs: [
      {
        question: "Is this confidential?",
        answer:
          "Yes. All consultations are private and handled with the same confidentiality as any other medical visit at THRIVE Longevity Center.",
      },
      {
        question: "Do you provide counseling directly?",
        answer:
          "Dr. Adams provides medical evaluation and management, and can help coordinate with counseling and community support resources as part of a complete plan.",
      },
      {
        question: "How do I get started?",
        answer:
          "Call or text our office to schedule a confidential consultation. You can also reach out through our contact form, and our team will follow up directly.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const featuredServices = services.filter((s) => s.featured);

export const serviceCategoryOrder: ServiceCategory[] = [
  "Hormone & Metabolic",
  "Weight",
  "Aesthetics",
  "Longevity",
  "Behavioral",
];

export const serviceCategoryMeta: Record<
  ServiceCategory,
  { label: string; blurb: string }
> = {
  "Hormone & Metabolic": {
    label: "Hormone & Metabolic",
    blurb: "Restore balance and energy with lab-guided hormone optimization.",
  },
  Weight: {
    label: "Weight",
    blurb: "Physician-supervised, sustainable weight management.",
  },
  Aesthetics: {
    label: "Aesthetics",
    blurb: "Look as good as you feel, coordinated with your wellness plan.",
  },
  Longevity: {
    label: "Longevity",
    blurb: "Whole-body, root-cause care for long-term healthspan.",
  },
  Behavioral: {
    label: "Behavioral",
    blurb: "Compassionate, confidential, physician-led recovery support.",
  },
};
