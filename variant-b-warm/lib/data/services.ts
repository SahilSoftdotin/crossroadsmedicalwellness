export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: string;
  heroImage: string;
  summary: string;
  whatItIs: string[];
  whoFor: string[];
  whatToExpect: { title: string; description: string }[];
  benefits: string[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "bioidentical-hormone-therapy",
    name: "Bioidentical Hormone Therapy (BioTE)",
    shortName: "Hormone Therapy",
    tagline: "Restore balance, energy, and vitality from the inside out.",
    icon: "Sparkles",
    heroImage: "/images/services/hormone-therapy.svg",
    summary:
      "BioTE pellet therapy delivers steady, plant-derived hormones that match your body's own chemistry — helping men and women feel like themselves again.",
    whatItIs: [
      "Bioidentical hormone replacement therapy (BHRT) uses hormones that are molecularly identical to the ones your body produces naturally, sourced from plant-based compounds.",
      "At Crossroads, we use the BioTE method — small pellets inserted just under the skin during a quick in-office visit, releasing a steady, consistent dose of hormones over several months.",
      "Unlike daily pills, patches, or creams that can cause peaks and valleys, pellet therapy is designed to mimic the body's natural rhythm for more even, predictable results.",
    ],
    whoFor: [
      "Women navigating perimenopause or menopause experiencing hot flashes, night sweats, mood swings, or low libido.",
      "Men with symptoms of low testosterone — fatigue, reduced muscle mass, brain fog, or low drive.",
      "Anyone who has had bloodwork show hormone levels outside an optimal range and wants a personalized, monitored approach.",
      "Patients who have tried other hormone delivery methods and found the ups and downs hard to manage.",
    ],
    whatToExpect: [
      {
        title: "Comprehensive lab work & consultation",
        description:
          "We start with detailed bloodwork and a one-on-one conversation with Dr. Adams about your symptoms, goals, and health history.",
      },
      {
        title: "Personalized dosing plan",
        description:
          "Your pellet dose is calculated specifically for your labs, body composition, and symptom picture — not a one-size-fits-all protocol.",
      },
      {
        title: "Quick in-office insertion",
        description:
          "The pellet insertion is a brief, minimally invasive procedure performed in our office under local anesthetic, typically taking just a few minutes.",
      },
      {
        title: "Ongoing monitoring & adjustments",
        description:
          "We re-check labs and follow up regularly (most patients return every 3–5 months) to fine-tune your dose as your body responds.",
      },
    ],
    benefits: [
      "More consistent energy throughout the day",
      "Improved mood, focus, and mental clarity",
      "Better sleep quality",
      "Increased libido and sexual function",
      "Support for healthy muscle mass and metabolism",
      "Reduced hot flashes, night sweats, and mood swings",
    ],
    faqs: [
      {
        question: "How long does pellet therapy last?",
        answer:
          "Most patients receive new pellets every 3–4 months for women and 4–5 months for men, though this varies based on your metabolism and lab results.",
      },
      {
        question: "Is the insertion procedure painful?",
        answer:
          "The area is numbed with local anesthetic first. Most patients describe mild pressure during insertion and minimal discomfort afterward — many return to normal activity the same day.",
      },
      {
        question: "Will I need ongoing labs?",
        answer:
          "Yes. We recheck hormone levels periodically to make sure your dose stays optimized for your body as it changes over time.",
      },
      {
        question: "Is BHRT covered by insurance?",
        answer:
          "Coverage varies by plan and is often limited for hormone pellet therapy. Many patients use HSA/FSA funds. Our team can help you understand your options — give us a call.",
      },
    ],
  },
  {
    slug: "medical-weight-loss",
    name: "Medical Weight Loss",
    shortName: "Weight Loss",
    tagline: "Physician-guided weight loss with GLP-1 medications and real support.",
    icon: "Activity",
    heroImage: "/images/services/weight-loss.svg",
    summary:
      "Our medical weight loss program pairs FDA-approved GLP-1 medications like semaglutide and tirzepatide with physician oversight, lab monitoring, and lifestyle coaching.",
    whatItIs: [
      "Medical weight loss at Crossroads centers on GLP-1 receptor agonist medications — including semaglutide and tirzepatide — which help regulate appetite, slow digestion, and support steady, sustainable fat loss.",
      "These medications are prescribed and monitored by Dr. Adams, with dosing adjusted gradually based on your response and any side effects.",
      "We pair medication with nutrition guidance, activity recommendations, and regular check-ins so weight loss is sustainable — not just a number on a scale.",
    ],
    whoFor: [
      "Adults with a BMI that qualifies for medical weight management, or those with weight-related health conditions like prediabetes, high blood pressure, or joint pain.",
      "People who have struggled with yo-yo dieting and want a medically supervised approach with accountability.",
      "Patients looking to improve metabolic markers (blood sugar, cholesterol, blood pressure) alongside weight loss.",
      "Anyone curious whether GLP-1 medications are a good fit for their health profile and goals.",
    ],
    whatToExpect: [
      {
        title: "Initial consultation & labs",
        description:
          "We review your health history, current medications, and run baseline labs to ensure GLP-1 therapy is appropriate and safe for you.",
      },
      {
        title: "Personalized starting dose",
        description:
          "Treatment begins at a low dose to minimize side effects, with a gradual titration schedule designed around how your body responds.",
      },
      {
        title: "Weekly or bi-weekly dosing",
        description:
          "Most GLP-1 medications are self-administered as a simple weekly injection. Our team will walk you through technique and storage.",
      },
      {
        title: "Regular follow-ups",
        description:
          "We check in regularly to track progress, adjust dosing, manage any side effects, and celebrate milestones along the way.",
      },
    ],
    benefits: [
      "Significant, sustainable fat loss when paired with lifestyle changes",
      "Reduced appetite and fewer food cravings",
      "Improvements in blood sugar, blood pressure, and cholesterol",
      "Physician oversight to manage side effects safely",
      "Ongoing accountability and support — not a 'set it and forget it' prescription",
      "Coordination with other Crossroads programs (hormones, labs) for whole-person care",
    ],
    faqs: [
      {
        question: "What's the difference between semaglutide and tirzepatide?",
        answer:
          "Both are GLP-1 medications that reduce appetite and support weight loss. Tirzepatide also acts on a second receptor (GIP) and may produce greater results for some patients. Dr. Adams will help determine which is the better fit for you.",
      },
      {
        question: "What side effects should I expect?",
        answer:
          "The most common side effects are mild nausea, constipation, or fatigue, especially when starting or increasing a dose. Starting low and going slow helps minimize these — and we're available if you have concerns.",
      },
      {
        question: "Do I need to change my diet too?",
        answer:
          "Yes — medication works best alongside protein-forward nutrition, adequate hydration, and movement. We'll provide practical guidance, not a rigid diet plan.",
      },
      {
        question: "How is this billed?",
        answer:
          "Program and medication costs are discussed during your consultation. Many patients use HSA/FSA funds. We'll be transparent about pricing before you start.",
      },
    ],
  },
  {
    slug: "aesthetics",
    name: "Aesthetics",
    shortName: "Aesthetics",
    tagline: "Look as good as you feel with laser hair restoration and aesthetic care.",
    icon: "Sun",
    heroImage: "/images/services/aesthetics.svg",
    summary:
      "From low-level laser hair restoration to other aesthetic treatments, our aesthetics services help you feel confident and refreshed — administered with the same physician-led care as the rest of our practice.",
    whatItIs: [
      "Our aesthetics offerings are designed to complement your overall wellness — including low-level laser therapy (LLLT) for hair restoration, which stimulates hair follicles to support thicker, healthier-looking hair over time.",
      "Treatments are non-invasive and performed in a relaxed, spa-like setting within our medical practice.",
      "Because aesthetics is part of an integrative practice, we can also consider how hormones, nutrition, and overall health may be impacting hair, skin, and appearance.",
    ],
    whoFor: [
      "Men and women experiencing thinning hair or early-stage hair loss looking for a non-surgical option.",
      "Patients interested in aesthetic treatments delivered in a medical (not just cosmetic) setting with physician oversight.",
      "Anyone already working with us on hormone or weight management who wants to address appearance-related goals as part of their overall plan.",
    ],
    whatToExpect: [
      {
        title: "Consultation & assessment",
        description:
          "We'll talk through your goals, examine the areas of concern, and discuss whether laser hair restoration or another option is the right starting point.",
      },
      {
        title: "Comfortable, in-office sessions",
        description:
          "Low-level laser treatments are painless and typically take well under an hour — many patients relax, read, or catch up on email during sessions.",
      },
      {
        title: "A consistent treatment schedule",
        description:
          "Results build gradually with consistency. We'll outline a realistic schedule and what kind of timeline to expect for visible changes.",
      },
      {
        title: "Whole-person follow-up",
        description:
          "If hormones, stress, or nutrition may be contributing to hair or skin concerns, we'll discuss how those pieces fit into your broader plan.",
      },
    ],
    benefits: [
      "Non-invasive, comfortable treatment sessions",
      "Support for thicker, healthier-looking hair over time",
      "Delivered in a medical setting with physician oversight",
      "Can be paired with hormone or wellness programs for a whole-person approach",
      "Relaxed, welcoming environment — not a typical clinical visit",
    ],
    faqs: [
      {
        question: "How soon will I see results from laser hair restoration?",
        answer:
          "Hair growth cycles take time — most patients begin noticing changes in hair thickness and shedding after a few months of consistent treatment.",
      },
      {
        question: "Is laser hair restoration painful?",
        answer:
          "No. Low-level laser therapy is painless — most patients describe it as simply sitting comfortably while the device does its work.",
      },
      {
        question: "Can hormones affect hair loss?",
        answer:
          "Yes, hormonal imbalances can contribute to hair thinning in both men and women. If that's a possibility for you, we can discuss hormone testing as part of your visit.",
      },
      {
        question: "What other aesthetic services do you offer?",
        answer:
          "Our aesthetics menu is growing — call or text our office for the most current list of treatments and availability.",
      },
    ],
  },
  {
    slug: "regenerative-anti-aging",
    name: "Regenerative & Anti-Aging Therapies",
    shortName: "Regenerative Medicine",
    tagline: "Support your body's natural ability to repair, recover, and thrive.",
    icon: "Leaf",
    heroImage: "/images/services/regenerative.svg",
    summary:
      "Our regenerative and anti-aging therapies are designed to support recovery, reduce inflammation, and help you maintain strength and vitality as you age — all guided by Dr. Adams' integrative approach.",
    whatItIs: [
      "Regenerative and anti-aging medicine focuses on supporting the body's own repair processes — addressing inflammation, recovery, and cellular health rather than just masking symptoms.",
      "Depending on your goals and health profile, this may include nutrient support, peptide therapies, and other physician-guided regenerative options discussed during your consultation.",
      "These therapies are often combined with hormone optimization and weight management for a comprehensive longevity-focused plan.",
    ],
    whoFor: [
      "Patients interested in proactive, longevity-focused care — not just treating problems as they arise.",
      "Active adults and athletes looking to support recovery and reduce downtime from training or injury.",
      "Anyone interested in a root-cause approach to fatigue, slow recovery, or age-related changes in energy and function.",
      "Patients already working with Crossroads on hormones or weight loss who want to add a regenerative component to their plan.",
    ],
    whatToExpect: [
      {
        title: "In-depth consultation",
        description:
          "Dr. Adams will review your health history, current symptoms, and goals to determine which regenerative options may be appropriate for you.",
      },
      {
        title: "Lab review where appropriate",
        description:
          "Bloodwork may be used to identify nutrient deficiencies, inflammation markers, or other factors relevant to your plan.",
      },
      {
        title: "A tailored regenerative plan",
        description:
          "Your plan is built around your specific goals — whether that's recovery, energy, resilience, or general longevity support.",
      },
      {
        title: "Ongoing check-ins",
        description:
          "We monitor your progress and adjust your plan over time as your body responds and your goals evolve.",
      },
    ],
    benefits: [
      "Support for the body's natural repair and recovery processes",
      "A proactive, root-cause approach to aging and energy",
      "Personalized plans based on labs and goals — not generic protocols",
      "Can be combined with hormone therapy and weight management programs",
      "Guided throughout by an experienced, physician-led team",
    ],
    faqs: [
      {
        question: "What does 'regenerative medicine' actually include?",
        answer:
          "It's a broad category that can include nutrient and peptide-based therapies, recovery support, and other approaches aimed at supporting the body's repair systems. Dr. Adams will discuss specific options that fit your situation during a consultation.",
      },
      {
        question: "Is this only for older adults?",
        answer:
          "Not at all. Many active adults in their 30s and 40s use regenerative therapies to support training recovery, energy, and long-term resilience.",
      },
      {
        question: "How does this connect to hormone therapy?",
        answer:
          "Hormones, inflammation, and recovery are closely linked. Many patients combine BioTE hormone optimization with regenerative therapies for a more complete plan.",
      },
      {
        question: "How do I know if this is right for me?",
        answer:
          "The best next step is a consultation with Dr. Adams, where we'll discuss your goals, review relevant labs, and recommend an approach tailored to you.",
      },
    ],
  },
  {
    slug: "addiction-therapy",
    name: "Addiction Therapy",
    shortName: "Addiction Therapy",
    tagline: "Compassionate, physician-led support on the path to recovery.",
    icon: "HeartHandshake",
    heroImage: "/images/services/addiction-therapy.svg",
    summary:
      "Crossroads offers specialized addiction treatment services with the same compassionate, integrative approach that defines our practice — because lasting recovery addresses the whole person.",
    whatItIs: [
      "Our addiction therapy services provide physician-led support for individuals seeking help with substance use, combining medical guidance with a compassionate, judgment-free approach.",
      "As an integrative practice, we consider how physical health, hormones, sleep, and nutrition interact with recovery — supporting your overall well-being, not just one piece of it.",
      "Care is confidential and tailored to your individual situation and goals.",
    ],
    whoFor: [
      "Individuals seeking medical support as part of their recovery journey.",
      "Patients looking for a private, integrative practice setting rather than a large institutional program.",
      "Anyone wanting to discuss options confidentially with a physician who takes a whole-person approach.",
      "Family members seeking guidance on how to support a loved one (initial conversations welcome).",
    ],
    whatToExpect: [
      {
        title: "Confidential consultation",
        description:
          "Your first conversation with Dr. Adams is private and focused on understanding your situation, history, and goals — without judgment.",
      },
      {
        title: "A personalized plan",
        description:
          "Treatment recommendations are tailored to your needs and may include medical support, monitoring, and coordination with other resources as appropriate.",
      },
      {
        title: "Whole-person care",
        description:
          "We consider how sleep, nutrition, hormones, and stress affect recovery, and incorporate those factors into your plan where helpful.",
      },
      {
        title: "Ongoing, compassionate follow-up",
        description:
          "Recovery is a journey — we're here for consistent follow-up and support as you move forward.",
      },
    ],
    benefits: [
      "Compassionate, confidential, physician-led support",
      "A whole-person approach that considers physical health alongside recovery",
      "Personalized care plans rather than one-size-fits-all programs",
      "A private practice setting with continuity of care",
      "Coordination with other Crossroads services as appropriate",
    ],
    faqs: [
      {
        question: "Is this confidential?",
        answer:
          "Yes. As with all care at Crossroads, your privacy is a priority. Conversations about addiction therapy are handled with discretion and compassion.",
      },
      {
        question: "Do you offer ongoing care, or just an initial consultation?",
        answer:
          "We provide ongoing, physician-led support as part of your recovery plan. The right cadence of visits will be discussed based on your individual needs.",
      },
      {
        question: "Can I bring a family member to my first visit?",
        answer:
          "We're happy to discuss your preferences — please call our office to talk through what would be most helpful for your first appointment.",
      },
      {
        question: "How do I get started?",
        answer:
          "Call or text our office to schedule a confidential consultation. There's no online intake required for this service — we want to talk with you directly.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
