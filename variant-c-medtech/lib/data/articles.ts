export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "understanding-your-hormone-panel",
    title: "Understanding Your Hormone Panel: What the Numbers Actually Mean",
    excerpt:
      "Lab reports can feel like alphabet soup. Here's a plain-language guide to the key markers we review when evaluating hormone health — and why ranges alone don't tell the whole story.",
    category: "Hormone Health",
    readTime: "6 min read",
    publishedAt: "2026-04-02",
    author: "THRIVE Longevity Center Team",
    content: [
      "When patients see their lab results for the first time, the page full of abbreviations and reference ranges can feel overwhelming. Total testosterone, free testosterone, estradiol, SHBG, TSH — each plays a role, but no single number tells the whole story.",
      "At THRIVE Longevity Center, Dr. Adams looks at your hormone panel as a picture, not a checklist. A value that falls within the 'normal' range on a lab report isn't always optimal for your symptoms, age, and goals. That's why your consultation includes a conversation about how you feel, not just where your numbers land on a chart.",
      "Total testosterone measures the overall amount of testosterone in your blood, while free testosterone reflects the portion that's actually available for your body to use — bound testosterone is largely inactive. SHBG (sex hormone-binding globulin) affects how much testosterone is 'free' versus bound, so it's an important piece of the puzzle.",
      "For women, estradiol and progesterone levels shift significantly during perimenopause, often well before periods become irregular. Tracking these alongside symptoms like sleep quality, mood, and hot flashes gives a much clearer picture than lab values in isolation.",
      "Thyroid markers (TSH, free T3, free T4) are also commonly reviewed, since thyroid function affects energy, metabolism, and mood — and can sometimes mimic or compound hormone-related symptoms.",
      "The bottom line: lab values are a starting point for a conversation, not a verdict. If you've been told your labs are 'normal' but you don't feel like yourself, it may be worth a more detailed look at the full picture — including how those numbers compare to an optimal range for your goals, not just the population average.",
    ],
  },
  {
    slug: "glp1-medications-explained",
    title: "GLP-1 Medications Explained: How Semaglutide and Tirzepatide Work",
    excerpt:
      "Semaglutide and tirzepatide have changed the conversation around medical weight loss. Here's how they actually work in the body, and what physician supervision adds to the equation.",
    category: "Weight Management",
    readTime: "7 min read",
    publishedAt: "2026-03-18",
    author: "THRIVE Longevity Center Team",
    content: [
      "GLP-1 (glucagon-like peptide-1) is a hormone your body naturally produces in response to eating. It plays a role in regulating blood sugar, slowing gastric emptying, and signaling fullness to your brain. Medications like semaglutide are designed to mimic this hormone, amplifying its effects.",
      "Tirzepatide goes a step further by also acting on a second receptor, GIP (glucose-dependent insulinotropic polypeptide), which some research suggests may enhance the effect on appetite regulation and metabolic markers for certain patients.",
      "In practice, patients on these medications often describe a significant reduction in 'food noise' — the constant background thoughts about eating — along with feeling fuller for longer after meals. This can make it dramatically easier to make consistent nutrition choices.",
      "However, medication is only one part of a successful program. Without adequate protein intake and some level of activity, patients can lose lean muscle mass along with fat. That's why our medical weight loss program pairs GLP-1 therapy with nutrition coaching focused on preserving muscle and supporting metabolism.",
      "Physician supervision matters for several reasons: starting at the right dose, titrating gradually to manage side effects like nausea, monitoring labs for any changes in metabolic markers, and adjusting the plan as your body responds over time.",
      "If you're considering a GLP-1 medication, the most important first step is an honest conversation with a physician about your health history, goals, and what a sustainable plan looks like for you — not just the prescription itself.",
    ],
  },
  {
    slug: "signs-of-low-testosterone-in-men",
    title: "5 Signs of Low Testosterone Men Often Dismiss",
    excerpt:
      "Fatigue, mood changes, and reduced motivation are often written off as 'just getting older.' Here are five common signs worth discussing with your physician.",
    category: "Men's Health",
    readTime: "5 min read",
    publishedAt: "2026-02-10",
    author: "THRIVE Longevity Center Team",
    content: [
      "Testosterone naturally declines with age, but the rate and impact vary significantly from person to person. Many men attribute the effects to stress, work, or simply getting older — when a simple lab test could reveal a treatable hormone imbalance.",
      "1. Persistent fatigue. Not the kind of tired that a good night's sleep fixes, but a pervasive low energy that affects motivation and focus throughout the day.",
      "2. Reduced muscle mass or increased body fat, especially around the midsection, despite consistent training and diet.",
      "3. Low libido or changes in sexual function. This is one of the more commonly recognized signs, but many men wait years before mentioning it to a doctor.",
      "4. Mood changes — including increased irritability, low motivation, or a general sense of mental fog that wasn't there before.",
      "5. Sleep disruption, including difficulty falling asleep, staying asleep, or waking up feeling unrested even after a full night.",
      "None of these signs alone confirms low testosterone — many things can cause fatigue or mood changes. But if several of these resonate and have persisted for months, a comprehensive hormone panel is a reasonable, low-risk next step. At THRIVE Longevity Center, that panel is the starting point for every hormone consultation, so any treatment plan is based on your actual numbers, not guesswork.",
    ],
  },
  {
    slug: "perimenopause-vs-menopause",
    title: "Perimenopause vs. Menopause: What's the Difference, and Why Does It Matter?",
    excerpt:
      "Many women are surprised to learn that hormone-related symptoms can begin years before menopause officially starts. Here's what's actually happening — and why early support can help.",
    category: "Women's Health",
    readTime: "6 min read",
    publishedAt: "2026-01-22",
    author: "THRIVE Longevity Center Team",
    content: [
      "Menopause is technically defined as 12 consecutive months without a menstrual period. Perimenopause is the transition leading up to that point — and it can last anywhere from a few years to over a decade.",
      "During perimenopause, hormone levels (especially estrogen and progesterone) fluctuate rather than steadily decline, which is part of why symptoms can feel unpredictable. Hot flashes, night sweats, mood swings, irregular periods, and sleep disruption are all common during this phase — even while periods are still occurring.",
      "Many women are told their symptoms are 'normal for their age' without further evaluation, or assume hormone support isn't relevant until periods stop entirely. In reality, lab testing during perimenopause can identify imbalances that, when addressed, may meaningfully improve quality of life well before menopause is reached.",
      "At THRIVE Longevity Center, our Women's Health program is designed to meet women wherever they are in this transition — whether symptoms are just beginning or fully established after menopause. A comprehensive panel, paired with a conversation about your specific symptoms, helps Dr. Adams design a plan that fits your stage of life.",
      "If hot flashes, sleep issues, or mood changes are affecting your daily life — regardless of whether your periods have stopped — it's worth having that conversation sooner rather than later.",
    ],
  },
  {
    slug: "what-is-functional-medicine",
    title: "What Does 'Integrative' or 'Functional' Medicine Actually Mean?",
    excerpt:
      "These terms get used a lot, but what do they mean in practice? Here's how Dr. Adams applies an integrative, root-cause approach at THRIVE Longevity Center.",
    category: "Our Approach",
    readTime: "5 min read",
    publishedAt: "2025-12-15",
    author: "Dr. Gary Adams",
    content: [
      "Traditional medicine excels at diagnosing and treating acute conditions — infections, injuries, emergencies. Integrative or functional medicine takes a complementary approach, focused on understanding why a chronic symptom is happening in the first place, and addressing contributing factors together rather than in isolation.",
      "In practice, this often means looking beyond a single lab value or symptom. Fatigue, for example, could be related to thyroid function, hormone levels, sleep quality, nutrient status, or a combination of factors. An integrative evaluation considers these together rather than addressing each with a separate, disconnected prescription.",
      "This doesn't mean rejecting conventional medicine — quite the opposite. At THRIVE, we use standard lab testing, evidence-based medications (including bioidentical hormones and GLP-1 therapies), and conventional diagnostic tools. The difference is in how we use that information: as pieces of a broader picture, with the goal of addressing root causes alongside symptom relief.",
      "With over 30 years of clinical experience, I've seen how often patients are told their labs are 'normal' while continuing to feel unwell. An integrative approach doesn't dismiss those lab results — it asks what else might be going on, and builds a plan around the whole person.",
    ],
  },
  {
    slug: "hsa-fsa-and-wellness-care",
    title: "Using HSA & FSA Funds for Integrative Wellness Care",
    excerpt:
      "Many patients don't realize their HSA or FSA dollars may apply to services like hormone therapy or medical weight loss. Here's what to know before your visit.",
    category: "Practical Guides",
    readTime: "4 min read",
    publishedAt: "2025-11-30",
    author: "THRIVE Longevity Center Team",
    content: [
      "Health Savings Accounts (HSAs) and Flexible Spending Accounts (FSAs) allow you to set aside pre-tax dollars for qualified medical expenses — and many integrative wellness services may qualify, depending on your plan and how the service is billed.",
      "Because eligibility rules vary by plan administrator, the most reliable approach is to check directly with your HSA/FSA provider before your visit, and to ask our front desk team how a given service will be coded for your records.",
      "Keeping documentation — including a letter of medical necessity from Dr. Adams when applicable — can also help support reimbursement for certain services.",
      "If cost is a factor in deciding whether to move forward with a program, it's worth a quick call to our office. Our team can walk you through current pricing and help you understand what documentation might support using HSA/FSA funds for your care.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
