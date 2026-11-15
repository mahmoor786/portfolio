/*
  ALL EDITABLE CONTENT LIVES IN THIS FILE.
  Change text, prices, contact details or switch sections on and off here.
  Nothing in here needs any knowledge of the layout code.
*/

export const site = {
  name: 'Mahmoor Ullah',
  role: 'Web designer & developer',
  // Shown in Google results and when the site is shared.
  title: 'Mahmoor Ullah — Web designer & developer',
  description:
    'Freelance web designer and developer. Landing pages, online stores and web apps, designed to sell and built to last.',

  headline: ['Design that sells.', 'Code that lasts.'],
  intro: 'Landing pages, online stores and web apps, designed and built by one person who cares about the details.',
  availability: 'Available for new projects',

  email: 'mahmooroffical2@gmail.com',
  whatsapp: { display: '+92 317 5819445', number: '923175819445' },
  fiverr: '', // paste your Fiverr profile link here to show it in the contact section

  // Switch whole sections on or off.
  show: {
    pricing: true,
    testimonials: false, // turn on once you have real client reviews
    about: true,
    blog: true,
  },
};

export const services = [
  {
    title: 'Landing pages',
    text: 'One focused page built to turn visitors into customers.',
    points: ['Conversion-first layout', 'Scroll animations', 'Fast loading'],
  },
  {
    title: 'E-commerce',
    text: 'Online stores that make buying feel effortless.',
    points: ['Product & cart pages', 'Secure checkout', 'Easy to manage'],
  },
  {
    title: 'Web apps',
    text: 'Dashboards and tools tailored to how you work.',
    points: ['Custom features', 'Logins & databases', 'Built to scale'],
  },
  {
    title: 'Redesigns',
    text: 'A fresh, modern look for a site that feels dated.',
    points: ['New visual identity', 'Better mobile experience', 'Speed & SEO tune-up'],
  },
];

// Words in the big scrolling strip under the hero.
export const marquee = ['Landing pages', 'E-commerce', 'Web apps', 'Redesigns', 'Speed & SEO'];

/*
  Showcase projects. These five are concept (demo) sites.
  To add a real project: add an entry with `concept: false`, put a 1280x800
  screenshot in public/work/, and set `href` to the live website address.
  The first five are shown in the 3D fan in the hero, in the order of `fan`.
*/
export const projects = [
  { slug: 'aurel', title: 'Aurel', type: 'Luxury online store', concept: true, href: '', tint: ['#ffe4d6', '#f3d9ff'], tilt: -14 },
  { slug: 'orbit', title: 'Orbit', type: 'SaaS landing page', concept: true, href: '', tint: ['#dfe6ff', '#eaf6ff'], tilt: 14 },
  { slug: 'maison', title: 'Maison', type: 'Fashion store', concept: true, href: '', tint: ['#fff0d9', '#ffe0e6'], tilt: -12 },
  { slug: 'osteria', title: 'Osteria', type: 'Restaurant website', concept: true, href: '', tint: ['#e2f5ea', '#e3f0ff'], tilt: 0 },
  { slug: 'dash', title: 'Dash', type: 'Analytics web app', concept: true, href: '', tint: ['#ece4ff', '#dfe6ff'], tilt: 12 },
];
// Left-to-right order of the cards in the hero fan (the middle one is in front).
export const fan = ['osteria', 'maison', 'aurel', 'orbit', 'dash'];

// PLACEHOLDER timings: change `when` to match how you really work.
export const steps = [
  { title: 'Discover', text: 'We talk through your goals, audience and the sites you admire.', when: 'Day 1' },
  { title: 'Design', text: 'You get a full visual design to review before any code is written.', when: 'Week 1' },
  { title: 'Build', text: 'I turn the design into a fast, animated, mobile-ready website.', when: 'Week 2–3' },
  { title: 'Launch', text: 'Your site goes live, and I stay on hand for fixes and updates.', when: 'Week 4' },
];

// PLACEHOLDER prices and package contents: replace before sharing the site.
export const plans = [
  {
    name: 'Starter', price: '$000', note: 'A single landing page', featured: false,
    points: ['1 page, up to 5 sections', 'Mobile responsive', 'Contact form', '1 round of revisions'],
  },
  {
    name: 'Business', price: '$000', note: 'A complete business website', featured: true,
    points: ['Up to 6 pages', 'Custom animations', 'SEO & speed setup', '3 rounds of revisions', '2 weeks of support'],
  },
  {
    name: 'Store', price: '$000', note: 'A full online store', featured: false,
    points: ['Product & cart pages', 'Payment setup', 'Admin training', '3 rounds of revisions'],
  },
];

// Hidden while site.show.testimonials is false. Add REAL reviews only.
export const testimonials: { quote: string; name: string; role: string }[] = [
  // { quote: 'What the client said…', name: 'Client name', role: 'Role, Company' },
];

// PLACEHOLDER bio: rewrite in your own words and add a photo at public/mahmoor.jpg,
// then set photo: 'mahmoor.jpg'.
export const about = {
  photo: '',
  heading: ['One person,', 'start to finish.'],
  paragraphs: [
    "I'm Mahmoor, a web designer and developer. I design and build websites for businesses that want to stand out online.",
    'You work with me directly from the first conversation to launch day, so nothing gets lost between a designer and a developer. I care about the small things: how fast a page loads, how it feels on a phone, and whether a visitor knows what to do next.',
  ],
  points: ['Design and code by the same person', 'Clear updates at every stage', 'The finished site is yours to own'],
};

// What the contact form offers under "What do you need?"
export const needs = ['Landing page', 'Online store', 'Web app', 'Redesign'];
