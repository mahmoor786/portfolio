/* Mahmoor portfolio: content, currency, work index, scroll scene and the project brief. */
(function () {
  // ---- Contact details: replace these two before launch ----
  const WHATSAPP = '920000000000';      // international format, digits only (placeholder)
  const EMAIL = 'hello@mahmoor.dev';    // placeholder

  const WORK = [
    { id: 'gym', name: 'Ironhouse Gym', kind: 'Fitness', what: 'Gym website with a class timetable you can book from.' },
    { id: 'clinic', name: 'Clearview Dental', kind: 'Health', what: 'Clinic site with online appointments: pick a day, pick a time, done.' },
    { id: 'estate', name: 'Harbour & Hale', kind: 'Real estate', what: 'Property search with listings, prices and a valuation request.' },
    { id: 'store', name: 'Thread & Loom', kind: 'Online store', what: 'Clothing shop with products, a bag and checkout.' },
    { id: 'cafe', name: 'Brew Lane', kind: 'Food', what: 'Café menu with prices and order-ahead for collection.' },
    { id: 'app', name: 'Pulse', kind: 'Mobile app', what: 'Fitness app for gym members, on iPhone and Android.' }
  ];
  const PLANS = [
    { name: 'Landing page', p: { USD: 299, GBP: 239, EUR: 279 }, what: 'One page built to turn visitors into enquiries', time: '5 days' },
    { name: 'Business website', p: { USD: 699, GBP: 549, EUR: 649 }, what: 'Up to 5 pages, contact form, ready for Google', time: '10 days' },
    { name: 'Custom WordPress', p: { USD: 999, GBP: 799, EUR: 929 }, what: 'Your own theme, with pages you can edit yourself', time: '14 days' },
    { name: 'Online store', p: { USD: 1199, GBP: 949, EUR: 1099 }, what: 'Shopify or WooCommerce: products, payments, shipping', time: '3 weeks' },
    { name: 'Web app', p: { USD: 2499, GBP: 1999, EUR: 2299 }, what: 'Logins, dashboards and bookings on your own data', time: 'from 4 weeks' },
    { name: 'Mobile app', p: { USD: 2999, GBP: 2399, EUR: 2799 }, what: 'iPhone and Android, published to both stores', time: 'from 6 weeks' }
  ];
  const BUDGETS = [[0, 300], [300, 700], [700, 1500], [1500, null]];
  const RATE = { USD: 1, GBP: 0.8, EUR: 0.93 };
  const SYM = { USD: '$', GBP: '£', EUR: '€' };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s);
  const fmt = (n, c) => SYM[c] + Math.round(n).toLocaleString('en-GB');
  const round = (n) => n < 1000 ? Math.round(n / 50) * 50 : Math.round(n / 100) * 100;

  let cur = (() => { try { return localStorage.getItem('cur'); } catch (e) { return null; } })();
  if (!SYM[cur]) {
    cur = 'USD';
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (/^Europe\/(London|Belfast|Guernsey|Jersey|Isle_of_Man)/.test(tz)) cur = 'GBP';
      else if (/^Europe\//.test(tz)) cur = 'EUR';
    } catch (e) {}
  }

  // ---- Hero: the six concept sites turning in the dark ----
  const deck = $('#deck');
  let deckLayout = null;
  if (deck) {
    const ORDER = ['clinic', 'store', 'gym', 'estate', 'cafe', 'app'];
    const LIVE = { clinic: 1, store: 1, gym: 1 };
    const tilt = document.createElement('div'); tilt.className = 'tilt'; deck.appendChild(tilt);
    const cards = ORDER.map((id, i) => {
      const c = document.createElement('div'); c.className = 'card';
      c.innerHTML = `<div data-mock="${id}"${LIVE[id] ? ' data-live' : ''}></div>`;
      c.style.transform = 'translate(-50%,-40%) scale(.86)'; c.style.opacity = '0';
      tilt.appendChild(c); return c;
    });
    let active = 0, lastTouch = 0, visible = true;
    const now = $('#now');
    deckLayout = () => {
      const n = cards.length, w = innerWidth, small = w < 760;
      deck.style.setProperty('--cw', small ? '84vw' : '42vw');
      const X = (small ? 0.34 : 0.25) * w, Z = small ? 190 : 280, R = small ? 32 : 30;
      cards.forEach((c, i) => {
        let o = (i - active + n) % n; if (o > n / 2) o -= n;
        const a = Math.abs(o), hidden = a > 2;
        c.style.transform = `translate(-50%,-50%) translateX(${o * X}px) translateZ(${-a * Z}px) rotateY(${-o * R}deg)`;
        c.style.opacity = hidden ? '0' : '1';
        c.style.filter = `brightness(${(1 - a * 0.3).toFixed(2)})`;
        c.style.zIndex = String(10 - a);
        c.classList.toggle('front', o === 0);
      });
      const w0 = WORK.find(x => x.id === ORDER[active]);
      if (now && w0) now.innerHTML = `<strong>${w0.name.replace('&', '&amp;')}</strong>, ${w0.kind.toLowerCase()} concept`;
    };
    cards.forEach((c, i) => c.addEventListener('click', () => { if (i !== active) { active = i; lastTouch = performance.now(); deckLayout(); } }));
    // one orchestrated moment: the stack fans out on load
    requestAnimationFrame(() => requestAnimationFrame(() => {
      cards.forEach((c, i) => { c.style.transitionDelay = (reduce ? 0 : i * 70) + 'ms'; });
      deckLayout();
      setTimeout(() => cards.forEach(c => { c.style.transitionDelay = '0ms'; }), 1600);
    }));
    addEventListener('resize', () => deckLayout());
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(deck);
    if (!reduce) {
      setInterval(() => {
        if (!visible || document.hidden || performance.now() - lastTouch < 6000) return;
        active = (active + 1) % cards.length; deckLayout();
      }, 3400);
      // spring-like tilt toward the pointer
      let tx = 0, ty = 0, rx = 0, ry = 0;
      const hero = $('.hero');
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        ty = ((e.clientX - r.left) / r.width - 0.5) * 12; tx = -((e.clientY - r.top) / r.height - 0.5) * 7;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { tx = ty = 0; });
      hero.addEventListener('pointerdown', () => { lastTouch = performance.now(); }, { passive: true });
      (function loop() {
        rx += (tx - rx) * 0.07; ry += (ty - ry) * 0.07;
        tilt.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        requestAnimationFrame(loop);
      })();
    }
  }

  // ---- Work index with a sticky preview ----
  const idx = $('#idx'), frame = $('#frame'), cap = $('#frame-cap');
  if (idx) {
    idx.innerHTML = WORK.map((w, i) => `<li><div class="ph"><div data-mock="${w.id}" style="--ar:16/10"></div></div><a href="#work" class="${i ? '' : 'on'}" data-id="${w.id}"><span class="n">${w.name.replace('&', '&amp;')}</span><span class="k">${w.kind}, concept</span></a></li>`).join('');
    frame.innerHTML = '<div class="sizer"><div data-mock="gym"></div></div>' + WORK.map((w, i) => `<div class="${i ? '' : 'on'}" data-for="${w.id}"><div data-mock="${w.id}"></div></div>`).join('');
    cap.textContent = WORK[0].what;
    const act = a => {
      idx.querySelectorAll('a').forEach(x => x.classList.toggle('on', x === a));
      frame.querySelectorAll('[data-for]').forEach(d => d.classList.toggle('on', d.dataset.for === a.dataset.id));
      cap.textContent = WORK.find(w => w.id === a.dataset.id).what;
    };
    idx.querySelectorAll('a').forEach(a => {
      a.addEventListener('mouseenter', () => act(a));
      a.addEventListener('focus', () => act(a));
      a.addEventListener('click', e => { e.preventDefault(); act(a); });
    });
  }
  if (window.renderScreens) window.renderScreens();

  // ---- Prices ----
  const menu = $('#menu');
  function drawPrices() {
    if (menu) {
      const groups = [['Websites', PLANS.slice(0, 3)], ['Stores and apps', PLANS.slice(3)]];
      menu.innerHTML = groups.map(([g, ps]) => `<div><h3>${g}</h3>${ps.map(p => `<a class="it" href="#start" data-plan="${p.name}"><span><span class="nm">${p.name}</span><small>${p.what}. Ready in ${p.time}.</small><span class="go">Choose ${p.name.toLowerCase()}</span></span><span class="pr">from ${fmt(p.p[cur], cur)}</span></a>`).join('')}</div>`).join('');
    }
    document.querySelectorAll('.cur button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.c === cur)));
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
    form.addEventListener('input', () => { preview(); clearErr(); });
    form.addEventListener('change', preview);
    preview();
    const err = $('#f-err');
    function clearErr() { err.textContent = ''; $('#f-name').parentElement.removeAttribute('data-bad'); }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const via = e.submitter ? e.submitter.dataset.via : 'wa';
      if (!val('need')) { err.textContent = 'Pick what you need first, or choose "Not sure yet".'; form.querySelector('input[name="need"]').focus(); return; }
      if (!$('#f-name').value.trim()) { err.textContent = 'Add your name so I know who is writing.'; $('#f-name').parentElement.setAttribute('data-bad', ''); $('#f-name').focus(); return; }
      const text = message();
      const url = via === 'mail'
        ? `mailto:${EMAIL}?subject=${encodeURIComponent('Project brief: ' + val('need'))}&body=${encodeURIComponent(text)}`
        : `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
      window.location.href = url;
    });
  }
  // Preselect from hero buttons and price list
  function choose(plan) {
    if (!form) return;
    const input = form.querySelector(`input[name="need"][value="${plan}"]`);
    if (input) { input.checked = true; preview(); }
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-need], [data-plan]');
    if (a) choose(a.dataset.need || a.dataset.plan);
  });
  const wa = $('#wa');
  if (wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Mahmoor, I'd like to talk about a website for my business.")}`;

  // ---- How it works: steps follow the scroll ----
  const how = $('#how');
  if (how) {
    const lis = [...how.querySelectorAll('#steps li')], pairs = [...how.querySelectorAll('.pair')];
    let last = -1;
    const step = () => {
      const r = how.getBoundingClientRect();
      const t = Math.min(0.999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      const i = Math.floor(t * lis.length);
      if (i === last) return; last = i;
      lis.forEach((l, k) => l.classList.toggle('on', k === i));
      pairs.forEach((p, k) => p.classList.toggle('on', k === i));
    };
    addEventListener('scroll', step, { passive: true }); step();
  }

  // ---- Fit display lines to the page width ----
  function fit() {
    const m = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--m')) || 30;
    document.querySelectorAll('[data-fit]').forEach(el => {
      el.style.fontSize = '100px';
      const w = el.parentElement.clientWidth - 2 * m;
      el.style.fontSize = (100 * w / el.getBoundingClientRect().width * 0.99) + 'px';
    });
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fit, 120); });

  // ---- Entrances: each group rises once, staggered 60ms ----
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rise').forEach(el => {
    const sib = [...el.parentElement.children].filter(c => c.classList.contains('rise'));
    el.style.transitionDelay = (sib.indexOf(el) * 60) + 'ms';
    io.observe(el);
  });
  document.querySelectorAll('.idx a').forEach((el, i) => { el.classList.add('rise'); el.style.transitionDelay = ((i % 6) * 50) + 'ms'; io.observe(el); });

})();
