import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  /** Honeypot field — bots fill it, humans don't see it */
  website?: string;
}

const RECIPIENT = process.env.CONTACT_TO_EMAIL ?? 'info@HagopianInk.com';
const SENDER = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
  }

  const body = (await req.json().catch(() => null)) as Partial<ContactSubmission> | null;
  if (!body) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });

  // Honeypot: if filled, pretend success but don't send.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const company = (body.company ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const service = (body.service ?? '').trim();

  const lines = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    company && `<p><strong>Company:</strong> ${escapeHtml(company)}</p>`,
    phone && `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
    service && `<p><strong>Service of Interest:</strong> ${escapeHtml(service)}</p>`,
    `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  ].filter(Boolean).join('\n');

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: `Hagopian Ink Website <${SENDER}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: lines,
    });
    if (error) {
      console.error('[/api/contact] Resend returned error:', error);
      return NextResponse.json({ error: 'Failed to send. Please email us directly.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact] Resend threw:', err);
    return NextResponse.json({ error: 'Failed to send. Please email us directly.' }, { status: 502 });
  }
}
