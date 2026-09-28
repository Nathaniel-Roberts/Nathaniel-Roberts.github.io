// Cloudflare Worker in front of the static site. Only /api/* runs here
// (see run_worker_first in wrangler.jsonc); everything else is served as assets.
import { EmailMessage } from 'cloudflare:email';

const FROM = 'contact-form@nathanielroberts.tech';
const TO = 'nathanielgroberts@outlook.com';
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.nathanielroberts.tech') {
      url.hostname = 'nathanielroberts.tech';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/api/contact') return contact(request, env);
    if (url.pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function contact(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const origin = request.headers.get('origin') || '';
  if (!/^https:\/\/(nathanielroberts\.tech|nathanielroberts-tech\.nathanielgroberts\.workers\.dev)$/.test(origin) && !origin.startsWith('http://localhost')) {
    return json({ error: 'Bad origin' }, 403);
  }
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request body' }, 400); }

  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 200);
  const message = String(body.message || '').trim();
  const token = String(body.token || '');
  if (body.website) return json({ ok: true }); // honeypot filled: pretend success, send nothing
  if (name.length < 2) return json({ error: 'Please add your name.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'That email address does not look right.' }, 400);
  if (message.length < 10) return json({ error: 'The message is too short.' }, 400);
  if (message.length > 5000) return json({ error: 'The message is too long (5,000 characters max).' }, 400);
  if (!token) return json({ error: 'Please complete the verification.' }, 400);

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: token, remoteip: request.headers.get('cf-connecting-ip') || undefined }),
  }).then((r) => r.json()).catch(() => ({ success: false }));
  if (!verify.success) return json({ error: 'Verification failed. Please try again.' }, 400);

  const now = new Date();
  const safeName = name.replace(/[\r\n"<>]/g, ' ');
  const raw = [
    `From: "nathanielroberts.tech contact form" <${FROM}>`,
    `To: <${TO}>`,
    `Reply-To: "${safeName}" <${email}>`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(`[nathanielroberts.tech] Message from ${safeName}`)))}?=`,
    `Message-ID: <${crypto.randomUUID()}@nathanielroberts.tech>`,
    `Date: ${now.toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent: ${now.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })} (Sydney)`,
    `IP country: ${request.cf?.country || 'unknown'}`,
    '',
    message,
    '',
  ].join('\r\n');

  try {
    await env.EMAIL.send(new EmailMessage(FROM, TO, raw));
  } catch (err) {
    console.error('email send failed', err);
    return json({ error: 'Could not send the message right now. Email me directly instead.' }, 502);
  }
  return json({ ok: true });
}
