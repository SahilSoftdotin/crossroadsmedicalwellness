import type { Metadata } from "next";
import { Users } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortalPageHeader } from "@/components/portal/page-header";
import { MessageThread } from "@/components/portal/message-thread";
import { messageThread } from "@/lib/data/messages";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PortalPageHeader
        eyebrow="Care team"
        title="Messages"
        description="A secure, HIPAA-style conversation with your physician and care coordinator."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Card>
          <CardHeader className="border-b border-[var(--border)]">
            <CardTitle className="text-lg">{messageThread.subject}</CardTitle>
            <CardDescription>
              {messageThread.participants.length} participants
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <MessageThread initialMessages={messageThread.messages} />
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-[var(--brass-600)]" aria-hidden="true" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {messageThread.participants.map((p) => (
              <div key={p} className="flex items-center gap-3">
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--forest-100)] text-xs font-medium text-[var(--forest-700)]"
                  aria-hidden="true"
                >
                  {p
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="text-sm font-medium text-[var(--foreground)]">{p}</span>
              </div>
            ))}
            <Badge variant="success" className="mt-2 w-fit">
              Usually replies within 1 business day
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
