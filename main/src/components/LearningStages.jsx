import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_STAGES } from '../data/rkpsData';
import { useInView } from '../hooks/useInView';
import TabStrip from './ui/TabStrip';
import { CheckCircle2, ArrowRight, FileText } from 'lucide-react';

export default function LearningStages({ onOpenAdmission }) {
  const [sectionRef, inView] = useInView();
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const active = LEARNING_STAGES[activeStageIdx];

  return (
    <section
      ref={sectionRef}
      className={`py-20 sm:py-28 bg-[#f8f9fa] relative overflow-hidden ${inView ? 'sas-in-view' : ''}`}
      id="stages"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline + 4 Tabs (SAS .panel-3 slide from left) */}
        <div className="text-center sm:text-left mb-8 sm:mb-12">
          <h2 className="sas-reveal-left font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider uppercase leading-none">
            <span className="text-[#0b2a63]">LEARNING </span>
            <span className="text-[#a22634]">AT EVERY STAGE</span>
          </h2>

          {/* 4 Horizontal Division Tabs */}
          <TabStrip
            activeIndex={activeStageIdx}
            wrapperClassName="sas-reveal-left mt-6"
            className="flex flex-wrap gap-5 sm:gap-8 border-b border-slate-200 pb-3 max-lg:pb-4"
          >
            {LEARNING_STAGES.map((stg, idx) => (
              <button
                key={stg.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`font-bebas text-xl sm:text-2xl tracking-wide uppercase pb-2 transition-all duration-400 ease-sas relative cursor-pointer ${
                  idx === activeStageIdx
                    ? 'text-[#a22634]'
                    : 'text-slate-400 hover:text-[#0b2a63]'
                }`}
              >
                {stg.label}
                {idx === activeStageIdx && (
                  <span className="absolute bottom-[-13px] left-0 right-0 h-1 bg-[#a22634] rounded-full transition-all duration-400 ease-sas" />
                )}
              </button>
            ))}
          </TabStrip>
        </div>

        {/* Content Split: Left Stage Details + Right Organic Swooping Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
          {/* Left Column: Stage Details (Slides in from left on tab switch) */}
          <div key={`stage-txt-${active.id}`} className="lg:col-span-6 flex flex-col justify-center animate-sas-slide-left">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] text-[#0b2a63] uppercase">
              {active.ageRange}
            </span>

            <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-[#2b2b2b] tracking-wide uppercase mt-1">
              {active.stageName}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {active.desc}
            </p>

            {/* Highlights List */}
            <div className="mt-6 space-y-2.5">
              {active.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Red Outline Action Button + CBSE Curriculum Link */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* Right Column: Large Organic Curved Photo Card (SAS Swoop + Rotation Transition) */}
          <div key={`stage-img-${active.id}`} className="lg:col-span-6 animate-sas-swoop">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl lg:rounded-tl-[110px] lg:rounded-br-[110px] overflow-hidden shadow-xl border-4 border-white group">
              <img
                src={active.image}
                alt={active.stageName}
                className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
