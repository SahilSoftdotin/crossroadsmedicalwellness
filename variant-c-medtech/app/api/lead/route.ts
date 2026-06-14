import { NextResponse } from "next/server";
import { z } from "zod";

// Bounded, validated lead payload. Length caps prevent oversized/abusive input.
const leadSchema = z
  .object({
    // "waitlist" = the Coming Soon dashboard signup (email only).
    source: z.enum(["assessment", "contact", "chatbot", "waitlist"]),
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email("Enter a valid email address").max(200),
    phone: z.string().trim().max(40).optional(),
    preferredContact: z.enum(["phone", "text", "email"]).optional(),
    message: z.string().trim().max(4000).optional(),
    // Program / service interest
    program: z.string().max(60).optional(),
    programName: z.string().max(120).optional(),
    serviceInterest: z.string().max(120).optional(),
    // Assessment-specific fields
    goals: z.array(z.string().max(120)).max(30).optional(),
    ageRange: z.string().max(40).optional(),
    sex: z.string().max(40).optional(),
    healthNotes: z.string().trim().max(4000).optional(),
    // Honeypot — must stay empty; real users never see this field.
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Full lead forms require a name + phone; the waitlist needs only an email.
    if (data.source !== "waitlist") {
      if (!data.name || data.name.trim().length < 1) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["name"], message: "Name is required" });
      }
      if (!data.phone || data.phone.trim().length < 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Enter a valid phone number",
        });
      }
    }
  });

export type LeadPayload = z.infer<typeof leadSchema>;

const MAX_BODY_BYTES = 16_000;

// Best-effort in-memory rate limit. Note: serverless instances are ephemeral and
// not shared, so this is per-instance. For real production use a shared store
// (Vercel KV / Upstash Redis) — see PROJECT-NOTES.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (rec.count >= RATE_MAX) return true;
  rec.count += 1;
  return false;
}

export async function POST(request: Request) {
  // 1) Content type must be JSON.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "Unsupported content type." },
      { status: 415 },
    );
  }

  // 2) Reject oversized bodies early.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  // 3) Rate limit per IP.
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  // 4) Parse + size-guard the raw body.
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // 5) Validate.
  const result = leadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // 6) Honeypot — if the hidden field is filled, treat as spam: return success
  //    so bots get no signal, but do not process the submission.
  if (result.data.company) {
    return NextResponse.json({
      ok: true,
      message: "Thanks! Your information has been received.",
    });
  }

  // Mock endpoint: a production build would persist to a database / CRM and
  // notify the care team. Here we log a minimal record and echo a confirmation.
  // The honeypot field is never logged or returned.
  console.log("[mock-lead] New lead received:", {
    source: result.data.source,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks! Your information has been received. Our team will reach out by phone or text shortly to schedule your visit.",
  });
}
