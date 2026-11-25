import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import exteriorImg from '@assets/Radha Krishna Public School Exterior.webp';
import libraryImg from '@assets/photos/library.webp';
import smartClassImg from '@assets/photos/smart-classroom.webp';
import playAreaImg from '@assets/photos/play-area.webp';
import sportsImg from '@assets/photos/sports-exercise.webp';
import slide5Img from '@assets/slides/5.webp';

// Each stop shows a real RKPS photo and describes only what that photo shows.
const tourSpots = [
  {
    title: 'School Campus',
    category: 'Campus Grounds',
    image: exteriorImg,
    description: 'Our main building on NH-9, Lal Kuan, Ghaziabad, with secure gated entry.'
  },
  {
    title: 'School Library',
    category: 'Reading & Research',
    image: libraryImg,
    description: 'Glass-fronted book cabinets and reading tables where students browse, borrow and study quietly.'
  },
  {
    title: 'Smart Classrooms',
    category: 'Academics',
    image: smartClassImg,
    description: 'Classrooms equipped with digital display boards that bring lessons to life with visuals and video.'
  },
  {
    title: 'Pre-Primary Play Area',
    category: 'Early Years',
    image: playAreaImg,
    description: 'Colourful outdoor play equipment where our youngest learners build confidence, balance and friendships.'
  },
  {
    title: 'Sports & Fitness',
    category: 'Physical Education',
    image: sportsImg,
    description: 'Daily drills and outdoor activities that keep students active, fit and team-minded.'
  },
  {
    title: 'Events & Celebrations',
    category: 'Performing Arts & Culture',
    image: slide5Img,
    description: "Our stage hosts assemblies, annual functions and honours such as the Teacher's Day Rashtriya Puraskar Samman Samaroh 2025."
  }
];

export default function VirtualTourModal({ isOpen, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev === 0 ? tourSpots.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev + 1) % tourSpots.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const current = tourSpots[activeIdx];

  const prevSpot = () => {
    setActiveIdx((prev) => (prev === 0 ? tourSpots.length - 1 : prev - 1));
  };

  const nextSpot = () => {
    setActiveIdx((prev) => (prev + 1) % tourSpots.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131313]/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 animate-scaleUp">
        <button
          onClick={onClose}
          aria-label="Close virtual tour"
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Frame */}
        <div className="relative h-56 sm:h-96 bg-slate-950 overflow-hidden rounded-t-[20px]">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />

          {/* Nav buttons */}
          <button
            onClick={prevSpot}
            aria-label="Previous stop"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-blue-900 text-white flex items-center justify-center backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSpot}
            aria-label="Next stop"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-blue-900 text-white flex items-center justify-center backdrop-blur-sm transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wider shadow">
              {current.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white heading-serif">
              {current.title}
            </h3>
          </div>
        </div>

        {/* Details & Thumbnails */}
        <div className="p-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {current.description}
          </p>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar min-w-0">
              {tourSpots.map((spot, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeIdx ? 'border-amber-500 scale-105 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={spot.image} alt={spot.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-slate-500 shrink-0">
              {activeIdx + 1} of {tourSpots.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
