import React from 'react';
import { Quote, CheckCircle2, Mail, ArrowRight, ChevronRight, Landmark, ShieldCheck, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import directorImg from '@assets/photos/director.webp';
import PageHero from '../components/ui/PageHero';

export default function DirectorsDeskPage({ onOpenAdmission }) {
  return (
    <div className="bg-slate-100/70 text-slate-800 min-h-screen">
      
      {/* 1. Page header (shared homepage-style hero) */}
      <PageHero
        crumbs={[{ label: 'Leadership' }, { label: "Director's Desk" }]}
        kicker="Office of the Managing Director"
        title="From the"
        accent="Director's Desk"
        subtitle="“Education is the most powerful weapon which you can use to change the world.” Guiding RKPS across 25 years with unwavering dedication to academic brilliance and character building."
        image={directorImg}
      />

      {/* 2. Main Address Showcase */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Director Card & Credentials Dossier */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0b2a63]" />

              <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#0b2a63] mb-6 shadow-md border border-slate-200/80">
                <img
                  src={directorImg}
                  alt="Dr. Satish Yadav"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-[#a22634] uppercase tracking-widest block mb-1">
                  Founder &amp; Managing Trustee
                </span>
                <h2 className="text-2xl font-black text-[#0b2a63] heading-serif">
                  Dr. Satish Yadav
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  Managing Director, Radha Krishna Public School
                </p>
                <p className="text-xs text-slate-500 font-medium pt-1">
                  28+ Years in Educational Governance &amp; Philanthropic Scholarship
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>Pioneer of Inclusive &amp; Affordable Quality Education</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>Architect of Modern 12-Acre Smart Infrastructure</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#a22634] shrink-0" />
                  <span>Champion for Merit &amp; Needs-Based Academic Scholarships</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="font-bebas w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#0b2a63] hover:bg-[#a22634] text-white text-base sm:text-lg uppercase tracking-wider transition-all shadow-md text-center"
                >
                  <Mail className="w-4 h-4 text-[#faba28]" />
                  <span>Connect with Director's Office</span>
                </Link>
              </div>
            </div>

            {/* Quote Callout (Ivory Stationery Card) */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-[#a22634]/80 shadow-xs relative">
              <Quote className="w-8 h-8 text-[#a22634]/30 absolute top-4 right-4" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic relative z-10">
                “When we established this school 25 years ago, our sacred vow was that no child should ever lack the opportunity to shine. That pledge remains our greatest inspiration today.”
              </p>
            </div>
          </div>

          {/* Right: Full Director's Letter (Editorial Stationery) */}
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
                Dear Parents, Well-Wishers, and the RKPS Family,
              </h2>
            </div>

            <div className="w-12 h-0.5 bg-[#a22634]" />

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                It is with immense humility, gratitude, and pride that I welcome you to Radha Krishna Public School. Over the past 25 years, what began as a humble commitment to value-centric schooling in Ghaziabad has blossomed into one of the region’s most distinguished centers of academic, sporting, and cultural excellence.
              </p>
              <p>
                Our philosophy has always rested upon a singular conviction: an educational institution is not merely steel and concrete—it is a sacred cradle of human potential. Every classroom, laboratory, cricket net, and auditorium at RKPS was conceived with the explicit objective of providing our students with world-class facilities on par with the finest schools nationally.
              </p>
              <p>
                Yet, alongside state-of-the-art AI laboratories and Olympic-standard sports grounds, our paramount focus remains on character, modesty, and social conscience. In a world where technical expertise is abundant, the virtues of empathy, truthfulness, civic duty, and respect for our elders are what truly distinguish great leaders.
              </p>
              <p>
                As we step forward into our Silver Jubilee era, we rededicate ourselves to pushing the frontiers of innovation while holding fast to our foundational heritage. I invite all prospective families to visit our lush green campus and witness the joy and intellectual vitality of our students firsthand.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-base font-bold text-[#0b2a63] heading-serif">
                  Dr. Satish Yadav
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Founder &amp; Managing Director, Radha Krishna Public School, Ghaziabad
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

