import React, { useEffect } from 'react';
import {
  X,
  Bell,
  ArrowRight,
  GraduationCap,
  FileText,
  Compass,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function WhatsNewDrawer({ isOpen, onClose, onNavigateAction }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const quickActions = [
    { label: 'Admissions 2026–27', desc: 'Roadmap, age criteria & seats', to: '/admissions', icon: GraduationCap },
    { label: 'Schedule a Campus Visit', desc: 'Book a guided walkthrough', action: 'visit', icon: Calendar },
    { label: 'Interactive Virtual Tour', desc: 'Explore our 12-acre campus', action: 'virtual-tour', icon: Compass },
    { label: 'Fee Structure & Downloads', desc: 'CBSE syllabus, datesheets & PDFs', to: '/downloads', icon: FileText }
  ];

  const updates = [
    {
      date: 'Nov 2026',
      tag: 'Admissions',
      title: 'Admissions Open for Session 2026–27 (Pre-Nursery to Class XI)',
      desc: 'Limited seats available across Foundational, Primary, Middle, and Senior Secondary wings.',
      to: '/admissions'
    },
    {
      date: 'Oct 2026',
      tag: 'CBSE Distinction',
      title: '100% CBSE Board Results with District & Subject Toppers',
      desc: 'Scholars achieved 99.0% in Class X and 98.8% in Class XII with IIT Delhi, SRCC, and St. Stephen’s admissions.',
      to: '/#future'
    },
    {
      date: 'Oct 2026',
      tag: 'Robotics & STEM',
      title: 'Atal Tinkering Lab Team Wins Regional AI Innovation Cup',
      desc: 'Junior robotics guild engineered an autonomous microclimate irrigation rover.',
      to: '/facilities#labs'
    },
    {
      date: 'Sept 2026',
      tag: 'Athletics',
      title: 'District Inter-School Sports & Taekwondo Champions Trophy',
      desc: 'RKPS athletic squads swept top honors across cricket, basketball, and martial arts.',
      to: '/gallery'
    }
  ];

  const handleItemClick = (item) => {
    onClose();
    onNavigateAction(item);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ease-sas ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#131313]/75 backdrop-blur-[2px] transition-opacity duration-500 ease-sas ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Left Slide-Out Panel (Matching SAS .apply-now-sidebar smooth slide transition) */}
      <div
        className={`relative w-full max-w-md bg-[#f8f8f8] text-[#2b2b2b] h-full shadow-2xl flex flex-col overflow-hidden z-10 border-r-4 border-[#052051] transition-transform duration-[420ms] ease-sas ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navy Header */}
        <div className="bg-[#052051] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#faba28]" />
            </div>
            <div>
              <h3 className="font-bebas text-2xl tracking-wider uppercase leading-none">
                WHAT'S NEW AT RKPS
              </h3>
              <span className="text-[10px] text-[#faba28] font-bold uppercase tracking-widest">
                Quick Actions & Announcements
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/40 hover:bg-[#a22634] hover:border-[#a22634] flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
            aria-label="Close What's New drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* SAS-Style Quick Action Strip (Crimson Icon Box Turning Solid Crimson on Hover) */}
          <div className="divide-y divide-slate-200 border-b border-slate-200 bg-white">
            {quickActions.map((qa, idx) => {
              const IconComp = qa.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleItemClick(qa)}
                  className="w-full flex items-stretch text-left group hover:bg-[#efefef] transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-14 shrink-0 bg-white group-hover:bg-[#a22634] text-[#a22634] group-hover:text-white flex items-center justify-center border-r border-slate-100 transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="py-3.5 px-4 flex-1 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-extrabold text-[#072761] uppercase tracking-wider">
                        {qa.label}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{qa.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#a22634] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Latest Campus Updates */}
          <div className="p-6 space-y-4">
            <div className="text-[11px] font-extrabold text-[#072761] uppercase tracking-widest">
              Latest School Bulletins
            </div>
            {updates.map((item, i) => (
              <button
                key={i}
                onClick={() => handleItemClick(item)}
                className="w-full text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-[#072761] hover:shadow-md transition-all duration-300 group cursor-pointer block"
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-bold text-[#a22634] uppercase tracking-wider">{item.tag}</span>
                  <span className="text-slate-400 font-medium">{item.date}</span>
                </div>
                <h4 className="font-bebas text-xl text-[#072761] tracking-wide leading-snug group-hover:text-[#a22634] transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <button
            onClick={() => handleItemClick({ action: 'admission' })}
            className="w-full py-3.5 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white font-bebas text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Apply for Admission 2026–27</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
