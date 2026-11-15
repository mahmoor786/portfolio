# Design: "Glass" direction

The approved look. See `mockups/hero.jpg` and `mockups/full-page.jpg`; when this text and the images disagree, the images win.

## Character

Bright, clean and premium, in the style of a modern tech brand. A near-white page, soft pastel glows, frosted-glass cards, tight bold type, and real 3D used to show the work. The 3D is the showpiece; everything around it stays calm and minimal.

How we got here: the owner rejected a dark neon/glassmorphism style and several concept ideas as generic, asked for 3D that makes people "instantly amazed", then chose this from five premium mockups.

## Colour

| Role | Value |
|---|---|
| Page background | `#f6f6f8` |
| Text | `#1d1d1f` |
| Secondary headline grey | `#8e8e93` |
| Body grey | `#55555c` |
| Accent (labels, ticks, tags) | `#7a5cff` |
| Glow: peach | `#ffd9c7` |
| Glow: blue | `#cfd8ff` |
| Glow: lilac | `#e9d2ff` |
| Dark surface (buttons, featured plan) | `#1d1d1f` |

Glows are large, soft radial gradients behind sections, never hard shapes.

## Type

- **Inter** throughout (self-host it; do not rely on a system copy).
- Headlines: weight ~650, letter-spacing about `-0.042em`, line-height ~1.03. Hero 92px, section headings 60px, contact heading 72px on desktop.
- Two-tone headline pattern: first line in text colour, second line in `#8e8e93`.
- Section label above each heading: 13px, uppercase, `0.14em` spacing, accent colour.
- Body: 15–17px, line-height ~1.55.

## Components

- **Glass card:** `rgba(255,255,255,.62)` fill, 1px white border, radius 30px, shadow `0 24px 60px rgba(60,50,100,.10)`.
- **Buttons:** pill shape. Primary is dark with white text; secondary is a text link with a chevron or an outlined pill.
- **Nav:** a floating glass pill centred at the top: name, links, dark "Get in touch" button.
- **Project tile:** pastel gradient panel, radius 30px, title and type top-left, round dark arrow button top-right, the site preview tilted in 3D with a white 6px frame and deep soft shadow.

## Page sections, in order

1. **Hero.** Nav pill, small "New" chip, headline "Design that sells. / Code that lasts.", "Start a project" + "See the work", then a fan of five 3D project cards over the pastel glow.
2. **Services marquee.** One line of very large text (alternating dark and grey, purple ✦ between), scrolling sideways continuously.
3. **Services.** Four glass cards, each with a 3D iridescent chrome icon, title, one-line description and three bullet points.
4. **Selected work.** Bento grid: two large tiles on top, three below.
5. **Process.** Four numbered circles on a line: Discover, Design, Build, Launch.
6. **Pricing.** Three plans, centre one dark, raised and tagged "Most popular".
7. **Testimonials.** One large quote card with dots. **Hidden on the live site for now.**
8. **About.** Not in the mockup; design it in the same style (photo, short bio).
9. **Blog preview.** Not in the mockup; latest three posts as glass cards linking to `/blog`.
10. **Contact.** Large rounded panel with its own peach/lilac/blue glow: heading and contact links on the left, glass form on the right (name, email, project-type chips, details, send).
11. **Footer.** The name in giant type fading downward, then a thin rule with copyright and links.

## 3D

- **Hero card fan:** five rounded cards with white frames. For card index `i` from -2 to 2: position `x = i*1.5`, `y = -1.3 - |i|*0.2`, `z = -|i|*0.55`; rotation `y = -i*0.2`, `z = -i*0.085`. Camera: 30° field of view, 11 units back. A soft violet shadow sits under each card. Order: Osteria, Maison, Aurel (centre), Orbit, Dash.
- **Service icons:** simple shapes (capsule with ring, bag, stacked slabs, target ring) in white chrome with full iridescence, lit by an environment of pink, blue, amber, white and teal panels. See `mockups/source/main.js`, scene `z`.

## Motion (agreed in discussion, not visible in the stills)

- Hero cards fan out as the page loads, tilt with the mouse, and drift slightly at rest. Clicking a card opens that project.
- Headline and text animate in on load; sections reveal on scroll.
- Scrolling from the hero into "Selected work" should feel continuous, as if the fan spreads into the gallery.
- Service icons react on hover. Marquee scrolls continuously.
- Respect `prefers-reduced-motion`: no parallax or auto-motion, content still fully usable.
- On phones use a lighter 3D setup (fewer cards or pre-rendered images, lower pixel ratio) so scrolling stays smooth.

## Avoid

- Dark neon gradients, generic glassmorphism on dark, particle starfields, custom cursors for their own sake.
- Stock template layouts. If a section starts to look like any other freelancer site, rework it.
