export type Message = {
  id: string;
  author: "patient" | "care-team";
  name: string;
  initials: string;
  timestamp: string;
  body: string;
};

export const messageThread = {
  subject: "Latest labs & how you're feeling",
  participants: ["Jordan Avery", "Dr. Gary Adams", "Morgan Reece, RN"],
  messages: [
    {
      id: "m1",
      author: "care-team",
      name: "Morgan Reece, RN",
      initials: "MR",
      timestamp: "2026-05-22T09:12:00",
      body: "Hi Jordan — your May labs are in and they look great. Testosterone is now in the optimal range and your inflammation marker (hs-CRP) dropped to 0.8. Dr. Adams will review everything at your June visit, but wanted to share the good news early.",
    },
    {
      id: "m2",
      author: "patient",
      name: "Jordan Avery",
      initials: "JA",
      timestamp: "2026-05-22T13:40:00",
      body: "That's fantastic, thank you! Energy has honestly been the best it's been in years. One question — my vitamin D is still a little below where we want it. Should I increase the dose?",
    },
    {
      id: "m3",
      author: "care-team",
      name: "Dr. Gary Adams",
      initials: "GA",
      timestamp: "2026-05-23T10:05:00",
      body: "Glad to hear it, Jordan. Your D is moving in the right direction (38, up from 22). Let's keep the current 5,000 IU dose with K2 through summer and recheck in June — sun exposure this time of year usually gives us a nice bump too. We'll make a final call then.",
    },
    {
      id: "m4",
      author: "patient",
      name: "Jordan Avery",
      initials: "JA",
      timestamp: "2026-05-23T16:22:00",
      body: "Sounds good. I've also been consistent with the magnesium at night and sleep has improved a lot. See you at the June appointment.",
    },
    {
      id: "m5",
      author: "care-team",
      name: "Morgan Reece, RN",
      initials: "MR",
      timestamp: "2026-05-24T08:30:00",
      body: "Wonderful — I've confirmed your Quarterly Protocol Review for June 24 at 10:30 AM. You'll get a reminder a few days before. Reach out anytime in the meantime!",
    },
  ] as Message[],
};
