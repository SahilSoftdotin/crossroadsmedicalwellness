import type { Metadata } from "next";
import { CreditCard, Mail, Shield, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { patient } from "@/lib/data/patient";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Account",
};

export default function PortalAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, plan, and billing details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="size-4.5 text-accent" aria-hidden="true" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="account-first-name">First name</Label>
                <Input id="account-first-name" defaultValue={patient.firstName} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-last-name">Last name</Label>
                <Input id="account-last-name" defaultValue={patient.lastName} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-email">Email</Label>
              <Input id="account-email" type="email" defaultValue={patient.email} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-dob">Date of birth</Label>
              <Input
                id="account-dob"
                defaultValue={formatDate(patient.dateOfBirth, { month: "long", day: "numeric", year: "numeric" })}
                readOnly
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Demo profile — fields are read-only. Contact the clinic to update your information.
            </p>
          </CardContent>
        </Card>

        {/* Care team */}
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="size-4.5 text-accent" aria-hidden="true" />
              Care Team &amp; Membership
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {patient.careTeam.map((member) => (
                <div key={member.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
              Member since {formatDate(patient.memberSince, { month: "long", day: "numeric", year: "numeric" })}
            </div>
          </CardContent>
        </Card>

        {/* Plan / subscription */}
        <Card className="rounded-2xl border-0 shadow-card ring-1 ring-border lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-primary">
              <CreditCard className="size-4.5 text-accent" aria-hidden="true" />
              Plan &amp; Billing
            </CardTitle>
            <Badge className="bg-success/15 text-success">{patient.plan.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current plan</p>
                <p className="mt-1 font-display text-base font-semibold text-primary">{patient.plan.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Billing cycle</p>
                <p className="mt-1 font-display text-base font-semibold text-primary">{patient.plan.billingCycle}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Renewal date</p>
                <p className="mt-1 font-display text-base font-semibold text-primary">
                  {formatDate(patient.plan.renewalDate, { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Payment method</p>
                <Badge variant="outline">Demo</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Visa ending in 4242 · Expires 08/28</p>
              <Button variant="outline" size="sm" className="mt-3">
                Update payment method
              </Button>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-sm font-semibold text-foreground">Billing history</p>
              <p className="mt-2 text-sm text-muted-foreground">
                No invoices yet in this demo. In production, recent invoices and receipts would be
                listed here.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-primary-soft p-4 text-sm text-primary">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>
                Questions about your plan or billing? Reach out via{" "}
                <a href="/portal/messages" className="font-semibold underline underline-offset-2">
                  Messages
                </a>{" "}
                or contact the front desk directly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
