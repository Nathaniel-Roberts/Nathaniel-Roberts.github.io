# nathanielroberts.tech

Personal site of Nathaniel Roberts. Built with [Astro](https://astro.build), hosted on Cloudflare Workers (static assets), source on GitHub.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/, search index built by Pagefind
npm run preview   # serve dist/ locally
```

Search only works against a built index, so run `npm run build` once before `npm run dev` if you want the command palette to return results in development.

## Content

- `src/content/posts/*.md` for blog posts
- `src/content/projects/*.md` for project write-ups (images live in `src/content/projects/images/`)

Frontmatter:

```yaml
---
title: "Title"
description: "One or two sentences. Used on cards, in search and on the social preview image."
date: 2025-01-31
tags: ["tag-one", "tag-two"]
type: Report        # projects only: Report, CTF, Data, Tool or Other
featured: true      # projects only: shows on the home page (top three by date)
draft: false
---
```

Headings start at `##`. The table of contents, reading time, anchors and social preview image are all generated.

## Deploy

Cloudflare Workers builds from this repository on every push. Preview deployments are created for other branches. Config lives in `wrangler.jsonc`; response headers (CSP and friends) in `public/_headers`; redirects in `public/_redirects`.

The old `nathaniel-roberts.github.io` address is kept as a redirect by `.github/workflows/pages-redirect.yml`, which publishes the `redirect/` folder to GitHub Pages.
