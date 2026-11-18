import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLLEGE_MARQUEE, CAMPUS_STORIES, STUDENT_VOICES, SCHOOL_INFO } from '../data/rkpsData';
import SnapSlider from './ui/SnapSlider';
import VideoModal from './ui/VideoModal';
import { useInView } from '../hooks/useInView';
import { ExternalLink, ArrowRight, Play } from 'lucide-react';

export default function LifeAtRkps() {
  const [sectionRef, inView] = useInView();
  const [playing, setPlaying] = useState(null);

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

          {/* Student voices: SAS panel-7 style slider of reels, each opening the popup player */}
          <SnapSlider
            label="Student stories"
            tone="dark"
            className="sas-reveal-up mt-12 sm:mt-16 text-left"
            itemClassName="basis-[68%] sm:basis-[calc(33.333%-16px)] lg:basis-[calc(25%-18px)]"
          >
            {STUDENT_VOICES.map((v) => (
              <button
                key={v.src}
                type="button"
                onClick={() => setPlaying(v)}
                className="group relative block w-full aspect-[9/16] rounded-2xl overflow-hidden border-4 border-white/10 bg-black/40 shadow-2xl cursor-pointer"
                aria-label={`Play ${v.title}`}
              >
                <img
                  src={v.poster}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-sas group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-[#a22634]/90 text-white flex items-center justify-center ring-8 ring-white/15 transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 font-bebas text-xl tracking-wider uppercase text-white">
                  {v.title}
                </span>
              </button>
            ))}
          </SnapSlider>

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
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}
