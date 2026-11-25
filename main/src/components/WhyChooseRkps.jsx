import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Clock,
  Award,
  Users,
  Heart,
  Sparkles,
  Building2,
  BookOpen,
  Microscope,
  Trophy,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Shield,
  Play,
  Volume2,
  VolumeX
} from 'lucide-react';
import { WHY_CHOOSE_TABS, STUDENT_VOICES } from '../data/rkpsData';
import { useInView } from '../hooks/useInView';
import CountUp from './CountUp';
import TabStrip from './ui/TabStrip';
import VideoModal from './ui/VideoModal';

const iconMap = {
  GraduationCap,
  Clock,
  Award,
  Users,
  Heart,
  Sparkles,
  Building2,
  BookOpen,
  Microscope,
  Trophy,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Shield
};

export default function WhyChooseRkps() {
  const [sectionRef, inView] = useInView();
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const prevTab = () => {
    setActiveTabIdx((prev) => (prev - 1 + WHY_CHOOSE_TABS.length) % WHY_CHOOSE_TABS.length);
  };

  const nextTab = () => {
    setActiveTabIdx((prev) => (prev + 1) % WHY_CHOOSE_TABS.length);
  };

  const active = WHY_CHOOSE_TABS[activeTabIdx];
  const [playing, setPlaying] = useState(null);
  const [videoMuted, setVideoMuted] = useState(true);
  // SAS panel-2 has a popup video on its slides; the Students tab gets the student reels.
  const tabVideo = active.id === 'STUDENTS' ? STUDENT_VOICES[0] : null;

  return (
    <section
      ref={sectionRef}
      className={`pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-24 lg:pb-16 bg-[#071f4c] text-white relative z-20 overflow-visible watermark-shield-dark ${inView ? 'sas-in-view' : ''
        }`}
      id="why-choose"
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header Block (SAS .panel-2 slide-up entrance) */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="sas-reveal-up font-bebas text-5xl sm:text-6xl tracking-wider uppercase leading-none">
            <span className="text-white">REASONS TO </span>
            <span className="text-[#faba28]">SOAR WITH US</span>
          </h2>
          <p
            style={{ transitionDelay: '150ms' }}
            className="sas-reveal-up mt-4 text-sm sm:text-base text-white/80 leading-relaxed font-normal"
          >
            Choosing Radha Krishna Public School means embracing excellence, innovation, and endless opportunities.
            Personalized learning, attentive mentoring, and a vibrant community help students thrive and prepare for a future full of possibilities.
          </p>

          {/* Horizontal Tab Bar */}
          <TabStrip
            activeIndex={activeTabIdx}
            tone="dark"
            fadeClass="from-[#071f4c]"
            wrapperClassName="sas-reveal-up mt-6"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-lg:justify-start max-lg:py-2 max-lg:px-1"
          >
            {WHY_CHOOSE_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-5 py-2 rounded-full font-bebas text-base sm:text-lg tracking-wider uppercase transition-all duration-400 ease-sas cursor-pointer ${idx === activeTabIdx
                  ? 'bg-[#a22634] text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </TabStrip>
        </div>

        {/* Dynamic Tab Content (SAS .panel-2 overlapping card: native section + 40% over below section) */}
        <div
          style={{ transitionDelay: '320ms' }}
          className="sas-reveal-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center bg-[#0b2a63] border border-white/10 rounded-3xl p-6 sm:p-8 lg:px-12 lg:py-8 xl:px-16 relative z-20 translate-y-40 sm:translate-y-56 lg:translate-y-48 -mb-40 sm:-mb-56 lg:-mb-48 shadow-[0_40px_80px_-20px_rgba(7,31,76,0.6)]"
        >
          {/* Solid blue abstract backdrop (opaque so the light section below never shows through).
              Clipped in its own layer so the overflowing photo card isn't cut off. */}
          <div aria-hidden="true" className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e3478] via-[#0b2a63] to-[#061a40]" />
            <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#1d4fa8]/40 blur-3xl" />
            <div className="absolute -bottom-40 left-1/4 w-[26rem] h-[26rem] rounded-full bg-[#a22634]/20 blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-[#faba28]/10 blur-3xl" />
            <svg className="absolute -top-24 -right-24 w-[26rem] h-[26rem] text-white/[0.07]" viewBox="0 0 400 400" fill="none">
              {[60, 100, 140, 180].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="1.5" />
              ))}
            </svg>
            <svg className="absolute bottom-0 right-0 w-2/3 h-2/3 text-white/[0.05]" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none">
              {Array.from({ length: 12 }, (_, i) => (
                <line key={i} x1={i * 40 - 80} y1="400" x2={i * 40 + 120} y2="0" stroke="currentColor" strokeWidth="1" />
              ))}
            </svg>
            <div className="absolute inset-0 watermark-shield-dark opacity-70" />
          </div>

          {/* Left Column: Overlapping Photo Card Positioned Relative & Animated from Bottom */}
          <div key={`img-${active.id}`} className="lg:col-span-5 xl:col-span-6 relative z-30 flex justify-center lg:justify-start animate-sas-overlap-rise">
            <div className="relative w-full max-w-xl lg:max-w-none aspect-[4/5] sm:aspect-[1/1] lg:aspect-auto lg:h-[540px] xl:h-[600px] -mt-8 sm:-mt-10 lg:-my-14 lg:-ml-16 xl:-ml-20 rounded-3xl lg:rounded-r-[120px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-white/20 group">
              {active.video ? (
                <video
                  // Large file: only fetched once this section is on screen; the photo shows until then.
                  src={inView ? active.video : undefined}
                  poster={active.image}
                  autoPlay
                  loop
                  muted={videoMuted}
                  ref={(el) => {
                    if (el) el.muted = videoMuted; // React's `muted` prop alone can block iOS autoplay
                  }}
                  playsInline
                  preload="none"
                  aria-label={active.title}
                  style={{ objectPosition: active.imagePosition || '50% 50%' }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={active.image}
                  alt={active.title}
                  style={{ objectPosition: active.imagePosition || '50% 50%' }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-105"
                />
              )}

              {active.video && (
                <button
                  type="button"
                  onClick={() => setVideoMuted((m) => !m)}
                  aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
                  className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-[#a22634] text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-colors duration-300 cursor-pointer"
                >
                  {videoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#faba28]" />}
                </button>
              )}

              {/* Crimson Tag Top Left */}
              <div className="absolute top-4 left-4 bg-[#a22634] text-white font-bebas text-sm sm:text-base px-4 py-1.5 rounded-md shadow-lg tracking-wider">
                {active.tag}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

              {tabVideo && (
                <button
                  type="button"
                  onClick={() => setPlaying(tabVideo)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer group/play"
                  aria-label="Play student story video"
                >
                  <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#a22634] text-white flex items-center justify-center shadow-2xl ring-8 ring-white/15 transition-transform duration-300 group-hover/play:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5" fill="currentColor" />
                  </span>
                  <span className="font-bebas text-lg tracking-widest uppercase text-white drop-shadow">Watch their story</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Content + 4 Circular Line-Icon Stat Cards + In-Card Navigation */}
          <div key={`txt-${active.id}`} className="lg:col-span-7 xl:col-span-6 relative z-10 flex flex-col justify-center lg:pl-4 animate-sas-slide-up">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#faba28] uppercase">
              {active.kicker}
            </span>

            <h3 className="font-bebas text-4xl sm:text-5xl xl:text-[3.5rem] text-white tracking-wide uppercase leading-tight mt-1">
              {active.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-3xl">
              {active.desc}
            </p>

            {/* 4 Circular Line-Icon Stat Cards */}
            <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {active.stats.map((st, i) => {
                const IconComponent = iconMap[st.icon] || Award;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left group"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/90 group-hover:border-[#faba28] group-hover:text-[#faba28] group-hover:scale-110 transition-all duration-400 ease-sas mb-3 bg-white/5">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <CountUp
                      key={`${active.id}-${i}`}
                      value={st.num}
                      className="font-bebas text-3xl sm:text-4xl text-[#faba28] tracking-wider leading-none tabular-nums"
                    />

                    <span className="mt-1 text-xs text-white/75 leading-snug">
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* In-Card Bottom Navigation Strip (SAS Signature Style) */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-bold tracking-widest uppercase text-white/60">
                0{activeTabIdx + 1} / 0{WHY_CHOOSE_TABS.length} — {active.tabLabel}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTab}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a22634] text-white flex items-center justify-center border border-white/25 hover:border-[#a22634] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous Dossier"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTab}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a22634] text-white flex items-center justify-center border border-white/25 hover:border-[#a22634] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next Dossier"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
