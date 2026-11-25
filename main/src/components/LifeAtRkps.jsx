import React from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE_MARQUEE, CAMPUS_STORIES, SCHOOL_INFO } from '../data/rkpsData';
import StudentTestimonials from './StudentTestimonials';
import { useInView } from '../hooks/useInView';
import { ExternalLink, ArrowRight } from 'lucide-react';

export default function LifeAtRkps() {
  const [sectionRef, inView] = useInView();

  return (
    <div id="life">
      {/* 1. Placement & Academic Marquee */}
      <div className="bg-white border-y border-slate-200 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-2 text-center">
          <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#a22634]">
            PROUD ALUMNI ACCEPTANCES & BOARD DISTINCTIONS
          </span>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee gap-8 sm:gap-14 text-slate-700 font-bebas text-2xl sm:text-3xl tracking-widest uppercase items-center">
            {COLLEGE_MARQUEE.concat(COLLEGE_MARQUEE).map((item, i) => (
              <span key={i} className="flex items-center gap-6">
                <span>{item}</span>
                <span className="text-[#faba28] text-xl">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. "WHAT'S YOUR STORY?" Photo Grid (SAS .panel-7 transitions) */}
      <section
        ref={sectionRef}
        className={`py-20 sm:py-28 bg-[#052051] text-white relative overflow-hidden watermark-shield-dark ${
          inView ? 'sas-in-view' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Header */}
          <div className="sas-reveal-down">
            <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider uppercase leading-none">
              <span className="text-white">WHAT'S </span>
              <span className="text-[#faba28]">YOUR STORY?</span>
            </h2>

            {/* Social Tag Pill */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={SCHOOL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#faba28] text-[#071f4c] font-bebas text-base tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-md hover:scale-105"
              >
                <span>Follow us on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={SCHOOL_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/10 hover:bg-[#a22634] text-white border border-white/25 hover:border-[#a22634] font-bebas text-base tracking-wider uppercase transition-all duration-300"
              >
                <span>@rkpsgzb on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/10 hover:bg-[#a22634] text-white border border-white/25 hover:border-[#a22634] font-bebas text-base tracking-wider uppercase transition-all duration-300"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Student video stories: centre reel plays, neighbours peek in on larger screens */}
          <StudentTestimonials className="sas-reveal-up mt-12 sm:mt-16" />

          {/* 3-Column Photo Mosaic Grid (Staggered SAS Reveal, Clickable to /gallery) */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CAMPUS_STORIES.map((story, idx) => (
              <Link
                key={idx}
                to="/gallery"
                style={{ transitionDelay: `${120 + idx * 90}ms` }}
                className="sas-reveal-up group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black/40 block"
              >
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#a22634] text-white font-bebas text-xs px-3 py-1 rounded shadow">
                  {story.tag}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                  <h4 className="font-bebas text-2xl text-white tracking-wide uppercase leading-snug group-hover:text-[#faba28] transition-colors duration-300">
                    {story.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
