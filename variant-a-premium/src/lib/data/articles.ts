export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  author: string;
  /** Array of paragraphs / section blocks. */
  content: { heading?: string; body: string }[];
};

export const articles: Article[] = [
  {
    slug: "understanding-perimenopause",
    title: "Understanding Perimenopause: What's Actually Happening to Your Hormones",
    category: "Hormone Health",
    excerpt:
      "Perimenopause can begin years before menopause and bring symptoms that are easy to dismiss. Here's what the science says — and what you can do about it.",
    readingTime: "6 min read",
    publishedAt: "2026-05-12",
    author: "Dr. Gary Adams",
    content: [
      {
        body: "Perimenopause is the transitional phase leading up to menopause, and for many women it begins in their early-to-mid 40s — sometimes earlier. Unlike menopause, which is a single point in time (twelve months after your final period), perimenopause is a years-long process of fluctuating hormones. That fluctuation is exactly why symptoms can feel so unpredictable.",
      },
      {
        heading: "Why the symptoms feel so random",
        body: "During perimenopause, estrogen and progesterone don't decline in a smooth, orderly way. They swing — sometimes higher than your reproductive years, sometimes far lower, often within the same month. These swings drive the classic symptoms: hot flashes, night sweats, sleep disruption, mood changes, brain fog and shifts in weight and body composition.",
      },
      {
        heading: "Why 'your labs are normal' isn't the whole story",
        body: "A single hormone reading is a snapshot of a moving target. That's why so many women are told their labs are 'normal' while they feel anything but. A thoughtful evaluation looks at the full hormonal picture — including thyroid and metabolic markers — in the context of your actual symptoms, not just reference ranges.",
      },
      {
        heading: "What you can do",
        body: "The good news is that perimenopause is treatable. Bioidentical hormone optimization, when appropriate and monitored, can smooth out the swings and relieve symptoms. Just as important are the foundations: protein-forward nutrition, strength training, sleep and stress management. The right plan is individualized — built on your data, your symptoms and your goals.",
      },
      {
        body: "If you're navigating these changes, you don't have to white-knuckle through them. A root-cause evaluation can identify exactly what's driving your symptoms and what will actually help.",
      },
    ],
  },
  {
    slug: "glp1-beyond-the-hype",
    title: "GLP-1 Medications Beyond the Hype: What Sustainable Weight Loss Requires",
    category: "Weight & Metabolism",
    excerpt:
      "GLP-1 medications are genuinely transformative — but the prescription is only part of the equation. Here's what makes results last.",
    readingTime: "7 min read",
    publishedAt: "2026-04-28",
    author: "Dr. Gary Adams",
    content: [
      {
        body: "Few developments in modern medicine have changed obesity care as dramatically as GLP-1 receptor agonists like semaglutide and tirzepatide. They reduce appetite, quiet the constant 'food noise,' and produce weight loss that was previously only possible with surgery. But the way these medications are too often prescribed — handed out with little support — sells patients short.",
      },
      {
        heading: "The muscle problem",
        body: "Rapid weight loss isn't automatically healthy weight loss. Without adequate protein and resistance training, a meaningful portion of the weight lost can come from lean muscle. Protecting muscle matters not just for strength and metabolism today, but for your function and independence decades from now.",
      },
      {
        heading: "Side effects are manageable — with supervision",
        body: "Nausea and GI side effects are common, especially early on, but they're largely manageable with careful, gradual dose titration. This is exactly where physician supervision earns its keep: starting low, going slow and adjusting to you rather than a fixed schedule.",
      },
      {
        heading: "Planning for after",
        body: "The most important question isn't how fast you lose weight — it's what happens when you reach your goal. A real program builds the nutrition and movement habits that let you maintain results, with a deliberate maintenance plan rather than an abrupt stop.",
      },
      {
        body: "Used well, within a supervised program that protects muscle and builds habits, GLP-1 therapy can be life-changing. The medication opens the door; the plan is what keeps it open.",
      },
    ],
  },
  {
    slug: "healthspan-not-just-lifespan",
    title: "Healthspan, Not Just Lifespan: Rethinking How We Age",
    category: "Longevity",
    excerpt:
      "Living longer is only worth it if you live well. Here's how a proactive, data-driven approach can extend the years you spend strong and sharp.",
    readingTime: "5 min read",
    publishedAt: "2026-04-09",
    author: "Dr. Gary Adams",
    content: [
      {
        body: "For most of medical history, the goal was simple: live longer. But adding years isn't the same as adding good years. The more meaningful target is healthspan — the portion of your life spent strong, clear-headed and independent. That distinction changes how we practice medicine.",
      },
      {
        heading: "Aging is a process you can influence",
        body: "While you can't stop aging, the trajectory is far more modifiable than most people assume. Metabolism, hormones, inflammation, muscle mass and cardiovascular health all respond to deliberate intervention — especially when you start early and measure as you go.",
      },
      {
        heading: "Measure what matters",
        body: "A proactive longevity strategy starts with data: a baseline of metabolic, hormonal and inflammatory biomarkers. From there, the plan is personalized and tracked. Re-testing tells us what's working and what to adjust, so the strategy evolves with you rather than guessing.",
      },
      {
        heading: "The unglamorous foundations",
        body: "No therapy replaces the fundamentals: strength training to preserve muscle, protein-forward nutrition, quality sleep, and stress management. Targeted therapies and hormone optimization build on that foundation — they don't substitute for it.",
      },
      {
        body: "Healthspan medicine is fundamentally optimistic. With the right data and a consistent plan, the goal isn't just more years — it's more good ones.",
      },
    ],
  },
  {
    slug: "root-cause-medicine-explained",
    title: "What 'Root-Cause Medicine' Really Means",
    category: "Our Philosophy",
    excerpt:
      "Integrative, root-cause care isn't alternative medicine. It's careful medicine that asks 'why' before reaching for a prescription.",
    readingTime: "5 min read",
    publishedAt: "2026-03-22",
    author: "Dr. Gary Adams",
    content: [
      {
        body: "The phrase 'root-cause medicine' gets used a lot, and not always carefully. At its best, it simply means refusing to stop at the symptom. Instead of only managing fatigue, weight gain or poor sleep, we ask what's actually driving them — and we treat that.",
      },
      {
        heading: "Symptoms are signals",
        body: "Fatigue isn't a diagnosis; it's a signal. It might point to a thyroid issue, hormonal decline, poor sleep, insulin resistance, nutrient gaps or chronic stress — often several at once. Treating the signal without finding the source can leave the real problem in place.",
      },
      {
        heading: "It's still evidence-based",
        body: "Root-cause care, done responsibly, is firmly grounded in evidence and physician judgment. It pairs comprehensive testing with conventional medicine. The difference is the time and curiosity invested in understanding the whole system before acting.",
      },
      {
        body: "That's the philosophy behind Crossroads: physician-owned, integrative care that blends traditional medicine with functional, root-cause approaches — so you get answers, not just prescriptions.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
