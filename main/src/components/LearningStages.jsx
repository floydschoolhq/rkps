import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_STAGES } from '../data/rkpsData';
import { useInView } from '../hooks/useInView';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import TabStrip from './ui/TabStrip';
import { CheckCircle2, ArrowRight, FileText } from 'lucide-react';

const pad = (n) => String(n).padStart(2, '0');

export default function LearningStages({ onOpenAdmission }) {
  // The reveal is bound to the content wrapper, not the <section>: the section's large top padding
  // sits underneath the overlapping "Reasons to Soar" card, so triggering on the section top made the
  // headline animate while it was still hidden.
  const [contentRef, inView] = useInView({ start: 'top 80%' });

  // idx = shown stage, prev = stage underneath during the image wipe, dir = +1 forward / -1 back.
  const [stage, setStage] = useState({ idx: 0, prev: null, dir: 1 });
  const active = LEARNING_STAGES[stage.idx];
  const previous = stage.prev !== null ? LEARNING_STAGES[stage.prev] : null;

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const indicatorRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  const parallaxRef = useRef(null);
  const firstRun = useRef(true);

  const selectStage = (idx) => {
    if (idx === stage.idx) return;
    setStage({ idx, prev: stage.idx, dir: idx > stage.idx ? 1 : -1 });
  };

  const onTabKeyDown = (e) => {
    const last = LEARNING_STAGES.length - 1;
    const next =
      e.key === 'ArrowRight' ? (stage.idx === last ? 0 : stage.idx + 1)
      : e.key === 'ArrowLeft' ? (stage.idx === 0 ? last : stage.idx - 1)
      : null;
    if (next === null) return;
    e.preventDefault();
    selectStage(next);
    trackRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  // Sliding tab indicator: glides to the active tab and follows resizes.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const bar = indicatorRef.current;
    if (!track || !bar) return;

    const place = (animate) => {
      const tab = track.querySelectorAll('[role="tab"]')[stage.idx];
      if (!tab) return;
      const vars = { x: tab.offsetLeft, width: tab.offsetWidth };
      if (animate && !prefersReducedMotion()) {
        gsap.to(bar, { ...vars, duration: 0.6, ease: 'expo.out', overwrite: true });
      } else {
        gsap.set(bar, vars);
      }
    };

    place(!firstRun.current);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(track);
    return () => ro.disconnect();
  }, [stage.idx]);

  // Stage switch: staggered copy entrance + directional clip-path wipe over the previous photo.
  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const d = stage.dir;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Photo: new layer wipes in from the travel direction while the image settles from a zoom.
      tl.fromTo(
        '[data-stage-layer="current"]',
        { clipPath: d > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' },
        0
      )
        .fromTo(
          '[data-stage-layer="current"] img',
          { scale: 1.25, xPercent: 8 * d },
          { scale: 1, xPercent: 0, duration: 1.3, ease: 'expo.out' },
          0
        )
        .to('[data-stage-layer="previous"] img', { xPercent: -10 * d, scale: 1.05, duration: 1, ease: 'expo.inOut' }, 0)
        .fromTo(
          '[data-stage-badge]',
          { autoAlpha: 0, y: 16, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)' },
          0.55
        );

      // Copy: each line rises out of a slight offset, highlights tick in one by one.
      tl.fromTo(
        textRef.current.querySelectorAll('[data-stage-line]'),
        { autoAlpha: 0, x: 36 * d, y: 10 },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.7, stagger: 0.07 },
        0.1
      ).fromTo(
        textRef.current.querySelectorAll('[data-stage-check]'),
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2.2)' },
        0.45
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [stage]);

  // Gentle scroll parallax on the photo.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !parallaxRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: mediaRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        }
      );
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      // Top padding = how far the "Reasons to Soar" card hangs into this section + breathing room.
      // Keep in sync with the card's translate-y / -mb / section pb in WhyChooseRkps.jsx:
      //   base: 160+160-32 = 288px overhang (+56px photo) → 22rem
      //   sm:   224+224-48 = 400px overhang               → 30rem
      //   lg:   192+192-64 = 320px overhang (+24px photo) → 26rem
      className="pt-[22rem] sm:pt-[30rem] lg:pt-[26rem] pb-20 sm:pb-28 bg-[#f8f9fa] relative z-10 overflow-hidden"
      id="stages"
    >
      <div
        ref={contentRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${inView ? 'sas-in-view' : ''}`}
      >
        {/* Section Headline + Tabs */}
        <div className="text-center sm:text-left mb-8 sm:mb-12">
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider uppercase leading-none">
            <span className="text-[#0b2a63]">LEARNING </span>
            <span className="text-[#a22634]">AT EVERY STAGE</span>
          </h2>

          <div ref={trackRef}>
            <TabStrip
              activeIndex={stage.idx}
              wrapperClassName="sas-reveal-left mt-6"
              className="relative flex flex-wrap gap-5 sm:gap-8 border-b border-slate-200 pb-3 max-lg:pb-4"
            >
              {LEARNING_STAGES.map((stg, idx) => (
                <button
                  key={stg.id}
                  role="tab"
                  aria-selected={idx === stage.idx}
                  tabIndex={idx === stage.idx ? 0 : -1}
                  onClick={() => selectStage(idx)}
                  onKeyDown={onTabKeyDown}
                  className={`shrink-0 font-bebas text-xl sm:text-2xl tracking-wide uppercase pb-2 transition-colors duration-300 relative cursor-pointer ${
                    idx === stage.idx ? 'text-[#a22634]' : 'text-slate-400 hover:text-[#0b2a63]'
                  }`}
                >
                  <span className="mr-1.5 text-sm align-top opacity-60">{pad(idx + 1)}</span>
                  {stg.label}
                </button>
              ))}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1 w-0 bg-[#a22634] rounded-full pointer-events-none"
              />
            </TabStrip>
          </div>
        </div>

        {/* Content Split: stage copy + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
          <div ref={textRef} className="sas-reveal-up lg:col-span-6 flex flex-col justify-center">
            <span data-stage-line className="text-xs sm:text-sm font-extrabold tracking-[0.18em] text-[#0b2a63] uppercase">
              {active.ageRange}
            </span>

            <h3 data-stage-line className="font-bebas text-3xl sm:text-4xl md:text-5xl text-[#2b2b2b] tracking-wide uppercase mt-1">
              {active.stageName}
            </h3>

            <p data-stage-line className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {active.desc}
            </p>

            <ul className="mt-6 space-y-2.5">
              {active.highlights.map((item) => (
                <li
                  key={`${active.id}-${item}`}
                  data-stage-line
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                >
                  <CheckCircle2 data-stage-check className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div data-stage-line className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAdmission}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full border-2 border-[#a22634] text-[#a22634] hover:bg-[#a22634] hover:text-white font-bebas text-base sm:text-lg tracking-wider uppercase transition-all duration-400 ease-sas shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{active.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/downloads#curriculum"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#0b2a63] text-[#0b2a63] hover:text-white border border-slate-200 font-bebas text-base tracking-wider uppercase transition-all duration-300 shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>CBSE Syllabus</span>
              </Link>
            </div>
          </div>

          {/* Photo card: previous stage stays underneath while the new one wipes over it */}
          <div ref={mediaRef} className="sas-reveal-swoop lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl lg:rounded-tl-[110px] lg:rounded-br-[110px] overflow-hidden shadow-xl border-4 border-white bg-slate-200 isolate">
              <div ref={parallaxRef} className="absolute -inset-y-[8%] inset-x-0">
                {previous && (
                  <div key={`prev-${previous.id}`} data-stage-layer="previous" className="absolute inset-0 overflow-hidden">
                    <img src={previous.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                )}
                <div key={`cur-${active.id}`} data-stage-layer="current" className="absolute inset-0 overflow-hidden">
                  <img src={active.image} alt={active.stageName} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

              <div
                key={`badge-${active.id}`}
                data-stage-badge
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-baseline gap-2 text-white pointer-events-none"
              >
                <span className="font-bebas text-4xl sm:text-5xl leading-none">{pad(stage.idx + 1)}</span>
                <span className="font-bebas text-lg tracking-wider opacity-70">/ {pad(LEARNING_STAGES.length)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
