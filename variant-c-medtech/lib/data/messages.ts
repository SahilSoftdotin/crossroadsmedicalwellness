export type Message = {
  id: string;
  from: "patient" | "care-team";
  authorName: string;
  date: string; // ISO datetime
  body: string;
};

export const messageThread: Message[] = [
  {
    id: "m1",
    from: "care-team",
    authorName: "Hannah Brooks, RN",
    date: "2026-05-15T09:12:00",
    body: "Hi Jordan, great news — your latest labs show solid progress on testosterone and your metabolic markers are trending in the right direction too. Dr. Adams added a note in your protocol. Let us know if you have any questions before your next visit!",
  },
  {
    id: "m2",
    from: "patient",
    authorName: "Jordan Mitchell",
    date: "2026-05-15T14:40:00",
    body: "Thanks Hannah! Definitely noticing a difference in my workouts. Quick question — is it okay to keep taking the magnesium even on nights I have a glass of wine?",
  },
  {
    id: "m3",
    from: "care-team",
    authorName: "Hannah Brooks, RN",
    date: "2026-05-15T16:02:00",
    body: "Yes, that's totally fine in moderation. Just keep an eye on your sleep quality — if you notice it's affecting things, let us know at your next check-in.",
  },
  {
    id: "m4",
    from: "care-team",
    authorName: "Hannah Brooks, RN",
    date: "2026-06-02T11:20:00",
    body: "Friendly reminder: your lab draw is coming up on 7/29. Please plan to fast for 8-10 hours beforehand (water is fine). Let us know if you need to reschedule.",
  },
];
