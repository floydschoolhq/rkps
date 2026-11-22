import React, { Fragment, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger, SAS_EASE, prefersReducedMotion, splitWords } from '../../lib/gsap';
import logoImg from '@assets/logo.jpg';

/**
 * Shared subpage header in the homepage (SAS) language: deep navy band with the dot watermark,
 * two-tone Bebas headline (white + gold), gold kicker, crimson rule and a curved photo panel.
 *
 * It also gives the rest of the page the homepage's scroll motion: every section headline and
 * grid card below the hero rises in as it scrolls into view (see `revealPageBelow`).
 *
 * @param {{label: string, to?: string}[]} crumbs  breadcrumb trail after "Home"
 * @param {string} kicker    small gold line above the headline
 * @param {string} title     white part of the headline
 * @param {string} accent    gold part of the headline
 * @param {string} subtitle  intro paragraph
 * @param {string} image     optional photo shown in the curved panel (desktop) / backdrop (mobile)
 * @param {React.ReactNode} children  extra actions (buttons, filter chips) under the intro
 */
export default function PageHero({ crumbs = [], kicker, title, accent, subtitle, image, children }) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const split = splitWords(hero.querySelector('h1'));
      const tl = gsap.timeline({ defaults: { ease: SAS_EASE } });
      tl.from('[data-hero="crumb"]', { autoAlpha: 0, y: -12, duration: 0.5 })
        .from('[data-hero="kicker"]', { autoAlpha: 0, x: -24, duration: 0.6 }, '-=0.2')
        .from(split.words, { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.06 }, '-=0.35')
        .from('[data-hero="rule"]', { scaleX: 0, transformOrigin: 'left center', duration: 0.7 }, '-=0.6')
        .from('[data-hero="copy"] > *', { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .from(
          '[data-hero="photo"]',
          { clipPath: 'inset(0% 0% 0% 100%)', duration: 1.2, ease: 'expo.inOut' },
          0.15
        )
        .from('[data-hero="photo"] img', { scale: 1.25, duration: 1.6, ease: 'expo.out' }, 0.15);

      revealPageBelow(hero);
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-[#071f4c] text-white overflow-hidden watermark-shield-dark"
    >
      {/* Mobile/tablet: photo as a soft backdrop */}
      {image && (
        <div aria-hidden="true" className="lg:hidden absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071f4c]/70 via-[#071f4c]/85 to-[#071f4c]" />
        </div>
      )}

      {/* Crest watermark + glow, as on the homepage dark panels */}
      <div aria-hidden="true" className="absolute -left-24 -bottom-24 w-[26rem] h-[26rem] opacity-[0.06] pointer-events-none">
        <img src={logoImg} alt="" className="w-full h-full object-contain grayscale rounded-full" />
      </div>
      <div aria-hidden="true" className="absolute -top-40 right-1/3 w-[30rem] h-[30rem] rounded-full bg-[#1d4fa8]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-10 items-center py-16 sm:py-20 lg:py-24">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-10'}>
          <nav data-hero="crumb" aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/55 mb-6">
            <Link to="/" className="hover:text-[#faba28] transition-colors">Home</Link>
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                <ChevronRight className="w-3.5 h-3.5 text-white/35" />
                {c.to && i < crumbs.length - 1 ? (
                  <Link to={c.to} className="hover:text-[#faba28] transition-colors">{c.label}</Link>
                ) : (
                  <span className={i === crumbs.length - 1 ? 'text-[#faba28]' : ''}>{c.label}</span>
                )}
              </Fragment>
            ))}
          </nav>

          {kicker && (
            <p data-hero="kicker" className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#faba28] mb-3">
              {kicker}
            </p>
          )}

          <h1 className="font-bebas text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] uppercase tracking-wider leading-[0.95]">
            <span className="text-white">{title}</span>
            {accent && <span className="text-[#faba28]"> {accent}</span>}
          </h1>

          <span data-hero="rule" className="block w-20 h-1 bg-[#a22634] rounded-full mt-5" />

          <div data-hero="copy">
            {subtitle && (
              <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">{subtitle}</p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>

        {image && (
          <div className="hidden lg:block lg:col-span-5">
            <div
              data-hero="photo"
              className="relative aspect-[4/5] max-h-[460px] ml-auto rounded-3xl rounded-tl-[110px] rounded-br-[110px] overflow-hidden border-4 border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <img src={image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071f4c]/50 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </div>

      {/* Crimson + gold base stripe tying the band to the homepage accents */}
      <div aria-hidden="true" className="relative h-1.5 flex">
        <span className="flex-1 bg-[#a22634]" />
        <span className="w-1/4 bg-[#faba28]" />
      </div>
    </section>
  );
}

/**
 * Homepage-style scroll reveals for the content that follows the hero: section headlines,
 * kickers and grid cards rise in with a stagger as they enter the viewport.
 * Inline styles are cleared afterwards so hover transforms on cards keep working.
 */
function revealPageBelow(hero) {
  const page = hero.parentElement;
  if (!page) return;

  const sections = Array.from(page.children).filter((el) => el !== hero && el.tagName === 'SECTION');
  const targets = sections.flatMap((s) =>
    Array.from(s.querySelectorAll('h2, .grid > *, [data-reveal]')).filter(
      // Skip nodes inside an already-targeted grid item, and anything animated by its own CSS keyframes.
      (el) => !el.closest('[class*="animate-"]') && !el.parentElement.closest('.grid > *')
    )
  );
  if (!targets.length) return;

  gsap.set(targets, { autoAlpha: 0, y: 40 });
  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: SAS_EASE,
        stagger: 0.1,
        overwrite: true,
        clearProps: 'transform,opacity,visibility',
      }),
  });
  ScrollTrigger.refresh();
}
