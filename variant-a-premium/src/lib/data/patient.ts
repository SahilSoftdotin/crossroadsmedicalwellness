export const patient = {
  id: "demo-patient-001",
  firstName: "Jordan",
  lastName: "Avery",
  fullName: "Jordan Avery",
  initials: "JA",
  email: "jordan.avery@example.com",
  phone: "(256) 555-0148",
  dateOfBirth: "1981-07-14",
  memberSince: "2025-09-01",
  program: "Longevity & Anti-Aging",
  careTeam: [
    { name: "Dr. Gary Adams", role: "Physician", initials: "GA" },
    { name: "Morgan Reece, RN", role: "Care Coordinator", initials: "MR" },
  ],
  plan: {
    name: "Longevity & Anti-Aging — Optimize",
    status: "Active",
    renewsOn: "2026-09-01",
    monthlyPrice: 249,
    benefits: [
      "Quarterly comprehensive lab panels",
      "Physician protocol reviews",
      "Unlimited care-team messaging",
      "Hormone & metabolic optimization",
    ],
  },
} as const;

export type Patient = typeof patient;
