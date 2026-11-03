/* Mahmoor portfolio: content, motion, currency and the project brief. */
(function () {
  // ---- Contact details: replace these two before launch ----
  const WHATSAPP = '920000000000';      // international format, digits only (placeholder)
  const EMAIL = 'hello@mahmoor.dev';    // placeholder

  const WORK = [
    { id: 'clinic', name: 'Clearview Dental', kind: 'Health', what: 'Clinic site with online appointments.', live: 1 },
    { id: 'store', name: 'Thread & Loom', kind: 'Online store', what: 'Clothing shop with products and a bag.', live: 1 },
    { id: 'gym', name: 'Ironhouse Gym', kind: 'Fitness', what: 'Gym site with a bookable class timetable.', live: 1 },
    { id: 'estate', name: 'Harbour & Hale', kind: 'Real estate', what: 'Property search and listings.' },
    { id: 'cafe', name: 'Brew Lane', kind: 'Food', what: 'Café menu with order-ahead.' },
    { id: 'app', name: 'Pulse', kind: 'Mobile app', what: 'Fitness app for iPhone and Android.' }
  ];
  const PLANS = [
    { name: 'Landing page', p: { USD: 299, GBP: 239, EUR: 279 }, what: 'One page built to turn visitors into enquiries.', time: '5 days', inc: ['1 page, mobile-first', 'Contact or booking form', '2 rounds of changes'] },
    { name: 'Business website', p: { USD: 699, GBP: 549, EUR: 649 }, what: 'A complete site for a growing business.', time: '10 days', inc: ['Up to 5 pages', 'Contact form and map', 'Google setup', '2 rounds of changes'], best: 1 },
    { name: 'Custom WordPress', p: { USD: 999, GBP: 799, EUR: 929 }, what: 'Your own theme, with pages you edit yourself.', time: '14 days', inc: ['Custom theme, no page builder', 'Edit text and photos yourself', 'Blog ready'] },
    { name: 'Online store', p: { USD: 1199, GBP: 949, EUR: 1099 }, what: 'Shopify or WooCommerce, ready to sell.', time: '3 weeks', inc: ['Products and variants', 'Card payments', 'Shipping rates and order emails'] },
    { name: 'Web app', p: { USD: 2499, GBP: 1999, EUR: 2299 }, what: 'Logins, dashboards and bookings on your data.', time: 'from 4 weeks', inc: ['Customer accounts', 'Admin panel', 'Your data in your own account'] },
    { name: 'Mobile app', p: { USD: 2999, GBP: 2399, EUR: 2799 }, what: 'iPhone and Android from one build.', time: 'from 6 weeks', inc: ['Sign-in and notifications', 'Published to both stores', 'Matches your website'] }
  ];
  const ICON = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const SERVICES = [
    ['Landing pages', 'One focused page for an ad, a launch or an offer.', '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h8"/>'],
    ['Business websites', 'A clear, fast site that makes the phone ring.', '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 13h4M7 16h7"/><rect x="14" y="12" width="4" height="5" rx="1"/>'],
    ['Custom WordPress', 'Your own theme that you can edit without me.', '<circle cx="12" cy="12" r="9"/><path d="M7 8l3 9 2-6 2 6 3-9"/>'],
    ['Online stores', 'Shopify or WooCommerce, from products to payments.', '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/>'],
    ['Web apps', 'Bookings, dashboards and customer accounts.', '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M11 9h6M11 13h4"/>'],
    ['Mobile apps', 'iPhone and Android apps, published to both stores.', '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>']
  ];
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const BUDGETS = [[0, 300], [300, 700], [700, 1500], [1500, null]];
  const RATE = { USD: 1, GBP: 0.8, EUR: 0.93 };
  const SYM = { USD: '$', GBP: '£', EUR: '€' };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s);
  const esc = s => s.replace(/&/g, '&amp;');
  const fmt = (n, c) => SYM[c] + Math.round(n).toLocaleString('en-GB');
  const round = n => n < 1000 ? Math.round(n / 50) * 50 : Math.round(n / 100) * 100;

  let cur = (() => { try { return localStorage.getItem('cur'); } catch (e) { return null; } })();
  if (!SYM[cur]) {
    cur = 'USD';
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (/^Europe\/(London|Belfast|Guernsey|Jersey|Isle_of_Man)/.test(tz)) cur = 'GBP';
      else if (/^Europe\//.test(tz)) cur = 'EUR';
    } catch (e) {}
  }

  // ---- Hero headline: split into words for the blur-in ----
  const h1 = $('#hero-h');
  if (h1) {
    const words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', h1.textContent.trim());
    h1.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true" style="transition-delay:${120 + i * 70}ms">${w}</span>`).join(' ');
    requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('in')));
  }

  // ---- Marquee: the concept screens, twice for a seamless loop ----
  const track = $('#track');
  if (track) {
    const order = ['clinic', 'store', 'gym', 'estate', 'cafe', 'app'];
    track.innerHTML = order.concat(order).map(id => `<div class="tile"><div data-mock="${id}"></div></div>`).join('');
  }

  // ---- Work cards ----
  const cards = $('#cards');
  if (cards) {
    cards.innerHTML = WORK.map(w => `<article class="pcard rise"><div class="shot"><div data-mock="${w.id}"${w.live ? ' data-live' : ''}></div></div><div class="meta"><div><h3>${esc(w.name)}</h3><p>${w.what}</p></div><span class="tag">${w.kind}</span></div></article>`).join('');
  }
  const svc = $('#svc');
  if (svc) svc.innerHTML = SERVICES.map(([t, d, p]) => `<li class="rise">${ICON(p)}<h3>${t}</h3><p>${d}</p></li>`).join('');
  if (window.renderScreens) window.renderScreens();

  // ---- Prices ----
  const plans = $('#plans');
  function drawPrices() {
    if (plans) {
      plans.innerHTML = PLANS.map(p => `<div class="plan${p.best ? ' best' : ''}"><div class="nm">${p.name}${p.best ? '<span class="badge">Recommended</span>' : ''}</div>
        <div class="pr"><small>from</small>${fmt(p.p[cur], cur)}</div><p class="what">${p.what} Ready in ${p.time}.</p>
        <ul>${p.inc.map(i => `<li>${CHECK}<span>${i}</span></li>`).join('')}</ul>
        <a class="btn${p.best ? '' : ' alt'}" href="#start" data-plan="${p.name}">Choose ${p.name.toLowerCase()}</a></div>`).join('');
    }
    const btns = [...document.querySelectorAll('.cur button')];
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.c === cur)));
    const pill = $('.cur .pill'), on = btns.find(b => b.dataset.c === cur);
    if (pill && on) { pill.style.width = on.offsetWidth + 'px'; pill.style.transform = `translateX(${on.offsetLeft - 4}px)`; }
    drawBudgets();
  }
  document.querySelectorAll('.cur button').forEach(b => b.addEventListener('click', () => {
    cur = b.dataset.c;
    try { localStorage.setItem('cur', cur); } catch (e) {}
    drawPrices(); preview();
  }));

  // ---- The brief ----
  const form = $('#brief');
  const chips = (el, name, type, items) => {
    el.innerHTML = items.map(v => `<label class="chip"><input type="${type}" name="${name}" value="${v}"><span>${v}</span></label>`).join('');
  };
  function drawBudgets() {
    const el = $('#f-budget'); if (!el) return;
    const prev = (el.querySelector('input:checked') || {}).dataset;
    const labels = BUDGETS.map(([a, b]) => {
      const A = round(a * RATE[cur]), B = b && round(b * RATE[cur]);
      return a === 0 ? `Under ${fmt(B, cur)}` : b ? `${fmt(A, cur)} to ${fmt(B, cur)}` : `${fmt(A, cur)} or more`;
    }).concat('Not sure yet');
    el.innerHTML = labels.map((v, i) => `<label class="chip"><input type="radio" name="budget" value="${v}" data-i="${i}"><span>${v}</span></label>`).join('');
    if (prev && prev.i) { const again = el.querySelector(`[data-i="${prev.i}"]`); if (again) again.checked = true; }
  }
  if (form) {
    chips($('#f-need'), 'need', 'radio', PLANS.map(p => p.name).concat('Not sure yet'));
    chips($('#f-biz'), 'biz', 'radio', ['Gym or fitness', 'Clinic or health', 'Real estate', 'Shop', 'Restaurant or café', 'Something else']);
    chips($('#f-feat'), 'feat', 'checkbox', ['Online booking', 'Online payments', 'Contact form', 'Product catalogue', 'Blog', 'Customer accounts', 'More than one language', 'Logo and branding']);
    chips($('#f-when'), 'when', 'radio', ['As soon as possible', 'Within a month', 'In 1 to 3 months', 'Just exploring']);
  }
  drawPrices();
  addEventListener('resize', drawPrices);

  const val = n => (form.querySelector(`input[name="${n}"]:checked`) || {}).value || '';
  function message() {
    const need = val('need'), plan = PLANS.find(p => p.name === need);
    const feats = [...form.querySelectorAll('input[name="feat"]:checked')].map(i => i.value);
    const name = $('#f-name').value.trim(), co = $('#f-company').value.trim(), about = $('#f-about').value.trim();
    const lines = [`Hi Mahmoor, I'm ${name || '[your name]'}${co ? ' from ' + co : ''}.`];
    lines.push('', `I need: ${need || '[pick what you need]'}${plan ? ` (from ${fmt(plan.p[cur], cur)})` : ''}`);
    if (val('biz')) lines.push(`Business: ${val('biz')}`);
    if (feats.length) lines.push(`It should have: ${feats.join(', ')}`);
    if (val('budget')) lines.push(`Budget: ${val('budget')}`);
    if (val('when')) lines.push(`Timing: ${val('when')}`);
    if (about) lines.push('', about);
    return lines.join('\n');
  }
  function preview() { const p = $('#preview'); if (p && form) p.textContent = message(); }
  if (form) {
    const err = $('#f-err');
    const clearErr = () => { err.textContent = ''; $('#f-name').parentElement.removeAttribute('data-bad'); };
    form.addEventListener('input', () => { preview(); clearErr(); });
    form.addEventListener('change', preview);
    preview();
    form.addEventListener('submit', e => {
      e.preventDefault();
      const via = e.submitter ? e.submitter.dataset.via : 'wa';
      if (!val('need')) { err.textContent = 'Pick what you need first, or choose "Not sure yet".'; form.querySelector('input[name="need"]').focus(); return; }
      if (!$('#f-name').value.trim()) { err.textContent = 'Add your name so I know who is writing.'; $('#f-name').parentElement.setAttribute('data-bad', ''); $('#f-name').focus(); return; }
      const text = message();
      window.location.href = via === 'mail'
        ? `mailto:${EMAIL}?subject=${encodeURIComponent('Project brief: ' + val('need'))}&body=${encodeURIComponent(text)}`
        : `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-plan]');
    if (!a || !form) return;
    const input = form.querySelector(`input[name="need"][value="${a.dataset.plan}"]`);
    if (input) { input.checked = true; preview(); }
  });
  const wa = $('#wa');
  if (wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Mahmoor, I'd like to talk about a website for my business.")}`;

  // ---- Entrances: each group eases in once, staggered ----
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; el.classList.add('in'); io.unobserve(el);
    // hand the element back to its own hover styles once it has arrived
    setTimeout(() => { el.classList.remove('rise', 'in'); el.style.transitionDelay = ''; }, 1000 + (parseInt(el.style.transitionDelay, 10) || 0));
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rise').forEach(el => {
    const sib = [...el.parentElement.children].filter(c => c.classList.contains('rise'));
    el.style.transitionDelay = (Math.min(sib.indexOf(el), 5) * 70) + 'ms';
    io.observe(el);
  });
  // hero copy follows the headline
  document.querySelectorAll('.hero .rise').forEach((el, i) => { el.style.transitionDelay = (i === 0 ? 0 : 420 + i * 80) + 'ms'; });
})();
