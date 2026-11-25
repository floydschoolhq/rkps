import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap, splitWords, prefersReducedMotion } from '../lib/gsap';
import { INTRO_DONE_EVENT } from './IntroLoader';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { HERO_SLIDES } from '../data/rkpsData';

export default function Hero({ onNavigateAction, onScrollToStages }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const [introTick, setIntroTick] = useState(0);

  // Replay the title animation once the intro screen lifts, so visitors actually see it.
  useEffect(() => {
    const onIntroDone = () => setIntroTick((t) => t + 1);
    window.addEventListener(INTRO_DONE_EVENT, onIntroDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
  }, []);

  // Scroll parallax: the background drifts slower than the page, and the copy lifts and fades out.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      };
      gsap.to(mediaRef.current, { yPercent: 25, ease: 'none', scrollTrigger });
      gsap.to(contentRef.current, { y: -90, autoAlpha: 0, ease: 'none', scrollTrigger });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Headline words rise out of their masks every time the slide changes.
  useLayoutEffect(() => {
    if (!titleRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const split = splitWords(titleRef.current);
      gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, [currentSlide, introTick]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const active = HERO_SLIDES[currentSlide];

  // Load slide media only when it's showing or up next, so phones don't download every slide up front.
  const [loaded, setLoaded] = useState(() => new Set([0, 1 % HERO_SLIDES.length]));
  useEffect(() => {
    setLoaded((prev) => {
      const next = (currentSlide + 1) % HERO_SLIDES.length;
      if (prev.has(currentSlide) && prev.has(next)) return prev;
      return new Set([...prev, currentSlide, next]);
    });
  }, [currentSlide]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen h-svh min-h-[520px] sm:min-h-[640px] max-h-[1080px] overflow-hidden bg-[#071f4c]"
      id="hero"
    >
      {/* Background Media Layers with SAS Smooth Crossfade & Subtle Ken Burns Zoom */}
      <div ref={mediaRef} className="absolute inset-0">
      {HERO_SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-sas ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {!loaded.has(index) ? null : slide.type === 'video' ? (
              <video
                ref={videoRef}
                src={slide.src}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.title}
                className={`w-full h-full object-cover ${isCurrent ? 'animate-sas-hero-zoom' : ''}`}
              />
            )}

            {/* Gradient Scrim Matching SAS Screenshot Page 0 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45 pointer-events-none" />
          </div>
        );
      })}
      </div>

      {/* Foreground Hero Content with Keyed SAS Slide-Up Transition */}
      <div ref={contentRef} className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 text-center items-center">
        <div key={currentSlide} className="animate-sas-slide-up flex flex-col items-center">
          <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] uppercase text-[#faba28] mb-2 drop-shadow">
            {active.kicker}
          </span>

          <h1 ref={titleRef} className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider leading-[0.9] drop-shadow-lg max-w-5xl uppercase">
            {active.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/85 max-w-2xl font-normal drop-shadow">
            {active.subtitle}
          </p>
        </div>

        {/* Dual Pill Action Buttons (Exact SAS Hero Pills) */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigateAction({ to: '/admissions' })}
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-black/45 hover:bg-[#a22634] text-white font-bebas text-lg sm:text-xl tracking-wider uppercase backdrop-blur-md border border-white/55 hover:border-[#a22634] transition-all duration-400 ease-sas hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            {active.cta1}
          </button>

          <button
            onClick={onScrollToStages}
            className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-black/45 hover:bg-[#0b2a63] text-white font-bebas text-lg sm:text-xl tracking-wider uppercase backdrop-blur-md border border-white/55 hover:border-[#0b2a63] transition-all duration-400 ease-sas hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            {active.cta2}
          </button>
        </div>
      </div>

      {/* Bottom Right Carousel Controls */}
      <div className="absolute right-4 sm:right-8 bottom-6 sm:bottom-8 z-20 flex items-center gap-2">
        {active.type === 'video' && (
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md border border-white/35 transition-all duration-300 mr-2 cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Video Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white/75" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#faba28]" />
            )}
          </button>
        )}

        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/45 hover:bg-[#a22634] text-white flex items-center justify-center backdrop-blur-md border border-white/35 hover:border-[#a22634] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/45 hover:bg-[#a22634] text-white flex items-center justify-center backdrop-blur-md border border-white/35 hover:border-[#a22634] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Progress Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-sas cursor-pointer ${
              idx === currentSlide ? 'w-9 bg-[#faba28]' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
