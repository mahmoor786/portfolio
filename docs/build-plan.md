# Build plan

## Status

- [x] Design direction chosen and full-page mockup approved
- [x] Old site removed, guides written
- [x] Project scaffold (Astro) and deployment workflow
- [x] Design tokens, fonts, base layout, nav, footer
- [x] Hero with 3D card fan (deal-in animation, mouse tilt, hover lift, click to open, spreads on scroll)
- [x] Services with 3D chrome icons, marquee, selected work, process, pricing
- [x] Testimonials (built, switched off in `src/data/site.ts`)
- [x] About (placeholder text, initials instead of a photo) and contact form (opens WhatsApp or email with the message filled in)
- [x] Blog: list page, post page, three starter posts, RSS
- [x] Five demo showcase sites under `/work/`, each with a small working interaction
- [x] SEO basics: titles, descriptions, canonical, Open Graph image, JSON-LD, sitemap, robots, RSS
- [x] Checked in a browser at 1440px and 390px: no errors, no sideways scroll
- [ ] **Go live:** merge to `main`, make the repo public, set Pages source to "GitHub Actions"
- [ ] Open the live URL and check it; run Lighthouse on the live site
- [ ] Add the site to Google Search Console and submit the sitemap
- [ ] Check at tablet width (768px) and on a real phone
- [ ] Owner supplies real content (see open questions in `brief.md`)

Not verified yet: the GitHub Pages deployment itself (the workflow has never run), Lighthouse scores, and real-device performance of the 3D.

Tick items off here as they land, so the next session knows where things stand.

## Going live (owner steps on GitHub)

1. Merge the working branch into `main`.
2. Repo Settings → General → make the repository **public** (free accounts can only publish public repos).
3. Repo Settings → Pages → Source: **GitHub Actions**.
4. The "Deploy to GitHub Pages" workflow then runs on every push to `main`. The site appears at `https://mahmoor786.github.io/portfolio/`.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once) |
| `npm run dev` | Local preview at `http://localhost:4321/portfolio/` |
| `npm run build` | Build the site into `dist/` |
| `npm run capture` | Re-take the demo-site screenshots used in the hero and work tiles (run after `build`; needs Playwright) |

## Tech stack

| Part | Choice | Why |
|---|---|---|
| Site framework | **Astro** | Builds every page as ready-made HTML, which search engines read best. A plain React app would send Google a nearly empty page. |
| 3D | **Three.js** | Hero card fan and service icons. Load it after the page content so it never blocks text. |
| Animation | **GSAP** with ScrollTrigger | Load, scroll and hover motion. |
| Blog | **Markdown** via Astro content collections | One file per post, no code changes to publish. |
| Hosting | **GitHub Pages** via a GitHub Actions workflow | Free, redeploys on every push to `main`. |

Free GitHub accounts can only serve Pages from a public repository. The site address will be `https://mahmoor786.github.io/portfolio/` unless the repo is renamed to `mahmoor786.github.io` or a custom domain is added. Set Astro's `site` and `base` to match, and re-check every internal link and asset path against the base.

## Layout

```
src/
  data/site.ts         ALL editable content and section on/off switches
  data/url.ts          builds links that work under /portfolio/
  data/posts.ts        loads and sorts blog posts
  content/blog/        one .md file per post
  layouts/Base.astro   page shell: head, SEO tags, nav, footer
  layouts/Demo.astro   shell for the demo sites (noindex, "concept" bar)
  components/          Nav, Footer, PostCard
  pages/index.astro    the home page, section by section
  pages/blog/          blog list and post pages
  pages/work/          the five demo sites
  scripts/main.ts      menu, scroll animation, contact form, lazy-loads the 3D
  scripts/scenes.ts    the 3D: hero card fan and service icons
  styles/global.css    all styles for the main site
public/
  work/*.jpg           demo-site screenshots (made by `npm run capture`)
  og.jpg               image shown when the site is shared
scripts/capture.mjs    takes the demo screenshots
```

Things to know:

- Always build links with `url()` from `src/data/url.ts`, never a bare `/path`, or they break under `/portfolio/`.
- The hero shows a plain CSS fan of images until the 3D is ready, and keeps it if WebGL is unavailable.
- Scroll animations only hide content when JavaScript is running; a 4-second fallback reveals everything if the script fails.
- `robots.txt` is generated, but on a `github.io/portfolio/` address search engines only read the one at the domain root, so it takes effect once a custom domain is used. The sitemap can still be submitted in Search Console.
- To add a real project: add it to `projects` in `site.ts` with `concept: false`, its live `href`, and a 1280×800 screenshot at `public/work/<slug>.jpg`.

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
