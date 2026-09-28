import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).map((p) => ({ ...p, section: 'posts' }));
  const projects = (await getCollection('projects', ({ data }) => !data.draft)).map((p) => ({ ...p, section: 'projects' }));
  const items = [...posts, ...projects].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    trailingSlash: true,
    items: items.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.date,
      link: `/${e.section}/${e.id}/`,
      categories: e.data.tags,
    })),
    customData: '<language>en-au</language>',
  });
}
