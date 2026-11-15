# Mahmoor Ullah — portfolio website

Read this first. It is the standing brief for this repo, so the owner does not have to re-explain the project in each session.

## What this is

A portfolio website for **Mahmoor Ullah**, a freelance web designer and developer who is just starting out. Its job is to impress visitors within seconds, list his web development services, show showcase websites (landing page, e-commerce, and so on), and bring in search traffic through a blog.

## Current status

**Planning is finished. Nothing is built yet.** The old site was deleted on purpose (the owner found it generic). The repo currently holds only these guides and the approved mockups.

Next step: build the site as described in `docs/build-plan.md`. Update the status section of that file as work lands.

## Where things are

| File | What it holds |
|---|---|
| `docs/brief.md` | Who it is for, every content decision the owner made, real contact details, open questions |
| `docs/design.md` | The approved design ("Glass" direction): colours, type, components, each section, motion |
| `docs/build-plan.md` | Tech stack, folder layout, SEO and responsive requirements, blog workflow, deployment, build status |
| `docs/mockups/hero.jpg` | Approved hero mockup |
| `docs/mockups/full-page.jpg` | Approved full-page mockup, hero to footer |
| `docs/mockups/source/` | The throwaway Three.js code that rendered the mockups (scene `g` = hero, `z` = full page). Reference for the 3D card fan and chrome icons, not production code |

Look at the two mockup images before writing any UI. They are the agreed target.

## Rules the owner has set

- **Match the approved mockup.** He rejected earlier versions as "generic, basic, looks like other people's websites". Do not drift back to a stock template look.
- **Never invent clients, reviews, statistics or logos.** He has no real client work or testimonials yet. Demo projects must be labelled as concept work.
- **Testimonials are built but switched off.** Keep the section in code behind one setting; it must not render until he has real reviews.
- **Prices are placeholders** until he supplies real ones. Do not make up final prices.
- **SEO matters.** He wants the site to appear in search. Every page must ship as real HTML with proper metadata (see build plan).
- **Phone first.** Responsive at phone, tablet and desktop, with lighter 3D on phones.
- **Discuss before large changes.** He prefers to agree a direction (ideally from an image) before anything is built or rebuilt.
- He writes informally and often by voice, so names and numbers can arrive misspelled. Confirm contact details and spellings before publishing them.

## Working conventions

- Plain language in replies; he is not deeply technical. Explain choices by what they do for him.
- Keep all site content (name, contact details, services, prices, projects, testimonials on/off) in one content/config file so he can change it without touching layout code.
- Blog posts are Markdown files; adding a post must never require editing code.
- Do not open a pull request unless he asks.
