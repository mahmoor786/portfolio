// The 3D parts of the home page: the fan of project cards in the hero,
// and the chrome icons on the service cards.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

type Project = { img: string; href: string; title: string };

/* A flat rectangle with rounded corners, with texture coordinates that fill it. */
function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, 14), p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  return g;
}

function softShadow() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d')!, gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(60,50,110,.24)'); gr.addColorStop(1, 'rgba(60,50,110,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/* ------------------------------------------------------------------ hero */
export function initHero(stage: HTMLElement, reduce: boolean) {
  const all: Project[] = JSON.parse(stage.dataset.projects || '[]');
  if (!all.length) return;
  const small = matchMedia('(max-width: 700px)').matches;
  // Phones get the three middle cards: lighter, and each card stays large enough to read.
  const list = small && all.length > 3 ? all.slice(Math.floor(all.length / 2) - 1, Math.floor(all.length / 2) + 2) : all;
  const mid = (list.length - 1) / 2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
  renderer.setClearAlpha(0);
  stage.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 100);
  const fanGroup = new THREE.Group();
  scene.add(fanGroup);

  const W = 2.5, H = 1.5625;
  const frameGeo = roundedRect(W + 0.12, H + 0.12, 0.13), screenGeo = roundedRect(W, H, 0.09);
  const shadowTex = softShadow(), loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  type Card = { g: THREE.Group; sh: THREE.Mesh; i: number; a: number; hover: number; intro: number; screen: THREE.Mesh; p: Project };
  const cards: Card[] = list.map((p, n) => {
    const i = n - mid, a = Math.abs(i), g = new THREE.Group();
    g.add(new THREE.Mesh(frameGeo, new THREE.MeshBasicMaterial({ color: 0xffffff })));
    const tex = loader.load(p.img, () => (dirty = true));
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = maxAniso;
    const screen = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: tex }));
    screen.position.z = 0.01; g.add(screen);
    g.renderOrder = 10 - a;
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.4), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
    sh.rotation.x = -Math.PI / 2 + 0.35;
    fanGroup.add(sh, g);
    return { g, sh, i, a, hover: 0, intro: reduce ? 1 : 0, screen, p };
  });

  /* fit the camera so the whole fan is visible at any stage size */
  const spanX = 2 * mid * 1.5 + W + (small ? 0.5 : 1.0), spanY = 3.5;
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.z = Math.max(spanY / (2 * t), spanX / (2 * t * camera.aspect));
    camera.updateProjectionMatrix();
    dirty = true;
  }

  /* pointer: tilt the fan, lift the card under the cursor, click to open */
  const pointer = new THREE.Vector2(9, 9), tilt = new THREE.Vector2(), ray = new THREE.Raycaster();
  let hovered: Card | null = null, dirty = true, downAt = 0, downX = 0, downY = 0;
  const pick = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(cards.map((c) => c.screen))[0];
    hovered = hit ? cards.find((c) => c.screen === hit.object)! : null;
    stage.style.cursor = hovered ? 'pointer' : '';
    dirty = true;
  };
  stage.addEventListener('pointermove', pick);
  stage.addEventListener('pointerleave', () => { hovered = null; pointer.set(0, 0); stage.style.cursor = ''; dirty = true; });
  stage.addEventListener('pointerdown', (e) => { downAt = performance.now(); downX = e.clientX; downY = e.clientY; pick(e); });
  stage.addEventListener('pointerup', (e) => {
    const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (hovered && moved < 10 && performance.now() - downAt < 600) location.href = hovered.p.href;
    if (e.pointerType !== 'mouse') hovered = null;
  });

  /* only draw while the hero is on screen */
  let visible = true, scroll = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }).observe(stage);
  const onScroll = () => { scroll = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.9))); dirty = true; };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', resize);
  new ResizeObserver(resize).observe(stage);
  resize(); onScroll();

  let last = performance.now(), t = 0;
  const ease = (x: number) => 1 - Math.pow(1 - x, 4);
  let running = false, started = performance.now();
  function frame() {
    const now = performance.now(), dt = Math.min((now - last) / 1000, 0.05), k = 1 - Math.pow(0.001, dt);
    last = now; t += dt;
    const sinceStart = (performance.now() - started) / 1000;
    tilt.x += ((hovered || pointer.x > 2 ? 0 : pointer.x) - tilt.x) * k * 0.6;
    tilt.y += ((pointer.y > 2 ? 0 : pointer.y) - tilt.y) * k * 0.6;
    fanGroup.rotation.y = tilt.x * 0.1;
    fanGroup.rotation.x = -tilt.y * 0.05;
    fanGroup.position.y = 1.55 + scroll * 0.25;
    let settling = false;
    for (const c of cards) {
      // cards deal out from the middle, one after another
      if (c.intro < 1) { c.intro = Math.min(1, Math.max(0, (sinceStart - 0.25 - c.a * 0.12) / 1.1)); settling = true; }
      const e = ease(c.intro);
      c.hover += ((hovered === c ? 1 : 0) - c.hover) * k;
      if (Math.abs((hovered === c ? 1 : 0) - c.hover) > 0.002) settling = true;
      const spread = 1 + scroll * 0.22, float = reduce ? 0 : Math.sin(t * 0.8 + c.i * 1.3) * 0.035;
      c.g.position.set(c.i * 1.5 * spread * e, -1.3 - c.a * 0.2 * e + float + c.hover * 0.14 + (1 - e) * -0.5, -c.a * 0.55 * e + c.hover * 0.5);
      c.g.rotation.set(0, -c.i * 0.2 * e * (1 - scroll * 0.4), -c.i * 0.085 * e * (1 - scroll * 0.5));
      c.g.scale.setScalar((0.82 + 0.18 * e) * (1 + c.hover * 0.04));
      c.sh.position.set(c.g.position.x, -2.35 - c.a * 0.2, c.g.position.z + 0.2);
      (c.sh.material as THREE.MeshBasicMaterial).opacity = e * (1 - c.hover * 0.3);
    }
    renderer.render(scene, camera);
    return settling;
  }
  function loop() {
    if (running) return;
    running = true;
    const tick = () => {
      if (!visible || document.hidden) { running = false; return; }
      // With reduced motion we only redraw when something actually changed.
      if (!reduce || dirty) { const settling = frame(); dirty = reduce ? settling : false; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange', () => !document.hidden && loop());
  frame();
  stage.classList.add('ready');
  started = performance.now();
  loop();
}

/* ----------------------------------------------------------------- icons */
export function initIcons(canvases: HTMLCanvasElement[], reduce: boolean) {
  const SIZE = 340;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(SIZE, SIZE, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // A tiny studio of coloured light panels; the chrome reflects it.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#77749a');
  const panels: [string, number, number, number, number, number, number][] = [
    ['#ff3d8b', -7, 2, 3, 7, 9, 5], ['#3f6bff', 7, 3, 2, 7, 9, 5], ['#ffb300', 0, -7, 3, 10, 5, 4],
    ['#ffffff', 0, 7, 3, 10, 5, 6], ['#00e0c6', 3, 0, -8, 8, 8, 3], ['#ffffff', -2, 1, 8, 3, 3, 5],
  ];
  for (const [c, x, y, z, w, h, i] of panels) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); studio.add(m);
  }
  const env = new THREE.PMREMGenerator(renderer).fromScene(studio, 0.03).texture;
  const chrome = new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 1, roughness: 0.16, iridescence: 1, iridescenceIOR: 1.8 });
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.z = 8;

  const add = (g: THREE.Group, geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, chrome); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m);
  };
  const builders: ((g: THREE.Group) => void)[] = [
    (g) => { add(g, new THREE.CapsuleGeometry(0.62, 1.2, 24, 64), 0, 0.15, 0, 0, 0, -0.5); add(g, new THREE.TorusGeometry(1.0, 0.13, 32, 120), -0.05, 0.05, 0, 1.3, 0, -0.5); add(g, new THREE.SphereGeometry(0.2, 48, 48), 1.35, -1.05, 0); },
    (g) => { add(g, new RoundedBoxGeometry(1.9, 1.6, 1.1, 8, 0.3), 0, -0.35, 0); add(g, new THREE.TorusGeometry(0.55, 0.11, 32, 100, Math.PI), 0, 0.45, 0); },
    (g) => { [-0.75, 0, 0.75].forEach((y, i) => add(g, new RoundedBoxGeometry(2.1, 0.34, 2.1, 8, 0.16), 0, y, 0, 0, i * 0.25, 0)); },
    (g) => { add(g, new THREE.TorusGeometry(1.0, 0.3, 48, 140), 0, 0, 0, 0.2, 0.3, 0); add(g, new THREE.SphereGeometry(0.42, 64, 64)); add(g, new THREE.SphereGeometry(0.17, 48, 48), 1.45, 1.0, 0); },
  ];

  const items = canvases.map((canvas) => {
    const n = Number(canvas.dataset.icon) % builders.length;
    const scene = new THREE.Scene(); scene.environment = env;
    const g = new THREE.Group(); builders[n](g); scene.add(g);
    return { canvas, ctx: canvas.getContext('2d')!, scene, g, spin: 0, target: 0, card: canvas.closest('li') as HTMLElement | null };
  });
  const draw = (it: (typeof items)[number]) => {
    it.g.rotation.set(0.35 + Math.sin(it.spin) * 0.12, -0.55 + it.spin, 0.12);
    renderer.render(it.scene, camera);
    it.ctx.clearRect(0, 0, SIZE, SIZE);
    it.ctx.drawImage(renderer.domElement, 0, 0, SIZE, SIZE);
  };
  items.forEach(draw);
  if (reduce) return;

  // Each icon makes one full turn when its card is hovered or tapped.
  let raf = 0;
  const tick = () => {
    let moving = false;
    for (const it of items) {
      const d = it.target - it.spin;
      if (Math.abs(d) > 0.002) { it.spin += d * 0.07; draw(it); moving = true; }
    }
    raf = moving ? requestAnimationFrame(tick) : 0;
  };
  for (const it of items) {
    it.card?.addEventListener('pointerenter', () => { it.target += Math.PI * 2; if (!raf) raf = requestAnimationFrame(tick); });
  }
}
