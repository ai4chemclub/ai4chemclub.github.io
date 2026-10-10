import { setupMolecule } from './molecule';

// Progressive enhancement: all content and links work without this module.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const panel = document.querySelector<HTMLElement>('.visual-panel');
let connectionTimer = 0;

function finishConnections() {
  clearTimeout(connectionTimer);
  if (panel) delete panel.dataset.connecting;
}

function playConnections() {
  if (!panel || reducedMotion.matches || panel.dataset.connecting) return;
  panel.dataset.connecting = 'true';
  connectionTimer = window.setTimeout(finishConnections, 1600);
}

reducedMotion.addEventListener('change', finishConnections);
setupMolecule(reducedMotion);

// A single introduction when the illustration enters view, never a loop.
if (panel && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      playConnections();
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(panel);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) finishConnections();
});

// Follow actual section positions: Activities precedes About in this layout.
const header = document.querySelector<HTMLElement>('.site-header');
const navigation = [...document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')]
  .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
  .filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } => !!entry.section);
let navigationFrame = 0;

function updateNavigation() {
  navigationFrame = 0;
  const line = header && getComputedStyle(header).position === 'sticky'
    ? header.getBoundingClientRect().bottom + 80 : window.innerHeight * 0.2;
  const sections = navigation.map(entry => ({ ...entry, top: entry.section.getBoundingClientRect().top }))
    .sort((a, b) => a.top - b.top);
  let current = sections.filter(entry => entry.top <= line).at(-1)?.link;
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
    current = sections.at(-1)?.link;
  }
  for (const { link } of navigation) {
    if (link === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function scheduleNavigation() {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('hashchange', scheduleNavigation);
window.addEventListener('pageshow', scheduleNavigation);
updateNavigation();

const copyButton = document.querySelector<HTMLButtonElement>('.copy-email');
const emailLink = document.querySelector<HTMLAnchorElement>('.contact-email');
const feedback = document.querySelector<HTMLElement>('.copy-feedback');
if (copyButton && emailLink && feedback && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    if (copyButton.disabled) return;
    copyButton.disabled = true;
    feedback.textContent = '';
    delete copyButton.dataset.copied;
    try {
      await navigator.clipboard.writeText(emailLink.textContent?.trim() ?? '');
      copyButton.dataset.copied = 'true';
      feedback.textContent = 'Email address copied.';
    } catch {
      feedback.textContent = 'Could not copy. Select the email address to copy it manually.';
    } finally {
      copyButton.disabled = false;
    }
  });
}

export {};
