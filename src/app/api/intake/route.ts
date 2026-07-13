import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  normalizeInstagram,
  serviceLabel,
  validateIntake,
  type IntakePayload,
} from "@/lib/intake";

export const runtime = "nodejs";

function isPayload(body: unknown): body is IntakePayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.artistName === "string" &&
    typeof b.instagram === "string" &&
    typeof b.service === "string" &&
    typeof b.description === "string" &&
    typeof b.demoLink === "string"
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INTAKE_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Set RESEND_API_KEY and INTAKE_TO_EMAIL.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isPayload(body)) {
    return NextResponse.json({ error: "Invalid form payload." }, { status: 400 });
  }

  const errors = validateIntake(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 400 });
  }

  const artistName = body.artistName.trim();
  const instagram = normalizeInstagram(body.instagram);
  const service = serviceLabel(body.service);
  const description = body.description.trim();
  const demoLink = body.demoLink.trim();
  const from =
    process.env.INTAKE_FROM_EMAIL ??
    "YungSpacey Intake <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [toEmail],
    subject: `New intake · ${artistName} · ${service}`,
    replyTo: undefined,
    text: [
      "New project intake from yungspacey.vercel.app",
      "",
      `Artist / Stage Name: ${artistName}`,
      `Instagram: ${instagram}`,
      `Service: ${service}`,
      `Demo / Stem Link: ${demoLink}`,
      "",
      "Project Description & References:",
      description,
    ].join("\n"),
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#000;color:#f5f5f5;padding:24px;">
        <p style="letter-spacing:0.2em;text-transform:uppercase;color:#a78bfa;font-size:12px;">YungSpacey Intake</p>
        <h1 style="font-size:22px;margin:8px 0 20px;">New project submission</h1>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#8a8a8a;">Artist</td><td style="padding:8px 0;">${escapeHtml(artistName)}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8a8a;">Instagram</td><td style="padding:8px 0;">${escapeHtml(instagram)}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8a8a;">Service</td><td style="padding:8px 0;">${escapeHtml(service)}</td></tr>
          <tr><td style="padding:8px 0;color:#8a8a8a;">Demo / Stems</td><td style="padding:8px 0;"><a href="${escapeAttr(demoLink)}" style="color:#e8f0ff;">${escapeHtml(demoLink)}</a></td></tr>
        </table>
        <p style="margin:24px 0 8px;color:#8a8a8a;letter-spacing:0.15em;text-transform:uppercase;font-size:11px;">Description</p>
        <p style="white-space:pre-wrap;line-height:1.5;">${escapeHtml(description)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send intake email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replaceAll("'", "&#39;");
}
