import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, SAS_EASE, prefersReducedMotion, splitWords } from '../lib/gsap';

/**
 * Starting offsets for each `.sas-reveal-*` class. GSAP animates every element
 * from these values to its natural position.
 */
const REVEAL_FROM = {
  'sas-reveal-up': { y: 48 },
  'sas-reveal-down': { y: -36 },
  'sas-reveal-left': { x: -64 },
  'sas-reveal-right': { x: 64 },
  'sas-reveal-swoop': { x: 40, y: 32, rotation: -8, scale: 0.95 },
};
const REVEAL_SELECTOR = Object.keys(REVEAL_FROM).map((c) => `.${c}`).join(',');

function fromVarsFor(el) {
  for (const cls of Object.keys(REVEAL_FROM)) {
    if (el.classList.contains(cls)) return REVEAL_FROM[cls];
  }
  return { y: 48 };
}

/**
 * Section scroll reveal in the style of the SAS `.in-view` waypoints, driven by GSAP ScrollTrigger.
 *
 * - Animates every `.sas-reveal-*` descendant in DOM order with a stagger.
 * - Splits every `h2` into masked words that slide up one after another.
 * - Plays when the section top crosses `start` and reverses when the user scrolls back above it.
 * - Still returns `inView`, which flips to true once and stays true, for class-driven extras.
 * - When the user prefers reduced motion, it skips GSAP entirely and the CSS shows everything.
 *
 * @param {{ start?: string, stagger?: number }} options
 */
export function useInView({ start = 'top 68%', stagger = 0.12 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }

    // Flag the section so CSS stops transitioning the properties GSAP now owns.
    // A data attribute survives React re-writing `className`.
    node.setAttribute('data-gsap-reveal', '');

    const ctx = gsap.context(() => {
      // Reveal blocks plus every section headline, in DOM order.
      const targets = gsap.utils.toArray(node.querySelectorAll(`${REVEAL_SELECTOR}, h2`));

      const tl = gsap.timeline({ paused: true });
      targets.forEach((el, i) => {
        const at = i * stagger;
        const isReveal = el.matches(REVEAL_SELECTOR);

        if (el.tagName === 'H2') {
          // Headline: each word slides up out of its own mask.
          const split = splitWords(el);
          // The words carry the motion, so a reveal-class h2 just needs to become visible in place.
          if (isReveal) tl.set(el, { autoAlpha: 1, x: 0, y: 0 }, at);
          tl.fromTo(
            split.words,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06 },
            at
          );
          return;
        }

        tl.fromTo(
          el,
          { autoAlpha: 0, ...fromVarsFor(el) },
          { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 0.8, ease: SAS_EASE },
          at
        );
      });

      ScrollTrigger.create({
        trigger: node,
        start,
        onEnter: () => {
          setInView(true);
          tl.play();
        },
        onLeaveBack: () => tl.reverse(),
      });
    }, node);

    return () => {
      ctx.revert();
      node.removeAttribute('data-gsap-reveal');
    };
  }, [start, stagger]);

  return [ref, inView];
}
