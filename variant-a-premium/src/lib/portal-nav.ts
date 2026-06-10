export type PortalNavItem = {
  label: string;
  href: string;
  /** lucide-react icon name (kebab) resolved in the sidebar */
  icon:
    | "dashboard"
    | "labs"
    | "protocol"
    | "progress"
    | "messages"
    | "appointments"
    | "account";
};

export const portalNav: PortalNavItem[] = [
  { label: "Dashboard", href: "/portal", icon: "dashboard" },
  { label: "Lab Results", href: "/portal/labs", icon: "labs" },
  { label: "My Protocol", href: "/portal/protocol", icon: "protocol" },
  { label: "Progress", href: "/portal/progress", icon: "progress" },
  { label: "Messages", href: "/portal/messages", icon: "messages" },
  { label: "Appointments", href: "/portal/appointments", icon: "appointments" },
  { label: "Account", href: "/portal/account", icon: "account" },
];
