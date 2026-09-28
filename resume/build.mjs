// Renders public/cv.pdf (before the PepsiCo start) and public/cv-pepsico.pdf (after)
// from resume/cv.template.html with nix-provided Chromium. Run: node resume/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const fonts = path.join(root, 'node_modules/@fontsource');
const tpl = fs.readFileSync(path.join(root, 'resume/cv.template.html'), 'utf8');
const date = new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' });

const variants = {
  'cv.pdf': {
    HEADLINE: 'Systems and Security Engineer &nbsp;|&nbsp; Incident Response, Networks, Automation',
    ABOUT: 'Systems engineer with a Bachelor of Cyber Security, four years across a ten-school, 2000-device environment, and a career moving into incident response. I run detection and response with Sentinel, QRadar and Defender, have led the response to real incidents including a critical CVSS 9.8 vulnerability, and design and secure the networks I defend: Juniper Mist, Palo Alto and Cloudflare Zero Trust, brought under Terraform. I keep offensive and forensic skills current through penetration testing, CTF and bug bounty. In October 2026 I join PepsiCo as a Cyber Security Incident Response Analyst.',
    PEPSICO: `<div class="job"><div class="jobhead"><span class="role">Cyber Security Incident Response Analyst <span class="org">, PepsiCo</span></span><span class="dates">From Oct 2026</span></div><ul><li>Joining the Cyber Fusion Center to work the full incident lifecycle across a global enterprise environment.</li></ul></div>`,
    MELOS_END: 'present',
  },
  'cv-pepsico.pdf': {
    HEADLINE: 'Cyber Security Incident Response Analyst &nbsp;|&nbsp; SIEM, EDR, Forensics, Automation',
    ABOUT: 'Cyber Security Incident Response Analyst at PepsiCo with a Bachelor of Cyber Security and a systems engineering background across a ten-school, 2000-device environment. I work the incident lifecycle from detection to post-incident review, analysing logs and artefacts across SIEM and EDR to find root cause, and I understand the environments I defend because I have built and secured them: Juniper Mist, Palo Alto and Cloudflare Zero Trust, brought under Terraform. I keep offensive and forensic skills current through penetration testing, CTF and bug bounty.',
    PEPSICO: `<div class="job"><div class="jobhead"><span class="role">Cyber Security Incident Response Analyst <span class="org">, PepsiCo</span></span><span class="dates">Oct 2026 to present</span></div><ul><li>Incident detection, triage, investigation, containment and recovery in the Cyber Fusion Center across a global enterprise environment.</li></ul></div>`,
    MELOS_END: 'Oct 2026',
  },
};

const tmp = path.join(root, 'resume/.tmp');
fs.mkdirSync(tmp, { recursive: true });
for (const [out, vars] of Object.entries(variants)) {
  let html = tpl.replaceAll('__FONTS__', fonts).replaceAll('__DATE__', date);
  for (const [k, v] of Object.entries(vars)) html = html.replaceAll(`__${k}__`, v);
  const src = path.join(tmp, out.replace('.pdf', '.html'));
  fs.writeFileSync(src, html);
  const dest = path.join(root, 'public', out);
  const chromium = process.env.CHROMIUM || 'chromium';
  execSync(`${chromium} --headless --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${dest}" "file://${src}"`, { stdio: 'ignore' });
  console.log('wrote', path.relative(root, dest), fs.statSync(dest).size, 'bytes');
}
