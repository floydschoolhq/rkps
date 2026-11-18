import React, { useState, useEffect } from 'react';
import { ALUMNI_TOPPERS, PARENT_TESTIMONIALS } from '../data/rkpsData';
import { useInView } from '../hooks/useInView';
import { ChevronLeft, ChevronRight, Star, X, Award } from 'lucide-react';

/**
 * Custom gold line-art Graduation Cap resting on Stacked Books icon
 * matching the exact SAS center-card emblem.
 */
function ScholarCapBooksIcon({ className = 'w-10 h-10' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Graduation Cap */}
      <path d="M24 6L8 13l16 7 16-7-16-7z" />
      <path d="M14 16v6c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-6" />
      <path d="M38 14v9" />
      {/* Stacked Books */}
      <rect x="10" y="29" width="26" height="5.5" rx="1.5" />
      <rect x="13" y="34.5" width="25" height="5.5" rx="1.5" />
      <path d="M16 31.75h14" />
      <path d="M19 37.25h13" />
    </svg>
  );
}

const BOARD_NUMBERS = [
  { num: '100%', label: 'CBSE Board Pass Rate' },
  { num: '99.0%', label: 'Highest Class X Score' },
  { num: '98.8%', label: 'Highest Class XII Score' },
  { num: '125+', label: 'IIT / NEET / DU / CUET Selections' }
];

