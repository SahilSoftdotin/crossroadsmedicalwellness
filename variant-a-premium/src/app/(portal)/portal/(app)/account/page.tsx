import type { Metadata } from "next";
import { CircleCheck, CreditCard, Mail, Phone, ShieldCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PortalPageHeader } from "@/components/portal/page-header";
import { patient } from "@/lib/data/patient";
import { formatDate, formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Account" };

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs uppercase tracking-wide text-[var(--charcoal-400)]">{label}</dt>
      <dd className="text-sm font-medium text-[var(--foreground)]">{value}</dd>
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <PortalPageHeader
        eyebrow="Settings"
        title="Account"
        description="Your profile, membership and billing. This is demo data — no real personal or payment information is stored."
      />

      {/* Profile */}
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 ring-2 ring-[var(--brass-200)]">
              <AvatarFallback className="text-lg">{patient.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">
                {patient.fullName}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Member since {formatDate(patient.memberSince)}
              </p>
              <Badge variant="accent" className="mt-2">
                {patient.program}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Edit profile
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal details</CardTitle>
            <CardDescription>Used by your care team to reach you</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" value={patient.fullName} />
              <Field label="Date of birth" value={formatDate(patient.dateOfBirth)} />
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs uppercase tracking-wide text-[var(--charcoal-400)]">Email</dt>
                <dd className="flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]">
                  <Mail className="size-3.5 text-[var(--brass-600)]" aria-hidden="true" />
                  {patient.email}
                </dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-xs uppercase tracking-wide text-[var(--charcoal-400)]">Phone</dt>
                <dd className="flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]">
                  <Phone className="size-3.5 text-[var(--brass-600)]" aria-hidden="true" />
                  {patient.phone}
                </dd>
              </div>
            </dl>

            <Separator className="my-6" />

            <p className="mb-3 text-xs uppercase tracking-wide text-[var(--charcoal-400)]">
              Your care team
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {patient.careTeam.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-1 items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] p-3"
                >
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--forest-800)] text-xs font-medium text-[var(--primary-foreground)]"
                    aria-hidden="true"
                  >
                    {c.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan / subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Membership</CardTitle>
            <CardDescription>{patient.plan.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-[var(--foreground)]">
                {formatCurrency(patient.plan.monthlyPrice)}
                <span className="text-sm font-normal text-[var(--muted-foreground)]">/mo</span>
              </span>
              <Badge variant="success">{patient.plan.status}</Badge>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Renews {formatDate(patient.plan.renewsOn)}
            </p>
            <Separator />
            <ul className="flex flex-col gap-2">
              {patient.plan.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <Button variant="subtle" size="sm" className="mt-1">
              Manage membership
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Billing placeholder */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Billing &amp; payment</CardTitle>
            <CardDescription>Manage your payment method and invoices</CardDescription>
          </div>
          <CreditCard className="size-5 text-[var(--brass-600)]" aria-hidden="true" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-3 rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)] p-6 text-center sm:items-center">
            <span className="grid size-12 place-items-center rounded-full bg-[var(--cream-200)] text-[var(--charcoal-500)]">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-[var(--foreground)]">
              No payment method on file
            </p>
            <p className="max-w-md text-sm text-[var(--muted-foreground)]">
              Billing is a placeholder in this demo. In production, secure card management and invoice
              history would appear here (HSA/FSA eligible).
            </p>
            <Button variant="outline" size="sm">
              Add payment method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
