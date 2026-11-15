// Page behaviour: menu, scroll animations, contact form, and lazy-loading the 3D.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- mobile menu ---- */
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menubtn');
if (nav && menuBtn) {
  const set = (open: boolean) => { nav.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); };
  menuBtn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.querySelectorAll('.links a').forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
  document.addEventListener('click', (e) => { if (!nav.contains(e.target as Node)) set(false); });
}

/* ---- load and scroll animations ---- */
if (reduce) {
  root.classList.add('reveal-all');
} else {
  gsap.registerPlugin(ScrollTrigger);
  const ease = 'power3.out';
  gsap.from('[data-hero]', { y: 34, opacity: 0, duration: 1, ease, stagger: 0.09, delay: 0.1, clearProps: 'transform' });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease, clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.from(group.children, { y: 50, opacity: 0, duration: 1, ease, stagger: 0.1, clearProps: 'transform,opacity', scrollTrigger: { trigger: group, start: 'top 86%', once: true } });
  });
}
(window as any).__ready = true;

/* ---- contact form: builds a ready-to-send WhatsApp or email message, no server needed ---- */
const form = document.getElementById('brief') as HTMLFormElement | null;
if (form) {
  const message = () => {
    const d = new FormData(form);
    return `Hi Mahmoor, I'm ${d.get('name')}.\n\nI need: ${d.get('need')}\n\n${d.get('details')}\n\nReply to: ${d.get('email')}`;
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(message())}`, '_blank', 'noopener');
  });
  document.getElementById('viaemail')?.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(`New project: ${d.get('need')}`)}&body=${encodeURIComponent(message())}`;
  });
  // "Choose <plan>" buttons note the chosen package in the details box.
  document.querySelectorAll<HTMLElement>('[data-need]').forEach((b) => b.addEventListener('click', () => {
    const box = form.querySelector<HTMLTextAreaElement>('textarea')!;
    if (!box.value.includes('package')) box.value = `I'm interested in the ${b.dataset.need} package.\n` + box.value;
  }));
}

/* ---- 3D: loaded after the page is readable, so it never delays the text ---- */
const stage = document.getElementById('stage');
const icons = document.querySelectorAll<HTMLCanvasElement>('canvas[data-icon]');
if (stage || icons.length) {
  const start = async () => {
    try {
      const scenes = await import('./scenes');
      if (stage) scenes.initHero(stage, reduce);
      if (icons.length) scenes.initIcons([...icons], reduce);
    } catch (err) {
      console.warn('3D could not start; showing the flat version instead.', err);
    }
  };
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1200 });
  else setTimeout(start, 300);
}
