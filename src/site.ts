// Role switch. Until this date the site describes the current role; a build on or
// after it describes the new one. Update the date if the start date moves, then
// redeploy (any push, or "Retry deployment" in Cloudflare) once the date has passed.
export const NEXT_ROLE_STARTS = new Date('2026-10-12T00:00:00+11:00');
export const STARTED_NEXT = new Date() >= NEXT_ROLE_STARTS;

const currentRole = {
  title: 'ICT Systems Engineer',
  org: null as string | null,
  headline: 'Systems Engineer',
  tagline: 'Cybersecurity | Incident Response | Automation | Applied AI',
  description:
    'Systems engineer with a cybersecurity background, writing about security, automation and IT infrastructure. Penetration test reports, incident analyses and privacy assessments.',
  intro:
    "I'm a systems engineer with a cybersecurity background. Day to day I look after IT infrastructure: building it, supporting it, and automating the parts that shouldn't need a human. Security isn't a separate job to me. It's the lens I use for everything from a server build to a script.",
  now: 'Working as an ICT Systems Engineer, automating the repetitive parts of IT operations, and getting ready to move into incident response at PepsiCo in October 2026.',
  whoami: 'Nathaniel Roberts. Systems engineer, soon incident responder. Security first, automate the rest.',
};

const nextRole = {
  title: 'Cybersecurity Incident Response Analyst',
  org: 'PepsiCo' as string | null,
  headline: 'Cybersecurity Incident Response Analyst',
  tagline: 'Cybersecurity | Incident Response | Automation | Applied AI',
  description:
    'Cybersecurity incident response analyst with a systems engineering background, writing about detection, response, automation and IT infrastructure. Penetration test reports, incident analyses and privacy assessments.',
  intro:
    "I'm a cybersecurity incident response analyst at PepsiCo, with a systems engineering background. I came to security from the operations side: building and supporting infrastructure taught me how systems actually behave, which is exactly what you need when one of them is misbehaving on purpose.",
  now: 'Working in incident response at PepsiCo, automating the repetitive parts of detection and triage, and writing up security work here as I go.',
  whoami: 'Nathaniel Roberts. Incident response analyst at PepsiCo. Security first, automate the rest.',
};

export const ROLE = STARTED_NEXT ? nextRole : currentRole;

export const SITE = {
  name: 'Nathaniel Roberts',
  tagline: ROLE.tagline,
  description: ROLE.description,
  url: 'https://nathanielroberts.tech',
  domain: 'nathanielroberts.tech',
  email: 'contact@nathanielroberts.tech',
  linkedin: 'https://linkedin.com/in/nathaniel-g-roberts/',
  repo: 'https://github.com/Nathaniel-Roberts/Nathaniel-Roberts.github.io',
  since: 2024,
  // Drop a PDF in public/ and set this to e.g. '/cv.pdf' to show the CV button.
  cv: null as string | null,
  // Cloudflare Web Analytics site token (Analytics and Logs, Web Analytics, Add a site). null disables the beacon.
  analyticsToken: null as string | null,
  // Cloudflare Turnstile site key for the contact form. The secret is a Worker secret (TURNSTILE_SECRET).
  turnstileSiteKey: '0x4AAAAAAFGY9Q9kAnqeOxTC',
  github: 'https://github.com/Nathaniel-Roberts',
  githubUser: 'Nathaniel-Roberts',
  nav: [
    { label: 'Blog', href: '/posts/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Uses', href: '/uses/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  giscus: {
    repo: 'Nathaniel-Roberts/Nathaniel-Roberts.github.io',
    repoId: 'R_kgDOI1dzaQ',
    category: 'Announcements',
    categoryId: 'DIC_kwDOI1dzac4Cgh9i',
  },
};

export const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' }).format(d);

export const fmtDateShort = (d: Date) =>
  new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric', timeZone: 'Australia/Sydney' }).format(d);

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
