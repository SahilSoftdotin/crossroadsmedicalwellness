export type Message = {
  id: string;
  from: "patient" | "care-team";
  authorName: string;
  date: string; // YYYY-MM-DD
  body: string;
};

export type MessageThread = {
  id: string;
  subject: string;
  lastUpdated: string;
  unread: boolean;
  messages: Message[];
};

export const messageThreads: MessageThread[] = [
  {
    id: "thread-1",
    subject: "Quarterly lab results are in",
    lastUpdated: "2026-05-21",
    unread: true,
    messages: [
      {
        id: "m1",
        from: "care-team",
        authorName: "Mia Chen, RN",
        date: "2026-05-21",
        body: "Hi Jordan! Your latest labs are posted in the Labs tab. Great progress across the board — testosterone, vitamin D, and your metabolic markers are all trending in the right direction. Dr. Adams reviewed everything and your current protocol stays the same. Let us know if you have any questions!",
      },
    ],
  },
  {
    id: "thread-2",
    subject: "Question about injection site rotation",
    lastUpdated: "2026-05-10",
    unread: false,
    messages: [
      {
        id: "m2",
        from: "patient",
        authorName: "Jordan Reese",
        date: "2026-05-09",
        body: "Hi! Quick question — is it okay to use my thigh for the semaglutide injection if my stomach feels a little tender from last week's shot?",
      },
      {
        id: "m3",
        from: "care-team",
        authorName: "Mia Chen, RN",
        date: "2026-05-10",
        body: "Absolutely — rotating between your abdomen, thigh, and upper arm is recommended. A little tenderness is normal, especially early on. If it doesn't improve in a couple of days or you notice swelling/redness, give us a call.",
      },
    ],
  },
  {
    id: "thread-3",
    subject: "Upcoming appointment reminder",
    lastUpdated: "2026-04-28",
    unread: false,
    messages: [
      {
        id: "m4",
        from: "care-team",
        authorName: "Crossroads Front Desk",
        date: "2026-04-28",
        body: "This is a friendly reminder that your hormone optimization follow-up and quarterly labs are scheduled for June 24th at 10:00 AM. Please arrive 10 minutes early and continue fasting if your last meal is more than 8 hours before your appointment.",
      },
    ],
  },
];