export default function PreparedForFuture() {
  const [sectionRef, inView] = useInView();
  const [activeTab, setActiveTab] = useState('alumni');
  const [centerIdx, setCenterIdx] = useState(1); // Start with 2nd scholar centered so left & right cards are rich
  const [selectedProfileIdx, setSelectedProfileIdx] = useState(null);

  const total = ALUMNI_TOPPERS.length;

  const prevSlide = () => setCenterIdx((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCenterIdx((prev) => (prev + 1) % total);

  // Close profile modal on Escape and cycle with Left/Right arrows
  useEffect(() => {
    if (selectedProfileIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedProfileIdx(null);
      if (e.key === 'ArrowLeft') setSelectedProfileIdx((p) => (p - 1 + total) % total);
      if (e.key === 'ArrowRight') setSelectedProfileIdx((p) => (p + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProfileIdx, total]);

  // Cyclic 5-card window: offsets -2 (left peek), -1, 0 (center), +1, +2 (right peek)
  const visibleSlots = [-2, -1, 0, 1, 2].map((offset) => {
    const idx = (centerIdx + offset + total) % total;
    return { offset, idx, scholar: ALUMNI_TOPPERS[idx] };
  });

  const activeProfile = selectedProfileIdx !== null ? ALUMNI_TOPPERS[selectedProfileIdx] : null;

  return (
    <section
      ref={sectionRef}
      className={`pt-20 sm:pt-24 pb-16 sm:pb-20 bg-white relative overflow-hidden ${
        inView ? 'sas-in-view' : ''
      }`}
      id="future"
    >
      {/* 1. Centered Header & Subtitle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sas-reveal-down text-center max-w-3xl mx-auto">
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider uppercase leading-none">
            <span className="text-[#0b2a63]">PREPARED FOR </span>
            <span className="text-[#a22634]">THE FUTURE</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            University and career readiness is an important milestone in the learning journey cherished by the RKPS community.
            Our graduates are remarkable young adults, equipped not just for college entrance examinations but for life beyond.
            After all, education should inspire, not just instruct.
          </p>
        </div>

        {/* 2. Exact SAS Rectangular Light-Gray Tab Bar (flush above the full-bleed carousel) */}
        <div style={{ transitionDelay: '120ms' }} className="sas-reveal-up mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center bg-[#e5e5e5] px-2 sm:px-5 py-3.5">
            <button
              onClick={() => setActiveTab('alumni')}
              className={`px-4 sm:px-6 py-1 text-[11px] sm:text-[13px] font-extrabold tracking-wider uppercase border-r border-[#c8c8c8] transition-colors duration-300 cursor-pointer ${
                activeTab === 'alumni'
                  ? 'text-[#a22634]'
                  : 'text-[#131313] hover:text-[#a22634]'
              }`}
            >
              GRADUATES AND ALUMNI PROFILE
            </button>
            <button
              onClick={() => setActiveTab('parents')}
              className={`px-4 sm:px-6 py-1 text-[11px] sm:text-[13px] font-extrabold tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                activeTab === 'parents'
                  ? 'text-[#a22634]'
                  : 'text-[#131313] hover:text-[#a22634]'
              }`}
            >
              PARENT VOICES & BOARD NUMBERS
            </button>
          </div>
        </div>
      </div>

      {/* 3. Full-Bleed Edge-to-Edge Content Area */}
      <div style={{ transitionDelay: '200ms' }} className="sas-reveal-up w-full">
        {/* TAB 1: SAS Full-Bleed 5-Slot Portrait Carousel (3 Full Center + 2 Edge Peeks) */}
        {activeTab === 'alumni' && (
          <div key="tab-alumni" className="relative w-full overflow-hidden animate-fadeIn">
            {/* Left Floating Crimson Circular Arrow (positioned at inner-left card edge) */}
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-6 lg:left-[11.2%] top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous graduate profile"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Floating Crimson Circular Arrow (positioned at inner-right card edge) */}
            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-6 lg:right-[11.2%] top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next graduate profile"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Full-Width 5-Card Track: 5 x 25vw = 125vw so 3 cards fill center and 2 peek on edges */}
            <div className="flex items-stretch justify-center gap-3 sm:gap-4 w-full">
              {visibleSlots.map(({ offset, idx, scholar }) => {
                // On mobile show only center card; on md show 3 (-1, 0, +1); on lg+ show all 5 with outer peeking
                const visibilityClass =
                  Math.abs(offset) === 2
                    ? 'hidden lg:block'
                    : Math.abs(offset) === 1
                    ? 'hidden md:block'
                    : 'block';

                return (
                  <article
                    key={`${offset}-${scholar.id}`}
                    onClick={() => setSelectedProfileIdx(idx)}
                    className={`${visibilityClass} relative shrink-0 w-[86vw] sm:w-[68vw] md:w-[31.5vw] lg:w-[24.8vw] max-w-[380px] aspect-[344/510] max-h-[560px] bg-[#131313] overflow-hidden group cursor-pointer select-none`}
                  >
                    {/* Full-Bleed Portrait Image */}
                    <img
                      src={scholar.image}
                      alt={scholar.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-sas group-hover:scale-105"
                    />

                    {/* Default Bottom Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-400 group-hover:opacity-0 pointer-events-none" />

                    {/* DEFAULT STATE: Bottom Gold Class Year + White Bebas Name + Short Red Dash */}
                    <div className="absolute inset-x-0 bottom-0 pb-7 px-5 text-center flex flex-col items-center transition-all duration-400 ease-sas group-hover:opacity-0 group-hover:-translate-y-4 pointer-events-none">
                      <span className="text-xs sm:text-sm font-bold text-[#faba28] tracking-wide">
                        {scholar.classYear}
                      </span>
                      <h3 className="font-bebas text-3xl sm:text-[38px] text-white tracking-wider uppercase leading-none mt-1 drop-shadow">
                        {scholar.name}
                      </h3>
                      <span className="w-7 h-[2.5px] bg-[#a22634] mt-3 block" />
                    </div>

                    {/* HOVER / ACTIVE STATE (Exact Match of SAS Center Card "Alisha Bhandari") */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-sas flex flex-col justify-between">
                      {/* Centered Content Block */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-8 pt-6 pb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 ease-sas">
                        <span className="text-xs sm:text-sm font-bold text-[#faba28] tracking-wide">
                          {scholar.classYear}
                        </span>
                        <h3 className="font-bebas text-3xl sm:text-[38px] text-white tracking-wider uppercase leading-none mt-1">
                          {scholar.name}
                        </h3>

                        {/* Crimson Horizontal Rule */}
                        <span className="w-16 h-[2px] bg-[#a22634] my-4 block" />

                        {/* Student Quote */}
                        <p className="text-xs sm:text-[13.5px] text-white/90 leading-relaxed font-normal max-w-[260px]">
                          {scholar.quote}
                        </p>

                        {/* Subtle Divider */}
                        <span className="w-4/5 h-px bg-white/25 my-5 block" />

                        {/* Gold Scholar Cap on Books Emblem + Tenure/Achievement */}
                        <div className="flex items-center justify-center gap-3 text-left">
                          <ScholarCapBooksIcon className="w-9 h-9 text-[#faba28] shrink-0" />
                          <div className="leading-tight">
                            <div className="text-xs sm:text-[13px] font-bold text-white">
                              {scholar.tenure}
                            </div>
                            <div className="text-[11px] font-semibold text-[#faba28] mt-0.5">
                              {scholar.score} • {scholar.highlight}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom White "MY PROFILE" Action Bar with Crimson Arrow Square */}
                      <div className="w-full bg-white flex items-stretch justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-sas border-t border-slate-200">
                        <span className="font-bebas text-lg sm:text-xl text-[#131313] tracking-wider uppercase px-5 flex items-center">
                          MY PROFILE
                        </span>
                        <span className="w-12 h-12 bg-[#a22634] hover:bg-[#7a1f2b] text-white flex items-center justify-center shrink-0 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile Dot Indicator */}
            <div className="mt-5 flex justify-center gap-2 lg:hidden">
              {ALUMNI_TOPPERS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCenterIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === centerIdx ? 'w-7 bg-[#a22634]' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`View ${s.name}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Parent Voices & Board Numbers */}
        {activeTab === 'parents' && (
          <div key="tab-parents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 animate-fadeIn">
            {/* Board Result Numbers Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {BOARD_NUMBERS.map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#071f4c] text-white p-6 text-center border-b-4 border-[#a22634] shadow-md"
                >
                  <div className="font-bebas text-4xl sm:text-5xl text-[#faba28] tracking-wider leading-none">
                    {stat.num}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-white/85 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Parent Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PARENT_TESTIMONIALS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f6f6f6] border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0b2a63]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#faba28] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <h4 className="font-bebas text-2xl text-[#0b2a63] tracking-wide uppercase">
                      {item.parent}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Full Graduate Profile Modal (Opened when clicking MY PROFILE) */}
      {activeProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131313]/80 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProfileIdx(null);
          }}
        >
          <div className="relative bg-white max-w-3xl w-full shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-scaleUp border-b-4 border-[#a22634]">
            <button
              onClick={() => setSelectedProfileIdx(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Portrait */}
            <div className="md:col-span-5 aspect-[4/5] md:aspect-auto bg-[#071f4c] relative">
              <img
                src={activeProfile.image}
                alt={activeProfile.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 bg-[#faba28] text-[#071f4c] font-bebas text-sm px-3 py-1 tracking-wider uppercase shadow">
                {activeProfile.score}
              </div>
            </div>

            {/* Right Story Dossier */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold tracking-widest uppercase text-[#a22634]">
                  {activeProfile.classYear} • {activeProfile.stream}
                </span>
                <h3 className="font-bebas text-4xl sm:text-5xl text-[#0b2a63] tracking-wide uppercase leading-none mt-1">
                  {activeProfile.name}
                </h3>
                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-[#071f4c]/5 text-[#0b2a63] text-xs font-bold">
                  <Award className="w-4 h-4 text-[#a22634]" />
                  <span>{activeProfile.highlight}</span>
                </div>

                <blockquote className="mt-5 pl-4 border-l-4 border-[#faba28] text-sm text-slate-700 italic leading-relaxed">
                  "{activeProfile.quote}"
                </blockquote>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {activeProfile.story}
                </p>
              </div>

              {/* Modal Prev / Next Navigation */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {activeProfile.tenure}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProfileIdx((p) => (p - 1 + total) % total)}
                    className="w-9 h-9 rounded-full border border-slate-300 hover:bg-[#0b2a63] hover:text-white hover:border-[#0b2a63] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous scholar"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedProfileIdx((p) => (p + 1) % total)}
                    className="w-9 h-9 rounded-full border border-slate-300 hover:bg-[#0b2a63] hover:text-white hover:border-[#0b2a63] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next scholar"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
