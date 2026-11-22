import React, { useState } from 'react';
import { BEYOND_CLASSROOM_TABS, BEYOND_FACTS } from '../data/rkpsData';
import { useInView } from '../hooks/useInView';
import { ChevronRight } from 'lucide-react';
import TabStrip from './ui/TabStrip';
import SnapSlider from './ui/SnapSlider';

const TAB_ROUTES = ['/gallery', '/facilities#labs', '/vision-mission'];

export default function BeyondClassroom({ onNavigateAction }) {
  const [sectionRef, inView] = useInView();
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const active = BEYOND_CLASSROOM_TABS[activeTabIdx];
  const targetRoute = TAB_ROUTES[activeTabIdx] || '/gallery';

  return (
    <section
      ref={sectionRef}
      className={`py-20 lg:py-28 bg-[#052051] text-white relative overflow-hidden watermark-shield-dark ${
        inView ? 'sas-in-view' : ''
      }`}
      id="beyond"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Row: Tabs Slide From Left + Heading Slides From Right (Exact SAS .panel-4) */}
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-end justify-between gap-6 border-b border-white/15 pb-6">
          {/* Left: 3 Tabs with Active Gold Underline */}
          <TabStrip
            activeIndex={activeTabIdx}
            tone="dark"
            wrapperClassName="sas-reveal-left w-full lg:w-auto"
            className="flex flex-wrap items-center gap-6 sm:gap-8 max-lg:pb-[26px] max-lg:-mb-6"
          >
            {BEYOND_CLASSROOM_TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`font-bebas text-xl sm:text-2xl tracking-wider uppercase transition-all duration-400 ease-sas pb-2 relative cursor-pointer ${
                  idx === activeTabIdx ? 'text-[#faba28]' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
                {idx === activeTabIdx && (
                  <span className="absolute bottom-[-25px] left-0 right-0 h-1 bg-[#faba28] transition-all duration-400 ease-sas" />
                )}
              </button>
            ))}
          </TabStrip>

          {/* Right: Multi-Line Display Title */}
          {/* Each word is its own line from sm up. Explicit block spans instead of <br>: GSAP SplitText
              rebuilds the heading into masked words, and responsive <br>s don't survive that reliably,
              which left the words staggered/misaligned. Lines share one left edge so the stack reads straight. */}
          <div style={{ transitionDelay: '180ms' }} className="sas-reveal-right w-full lg:w-auto shrink-0">
            <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider uppercase leading-[0.92] text-left">
              <span className="sm:block">CULTIVATING</span>{' '}
              <span className="sm:block">EXCEPTIONAL</span>{' '}
              <span className="sm:block text-[#faba28]">THINKERS</span>
            </h2>
          </div>
        </div>

        {/* 2-Way Cut-Off Staggered Composition with SAS Smooth Tab Transitions */}
        <div style={{ transitionDelay: '220ms' }} className="sas-reveal-up mt-12 lg:mt-16 relative">
          <div className="relative flex flex-col lg:flex-row items-start">
            {/* 1. Primary Left Photo Card (Back Layer: Wider Action Photo + Integrated Bottom-Left Scrim & Narrative) */}
            <div
              key={`primary-${active.id}`}
              className="animate-fadeIn w-full lg:w-[68%] relative rounded-xl overflow-hidden shadow-2xl z-10 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] bg-black/40 border border-white/10 group"
            >
              <img
                src={active.primaryImage}
                alt={active.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-105"
              />

              {/* Bottom-Left Narrative Scrim Overlay */}
              <div className="animate-sas-slide-up absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 sm:p-8 lg:pr-32 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end">
                <div className="max-w-lg">
                  <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight drop-shadow">
                    {active.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed font-normal drop-shadow">
                    {active.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Secondary Right Photo Card (Front Layer: Stepped Down & Overlapping Left Photo) */}
            <div
              key={`secondary-${active.id}`}
              className="animate-sas-slide-right w-full sm:w-[88%] lg:w-[42%] mx-auto lg:mx-0 mt-6 lg:mt-20 lg:-ml-[10%] relative z-20 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white border-l-4 border-b-4 border-[#a22634] group"
            >
              {/* Secondary Photo */}
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={active.secondaryImage}
                  alt={active.cta}
                  className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-105"
                />
              </div>

              {/* White Action Footer Bar with Red Square Arrow Button */}
              <button
                onClick={() => onNavigateAction({ to: targetRoute })}
                className="w-full bg-white px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                aria-label={active.cta}
              >
                <span className="font-bebas text-lg sm:text-xl text-[#0b2a63] group-hover:text-[#a22634] tracking-wider uppercase leading-none transition-colors duration-300">
                  {active.cta}
                </span>

                <span className="w-10 h-10 bg-[#a22634] group-hover:bg-[#7a1f2b] text-white flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-105 shadow-sm shrink-0">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Facts slider (SAS panel-5 .facts-slider): 3 up on desktop, swipe on mobile */}
        <SnapSlider
          label="Beyond the classroom highlights"
          tone="dark"
          className="sas-reveal-up mt-16 lg:mt-24"
          itemClassName="basis-[82%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
        >
          {BEYOND_FACTS.map((fact) => (
            <article
              key={fact.title}
              className="h-full rounded-xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 border-t-4 border-t-[#faba28] hover:bg-white/[0.09] transition-colors duration-300"
            >
              <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#faba28]">{fact.kicker}</span>
              <h3 className="mt-2 font-bebas text-3xl tracking-wide uppercase leading-tight text-white">{fact.title}</h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{fact.desc}</p>
            </article>
          ))}
        </SnapSlider>
      </div>
    </section>
  );
}
