import { NextResponse } from "next/server";

/**
 * Mock lead-capture endpoint.
 * Accepts assessment + contact submissions, performs light validation,
 * logs the payload server-side and echoes a success response.
 * No real backend / database / PHI storage — this is a demo.
 */

type LeadPayload = Record<string, unknown> & {
  email?: string;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const errors: Record<string, string> = {};

  if (!body.email || typeof body.email !== "string" || !EMAIL_RE.test(body.email)) {
    errors.email = "A valid email address is required.";
  }

  const hasContext =
    typeof body.message === "string" ||
    typeof body.goals !== "undefined" ||
    typeof body.interest !== "undefined";
  if (!hasContext) {
    errors.message = "Please tell us a little about what you're looking for.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const reference = `CRX-${Date.now().toString(36).toUpperCase()}`;

  // Demo: log server-side instead of persisting.
  console.info("[lead] received", {
    reference,
    source: body.source ?? "unknown",
    email: body.email,
    receivedAt: new Date().toISOString(),
  });

  // Simulate light processing latency for realistic UX.
  await new Promise((r) => setTimeout(r, 600));

  return NextResponse.json(
    {
      ok: true,
      reference,
      message:
        "Thank you — your request has been received. Our team will reach out within one business day.",
    },
    { status: 200 },
  );
}

export function GET() {
  return NextResponse.json(
    { ok: true, service: "lead-capture (mock)", method: "POST only" },
    { status: 200 },
  );
}
