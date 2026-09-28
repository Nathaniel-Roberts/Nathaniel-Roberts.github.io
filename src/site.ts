export const SITE = {
  name: 'Nathaniel Roberts',
  tagline: 'Systems Engineer | Automation | Security-Driven IT Solutions',
  description:
    'Systems engineer writing about security, automation and IT infrastructure. Penetration test reports, incident analyses and privacy assessments.',
  url: 'https://nathanielroberts.tech',
  domain: 'nathanielroberts.tech',
  email: 'contact@nathanielroberts.tech',
  github: 'https://github.com/Nathaniel-Roberts',
  linkedin: 'https://linkedin.com/in/nathaniel-g-roberts/',
  repo: 'https://github.com/Nathaniel-Roberts/Nathaniel-Roberts.github.io',
  since: 2024,
  // Drop a PDF in public/ and set this to e.g. '/cv.pdf' to show the CV button.
  cv: null as string | null,
  nav: [
    { label: 'Blog', href: '/posts/' },
    { label: 'Projects', href: '/projects/' },
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
