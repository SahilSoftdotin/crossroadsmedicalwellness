import { NextResponse } from "next/server";

export type LeadPayload = {
  source: "contact" | "assessment";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: unknown;
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (!body.source) {
    return NextResponse.json(
      { ok: false, error: "Missing required field: source." },
      { status: 400 }
    );
  }

  const hasContactInfo = Boolean(body.email || body.phone);
  if (!hasContactInfo) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please provide an email address or phone number.",
      },
      { status: 400 }
    );
  }

  // In a real implementation this would persist to a CRM / database and
  // notify the care team. For this prototype we log and echo the payload.
  console.log("[Crossroads] New lead received:", JSON.stringify(body, null, 2));

  return NextResponse.json({
    ok: true,
    message:
      "Thanks! Your information has been received. Our care team will follow up by phone, text, or email shortly.",
    receivedAt: new Date().toISOString(),
  });
}
