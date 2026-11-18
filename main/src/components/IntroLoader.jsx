import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { SCHOOL_INFO, CORE_PILLARS } from '../data/rkpsData';
import logoImg from '@assets/logo.jpg';

export const INTRO_DONE_EVENT = 'rkps:intro-done';
const SEEN_KEY = 'rkps-intro-seen';

// Stage-4 phrases (cycled one by one), then the stage-5 closing line, as on the SAS loading screen.
const PHRASES = CORE_PILLARS.map((p) => p.badge);
const CLOSING = 'Welcome to RKPS';

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage blocked: the intro simply plays again next visit */
  }
}

/**
 * Home-page intro screen in the style of the SAS staged loading screen, rebuilt as one GSAP timeline:
 * 1 navy curtain → 2 crest watermark → 3 crest + school name → 4 cycle the pillar phrases →
 * 5 closing line → 6 content fades → 7 curtain lifts and the component unmounts.
 *
 * Plays once per browser session. Click, tap, or any key skips to the exit.
 * Doesn't render at all when the user prefers reduced motion.
 */
export default function IntroLoader() {
  const [show, setShow] = useState(() => !alreadySeen() && !prefersReducedMotion());
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    if (!show) return;
    const root = rootRef.current;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const finish = () => {
      markSeen();
      html.style.overflow = prevOverflow;
      setShow(false);
      // Scrollbar comes back, so layout widths shift: re-measure every trigger.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      });
    };

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const phrases = q('[data-phrase]');
      const tl = gsap.timeline({ onComplete: finish });

      // Stage 2: watermark crest
      tl.from(q('[data-watermark]'), { autoAlpha: 0, scale: 1.15, duration: 0.9, ease: 'power2.out' }, 0.15);
      // Stage 3: crest + school name
      tl.from(q('[data-crest]'), { autoAlpha: 0, y: 24, scale: 0.9, duration: 0.6, ease: 'back.out(1.6)' }, 0.35);
      tl.from(q('[data-name]'), { autoAlpha: 0, y: 18, duration: 0.55, ease: 'power3.out' }, 0.5);
      tl.from(q('[data-rule]'), { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, 0.65);

      // Stage 4: cycle each phrase up through the mask
      let t = 1.05;
      phrases.forEach((el, i) => {
        const isLast = i === phrases.length - 1;
        tl.fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: 'power3.out' }, t);
        if (!isLast) tl.to(el, { yPercent: -110, duration: 0.32, ease: 'power3.in' }, t + 0.6);
        t += 0.62;
      });

      // Stage 5 → 7: closing line, fade, lift the curtain
      tl.addLabel('exit', t + 0.5);
      tl.to(q('[data-content]'), { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, 'exit');
      tl.to(root, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 'exit+=0.25');

      tlRef.current = tl;
    }, root);

    const skip = () => {
      const tl = tlRef.current;
      if (tl && tl.time() < tl.labels.exit) tl.seek('exit');
    };
    window.addEventListener('keydown', skip);

    return () => {
      window.removeEventListener('keydown', skip);
      ctx.revert();
      html.style.overflow = prevOverflow;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      onClick={() => {
        const tl = tlRef.current;
        if (tl && tl.time() < tl.labels.exit) tl.seek('exit');
      }}
      role="status"
      aria-label={`${SCHOOL_INFO.name}: loading`}
      className="fixed inset-0 z-[100] bg-[#052051] text-white flex items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {/* Stage 2: oversized faded crest */}
      <img
        data-watermark
        src={logoImg}
        alt=""
        aria-hidden="true"
        className="absolute w-[120vmin] h-[120vmin] max-w-none rounded-full object-cover opacity-[0.06] pointer-events-none"
      />

      <div data-content className="relative flex flex-col items-center text-center px-4">
        <img
          data-crest
          src={logoImg}
          alt=""
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#f0b429] object-cover shadow-2xl"
        />
        <p data-name className="mt-5 font-bebas text-2xl sm:text-3xl tracking-[0.2em] uppercase text-white/90">
          {SCHOOL_INFO.name}
        </p>
        <span data-rule className="mt-4 block h-px w-40 sm:w-56 bg-[#f0b429] origin-center" />

        {/* Stages 4–5: phrases stacked in one mask, each slides through in turn */}
        <div className="relative mt-6 h-[1.15em] w-[90vw] overflow-hidden font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider uppercase leading-none">
          {[...PHRASES, CLOSING].map((text, i) => (
            <span
              key={text}
              data-phrase
              className={`absolute inset-x-0 top-0 translate-y-[110%] ${
                i === PHRASES.length ? 'text-[#faba28]' : ''
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        <span className="mt-10 text-[11px] tracking-[0.3em] uppercase text-white/40">Tap to skip</span>
      </div>
    </div>
  );
}
