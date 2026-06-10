export type Program = {
  slug: string;
  name: string;
  tagline: string;
  icon: "user" | "user-round" | "scale" | "infinity";
  summary: string;
  heroStat: { value: string; label: string };
  idealFor: string[];
  includes: { title: string; description: string }[];
  timeline: { phase: string; description: string }[];
  relatedServiceSlugs: string[];
  faqs: { question: string; answer: string }[];
};

export const programs: Program[] = [
  {
    slug: "mens-hormone-health",
    name: "Men's Hormone Health",
    tagline: "Reclaim energy, focus, and strength.",
    icon: "user",
    summary:
      "A structured program for men experiencing the effects of declining testosterone — combining lab testing, BioTE pellet therapy, and ongoing monitoring to restore energy, drive, and muscle tone.",
    heroStat: { value: "Lab-guided", label: "Personalized dosing" },
    idealFor: [
      "Men in their 30s-60s noticing fatigue, low motivation, or reduced muscle tone",
      "Men with low libido or changes in mood and mental sharpness",
      "Anyone curious whether their hormone levels are contributing to how they feel",
      "Men who want an active partner in managing their long-term health",
    ],
    includes: [
      {
        title: "Comprehensive hormone & metabolic panel",
        description:
          "Full lab workup covering testosterone, thyroid, metabolic markers, and more to establish your baseline.",
      },
      {
        title: "Physician consultation with Dr. Adams",
        description:
          "A thorough review of your labs, symptoms, and goals to design your personalized plan.",
      },
      {
        title: "BioTE pellet therapy",
        description:
          "In-office pellet insertion for steady, consistent testosterone optimization — no daily routines required.",
      },
      {
        title: "Ongoing monitoring & adjustments",
        description:
          "Regular labs and check-ins every few months to fine-tune your dose as your body responds.",
      },
    ],
    timeline: [
      { phase: "Week 0", description: "Initial consultation, lab draw, and health history review." },
      { phase: "Week 1-2", description: "Results review with Dr. Adams and personalized plan design." },
      { phase: "Week 2-3", description: "Pellet insertion procedure (in-office, brief and minimally invasive)." },
      { phase: "Month 3-5", description: "Follow-up labs and check-in; pellets typically renewed." },
    ],
    relatedServiceSlugs: ["bioidentical-hormone-therapy", "regenerative-anti-aging"],
    faqs: [
      {
        question: "How do I know if low testosterone is affecting me?",
        answer:
          "Common signs include persistent fatigue, reduced muscle mass, low libido, brain fog, and mood changes. A simple lab panel can confirm whether your levels fall outside the optimal range for your age.",
      },
      {
        question: "Is this program just hormone therapy?",
        answer:
          "Hormone optimization is the core of the program, but Dr. Adams takes an integrative view — looking at metabolic health, sleep, and lifestyle factors that influence how you feel overall.",
      },
    ],
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    tagline: "Support through perimenopause, menopause, and beyond.",
    icon: "user-round",
    summary:
      "A personalized program for women navigating hormonal shifts — addressing hot flashes, sleep disruption, mood changes, and energy through bioidentical hormone therapy and integrative support.",
    heroStat: { value: "Whole-person", label: "Integrative care" },
    idealFor: [
      "Women experiencing perimenopause or menopause symptoms (hot flashes, night sweats, mood swings)",
      "Women with disrupted sleep, low energy, or changes in libido",
      "Anyone whose hormone-related symptoms are affecting daily life or relationships",
      "Women who want a physician partner for this life stage, not just a prescription",
    ],
    includes: [
      {
        title: "Comprehensive hormone & wellness panel",
        description:
          "Lab testing covering estrogen, progesterone, testosterone, thyroid, and key metabolic markers.",
      },
      {
        title: "Physician consultation with Dr. Adams",
        description:
          "A detailed conversation about your symptoms, history, and goals to shape your care plan.",
      },
      {
        title: "BioTE pellet therapy",
        description:
          "Steady-release bioidentical hormone pellets designed to ease symptoms without daily dosing.",
      },
      {
        title: "Integrative support",
        description:
          "Guidance on sleep, stress, and nutrition strategies that complement hormone optimization.",
      },
    ],
    timeline: [
      { phase: "Week 0", description: "Initial consultation, lab draw, and symptom review." },
      { phase: "Week 1-2", description: "Lab results review and personalized plan with Dr. Adams." },
      { phase: "Week 2-3", description: "Pellet insertion procedure (in-office, quick recovery)." },
      { phase: "Month 3-5", description: "Follow-up labs, symptom check-in, and dose refinement." },
    ],
    relatedServiceSlugs: ["bioidentical-hormone-therapy", "regenerative-anti-aging"],
    faqs: [
      {
        question: "I'm still having periods — can I still benefit from this program?",
        answer:
          "Yes. Many women in perimenopause experience hormone fluctuations well before periods stop entirely. A lab panel can identify imbalances even while your cycle continues.",
      },
      {
        question: "Will this help with hot flashes and sleep?",
        answer:
          "Hormone optimization is one of the most common reasons women seek this program, and many patients report meaningful improvement in hot flashes, night sweats, and sleep quality once levels are balanced.",
      },
    ],
  },
  {
    slug: "medical-weight-loss-program",
    name: "Medical Weight Loss Program",
    tagline: "Lose weight with a physician-guided plan that fits your life.",
    icon: "scale",
    summary:
      "A complete weight management program built around GLP-1 medications (semaglutide or tirzepatide), lab monitoring, and lifestyle coaching to help you reach a healthier weight sustainably.",
    heroStat: { value: "Weekly", label: "Self-administered dosing" },
    idealFor: [
      "Adults who qualify for medically supervised weight management",
      "Patients with weight-related health concerns like prediabetes or high blood pressure",
      "Anyone who has tried diet and exercise alone without lasting results",
      "Patients who want lab monitoring and physician oversight throughout their journey",
    ],
    includes: [
      {
        title: "Initial evaluation & baseline labs",
        description:
          "A full health review and lab work to confirm GLP-1 therapy is a safe, appropriate fit for you.",
      },
      {
        title: "Personalized GLP-1 protocol",
        description:
          "Semaglutide or tirzepatide, started conservatively and titrated based on your response.",
      },
      {
        title: "At-home self-administration training",
        description:
          "A simple, once-weekly injection routine taught in-office so you're confident managing it at home.",
      },
      {
        title: "Nutrition & lifestyle coaching",
        description:
          "Practical guidance to support muscle preservation, energy, and long-term habit change.",
      },
    ],
    timeline: [
      { phase: "Week 0", description: "Initial evaluation, labs, and program enrollment." },
      { phase: "Week 1", description: "Starter dose initiated with in-office injection training." },
      { phase: "Month 1-3", description: "Gradual dose titration with regular check-ins." },
      { phase: "Month 3+", description: "Maintenance dosing, progress tracking, and lab re-checks." },
    ],
    relatedServiceSlugs: ["medical-weight-loss", "regenerative-anti-aging"],
    faqs: [
      {
        question: "How much weight can I expect to lose?",
        answer:
          "Results vary by individual, medication, and adherence to the full program (medication plus nutrition habits). Dr. Adams will discuss realistic, individualized expectations during your consultation.",
      },
      {
        question: "Do I have to stay on the medication forever?",
        answer:
          "This is a personalized decision made with Dr. Adams based on your goals, response, and overall health — there's no one-size-fits-all answer, and your plan can evolve over time.",
      },
    ],
  },
  {
    slug: "longevity-anti-aging",
    name: "Longevity & Anti-Aging",
    tagline: "Invest in how you'll feel 10, 20, 30 years from now.",
    icon: "infinity",
    summary:
      "Our most comprehensive program, combining hormone optimization, regenerative therapies, and lab-driven monitoring into a coordinated plan focused on long-term healthspan.",
    heroStat: { value: "Comprehensive", label: "Coordinated care plan" },
    idealFor: [
      "Adults focused on proactive, long-term health rather than reactive sick care",
      "Patients who want a single coordinated plan across hormones, recovery, and metabolic health",
      "Anyone noticing gradual changes in energy, recovery, or resilience and wanting to get ahead of it",
      "Patients ready to commit to ongoing lab tracking and physician partnership",
    ],
    includes: [
      {
        title: "Extensive baseline lab panel",
        description:
          "A broad set of biomarkers covering hormones, metabolic health, inflammation, and nutrient status.",
      },
      {
        title: "Comprehensive physician consultation",
        description:
          "An in-depth conversation with Dr. Adams to map your goals to a coordinated, multi-pronged plan.",
      },
      {
        title: "Hormone optimization (as indicated)",
        description:
          "BioTE pellet therapy where labs and symptoms support it, for men or women.",
      },
      {
        title: "Regenerative & supportive therapies",
        description:
          "Targeted supplementation and recovery-focused strategies tailored to your results.",
      },
      {
        title: "Quarterly lab re-checks",
        description:
          "Ongoing monitoring so your plan evolves with your body over time.",
      },
    ],
    timeline: [
      { phase: "Week 0", description: "Comprehensive intake, extensive lab panel, and goal-setting." },
      { phase: "Week 1-2", description: "In-depth results review and coordinated plan design with Dr. Adams." },
      { phase: "Month 1-3", description: "Implementation of hormone, regenerative, and lifestyle strategies." },
      { phase: "Quarterly", description: "Lab re-checks and plan refinement to stay aligned with your goals." },
    ],
    relatedServiceSlugs: ["regenerative-anti-aging", "bioidentical-hormone-therapy"],
    faqs: [
      {
        question: "Is this program only for older adults?",
        answer:
          "No — many patients start in their 30s and 40s as a proactive investment in long-term health, not just to address current symptoms.",
      },
      {
        question: "How is this different from the other programs?",
        answer:
          "This program takes the broadest view, combining elements from our hormone and regenerative services into one coordinated, ongoing plan with quarterly check-ins.",
      },
    ],
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
