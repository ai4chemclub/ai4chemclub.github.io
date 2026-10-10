import { advanceAngle, project } from './molecule-geometry';

export function setupMolecule(reducedMotion: MediaQueryList) {
  const original = document.querySelector<SVGGElement>('.science-molecule');
  const button = document.querySelector<HTMLButtonElement>('.science-rotation');
  const art = document.querySelector<HTMLElement>('.science-art');
  if (!original || !button || !art) return;

  // The approved SVG remains the source of x/y, radius, gradients and connectivity.
  // Added z coordinates are illustrative depth, not a measured molecular structure.
  const circles = [...original.querySelectorAll<SVGCircleElement>('circle[data-depth]')];
  if (!circles.length) return;
  const ns = 'http://www.w3.org/2000/svg';
  const moving = document.createElementNS(ns, 'g');
  moving.classList.add('science-molecule', 'science-molecule-moving');
  moving.style.display = 'none';
  original.after(moving);
  const atoms = circles.map(circle => {
    const group = document.createElementNS(ns, 'g');
    const sphere = circle.cloneNode(true) as SVGCircleElement;
    const x = circle.cx.baseVal.value;
    const y = circle.cy.baseVal.value;
    sphere.setAttribute('cx', '0');
    sphere.setAttribute('cy', '0');
    group.append(sphere);
    const highlight = circle.nextElementSibling?.cloneNode(true) as SVGElement | undefined;
    if (highlight?.tagName === 'ellipse') {
      const offset = document.createElementNS(ns, 'g');
      offset.setAttribute('transform', `translate(${-x} ${-y})`);
      offset.append(highlight);
      group.append(offset);
    }
    moving.append(group);
    return { x, y, z: Number(circle.dataset.depth), radius: circle.r.baseVal.value, element: group };
  });
  const bonds = [...original.querySelectorAll<SVGPathElement>('[data-bond]')].flatMap(path => {
    const [from, to] = path.dataset.bond!.split(' ').map(Number);
    // Half-bonds sort with their local depth, reducing incorrect sphere overlaps.
    return [0, 1].map(half => {
      const element = document.createElementNS(ns, 'path');
      element.setAttribute('stroke', '#b1ced8');
      element.setAttribute('stroke-width', '7');
      element.setAttribute('stroke-linecap', 'butt');
      moving.append(element);
      return { from, to, half, element };
    });
  });
  let angle = 0;
  let frame = 0;
  let lastTime = 0;
  let visible = false;
  let paused = false;
  let order = '';

  function render() {
    const points = atoms.map(atom => project(atom, angle));
    const layers = atoms.map((atom, i) => {
      const p = points[i];
      atom.element.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
      return { element: atom.element, z: p.z };
    });
    for (const bond of bonds) {
      const a = points[bond.from];
      const b = points[bond.to];
      const length = Math.hypot(b.x - a.x, b.y - a.y);
      const rA = atoms[bond.from].radius;
      const rB = atoms[bond.to].radius;
      // Draw only the visible bond between sphere surfaces, never through an atom.
      bond.element.style.display = length <= rA + rB ? 'none' : '';
      const trim = (fraction: number) => ({ x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction, z: a.z + (b.z - a.z) * fraction });
      const startFraction = rA / (length || 1);
      const endFraction = 1 - rB / (length || 1);
      const mid = trim((startFraction + endFraction) / 2);
      const start = bond.half ? mid : trim(startFraction);
      const end = bond.half ? trim(endFraction) : mid;
      bond.element.setAttribute('d', `M${start.x.toFixed(2)} ${start.y.toFixed(2)}L${end.x.toFixed(2)} ${end.y.toFixed(2)}`);
      bond.element.setAttribute('opacity', `${0.6 + (start.z + end.z) / 4000}`);
      layers.push({ element: bond.element, z: (start.z + end.z) / 2 });
    }
    // Zdog's painter's-order approach, applied to the site's existing SVG artwork.
    const sorted = layers.map((layer, index) => ({ ...layer, index })).sort((a, b) => a.z - b.z);
    const nextOrder = sorted.map(layer => layer.index).join(',');
    if (nextOrder !== order) {
      moving.append(...sorted.map(layer => layer.element));
      order = nextOrder;
    }
  }

  function tick(time: number) {
    // Render at most 30 fps; no DOM work on intermediate display frames.
    if (!lastTime) lastTime = time;
    if (time - lastTime >= 1000 / 30) {
      angle = advanceAngle(angle, time - lastTime);
      lastTime = time;
      render();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    const reduce = reducedMotion.matches;
    original.style.display = reduce ? '' : 'none';
    moving.style.display = reduce ? 'none' : '';
    button.hidden = reduce;
    button.setAttribute('aria-label', paused ? 'Resume molecule rotation' : 'Pause molecule rotation');
    button.querySelector('span')!.textContent = paused ? 'Rotate' : 'Pause';
    button.dataset.paused = String(paused);
    if (!reduce && !paused && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  render();
  sync();
  button.addEventListener('click', () => { paused = !paused; sync(); });
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); lastTime = 0; });
  window.addEventListener('pageshow', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      sync();
    }).observe(art);
  }
  // Browsers without an observer keep the illustration still rather than run offscreen.
}
