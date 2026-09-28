import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOg, type OgInput } from '../../lib/og';
import { SITE, STARTED_NEXT, fmtDateShort } from '../../site';

export async function getStaticPaths() {
  const statics: { slug: string; props: OgInput }[] = [
    { slug: 'index', props: { title: SITE.name, description: SITE.tagline, eyebrow: 'whoami' } },
    { slug: 'about', props: { title: 'About', description: STARTED_NEXT ? 'Cybersecurity incident response analyst at PepsiCo with a systems engineering background.' : 'Systems engineer with a cybersecurity background, moving into incident response at PepsiCo.', eyebrow: 'cat about.md' } },
    { slug: 'contact', props: { title: 'Contact', description: 'Questions, project ideas or collaborations.', eyebrow: 'cat contact.md' } },
    { slug: 'posts', props: { title: 'Blog', description: 'Notes on security, automation and the work of keeping IT infrastructure running.', eyebrow: 'ls ~/posts' } },
    { slug: 'projects', props: { title: 'Projects', description: 'Penetration test reports, incident analyses, privacy assessments and data work.', eyebrow: 'ls ~/projects' } },
  ];
  const posts = (await getCollection('posts')).map((p) => ({
    slug: `posts/${p.id}`,
    props: { title: p.data.title, description: p.data.description, eyebrow: `cat ~/posts/${p.id}.md`, footer: fmtDateShort(p.data.date) },
  }));
  const projects = (await getCollection('projects')).map((p) => ({
    slug: `projects/${p.id}`,
    props: { title: p.data.title, description: p.data.description, eyebrow: `cat ~/projects/${p.id}.md`, footer: `${p.data.type}  ·  ${fmtDateShort(p.data.date)}` },
  }));
  return [...statics, ...posts, ...projects].map(({ slug, props }) => ({ params: { slug }, props }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as OgInput);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
