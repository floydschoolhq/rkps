import React, { useState } from 'react';
import { Award, CheckCircle2, FileText, Calendar, Users, ArrowRight, ShieldCheck, HelpCircle, ChevronDown, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import admHeroImg from '@assets/photos/students-smiling.webp';

export default function AdmissionsPage({ onOpenAdmission }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const steps = [
    {
      num: '01',
      title: 'Online Registration',
      desc: 'Fill out the online admission registration form or visit our campus admissions helpdesk to procure the 2026–27 prospectus.'
    },
    {
      num: '02',
      title: 'Interaction & Aptitude',
      desc: 'Informal student-parent interaction for early years; foundational aptitude assessment for Grades I to X.'
    },
    {
      num: '03',
      title: 'Document Verification',
      desc: 'Submission and verification of birth certificate, previous school report cards, transfer certificate, and scholar photographs.'
    },
    {
      num: '04',
      title: 'Admission Confirmation',
      desc: 'Offer letter issuance and fee deposition to secure the student’s seat for academic session 2026–27.'
    }
  ];

  const eligibility = [
    { grade: 'Nursery', age: '3 to 4 Years', cutoff: 'As of 31st March 2026' },
    { grade: 'Kindergarten (LKG / UKG)', age: '4 to 5 Years', cutoff: 'As of 31st March 2026' },
    { grade: 'Grade I', age: '5 to 6 Years', cutoff: 'As of 31st March 2026' },
    { grade: 'Grades II – X', age: 'Based on previous class TC & CBSE age norms', cutoff: 'Merit in entrance assessment' }
  ];

  const documents = [
    'Original Birth Certificate issued by Municipal Corporation (for Nursery to Grade I)',
    'Transfer Certificate (TC) countersigned by appropriate education authority (Grade II onwards)',
    'Previous year’s final report card / mark sheet from recognized school',
    '4 passport-size photographs of the student and 2 each of both parents / guardians',
    'Aadhar Card copies of the child and parents',
    'Category certificate (SC/ST/OBC) if applicable for official records'
  ];

  const faqs = [
    {
      q: 'What is the admission procedure for mid-session transfers?',
      a: 'Mid-session admissions are subject to vacancy in the respective grade. Parents must provide the previous school TC countersigned by the education department and last term academic report card.'
    },
    {
      q: 'Are transportation facilities available across Ghaziabad and Noida?',
      a: 'Yes, RKPS maintains a dedicated fleet of GPS-monitored, air-conditioned school buses with CCTV surveillance and female attendants covering all major residential corridors in Indirapuram, Vaishali, Vasundhara, Crossing Republik, Noida, and East Delhi.'
    },
    {
      q: 'Which classes does RKPS offer?',
      a: 'RKPS offers Nursery, LKG and UKG, followed by Classes I to X under the CBSE curriculum. Classes XI and XII are not offered.'
    },
    {
      q: 'Does RKPS offer scholarship programs for meritorious students?',
      a: 'Yes, merit-based tuition fee waivers are awarded to students demonstrating exceptional academic distinction in Class X Board Examinations, national sports championships, and NTSE/Olympiad qualifiers.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      
      {/* 1. Modern Architectural Page Hero (MIT/Ravensbourne Style) */}
      <PageHero
        crumbs={[{ label: 'Admissions' }, { label: 'Process & Guidelines' }]}
        kicker="Academic Session 2026–27 • Admissions Open"
        title="Admissions"
        accent="Roadmap & Criteria"
        subtitle="Join the Radha Krishna Public School family. We invite forward-thinking parents and aspiring learners to discover a 25-year tradition of scholastic distinction and holistic character building."
        image={admHeroImg}
      >
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={onOpenAdmission} className="btn-sas">
            Apply Online Now <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/contact" className="btn-sas-ghost">Schedule Campus Walkthrough</Link>
        </div>
      </PageHero>

      {/* 2. Step-by-Step Admission Pathway */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a22634]">Enrolment Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a63] heading-serif mt-1">
            4-Step Admission Journey
          </h2>
          <div className="w-16 h-1 bg-[#a22634] mx-auto mt-3 rounded-full" />
          <p className="text-sm text-slate-600 mt-2 font-normal">
            A seamless, transparent admission protocol designed to understand your child's distinct strengths and aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {steps.map((st, i) => (
            <div key={i} className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <span className="text-4xl font-black text-[#a22634]/30 heading-serif block mb-3 font-sans">
                {st.num}
              </span>
              <h3 className="text-lg font-bold text-[#0b2a63] heading-serif mb-2 group-hover:text-[#0b2a63] transition-colors">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Age Eligibility Matrix (Clean MIT-Style Table) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a22634]">CBSE &amp; State Regulations</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a63] heading-serif mt-1">
              Age Eligibility Criteria (2026–27)
            </h2>
            <div className="w-16 h-1 bg-[#a22634] mx-auto mt-3 rounded-full" />
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#071f4c] text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Grade Level</th>
                  <th className="py-4 px-6 font-bold">Age Requirement</th>
                  <th className="py-4 px-6 font-bold">Cutoff / Admission Norm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {eligibility.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-[#0b2a63]">{row.grade}</td>
                    <td className="py-3.5 px-6 text-slate-700 font-medium">{row.age}</td>
                    <td className="py-3.5 px-6 text-slate-500">{row.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Mandatory Documents Checklist */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071f4c] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#0b2a63]/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#faba28] text-[#0b2a63] flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold heading-serif text-white">
                Mandatory Documentation Checklist
              </h3>
              <p className="text-xs text-slate-300">Please prepare self-attested photocopies along with original documents for verification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#faba28] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (FAQ Accordion) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a22634]">Clarifications</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b2a63] heading-serif mt-1">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#a22634] mx-auto mt-3 rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-xs sm:text-sm text-[#0b2a63] hover:text-[#0b2a63] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
