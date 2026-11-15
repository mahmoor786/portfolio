# Build plan

## Status

- [x] Design direction chosen and full-page mockup approved
- [x] Old site removed, guides written
- [ ] Project scaffold (Astro) and deployment workflow
- [ ] Design tokens, fonts, base layout, nav, footer
- [ ] Hero with 3D card fan
- [ ] Services, marquee, selected work, process, pricing
- [ ] Testimonials (built, switched off)
- [ ] About and contact
- [ ] Blog: list page, post page, first sample post, RSS
- [ ] Five demo showcase sites
- [ ] SEO pass, responsive pass, performance pass
- [ ] Owner supplies real content (see open questions in `brief.md`)

Tick items off here as they land, so the next session knows where things stand.

## Tech stack

| Part | Choice | Why |
|---|---|---|
| Site framework | **Astro** | Builds every page as ready-made HTML, which search engines read best. A plain React app would send Google a nearly empty page. |
| 3D | **Three.js** | Hero card fan and service icons. Load it after the page content so it never blocks text. |
| Animation | **GSAP** with ScrollTrigger | Load, scroll and hover motion. |
| Blog | **Markdown** via Astro content collections | One file per post, no code changes to publish. |
| Hosting | **GitHub Pages** via a GitHub Actions workflow | Free, redeploys on every push to `main`. |

Free GitHub accounts can only serve Pages from a public repository. The site address will be `https://mahmoor786.github.io/portfolio/` unless the repo is renamed to `mahmoor786.github.io` or a custom domain is added. Set Astro's `site` and `base` to match, and re-check every internal link and asset path against the base.

## Suggested layout

```
src/
  content/blog/        one .md file per post
  data/site.ts         ALL editable content: name, contact, services,
                       prices, projects, process steps, feature switches
  components/          one component per page section
  layouts/             base layout (head, SEO tags), blog post layout
  pages/               index, blog/index, blog/[slug], demo sites
public/                favicon, fonts, images, robots.txt
docs/                  these guides and the mockups
```

Feature switches in `site.ts`, at minimum: `showTestimonials: false`.

## SEO requirements

The owner wants to appear in search. Treat these as required, not optional.

- Unique `<title>` and meta description on every page; canonical URL.
- Open Graph and Twitter tags with a share image.
- One `<h1>` per page, headings in order, semantic landmarks (`header`, `nav`, `main`, `footer`).
- Descriptive `alt` text on images; the 3D canvas needs a text alternative or `aria-hidden` with equivalent content in HTML.
- `sitemap.xml` (Astro sitemap integration), `robots.txt`, RSS feed for the blog.
- Structured data: `Person` / `ProfessionalService` on the home page, `BlogPosting` on posts.
- Clean URLs, e.g. `/blog/how-much-does-a-website-cost/`.
- Fast: self-hosted fonts, compressed images, 3D and GSAP loaded lazily, no layout shift when the canvas appears.
- After launch the owner must add the site to Google Search Console and submit the sitemap; walk him through it.

Be honest with him: this makes the site eligible to rank, it does not guarantee rankings. Those build over weeks to months with regular posts, and a custom domain helps.

## Responsive requirements

- Build phone first, then tablet and desktop. Check at about 390, 768 and 1440 px wide.
- Grids collapse: services 4 → 2 → 1 columns, work bento → single column, pricing → stacked with the featured plan first.
- Nav becomes a compact bar with a menu button on phones.
- Lighter 3D on phones; never let it cause scroll jank.
- Tap targets at least 44px. Test with a real screenshot at each size before calling a section done.

## Blog workflow (for the owner)

To publish a post he adds one file to `src/content/blog/`, for example `my-first-post.md`:

```markdown
---
title: "How much does a website cost in 2026?"
description: "One or two sentences that appear in Google results."
date: 2026-11-20
cover: ./images/website-cost.jpg
tags: [pricing, websites]
---

The article text goes here, written in Markdown.
```

He can do this on the GitHub website with "Add file", or send the text in a session and have it added. The site rebuilds and publishes within a couple of minutes.

Later option, only if he asks: a `/admin` visual editor (for example Decap or Sveltia CMS). It needs a login setup and is easier on Netlify or Cloudflare Pages than on GitHub Pages.

## Demo showcase sites

Five concept sites (Aurel, Orbit, Maison, Osteria, Dash), each a working page under something like `/work/aurel/`, labelled as concept work and marked `noindex` so they do not compete with the main site in search. Build them after the main page is solid.

## Definition of done for the first release

- Matches the approved mockup at desktop size, and works well on a phone.
- All content comes from `site.ts`; testimonials off; prices clearly placeholder or filled in.
- Lighthouse SEO and accessibility scores checked, and the page loads with readable content before any 3D.
- Deployed to GitHub Pages and the live URL opened and checked.
