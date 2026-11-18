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
  Play
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
  // SAS panel-2 has a popup video on its slides; the Students tab gets the student reels.
  const tabVideo = active.id === 'STUDENTS' ? STUDENT_VOICES[0] : null;

  return (
    <section
      ref={sectionRef}
      className={`py-20 sm:py-28 bg-[#071f4c] text-white relative overflow-hidden watermark-shield-dark ${
        inView ? 'sas-in-view' : ''
      }`}
      id="why-choose"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block (SAS .panel-2 slide-up entrance) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="sas-reveal-up font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider uppercase leading-none">
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
            wrapperClassName="sas-reveal-up mt-8"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-lg:justify-start max-lg:py-2 max-lg:px-1"
          >
            {WHY_CHOOSE_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`px-5 py-2 rounded-full font-bebas text-base sm:text-lg tracking-wider uppercase transition-all duration-400 ease-sas cursor-pointer ${
                  idx === activeTabIdx
                    ? 'bg-[#a22634] text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </TabStrip>
        </div>

        {/* Dynamic Tab Content (SAS .panel-2 slide-from-left image + content reveal) */}
        <div
          style={{ transitionDelay: '320ms' }}
          className="sas-reveal-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Left Column: Organic Curved Photo with Crimson Tag */}
          <div key={`img-${active.id}`} className="lg:col-span-5 relative flex justify-center animate-sas-slide-left">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl lg:rounded-r-[110px] overflow-hidden shadow-2xl border-4 border-white/15 group">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-105"
              />

              {/* Crimson Tag Top Left */}
              <div className="absolute top-4 left-4 bg-[#a22634] text-white font-bebas text-sm sm:text-base px-4 py-1 rounded shadow-md tracking-wider">
                {active.tag}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

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

          {/* Right Column: Content + 4 Circular Line-Icon Stat Cards */}
          <div key={`txt-${active.id}`} className="lg:col-span-7 flex flex-col justify-center animate-sas-slide-up">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#faba28] uppercase">
              {active.kicker}
            </span>

            <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase leading-tight mt-1">
              {active.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-2xl">
              {active.desc}
            </p>

            {/* 4 Circular Line-Icon Stat Cards */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
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
          </div>
        </div>

        {/* Bottom Right Carousel Navigation Arrows */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs font-bold tracking-widest uppercase text-white/50">
            0{activeTabIdx + 1} / 0{WHY_CHOOSE_TABS.length} — {active.tabLabel}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevTab}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#a22634] text-white flex items-center justify-center border border-white/25 hover:border-[#a22634] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous Dossier"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTab}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#a22634] text-white flex items-center justify-center border border-white/25 hover:border-[#a22634] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next Dossier"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
