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
    name: "Karen M.",
    initials: "KM",
    location: "Athens, AL",
    rating: 5,
    programSlug: "womens-health",
    quote:
      "I'd been telling myself the night sweats and brain fog were 'just part of getting older.' After starting BioTE with Dr. Adams, I finally feel like myself again. The whole team made me feel heard from day one.",
  },
  {
    id: "t2",
    name: "Mark T.",
    initials: "MT",
    location: "Madison, AL",
    rating: 5,
    programSlug: "mens-hormone-health",
    quote:
      "I was skeptical about hormone therapy, but the labs and explanation made it click. My energy in the gym and at work has completely turned around in a few months.",
  },
  {
    id: "t3",
    name: "Susan P.",
    initials: "SP",
    location: "Athens, AL",
    rating: 5,
    programSlug: "medical-weight-loss-program",
    quote:
      "What I appreciated most was that this never felt like 'just take this shot and good luck.' Every visit, someone actually checked in on how I was doing.",
  },
  {
    id: "t4",
    name: "Donald R.",
    initials: "DR",
    location: "Huntsville, AL",
    rating: 5,
    programSlug: "longevity-anti-aging",
    quote:
      "Dr. Adams takes the time to explain the 'why' behind everything. It's the first time a doctor has looked at my labs and my life as a whole picture instead of one complaint at a time.",
  },
  {
    id: "t5",
    name: "Angela W.",
    initials: "AW",
    location: "Athens, AL",
    rating: 5,
    programSlug: "womens-health",
    quote:
      "The office feels warm and welcoming, not clinical and rushed. I never feel like a number here.",
  },
  {
    id: "t6",
    name: "Brian K.",
    initials: "BK",
    location: "Decatur, AL",
    rating: 4,
    programSlug: "medical-weight-loss-program",
    quote:
      "Down 32 pounds and counting. The follow-up appointments kept me accountable in a way I never managed on my own.",
  },
];

export const aggregateRating = {
  value: 4.9,
  count: 187,
};
