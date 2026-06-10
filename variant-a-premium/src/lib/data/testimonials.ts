export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  service: string;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Karen M.",
    location: "Athens, AL",
    rating: 5,
    service: "Women's Health",
    initials: "KM",
    quote:
      "After two years of being told my labs were 'normal,' Dr. Adams actually listened. Within a month of starting hormone therapy I was sleeping through the night again. I feel like myself for the first time in years.",
  },
  {
    id: "t2",
    name: "Dale R.",
    location: "Decatur, AL",
    rating: 5,
    service: "Men's Hormone Health",
    initials: "DR",
    quote:
      "I came in exhausted and foggy and figured it was just my age. Six months later my energy is back, I'm stronger in the gym, and the brain fog is gone. The whole team treats you like a person, not a number.",
  },
  {
    id: "t3",
    name: "Stephanie L.",
    location: "Madison, AL",
    rating: 5,
    service: "Medical Weight Loss",
    initials: "SL",
    quote:
      "I've tried every diet there is. The difference here was the medical support — they managed the medication carefully and coached me on protein and strength. I'm down 38 pounds and it's actually staying off.",
  },
  {
    id: "t4",
    name: "James T.",
    location: "Athens, AL",
    rating: 5,
    service: "Longevity & Anti-Aging",
    initials: "JT",
    quote:
      "What I appreciate is the data. They showed me my numbers, explained what they meant, and built a plan around them. My inflammation markers are down and I recover from workouts like I'm 40 again.",
  },
  {
    id: "t5",
    name: "Renee P.",
    location: "Huntsville, AL",
    rating: 5,
    service: "Hormone Therapy",
    initials: "RP",
    quote:
      "The pellet therapy was quick and easy, and the follow-up testing made me feel safe the whole way. My hot flashes are basically gone and my mood is steady. I recommend Crossroads to everyone I know.",
  },
  {
    id: "t6",
    name: "Michael B.",
    location: "Athens, AL",
    rating: 5,
    service: "Regenerative & Anti-Aging",
    initials: "MB",
    quote:
      "Dr. Adams takes the time to explain the 'why' behind everything. This is the first practice that treated my health as a whole system instead of handing me another prescription and rushing me out.",
  },
];
