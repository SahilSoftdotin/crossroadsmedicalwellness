export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Treatments", href: "/treatments" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Research", href: "/research" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  Care: [
    { label: "All Services", href: "/services" },
    { label: "Treatments", href: "/treatments" },
    { label: "Programs", href: "/programs" },
    { label: "Health Assessment", href: "/assessment" },
    { label: "Patient Portal", href: "/portal/login" },
  ],
  Clinic: [
    { label: "About Dr. Adams", href: "/about" },
    { label: "Patient Reviews", href: "/reviews" },
    { label: "Research & Education", href: "/research" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Book a Consult", href: "/assessment" },
    { label: "Get Started", href: "/assessment" },
  ],
} as const;
