// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { unified } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { rehypeContent } from './src/plugins/rehype-content.mjs';

export default defineConfig({
  site: 'https://nathanielroberts.tech',
  trailingSlash: 'always',
  integrations: [sitemap(), pagefind()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'never' },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['anchor'], ariaHidden: 'true', tabIndex: -1 }, content: { type: 'text', value: '#' } }],
        rehypeContent,
      ],
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
  },
  image: { responsiveStyles: true },
  vite: { build: { assetsInlineLimit: 0 } },
});
