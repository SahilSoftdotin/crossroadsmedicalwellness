import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  source: z.enum(["assessment", "contact"]),
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  preferredContact: z.enum(["phone", "text", "email"]).optional(),
  message: z.string().trim().optional(),
  // Assessment-specific fields
  goals: z.array(z.string()).optional(),
  serviceInterest: z.string().optional(),
  ageRange: z.string().optional(),
  sex: z.string().optional(),
  healthNotes: z.string().optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const result = leadSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // This is a mock endpoint: in a production build this would persist to a
  // database / CRM and trigger a notification to the care team. For this
  // prototype we simply log and echo the submission back.
  console.log("[mock-lead] New lead received:", {
    ...result.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks! Your information has been received. Our team will reach out by phone or text shortly to schedule your visit.",
    lead: result.data,
  });
}
