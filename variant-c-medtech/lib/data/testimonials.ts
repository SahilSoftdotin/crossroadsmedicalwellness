export type Testimonial = {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  programSlug?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Michael R.",
    initials: "MR",
    location: "Athens, AL",
    rating: 5,
    programSlug: "mens-hormone-health",
    quote:
      "I'd been dragging through every afternoon for years and chalked it up to getting older. After my labs and starting BioTE, my energy is completely different — I feel like myself again. Dr. Adams actually explained what was going on instead of just handing me a prescription.",
  },
  {
    id: "t2",
    name: "Karen S.",
    initials: "KS",
    location: "Athens, AL",
    rating: 5,
    programSlug: "womens-health",
    quote:
      "The hot flashes and sleepless nights were affecting everything — work, my marriage, my mood. Within a couple months of starting hormone therapy here, I finally feel like I'm sleeping again. The whole team made me feel heard from day one.",
  },
  {
    id: "t3",
    name: "David T.",
    initials: "DT",
    location: "Limestone County, AL",
    rating: 5,
    programSlug: "medical-weight-loss-program",
    quote:
      "I was skeptical of weight loss medications, but the way Dr. Adams explained the program — with real lab monitoring and a plan, not just a needle — gave me confidence. Down 32 pounds and counting, with my blood pressure improving too.",
  },
  {
    id: "t4",
    name: "Patricia W.",
    initials: "PW",
    location: "Athens, AL",
    rating: 5,
    programSlug: "longevity-anti-aging",
    quote:
      "What I appreciate most is that nobody here is trying to sell me something I don't need. Every recommendation has been backed by my actual labs, and I genuinely feel better at 58 than I did at 50.",
  },
  {
    id: "t5",
    name: "James H.",
    initials: "JH",
    location: "Athens, AL",
    rating: 5,
    programSlug: "mens-hormone-health",
    quote:
      "The pellet procedure was quick and barely noticeable. Three months in, my gym sessions feel productive again instead of exhausting. Friendly staff, easy scheduling by text, and Dr. Adams takes real time with you.",
  },
  {
    id: "t6",
    name: "Linda P.",
    initials: "LP",
    location: "Madison County, AL",
    rating: 4,
    quote:
      "Great experience overall — appreciated how thorough the initial labs were. Wait times can occasionally run long, but the quality of care more than makes up for it.",
  },
];

export const aggregateRating = {
  average: 4.9,
  count: 187,
};
