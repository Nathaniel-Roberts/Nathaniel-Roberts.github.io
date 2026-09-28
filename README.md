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

## Contact form

`/api/contact` is handled by `worker/index.js` (Cloudflare Worker in front of the static assets). It verifies a Turnstile token, then sends the message through Cloudflare Email Routing to the destination in `wrangler.jsonc`. The Turnstile site key lives in `src/site.ts`; the secret is a Worker secret:

```sh
npx wrangler secret put TURNSTILE_SECRET
```

## GitHub activity

The contribution graph on the home page is fetched at build time from GitHub's public contributions page (no token). It refreshes whenever the site is rebuilt. If GitHub is unreachable the section is skipped and the build still passes.

## Analytics

Set `analyticsToken` in `src/site.ts` to a Cloudflare Web Analytics site token to enable the beacon. The CSP in `public/_headers` already allows it.

## Deploy

Cloudflare Workers builds from this repository on every push. Preview deployments are created for other branches. Config lives in `wrangler.jsonc`; response headers (CSP and friends) in `public/_headers`; redirects in `public/_redirects`.

The old `nathaniel-roberts.github.io` address is kept as a redirect by `.github/workflows/pages-redirect.yml`, which publishes the `redirect/` folder to GitHub Pages.
