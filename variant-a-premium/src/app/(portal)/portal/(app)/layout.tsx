import { redirect } from "next/navigation";
import { isAuthenticated, signOut } from "@/lib/auth";
import { PortalShell } from "@/components/portal/portal-shell";
import { patient } from "@/lib/data/patient";

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/portal/login");
  }

  return (
    <PortalShell
      patientName={patient.fullName}
      patientInitials={patient.initials}
      patientProgram={patient.program}
      signOutAction={signOut}
    >
      {children}
    </PortalShell>
  );
}
