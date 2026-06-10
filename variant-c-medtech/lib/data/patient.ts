export const patient = {
  firstName: "Jordan",
  lastName: "Mitchell",
  fullName: "Jordan Mitchell",
  initials: "JM",
  email: "jordan.mitchell@example.com",
  dateOfBirth: "1979-04-12",
  memberSince: "2025-08-14",
  programSlug: "mens-hormone-health",
  programName: "Men's Hormone Health",
  careTeam: [
    { name: "Dr. Gary Adams", role: "Physician, Lead Provider" },
    { name: "Hannah Brooks, RN", role: "Care Coordinator" },
  ],
  plan: {
    name: "Men's Hormone Health — Maintenance",
    status: "Active",
    renewalDate: "2026-08-15",
    billingCycle: "Quarterly",
  },
};

export type Patient = typeof patient;
