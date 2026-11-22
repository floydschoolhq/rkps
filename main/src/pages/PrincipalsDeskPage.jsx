import React from 'react';
import { Quote, CheckCircle2, Mail, ArrowRight, ChevronRight, Award, ShieldCheck, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import principalImg from '@assets/photos/principal-rupa-tyagi.webp';
import PageHero from '../components/ui/PageHero';

export default function PrincipalsDeskPage({ onOpenAdmission }) {
  return (
    <div className="bg-slate-100/70 text-slate-800 min-h-screen">
      
      {/* 1. Page header (shared homepage-style hero) */}
      <PageHero
        crumbs={[{ label: 'Leadership' }, { label: "Principal's Desk" }]}
        kicker="Office of the Principal"
        title="From the"
        accent="Principal's Desk"
        subtitle="“The mind is not a vessel to be filled, but a fire to be kindled.” Nurturing young scholars to think independently, act empathetically, and lead courageously."
        image={principalImg}
      />

      {/* 2. Main Address Showcase */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Principal Card & Credentials Dossier */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0b2a63]" />

              <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0b2a63] mb-6 shadow-md border border-slate-200/80">
                <img
                  src={principalImg}
                  alt="Dr. Rupa Tyagi"
                  className="w-full h-full object-cover object-[50%_70%]"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#a22634] uppercase tracking-widest block mb-1">
                  Academic Head &amp; Senior Pedagogue
                </span>
                <h2 className="text-2xl font-black text-[#0b2a63] heading-serif">
                  Dr. Rupa Tyagi
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  Principal, Radha Krishna Public School
                </p>
                <p className="text-xs text-slate-500 font-medium pt-1">
                  Ph.D. • 22+ Years in CBSE Senior Secondary Pedagogy
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>National CBSE Curriculum &amp; Assessment Mentor</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>Champion of Experiential &amp; Inquiry-Based Learning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>Individualized Child Mentorship &amp; Counseling Specialist</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="font-bebas w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#0b2a63] hover:bg-[#a22634] text-white text-base sm:text-lg uppercase tracking-wider transition-all shadow-md text-center"
                >
                  <Mail className="w-4 h-4 text-[#faba28]" />
                  <span>Schedule Academic Interaction</span>
                </Link>
              </div>
            </div>

            {/* Quote Callout (Ivory Stationery Card) */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-[#a22634]/80 shadow-xs relative">
              <Quote className="w-8 h-8 text-[#a22634]/30 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic relative z-10">
                “Every student who walks through our gates brings a universe of potential. Our sacred mission is to guide that potential into purpose, confidence, and compassion.”
              </p>
            </div>
          </div>

          {/* Right: Full Principal's Letter (Editorial Stationery) */}
          <div className="lg:col-span-7 bg-[#f8f9fa] rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-6 relative overflow-hidden">
            {/* Subtle Watermark Seal */}
            <div className="absolute right-6 bottom-6 w-64 h-64 opacity-[0.03] pointer-events-none select-none">
              <img src="/logo.jpg" alt="Watermark" className="w-full h-full object-contain grayscale" />
            </div>

            {/* Letterhead Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <img src="/logo.jpg" alt="RKPS" className="w-10 h-10 rounded-full object-contain border border-slate-300" />
                  <div>
                    <h3 className="text-xs font-black tracking-wider text-[#0b2a63] uppercase">Radha Krishna Public School</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Affiliated to CBSE, New Delhi • Affiliation #0b2a632</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white px-2.5 py-1 rounded border border-slate-200">
                  OFFICIAL COMMUNIQUE
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2a63] heading-serif">
                Dear Parents, Esteemed Teachers, and Aspiring Scholars,
              </h2>
            </div>

            <div className="w-12 h-0.5 bg-[#a22634]" />

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                It gives me profound joy to welcome you to the dynamic learning fraternity of Radha Krishna Public School. In an era characterised by swift technological evolution and shifting global paradigms, the essence of genuine education remains constant: discovering the distinct genius within every child and empowering them to live a life of meaningful impact.
              </p>
              <p>
                At RKPS, education is not an assembly line of memorised facts. It is an experiential odyssey. We have meticulously designed our CBSE curriculum to foster critical reasoning, bilingual eloquence, scientific inquiry, and collaborative creativity. In our classrooms, questions are celebrated, curiosity is rewarded, and mistakes are embraced as indispensable stepping stones toward mastery.
              </p>
              <p>
                Equally fundamental is our dedication to emotional intelligence and moral strength. We want our students to not only score top percentiles in competitive examinations like IIT-JEE, NEET, and CUET, but also to possess the empathy to uplift others, the courage to stand for truth, and the resilience to weather life’s storms with equanimity.
              </p>
              <p>
                To our respected parents: thank you for placing your sacred trust in us. We consider the relationship between the school and home as an unbreakable partnership. To our dearest students: dream audaciously, work diligently, and never underestimate the power of your curiosity.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-base font-bold text-[#0b2a63] heading-serif">
                  Dr. Rupa Tyagi
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Principal, Radha Krishna Public School, Ghaziabad
                </p>
              </div>

              <button
                onClick={onOpenAdmission}
                className="font-bebas inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0b2a63] hover:bg-[#faba28] hover:text-[#0b2a63] text-white text-base sm:text-lg uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

