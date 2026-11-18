import React from 'react';
import { Link } from 'react-router-dom';
import { CORE_PILLARS } from '../data/rkpsData';
import { useInView } from '../hooks/useInView';
import logoImg from '@assets/logo.jpg';

const PILLAR_ROUTES = ['/downloads#curriculum', '/vision-mission', '/gallery'];

export default function CorePillars() {
  const [sectionRef, inView] = useInView();

  return (
    <section
      ref={sectionRef}
      className={`py-20 sm:py-28 bg-white relative overflow-hidden watermark-shield ${
        inView ? 'sas-in-view' : ''
      }`}
      id="pillars"
    >
      {/* Subtle Crest Watermark in Left Background */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
        <img src={logoImg} alt="" aria-hidden="true" className="w-full h-full object-contain grayscale" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Center Crest Shield with Horizontal Rule (Exact match of SAS Page 2) */}
        <div className="sas-reveal-down flex items-center justify-center gap-5 mb-5">
          <span className="h-px w-16 sm:w-28 bg-slate-200" />
          <div className="w-14 h-14 rounded-full border-2 border-[#a22634] p-1 bg-white shadow-md flex items-center justify-center">
            <img src={logoImg} alt="RKPS Crest" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="h-px w-16 sm:w-28 bg-slate-200" />
        </div>

        {/* Section Headline in Crimson + Navy Bebas Neue (Matching SAS Page 2) */}
        <h2 className="sas-reveal-up font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider uppercase leading-none">
          <span className="text-[#a22634]">THE RKPS WAY </span>
          <span className="text-[#0b2a63]">IS ABOUT...</span>
        </h2>

        {/* 3 Red-Pinned Columns with Staggered SAS Entrance */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 text-center">
          {CORE_PILLARS.map((col, idx) => (
            <Link
              key={idx}
              to={PILLAR_ROUTES[idx] || '/vision-mission'}
              style={{ transitionDelay: `${150 + idx * 140}ms` }}
              className="sas-reveal-up flex flex-col items-center group p-4 rounded-2xl hover:bg-slate-50/80 transition-colors duration-300"
            >
              {/* Crimson Shield Pin Marker */}
              <div className="w-3.5 h-3.5 bg-[#a22634] rotate-45 mb-4 shadow-sm group-hover:scale-125 group-hover:bg-[#faba28] transition-all duration-300" />

              {/* Column Title in Bold Bebas Neue */}
              <h3 className="font-bebas text-2xl sm:text-3xl text-[#0b2a63] group-hover:text-[#a22634] tracking-wide uppercase transition-colors duration-300">
                {col.title}
              </h3>

              {/* Description in DM Sans */}
              <p className="mt-3 text-sm sm:text-base text-[#4a4a4a] leading-relaxed max-w-sm">
                {col.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
