import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// SAS signature easing, cubic-bezier(0.34, 0.615, 0.4, 0.985), approximated for GSAP.
export const SAS_EASE = 'power3.out';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Splits a heading into words, each wrapped in a clipping mask, ready to slide up from below.
 * Words (not lines) keep the split correct after a resize. Revert it with the owning gsap.context.
 */
export function splitWords(el) {
  return SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'split-word' });
}

// Images and videos change section heights after first paint, so trigger
// positions must be recalculated once everything has loaded.
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  } else {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }
  // Web fonts swap in after first paint (display=swap) and Bebas is far narrower than its
  // fallback, so headline heights change: re-measure once the real fonts are in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, SplitText };
