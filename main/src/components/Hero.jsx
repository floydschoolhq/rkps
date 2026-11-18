import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { HERO_SLIDES } from '../data/rkpsData';

export default function Hero({ onNavigateAction, onScrollToStages }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

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

  return (
    <section
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-[#071f4c]"
      id="hero"
    >
      {/* Background Media Layers with SAS Smooth Crossfade & Subtle Ken Burns Zoom */}
      {HERO_SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-sas ${
              isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.type === 'video' ? (
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

      {/* Foreground Hero Content with Keyed SAS Slide-Up Transition */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 text-center items-center">
        <div key={currentSlide} className="animate-sas-slide-up flex flex-col items-center">
          <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] uppercase text-[#faba28] mb-2 drop-shadow">
            {active.kicker}
          </span>

          <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wider leading-[0.9] drop-shadow-lg max-w-5xl uppercase">
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
