import React, { useState } from 'react';
import { Eye, X, Compass, ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccordionGallery from '../components/AccordionGallery';
import { STUDENT_VOICES } from '../data/rkpsData';
import exteriorImg from '@assets/Radha Krishna Public School Exterior.webp';
import slide2Img from '@assets/photos/play-area.webp';
import slide3Img from '@assets/slides/3.webp';
import slide4Img from '@assets/photos/trophy-winners.webp';
import slide5Img from '@assets/slides/5.webp';
import schoolBuildingImg from '@assets/photos/school-building.webp';
import libraryImg from '@assets/photos/library.webp';
import smartClassImg from '@assets/photos/smart-classroom.webp';
import classroomImg from '@assets/photos/classroom-senior.webp';
import teacherImg from '@assets/photos/teacher-guidance.webp';
import blackboardImg from '@assets/photos/blackboard-lesson.webp';
import sportsExerciseImg from '@assets/photos/sports-exercise.webp';
import sportsSkippingImg from '@assets/photos/sports-skipping.webp';
import trophyStudentImg from '@assets/photos/trophy-student-1.webp';
import studentsSmilingImg from '@assets/photos/students-smiling.webp';
import PageHero from '../components/ui/PageHero';

// Real RKPS photos only. Add new ones by importing them from src/assets.
const galleryPhotos = [
  {
    id: 1,
    title: 'RKPS Campus, Lal Kuan',
    category: 'campus',
    categoryLabel: 'Campus & Infrastructure',
    image: exteriorImg,
    desc: 'The main school building on NH-9, Lal Kuan, Ghaziabad.'
  },
  {
    id: 2,
    title: 'Pre-Primary Play Area',
    category: 'campus',
    categoryLabel: 'Campus & Infrastructure',
    image: slide2Img,
    desc: 'Our youngest learners enjoying the outdoor play area.'
  },
  {
    id: 3,
    title: 'CBSE Class X Subject Toppers 2025',
    category: 'academics',
    categoryLabel: 'Academics',
    image: slide3Img,
    desc: 'Celebrating our subject toppers in the CBSE Class X board examinations, 2025.'
  },
  {
    id: 4,
    title: 'Award Winners & Their Trophies',
    category: 'sports',
    categoryLabel: 'Sports & Achievements',
    image: slide4Img,
    desc: 'Students with the trophies and medals they brought home for RKPS.'
  },
  {
    id: 5,
    title: "Teacher's Day Honours 2025",
    category: 'cultural',
    categoryLabel: 'Cultural & Events',
    image: slide5Img,
    desc: "Guests and faculty on stage at the Teacher's Day Rashtriya Puraskar Samman Samaroh."
  },
  ...[
    [schoolBuildingImg, 'Main Building Entrance', 'campus', 'Campus & Infrastructure', 'The front of our main building with its arched entrance and stairways.'],
    [libraryImg, 'School Library', 'campus', 'Campus & Infrastructure', 'Book cabinets and reading tables in the school library.'],
    [smartClassImg, 'Smart Classroom Session', 'academics', 'Academics', 'Students following a lesson on the digital display board.'],
    [classroomImg, 'Senior Classroom', 'academics', 'Academics', 'Senior students at work in their classroom.'],
    [teacherImg, 'Personal Guidance', 'academics', 'Academics', 'A teacher guiding students one-on-one during class.'],
    [blackboardImg, 'Lesson at the Blackboard', 'academics', 'Academics', 'Young learners following a lesson at the blackboard.'],
    [sportsExerciseImg, 'Morning Fitness Drill', 'sports', 'Sports & Achievements', 'Students warming up together on the sports turf.'],
    [sportsSkippingImg, 'Skipping in the Courtyard', 'sports', 'Sports & Achievements', 'A student skipping in the school courtyard.'],
    [trophyStudentImg, 'Proud Trophy Winner', 'sports', 'Sports & Achievements', 'A student with the trophy he won for RKPS.'],
    [studentsSmilingImg, 'RKPS Students', 'campus', 'Student Life', 'Students relaxing in the play area.']
  ].map(([image, title, category, categoryLabel, desc], i) => ({ id: 6 + i, image, title, category, categoryLabel, desc })),
  ...STUDENT_VOICES.slice(0, 4).map((v, i) => ({
    id: 16 + i,
    title: 'Student Voices',
    category: 'campus',
    categoryLabel: 'Student Life',
    image: v.poster,
    desc: 'Our students sharing what RKPS means to them.'
  }))
];

const featuredAccordionItems = [
  { image: exteriorImg, label: 'Our Campus', alt: 'RKPS school building', link: '#gallery-grid' },
  { image: slide2Img, label: 'Early Years', alt: 'Pre-primary students in the play area', link: '#gallery-grid' },
  { image: slide4Img, label: 'Achievers', alt: 'Students holding trophies', link: '#gallery-grid' },
  { image: slide5Img, label: "Teacher's Day", alt: "Teacher's Day honours on stage", link: '#gallery-grid' },
  { image: libraryImg, label: 'Library', alt: 'The school library', link: '#gallery-grid' },
  { image: smartClassImg, label: 'Smart Classrooms', alt: 'Students in a smart classroom', link: '#gallery-grid' }
];

export default function GalleryPage({ onOpenAdmission, onOpenVirtualTour }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = activeCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      
      {/* 1. Page header (shared homepage-style hero) */}
      <PageHero
        crumbs={[{ label: 'Campus' }, { label: 'Gallery' }]}
        kicker="Campus Memories & Moments"
        title="Photo &"
        accent="Media Gallery"
        subtitle="Explore glimpses of daily campus life, scientific inquiry, sports achievements, and vibrant celebrations at Radha Krishna Public School."
        image={studentsSmilingImg}
      >
        {onOpenVirtualTour && (
          <button onClick={onOpenVirtualTour} className="btn-sas">
            <Compass className="w-4 h-4" />
            Launch 360° Virtual Campus Tour
          </button>
        )}
      </PageHero>

      {/* 2. Interactive Accordion Showcase (No Outline Frame) */}
      <section className="py-10 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="w-full">
          <AccordionGallery
            items={featuredAccordionItems}
            defaultIndex={0}
            expandRatio={0.54}
            trigger="hover"
            accentColor="#faba28"
            overlayColor="#0b2a63"
            textColor="#ffffff"
            grayscale={false}
            height={520}
            gap={12}
            radius={20}
            tilt={5}
            parallax={0.35}
            duration={0.6}
            showLabels={true}
          />
        </div>
      </section>

      {/* 3. Filter Navigation & Photo Grid */}
      <section id="gallery-grid" className="scroll-mt-28 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'campus', label: 'Campus & Infrastructure' },
            { id: 'academics', label: 'Science & Labs' },
            { id: 'sports', label: 'Sports & Athletics' },
            { id: 'cultural', label: 'Cultural & Arts' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0b2a63] text-white shadow-md scale-105 ring-2 ring-[#a22634]'
                  : 'bg-white text-slate-600 hover:text-[#0b2a63] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              {/* Photo Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-[#0b2a63]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f4c]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-[#0b2a63] shadow">
                  {photo.categoryLabel}
                </span>

                {/* View Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-3 rounded-full bg-[#faba28] text-[#0b2a63] shadow-xl scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Photo Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#0b2a63] heading-serif mb-1 group-hover:text-[#a22634] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {photo.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#a22634] font-bold">
                  <span>Click to expand</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0b2a63] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[75vh] w-full bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#0b2a63] text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#faba28]">
                {selectedPhoto.categoryLabel}
              </span>
              <h2 className="text-xl font-bold heading-serif mt-1">
                {selectedPhoto.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Campus Visit Callout */}
      <section className="py-14 bg-gradient-to-r from-[#0b2a63] via-[#0b2a63] to-[#0b2a63] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black heading-serif mb-3">
            Want to See Our Campus in Person?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto mb-6 font-medium">
            Schedule a personalized campus tour with our admissions coordinators to experience our classes, laboratories, and sports grounds firsthand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAdmission}
              className="font-bebas px-6 py-2.5 rounded-full bg-[#faba28] hover:bg-[#faba28] text-[#0b2a63] text-base sm:text-lg uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              Apply for Admission 2026–27
            </button>
            <Link
              to="/contact"
              className="font-bebas px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base sm:text-lg uppercase tracking-wider transition-all cursor-pointer"
            >
              Book Physical Campus Tour
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
