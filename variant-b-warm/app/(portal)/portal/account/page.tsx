import type { Metadata } from "next";
import {
  UserCircle,
  Mail,
  CalendarCheck,
  CreditCard,
  Receipt,
  ShieldCheck,
  Stethoscope,
  Phone,
} from "lucide-react";
import { PortalPageHeader } from "@/components/portal/portal-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { patient } from "@/lib/data/patient";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your profile, plan, and billing information.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const billingHistory = [
  { id: "inv-2026-05", date: "2026-05-01", description: "Monthly plan — Hormone Optimization + Longevity", amount: "$249.00", status: "Paid" },
  { id: "inv-2026-04", date: "2026-04-01", description: "Monthly plan — Hormone Optimization + Longevity", amount: "$249.00", status: "Paid" },
  { id: "inv-2026-03", date: "2026-03-01", description: "Monthly plan + BioTE pellet refresh", amount: "$549.00", status: "Paid" },
];

export default function PortalAccountPage() {
  return (
    <div>
      <PortalPageHeader
        title="Account"
        description="Manage your profile, plan, and billing details."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
            <UserCircle className="h-5 w-5 text-terracotta" aria-hidden="true" />
            Profile
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" defaultValue={patient.firstName} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" defaultValue={patient.lastName} readOnly />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" defaultValue={patient.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" defaultValue={formatDate(patient.dateOfBirth)} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberSince">Patient since</Label>
              <Input id="memberSince" defaultValue={formatDate(patient.memberSince)} readOnly />
            </div>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-cream-soft p-3 text-xs leading-relaxed text-brown-soft">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" aria-hidden="true" />
            This is a read-only demo profile. To update your information, please
            contact our office directly.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full" disabled>
              Edit profile
            </Button>
            <Button variant="outline" className="rounded-full" disabled>
              Change password
            </Button>
          </div>
        </div>

        {/* Care team */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
            <Stethoscope className="h-5 w-5 text-terracotta" aria-hidden="true" />
            Your Care Team
          </h2>
          <ul className="mt-4 space-y-3">
            {patient.careTeam.map((member) => (
              <li key={member.name} className="flex items-center justify-between gap-3 rounded-2xl bg-cream-soft p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-brown">{member.name}</p>
                  <p className="truncate text-xs text-brown-soft">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm text-brown-soft">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-sage-dark" aria-hidden="true" />
              <a href={clinic.phoneHref} className="hover:underline">{clinic.phone}</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-sage-dark" aria-hidden="true" />
              <a href={`mailto:${clinic.email}`} className="hover:underline">{clinic.email}</a>
            </p>
          </div>
        </div>

        {/* Plan / subscription */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
              <CalendarCheck className="h-5 w-5 text-terracotta" aria-hidden="true" />
              Plan &amp; Subscription
            </h2>
            <Badge className="bg-sage-light px-3 py-1 text-sage-dark">
              {patient.planStatus}
            </Badge>
          </div>
          <div className="mt-4 rounded-2xl bg-cream-soft p-5">
            <p className="font-display text-lg font-bold text-brown">{patient.plan}</p>
            <p className="mt-1 text-sm text-brown-soft">
              Includes BioTE hormone pellet therapy, semaglutide management,
              quarterly lab panels, and ongoing care team support.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-2xl font-extrabold text-brown">
                  $249<span className="text-sm font-semibold text-brown-soft">/month</span>
                </p>
                <p className="text-xs text-brown-soft">Next billing date: July 1, 2026</p>
              </div>
              <Button variant="outline" className="rounded-full" disabled>
                Manage plan
              </Button>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
            <CreditCard className="h-5 w-5 text-terracotta" aria-hidden="true" />
            Payment Method
          </h2>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-cream-soft p-4">
            <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-brown text-xs font-bold text-cream">
              VISA
            </span>
            <div>
              <p className="text-sm font-semibold text-brown">Visa &middot;&middot;&middot;&middot; 4242</p>
              <p className="text-xs text-brown-soft">Expires 08/2028</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full rounded-full" disabled>
            Update payment method
          </Button>
          <p className="mt-3 text-center text-xs text-brown-soft">
            Demo data — no real payment information is stored.
          </p>
        </div>

        {/* Billing history */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-3">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-brown">
            <Receipt className="h-5 w-5 text-terracotta" aria-hidden="true" />
            Billing History
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs font-semibold uppercase tracking-wider text-brown-soft">
                  <th scope="col" className="py-2 pr-4 font-semibold">Date</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Description</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Amount</th>
                  <th scope="col" className="py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {billingHistory.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="py-3 pr-4 whitespace-nowrap text-brown-soft">
                      {formatDate(invoice.date)}
                    </td>
                    <td className="py-3 pr-4 text-brown">{invoice.description}</td>
                    <td className="py-3 pr-4 whitespace-nowrap font-semibold text-brown">
                      {invoice.amount}
                    </td>
                    <td className="py-3">
                      <Badge className="bg-sage-light px-2.5 py-0.5 text-sage-dark">
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
