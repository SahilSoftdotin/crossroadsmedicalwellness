export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  heroImage: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "signs-of-low-testosterone",
    title: "5 Signs Your Fatigue Might Be Low Testosterone — Not Just 'Getting Older'",
    excerpt:
      "Low energy, brain fog, and a fading drive aren't just inevitable parts of aging. Here's what to watch for and how a simple lab panel can help.",
    category: "Hormone Health",
    readTime: "5 min read",
    publishedAt: "2026-04-02",
    author: "Crossroads Medical Wellness Team",
    heroImage: "/images/articles/low-testosterone.svg",
    content: [
      "It's one of the most common conversations we have in our office: a man in his 40s or 50s who says he just feels 'off.' He's tired even after a full night's sleep. His motivation at the gym has disappeared. He's noticed his mood is shorter and his focus at work isn't what it used to be.",
      "Often, the assumption is that this is simply what getting older feels like. Sometimes that's part of the picture — but often, it's a sign that testosterone levels have declined more than expected for a person's age, and that's something that can be evaluated and addressed.",
      "Here are five signs worth paying attention to:",
      "1. Persistent fatigue that doesn't improve with rest. If you're sleeping enough but still feel drained by midday, it's worth a closer look.",
      "2. Reduced motivation and 'mental sharpness.' Many men describe this as brain fog or just feeling less engaged with things they used to enjoy.",
      "3. Changes in muscle mass or body composition. Even with consistent training, you may notice it's harder to maintain muscle or easier to gain fat around the midsection.",
      "4. Lower libido or changes in sexual function. This is one of the more commonly reported — and commonly under-discussed — symptoms.",
      "5. Mood changes, including irritability or low mood that feels different from your baseline.",
      "The good news: a comprehensive lab panel can give you real answers. If your levels are outside an optimal range, bioidentical hormone therapy (like BioTE pellet therapy) is one option Dr. Adams may discuss with you — tailored specifically to your labs and goals, with ongoing monitoring along the way.",
      "If any of this sounds familiar, the first step is simply a conversation. Reach out to our office to learn more about our Men's Hormone Health program.",
    ],
  },
  {
    slug: "glp1-medications-explained",
    title: "GLP-1 Medications, Explained: What Semaglutide and Tirzepatide Actually Do",
    excerpt:
      "These medications have changed the conversation around weight loss. Here's a clear, no-hype explanation of how they work — and what physician oversight adds.",
    category: "Weight Management",
    readTime: "6 min read",
    publishedAt: "2026-03-18",
    author: "Crossroads Medical Wellness Team",
    heroImage: "/images/articles/glp1-explained.svg",
    content: [
      "GLP-1 (glucagon-like peptide-1) medications, including semaglutide and tirzepatide, have become some of the most talked-about tools in medical weight management — and for good reason. But with so much buzz, it can be hard to separate what's actually true from what's hype.",
      "GLP-1 is a hormone your body naturally produces in response to eating. It plays a role in regulating appetite, slowing how quickly your stomach empties, and helping manage blood sugar. GLP-1 medications mimic this hormone at levels higher than your body produces on its own — which is why they can have such a noticeable effect on appetite and fullness.",
      "Semaglutide acts on GLP-1 receptors. Tirzepatide acts on both GLP-1 and a second receptor called GIP, which for some patients may translate to additional benefit. Neither is universally 'better' — the right choice depends on your health history, goals, and how your body responds.",
      "Why does physician oversight matter? These medications are typically started at a low dose and increased gradually over weeks or months. Going too fast can increase the likelihood of side effects like nausea or constipation. A physician can also evaluate whether GLP-1 therapy is appropriate for your health profile, monitor labs along the way, and adjust your plan based on how you're responding — both physically and practically.",
      "It's also worth saying clearly: these medications are a tool, not a replacement for nutrition and activity. The patients who do best combine medication with sustainable changes to how they eat and move — which is why our Medical Weight Loss Program includes regular check-ins and lifestyle guidance, not just a prescription.",
      "If you're curious whether a GLP-1 medication might be right for you, the first step is a consultation where we can review your health history and discuss options together.",
    ],
  },
  {
    slug: "perimenopause-symptoms-timeline",
    title: "Perimenopause Isn't All-or-Nothing: Understanding the Timeline of Symptoms",
    excerpt:
      "Perimenopause can start years before menopause itself — and the symptoms can be subtle at first. Here's what the transition can look like.",
    category: "Women's Health",
    readTime: "5 min read",
    publishedAt: "2026-02-22",
    author: "Crossroads Medical Wellness Team",
    heroImage: "/images/articles/perimenopause-timeline.svg",
    content: [
      "When people think of menopause, they often picture a single moment — but for most women, the transition unfolds gradually over years, in a phase called perimenopause. And the symptoms during this phase can be just as disruptive as menopause itself, even while periods are still occurring regularly.",
      "Perimenopause can begin in your late 30s or 40s, sometimes years before periods become irregular. Early signs are often subtle: slightly shorter or longer cycles, changes in sleep quality, or mood shifts that seem to have no clear trigger.",
      "As hormone levels — particularly estrogen and progesterone — begin to fluctuate more dramatically, symptoms can become more noticeable: hot flashes, night sweats, difficulty sleeping through the night, brain fog, and changes in mood or anxiety levels.",
      "One of the most frustrating parts of perimenopause for many women is being told these changes are 'normal' without being offered any options. While these changes are common, that doesn't mean you have to simply tolerate them if they're affecting your quality of life.",
      "A comprehensive evaluation — including a conversation about your symptoms and relevant lab work — can help clarify what's happening and what options might help, including bioidentical hormone therapy (BioTE) for appropriate candidates.",
      "If you're noticing changes that don't feel like 'you,' it's worth a conversation. Our Women's Health program is designed specifically around this stage of life.",
    ],
  },
  {
    slug: "what-is-integrative-medicine",
    title: "What Does 'Integrative Medicine' Actually Mean?",
    excerpt:
      "It's a term you'll see often, but what does it mean in practice? Here's how Dr. Adams approaches integrative, root-cause care.",
    category: "Our Approach",
    readTime: "4 min read",
    publishedAt: "2026-01-15",
    author: "Dr. Gary Adams",
    heroImage: "/images/articles/integrative-medicine.svg",
    content: [
      "After 30+ years in medicine, I've come to believe that the best care doesn't choose between 'conventional' and 'alternative' — it draws on whatever approach is genuinely going to help the person in front of me.",
      "Integrative medicine, as I practice it, means starting with a thorough understanding of a patient's whole health picture: their history, their labs, their lifestyle, and their goals — not just the symptom that brought them in.",
      "It also means being willing to look for root causes. If someone comes in exhausted, the conventional approach might address the symptom directly. An integrative approach asks: what's driving this? Is it hormones? Sleep? Nutrition? Something else entirely? Often it's a combination — and addressing the underlying factors tends to produce more lasting results than treating symptoms in isolation.",
      "Importantly, integrative doesn't mean 'instead of' good medicine — it means 'in addition to.' We use lab testing, evidence-based medications (including bioidentical hormones and GLP-1 medications), and careful monitoring, the same as any good medical practice. What's different is the lens: we're looking at the whole person, and we're willing to spend the time to understand what's really going on.",
      "This philosophy shapes everything we do at Crossroads — from how we approach hormone therapy and weight management to how we structure follow-up care. My goal for every patient is the same: help you feel like yourself again, with a plan that makes sense for your life.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
