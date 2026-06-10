import type { Metadata } from "next";
import { MessageSquare, Phone } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessagesThread } from "@/app/(portal)/portal/(dashboard)/messages/messages-thread";
import { patient } from "@/lib/data/patient";
import { clinic } from "@/lib/data/clinic";

export const metadata: Metadata = {
  title: "Messages",
};

export default function PortalMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Messages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A direct line to your care team between visits.
          </p>
        </div>
        <a
          href={clinic.phoneHref}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:border-primary/40"
        >
          <Phone className="size-4 text-accent" aria-hidden="true" />
          Urgent? Call {clinic.phone}
        </a>
      </div>

      <Card className="overflow-hidden rounded-2xl border-0 py-0 shadow-card ring-1 ring-border">
        <CardHeader className="flex-row items-center justify-between gap-2 border-b border-border bg-secondary/40 px-5 py-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-primary">
            <MessageSquare className="size-4.5 text-accent" aria-hidden="true" />
            Care Team
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            {patient.careTeam.map((member) => (
              <Badge key={member.name} variant="secondary">
                {member.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <MessagesThread />
      </Card>
    </div>
  );
}
