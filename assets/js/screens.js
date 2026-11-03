/* Concept project screens, drawn in HTML. Each is a working screen from a concept site, not a client project. */
(function () {
  const css = `
  .mk{container-type:inline-size;position:relative;overflow:hidden;aspect-ratio:var(--ar,4/3);width:100%;display:block}
  .mk *{box-sizing:border-box;margin:0;padding:0}
  .mk .xin{position:absolute;inset:0;display:flex;flex-direction:column;font-size:2.1cqw;line-height:1.3}
  .mk .xnav{display:flex;align-items:center;justify-content:space-between;padding:3.2cqw 4cqw}
  .mk .xnav .xl{display:flex;gap:3cqw;font-size:1.9cqw}
  .mk .xlogo{font-weight:800;font-size:2.4cqw;letter-spacing:-.02em}
  .mk .xbtn{display:inline-block;padding:1.4cqw 2.6cqw;font-weight:700;font-size:1.9cqw}
  .mk .xser{font-family:Georgia,"Noto Serif","Times New Roman",serif}

  .mk-gym{background:#121212;color:#f2f2f2}
  .mk-gym .xbtn{background:#ff5a1f;color:#121212}
  .mk-gym .xbody{flex:1;display:grid;grid-template-columns:1.15fr 1fr;gap:4cqw;padding:2cqw 4cqw 4cqw}
  .mk-gym .xh{font-size:8.6cqw;line-height:.86;font-weight:900;letter-spacing:-.04em;text-transform:uppercase}
  .mk-gym .xh b{color:#ff5a1f;font-weight:900}
  .mk-gym p{font-size:2cqw;color:#bdbdbd;margin-top:2.4cqw;max-width:34ch}
  .mk-gym .xtt{background:#1d1d1d;padding:2.6cqw;display:flex;flex-direction:column;gap:1.3cqw;align-self:end}
  .mk-gym .xtt div{display:grid;grid-template-columns:4.5cqw 6.5cqw 1fr auto;gap:1cqw;font-size:1.85cqw;padding:.9cqw 0}
  .mk-gym .xtt div span:last-child{color:#ff5a1f;font-weight:700}
  .mk-gym .xplate{position:absolute;right:-9cqw;top:8cqw;width:30cqw;aspect-ratio:1;border-radius:50%;border:5cqw solid #262626;outline:1.2cqw solid #1d1d1d;outline-offset:-10cqw;opacity:.9}

  .mk-clinic{background:#f2f7f6;color:#0d2b2a}
  .mk-clinic .xbtn{background:#1a7560;color:#fff}
  .mk-clinic .xbody{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:4cqw;padding:3cqw 4cqw 4cqw;align-items:center}
  .mk-clinic .xh{font-size:6.2cqw;line-height:1.02;font-weight:400;letter-spacing:-.02em}
  .mk-clinic p{font-size:2cqw;margin-top:2cqw;color:#3f5e5c;max-width:30ch}
  .mk-clinic .xbk{background:#fff;padding:3cqw;display:flex;flex-direction:column;gap:1.8cqw}
  .mk-clinic .xbk small{font-size:1.7cqw;color:#3f5e5c}
  .mk-clinic .xrow{display:flex;gap:1cqw}
  .mk-clinic .xrow span{flex:1;text-align:center;padding:1.2cqw 0;background:#eaf2f0;font-size:1.7cqw;line-height:1.25}
  .mk-clinic .xrow span.xon{background:#0d2b2a;color:#fff}
  .mk-clinic .xsl{display:grid;grid-template-columns:repeat(3,1fr);gap:1cqw}
  .mk-clinic .xsl span{text-align:center;padding:1.2cqw 0;border:.25cqw solid #cfe0dc;font-size:1.8cqw}
  .mk-clinic .xsl span.xon{border-color:#1a7560;background:#1a7560;color:#fff}

  .mk-estate{background:#e9edf1;color:#14213d}
  .mk-estate .xbtn{background:#2f5d50;color:#fff}
  .mk-estate .xhd{padding:1cqw 4cqw 0}
  .mk-estate .xh{font-size:6.6cqw;line-height:1;font-weight:400;letter-spacing:-.02em}
  .mk-estate .xsrch{display:grid;grid-template-columns:2fr 1fr 1fr auto;margin:2.6cqw 4cqw 0;background:#fff;font-size:1.8cqw}
  .mk-estate .xsrch span{padding:1.8cqw 2cqw;color:#55607a}
  .mk-estate .xsrch .xbtn{display:flex;align-items:center;color:#fff}
  .mk-estate .xls{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:2cqw;padding:3cqw 4cqw 4cqw}
  .mk-estate .xls > div{background:#fff;display:flex;flex-direction:column}
  .mk-estate .xpic{flex:1;position:relative;min-height:12cqw}
  .mk-estate .xpic i{position:absolute;left:18%;right:18%;bottom:0;height:52%}
  .mk-estate .xpic i::before{content:"";position:absolute;left:-8%;right:-8%;bottom:98%;height:60%;background:inherit;filter:brightness(.8);clip-path:polygon(50% 0,100% 100%,0 100%)}
  .mk-estate .xpic b{position:absolute;bottom:0;left:44%;width:12%;height:24%;background:#14213d}
  .mk-estate .xmeta{padding:1.4cqw 1.6cqw;font-size:1.7cqw}
  .mk-estate .xmeta strong{display:block;font-size:2.2cqw}

  .mk-store{background:#fafafa;color:#111}
  .mk-store .xbtn{background:#111;color:#fff}
  .mk-store .xnav{border-bottom:.2cqw solid #e5e5e5}
  .mk-store .xlogo{font-family:Georgia,"Noto Serif",serif;font-weight:400;font-size:3cqw}
  .mk-store .xttl{display:flex;justify-content:space-between;align-items:end;padding:3cqw 4cqw 1.6cqw}
  .mk-store .xh{font-size:4.6cqw;font-weight:400;letter-spacing:-.02em}
  .mk-store .xgr{flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:1.6cqw;padding:0 4cqw 4cqw}
  .mk-store .xgr > div{display:flex;flex-direction:column;gap:1cqw}
  .mk-store .xph{flex:1;display:grid;place-items:center;min-height:14cqw}
  .mk-store .xtee{width:72%;aspect-ratio:1/1.05;clip-path:polygon(30% 0,40% 6%,60% 6%,70% 0,100% 16%,90% 34%,80% 30%,80% 100%,20% 100%,20% 30%,10% 34%,0 16%)}
  .mk-store .xnm{font-size:1.75cqw;display:flex;justify-content:space-between}

  .mk-clinic .xrow span,.mk-clinic .xsl span,.mk-store .xgr>div,.mk-gym .xtt div{cursor:pointer;transition:background-color .15s ease,color .15s ease,border-color .15s ease}
  .mk-cafe{background:#2a1c13;color:#f4e8da}
  .mk-cafe .xbtn{background:#e9b44c;color:#2a1c13}
  .mk-cafe .xbody{flex:1;display:grid;grid-template-columns:1fr 1.1fr;gap:5cqw;padding:2cqw 4cqw 4cqw;align-items:center}
  .mk-cafe .xh{font-size:7cqw;line-height:.98;font-weight:400}
  .mk-cafe p{font-size:2cqw;margin-top:2cqw;color:#cdb9a3}
  .mk-cafe .xmn{display:flex;flex-direction:column;gap:1.7cqw}
  .mk-cafe .xmn em{font-style:normal;color:#e9b44c;font-size:1.8cqw}
  .mk-cafe .xmn div{display:flex;justify-content:space-between;font-size:2.1cqw}
  .mk-cafe .xmn small{display:block;color:#b29e88;font-size:1.6cqw}

  .mk-app{background:#dfe7fb;color:#0e1a3a}
  .mk-app .xbody{flex:1;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 6cqw;gap:4cqw}
  .mk-app .xh{font-size:6cqw;line-height:1;font-weight:800;letter-spacing:-.03em}
  .mk-app p{font-size:2cqw;margin-top:2cqw;color:#3a4a73}
  .mk-app .xph{justify-self:center;width:30cqw;aspect-ratio:9/19;background:#0e1a3a;border-radius:4.5cqw;padding:1.4cqw;margin:4cqw 0}
  .mk-app .xsc{height:100%;background:#f7f9ff;border-radius:3.4cqw;padding:3cqw 2.4cqw;display:flex;flex-direction:column;gap:1.6cqw;font-size:1.6cqw}
  .mk-app svg{width:62%;align-self:center}
  .mk-app .xit{display:flex;justify-content:space-between;background:#e8eeff;padding:1.2cqw 1.4cqw;border-radius:1.2cqw}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const T = {
    gym: `<div class="xin"><div class="xplate"></div><div class="xnav"><span class="xlogo">IRONHOUSE</span><span class="xl"><span>Classes</span><span>Coaches</span><span>Prices</span></span><span class="xbtn">Join now</span></div>
      <div class="xbody"><div><div class="xh">Stronger <b>every</b> week.</div><p>Strength, HIIT and boxing classes from 6am. First class free.</p></div>
      <div class="xtt"><div><span>Mon</span><span>06:00</span><span>Strength</span><span>4 left</span></div><div><span>Mon</span><span>12:30</span><span>HIIT</span><span>Book</span></div><div><span>Tue</span><span>18:00</span><span>Boxing</span><span>Book</span></div><div><span>Wed</span><span>07:00</span><span>Mobility</span><span>2 left</span></div></div></div></div>`,
    clinic: `<div class="xin"><div class="xnav"><span class="xlogo xser" style="font-weight:400">Clearview Dental</span><span class="xl"><span>Treatments</span><span>Team</span><span>Prices</span></span><span class="xbtn">Book online</span></div>
      <div class="xbody"><div><div class="xh xser">Gentle care, booked in a minute.</div><p>Check-ups, hygiene and whitening. New patients welcome this week.</p></div>
      <div class="xbk"><small>Choose a day</small><div class="xrow"><span>Mon<br>3</span><span class="xon">Tue<br>4</span><span>Wed<br>5</span><span>Thu<br>6</span></div>
      <small>Available times</small><div class="xsl"><span>09:00</span><span class="xon">09:30</span><span>10:15</span><span>11:00</span><span>14:20</span><span>15:40</span></div><span class="xbtn" style="text-align:center">Book check-up, £45</span></div></div></div>`,
    estate: `<div class="xin"><div class="xnav"><span class="xlogo xser" style="font-weight:400">Harbour &amp; Hale</span><span class="xl"><span>Buy</span><span>Rent</span><span>Sell</span></span><span class="xbtn">Value my home</span></div>
      <div class="xhd"><div class="xh xser">Homes by the harbour</div></div>
      <div class="xsrch"><span>Location: Harbourside</span><span>Any price</span><span>2+ beds</span><span class="xbtn">Search</span></div>
      <div class="xls">
        <div><div class="xpic" style="background:#b9cbe0"><i style="background:#f1ece4"></i><b></b></div><div class="xmeta"><strong>£425,000</strong>3 bed townhouse</div></div>
        <div><div class="xpic" style="background:#c9d8c5"><i style="background:#2f5d50"></i><b style="background:#e9edf1"></b></div><div class="xmeta"><strong>£310,000</strong>2 bed cottage</div></div>
        <div><div class="xpic" style="background:#d9cfc1"><i style="background:#14213d"></i><b style="background:#e9b44c"></b></div><div class="xmeta"><strong>£1,450 pcm</strong>Loft apartment</div></div>
      </div></div>`,
    store: `<div class="xin"><div class="xnav"><span class="xl"><span>Women</span><span>Men</span><span>Sale</span></span><span class="xlogo">Thread &amp; Loom</span><span class="xl"><span>Search</span><span>Bag (2)</span></span></div>
      <div class="xttl"><div class="xh xser">New in: autumn basics</div><span class="xbtn">Shop all</span></div>
      <div class="xgr">
        <div><div class="xph" style="background:#ece6dc"><div class="xtee" style="background:#7a8b6f"></div></div><div class="xnm"><span>Field tee</span><span>£38</span></div></div>
        <div><div class="xph" style="background:#e3e8ee"><div class="xtee" style="background:#1f2a44"></div></div><div class="xnm"><span>Harbour tee</span><span>£38</span></div></div>
        <div><div class="xph" style="background:#f0e2dc"><div class="xtee" style="background:#c0563f"></div></div><div class="xnm"><span>Clay tee</span><span>£42</span></div></div>
        <div><div class="xph" style="background:#e8e8e8"><div class="xtee" style="background:#f6f6f6"></div></div><div class="xnm"><span>Chalk tee</span><span>£35</span></div></div>
      </div></div>`,
    cafe: `<div class="xin"><div class="xnav"><span class="xlogo xser" style="font-weight:400">Brew Lane</span><span class="xl"><span>Menu</span><span>Visit</span></span><span class="xbtn">Order to collect</span></div>
      <div class="xbody"><div><div class="xh xser">Coffee worth the early start.</div><p>Open 7am to 4pm. Order ahead, skip the queue.</p></div>
      <div class="xmn"><em>Coffee</em><div><span>Flat white<small>Double shot, oat or whole</small></span><span>3.20</span></div><div><span>Cortado<small>Short and strong</small></span><span>2.90</span></div><em>Bakery</em><div><span>Cardamom bun<small>Baked here at 6am</small></span><span>3.40</span></div><div><span>Almond croissant</span><span>3.60</span></div></div></div></div>`,
    app: `<div class="xin"><div class="xbody"><div><div class="xh">Pulse, your training in your pocket.</div><p>Plans, streaks and progress for gym members, on iPhone and Android.</p></div>
      <div class="xph"><div class="xsc"><strong style="font-size:2.2cqw">Today</strong>
      <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#dbe3fb" stroke-width="10"/><circle cx="50" cy="50" r="40" fill="none" stroke="#3d5afe" stroke-width="10" stroke-linecap="round" stroke-dasharray="185 252" transform="rotate(-90 50 50)"/><text x="50" y="48" text-anchor="middle" font-size="15" font-weight="800" fill="#0e1a3a">7,420</text><text x="50" y="64" text-anchor="middle" font-size="8" fill="#3a4a73">steps</text></svg>
      <div class="xit"><span>Upper body</span><span>45 min</span></div><div class="xit"><span>Run, easy</span><span>5 km</span></div><div class="xit"><span>Stretch</span><span>10 min</span></div></div></div></div></div>`
  };
  window.MOCKS = T;
  function render(root) {
    (root || document).querySelectorAll('[data-mock]:not(.mk)').forEach(el => {
      el.classList.add('mk', 'mk-' + el.dataset.mock);
      el.setAttribute('data-ui', '');
      if (!el.hasAttribute('data-live')) el.setAttribute('aria-hidden', 'true');
      el.innerHTML = T[el.dataset.mock] || '';
    });
  }
  window.renderScreens = render;
  render();
  // Small working details inside the concept screens
  document.addEventListener('click', e => {
    const t = e.target;
    const screen = t.closest && t.closest('.mk');
    if (!screen) return;
    if (screen.classList.contains('mk-clinic')) {
      const pick = t.closest('.xrow span, .xsl span');
      if (pick) {
        pick.parentElement.querySelectorAll('span').forEach(s => s.classList.toggle('xon', s === pick));
        const day = screen.querySelector('.xrow .xon'), time = screen.querySelector('.xsl .xon');
        const btn = screen.querySelector('.xbk > .xbtn');
        if (btn && day && time) btn.textContent = 'Book ' + day.innerText.replace(/\s+/, ' ') + ', ' + time.textContent;
      }
    }
    if (screen.classList.contains('mk-store')) {
      const card = t.closest('.xgr > div');
      if (card) {
        const bag = [...screen.querySelectorAll('.xl span')].find(s => /Bag/.test(s.textContent));
        if (bag) { const n = (parseInt(bag.textContent.replace(/\D/g, ''), 10) || 0) + 1; bag.textContent = 'Bag (' + n + ')'; }
        card.animate([{ transform: 'scale(.96)' }, { transform: 'none' }], { duration: 220, easing: 'cubic-bezier(.23,1,.32,1)' });
      }
    }
    if (screen.classList.contains('mk-gym')) {
      const row = t.closest('.xtt div');
      if (row) { const last = row.lastElementChild; last.textContent = last.textContent === 'Booked' ? 'Book' : 'Booked'; }
    }
  });
})();
