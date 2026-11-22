import React from 'react';
import { Target, Compass, Sparkles, Award, Heart, BookOpen, ShieldCheck, Globe, Users, ArrowRight, Quote, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import directorImg from '@assets/photos/director.webp';
import principalImg from '@assets/photos/principal-rupa-tyagi.webp';
import PageHero from '../components/ui/PageHero';
import visionHeroImg from '@assets/photos/teacher-guidance.webp';

export default function VisionMissionPage({ onOpenAdmission }) {
  const values = [
    {
      icon: Compass,
      title: 'Inquiry & Critical Thinking',
      desc: 'Encouraging students to question, experiment, and analyze rather than memorize, fostering authentic intellectual curiosity.'
    },
    {
      icon: ShieldCheck,
      title: 'Integrity & Moral Courage',
      desc: 'Instilling timeless ethical principles, truthfulness, and humility that guide students through personal and civic challenges.'
    },
    {
      icon: Globe,
      title: 'Global Outlook, Indian Roots',
      desc: 'Nurturing cultural pride and Bharatiya heritage while cultivating future-ready 21st-century international perspectives.'
    },
    {
      icon: Heart,
      title: 'Empathy & Inclusivity',
      desc: 'Creating a compassionate learning ecosystem where diversity is cherished, and every learner feels valued and empowered.'
    },
    {
      icon: Award,
      title: 'Pursuit of Excellence',
      desc: 'Inspiring personal mastery in academic rigor, performing arts, sportsmanship, and leadership competitions.'
    },
    {
      icon: Users,
      title: 'Collaborative Leadership',
      desc: 'Developing teamwork, vocal confidence, and empathetic problem-solving for meaningful societal contribution.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      
      {/* 1. Page header (shared homepage-style hero) */}
      <PageHero
        crumbs={[{ label: 'About RKPS' }, { label: 'Vision & Mission' }]}
        kicker="Guiding Ideals & Core Purpose"
        title="Vision &"
        accent="Mission"
        subtitle="“विद्या ददाति विनयं” — Knowledge bestows humility. Building foundations of intellectual brilliance, compassionate character, and enduring leadership for over 25 years."
        image={visionHeroImg}
      />

      {/* 2. Vision & Mission Cards */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0b2a63] to-[#1d4fa8]" />
            <div className="w-14 h-14 rounded-2xl bg-[#0b2a63]/5 border border-[#0b2a63]/60 flex items-center justify-center text-[#0b2a63] mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-7 h-7 text-[#0b2a63]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#0b2a63]">Our Strategic Horizon</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a63] heading-serif mt-1 mb-4">
              Our Vision
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              To be a pioneering center of holistic scholastic excellence that awakens the innate genius in every learner; nurturing morally anchored, intellectually fearless, and socially conscious global citizens who enrich humanity with wisdom and empathy.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold border-t border-slate-100 pt-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a22634]" />
                <span>Nurture 100% conceptual mastery through CBSE excellence</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a22634]" />
                <span>Foster lifelong self-learning and creative inquiry</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a22634]" />
                <span>Cultivate cultural consciousness with 21st-century competencies</span>
              </li>
            </ul>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#a22634] to-[#faba28]" />
            <div className="w-14 h-14 rounded-2xl bg-[#a22634]/5 border border-[#a22634]/60 flex items-center justify-center text-[#a22634] mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-[#a22634]" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#a22634]">Our Everyday Action</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a63] heading-serif mt-1 mb-4">
              Our Mission
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              To deliver transformative, student-centric education by providing state-of-the-art experiential laboratories, inspirational educators, championship sports facilities, and an inclusive culture where academic rigor walks hand-in-hand with human dignity.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold border-t border-slate-100 pt-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a22634]" />
                <span>Zero-barrier student care with individual mentorship</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a22634]" />
                <span>Cutting-edge STEM, Robotics, and Digital Literacy labs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a22634]" />
                <span>Holistic character cultivation and national pride</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Leadership Spotlight: Director & Principal */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a22634]">Guiding Stewards</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a63] heading-serif mt-1">
              Voices of Educational Leadership
            </h2>
            <div className="w-16 h-1 bg-[#a22634] mx-auto mt-3 rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base mt-3 font-normal">
              Meet the visionary minds steering Radha Krishna Public School toward scholastic, ethical, and cultural distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Director Spotlight */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-white shadow-lg bg-[#0b2a63] relative">
                <img
                  src={directorImg}
                  alt="Dr. Satish Yadav"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold text-center py-0.5 rounded uppercase">
                  Director
                </span>
              </div>
              <div className="space-y-3 flex-1 text-center md:text-left">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2a63] heading-serif">
                    Dr. Satish Yadav
                  </h3>
                  <p className="text-xs font-bold text-[#a22634] tracking-wider uppercase">
                    Founder &amp; Managing Director
                  </p>
                </div>
                <div className="relative text-xs sm:text-sm text-slate-600 italic border-l-2 border-[#faba28] pl-3">
                  “Education is the sacred alchemy that turns curiosity into purpose and character into destiny. At RKPS, we build lives, not just careers.”
                </div>
                <Link
                  to="/directors-desk"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2a63] hover:text-[#a22634] transition-colors pt-1"
                >
                  <span>Read Director's Full Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Principal Spotlight */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center">
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-white shadow-lg bg-[#0b2a63] relative">
                <img
                  src={principalImg}
                  alt="Dr. Rupa Tyagi"
                  className="w-full h-full object-cover object-[50%_70%]"
                />
                <span className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold text-center py-0.5 rounded uppercase">
                  Principal
                </span>
              </div>
              <div className="space-y-3 flex-1 text-center md:text-left">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0b2a63] heading-serif">
                    Dr. Rupa Tyagi
                  </h3>
                  <p className="text-xs font-bold text-[#0b2a63] tracking-wider uppercase">
                    Principal &amp; Academic Head
                  </p>
                </div>
                <div className="relative text-xs sm:text-sm text-slate-600 italic border-l-2 border-[#1d4fa8] pl-3">
                  “True education ignites a passion for learning that outlives examinations. We empower every child to believe in their unique greatness.”
                </div>
                <Link
                  to="/principals-desk"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2a63] hover:text-[#a22634] transition-colors pt-1"
                >
                  <span>Read Principal's Full Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Institutional Values */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a22634]">Pillars of Excellence</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a63] heading-serif mt-1">
            Our 6 Core Values
          </h2>
          <div className="w-16 h-1 bg-[#a22634] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <div 
                key={i} 
                className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0b2a63]/5 text-[#0b2a63] flex items-center justify-center mb-4 group-hover:bg-[#faba28] group-hover:text-[#0b2a63] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0b2a63] heading-serif mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#071f4c] via-[#0b2a63] to-[#071f4c] text-white text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#faba28] mb-2">
            Admissions Open 2026–27
          </span>
          <h2 className="text-2xl sm:text-4xl font-black heading-serif mb-4">
            Experience Our Vision in Action
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal">
            Admissions open for academic session 2026–27. Join a community where your child's aspirations are nurtured into greatness.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenAdmission}
              className="font-bebas px-6 py-3 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white text-base sm:text-lg uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              Apply for Admission 2026–27
            </button>
            <Link
              to="/contact"
              className="font-bebas px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base sm:text-lg uppercase tracking-wider transition-all"
            >
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
