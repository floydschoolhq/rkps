/**
 * Unified SAS-Style Menu & Search Architecture for Radha Krishna Public School.
 * Connects every page, hash anchor, PDF download, and modal from the complete RKPS site.
 */

export const MENU_TOP_BAR = [
  { label: 'CBSE Disclosure & Downloads', to: '/downloads', icon: 'ShieldCheck' },
  { label: "What's New", action: 'whats-new', icon: 'Bell' },
  { label: 'Apply Online 2026–27', action: 'admission', icon: 'Sparkles' }
];

export const MAIN_MENU_CATEGORIES = [
  {
    id: 'home',
    label: 'Home',
    to: '/',
    subLinks: [
      { label: 'Homepage Overview', to: '/' },
      { label: 'The RKPS Way (Core Pillars)', to: '/#pillars' },
      { label: 'Reasons to Soar with Us', to: '/#why-choose' },
      { label: 'Learning at Every Stage', to: '/#stages' },
      { label: 'Cultivating Exceptional Thinkers', to: '/#beyond' },
      { label: 'Prepared for the Future', to: '/#future' },
      { label: 'Life at RKPS', to: '/#life' },
      { label: 'Quick Admission Enquiry', to: '/#enquiry' }
    ]
  },
  {
    id: 'about',
    label: 'About Us',
    to: '/school-legacy',
    subLinks: [
      { label: 'School Legacy & Ethos (Est. 2004)', to: '/school-legacy' },
      { label: 'Vision & Mission', to: '/vision-mission' },
      { label: "Principal's Desk", to: '/principals-desk' },
      { label: "Director's Desk", to: '/directors-desk' },
      { label: 'The RKPS Way', to: '/#pillars' },
      { label: 'Why Families Choose RKPS', to: '/#why-choose' },
      { label: 'Mandatory Public Disclosure', to: '/downloads' }
    ]
  },
  {
    id: 'admissions',
    label: 'Admissions',
    to: '/admissions',
    subLinks: [
      { label: 'Admission Process 2026–27', to: '/admissions' },
      { label: 'Apply Online (Instant Form)', action: 'admission' },
      { label: 'Schedule a Campus Visit', action: 'visit' },
      { label: 'Fee Structure 2026–27 (PDF)', href: '/fee-structure.pdf', external: true },
      { label: 'Quick Admission Enquiry', to: '/#enquiry' },
      { label: 'Contact Admissions Desk', to: '/contact' }
    ]
  },
  {
    id: 'academics',
    label: 'Academics',
    to: '/#stages',
    subLinks: [
      { label: 'Pre-Primary Wing (Play–UKG)', to: '/#stages' },
      { label: 'Primary School (Grades I–V)', to: '/#stages' },
      { label: 'Middle School (Grades VI–VIII)', to: '/#stages' },
      { label: 'Secondary & Sr. Secondary (IX–XII)', to: '/#stages' },
      { label: 'CBSE Curriculum & Syllabus', to: '/downloads#curriculum' },
      { label: 'Exam Datesheet & Schedules', to: '/downloads#datesheet' }
    ]
  },
  {
    id: 'facilities',
    label: 'Facilities',
    to: '/facilities',
    subLinks: [
      { label: '12-Acre Campus Overview', to: '/facilities' },
      { label: 'Smart Digitized Classrooms', to: '/facilities#classrooms' },
      { label: 'Science, AI & Robotics Labs', to: '/facilities#labs' },
      { label: 'Grand Central Knowledge Library', to: '/facilities#library' },
      { label: 'Olympic Sports Arena & Grounds', to: '/facilities#ground' },
      { label: 'Interactive Virtual Campus Tour', action: 'virtual-tour' }
    ]
  },
  {
    id: 'co-curriculars',
    label: 'Co-Curriculars',
    to: '/#beyond',
    subLinks: [
      { label: 'Activities, Sports & Yoga', to: '/#beyond' },
      { label: 'Experiential STEM Learning', to: '/#beyond' },
      { label: 'Service Learning & Values', to: '/#beyond' },
      { label: 'Campus Photo & Video Gallery', to: '/gallery' }
    ]
  },
  {
    id: 'community',
    label: 'Community & Portals',
    to: '/contact',
    subLinks: [
      { label: 'Graduates & CBSE Toppers', to: '/#future' },
      { label: 'Parent Voices & Testimonials', to: '/#future' },
      { label: 'Parent ERP Portal Login', action: 'erp-parent' },
      { label: 'Student Login Portal', action: 'erp-student' },
      { label: 'Faculty / Staff Portal', action: 'erp-staff' },
      { label: 'Contact & Campus Directions', to: '/contact' }
    ]
  },
  {
    id: 'downloads',
    label: 'Downloads',
    to: '/downloads',
    subLinks: [
      { label: 'All Academic Downloads', to: '/downloads' },
      { label: 'CBSE Curriculum Syllabus', to: '/downloads#curriculum' },
      { label: 'Examination Datesheets', to: '/downloads#datesheet' },
      { label: 'Fee Structure Document (PDF)', href: '/fee-structure.pdf', external: true }
    ]
  }
];

export const MENU_BOTTOM_TILES = [
  { label: 'Admissions', to: '/admissions', icon: 'GraduationCap' },
  { label: 'Downloads', to: '/downloads', icon: 'FileText' },
  { label: 'Virtual Tour', action: 'virtual-tour', icon: 'Compass' },
  { label: 'Contact Us', to: '/contact', icon: 'MapPin' }
];

export const PORTAL_LINKS = [
  { label: 'Parent ERP Login', desc: 'Attendance, fees & report cards', action: 'erp-parent' },
  { label: 'Student Login Portal', desc: 'Assignments, syllabus & exams', action: 'erp-student' },
  { label: 'Faculty & Staff Login', desc: 'Academic & SEVA dashboard', action: 'erp-staff' },
  { label: 'Downloads & Disclosures', desc: 'CBSE syllabus, datesheets & PDFs', to: '/downloads' }
];

export const SEARCH_TOP_BAR = [
  { label: 'Admissions 2026–27', to: '/admissions', icon: 'GraduationCap' },
  { label: 'Virtual Tour', action: 'virtual-tour', icon: 'Compass' },
  { label: 'Schedule a Visit', action: 'visit', icon: 'Calendar' },
  { label: 'Apply Now', action: 'admission', icon: 'Sparkles' }
];

export const POPULAR_SEARCHES = [
  { label: 'What is the admission process for 2026–27?', to: '/admissions' },
  { label: 'Where can I view or download the Fee Structure?', href: '/fee-structure.pdf', external: true },
  { label: 'How do I log in to the Parent / Student ERP Portal?', action: 'erp-parent' },
  { label: 'What science, AI & robotics labs does RKPS offer?', to: '/facilities#labs' },
  { label: 'Where can I download CBSE Curriculum & Exam Datesheets?', to: '/downloads#curriculum' },
  { label: "Read the Principal's and Director's Messages", to: '/principals-desk' },
  { label: 'How do I book a campus visit or contact the school?', action: 'visit' }
];

export const SEARCH_QUICK_LINKS = [
  { label: 'Admissions Roadmap', to: '/admissions' },
  { label: 'School Legacy & Ethos', to: '/school-legacy' },
  { label: 'Vision & Mission', to: '/vision-mission' },
  { label: '12-Acre Facilities', to: '/facilities' },
  { label: 'Photo Gallery', to: '/gallery' },
  { label: 'Academic Downloads', to: '/downloads' },
  { label: 'Contact & Directions', to: '/contact' }
];

/**
 * Full searchable index used by the live Search Overlay input.
 */
export const SEARCH_INDEX = [
  { title: 'Home — Radha Krishna Public School', category: 'Page', keywords: 'home main landing rkps ghaziabad cbse', to: '/' },
  { title: 'Admission Process 2026–27', category: 'Admissions', keywords: 'admission process apply age criteria eligibility seats registration', to: '/admissions' },
  { title: 'Apply Online (Instant Admission Form)', category: 'Action', keywords: 'apply online form register admission 2026 2027', action: 'admission' },
  { title: 'Schedule a Campus Tour / Visit Us', category: 'Action', keywords: 'visit tour walkthrough campus appointment book', action: 'visit' },
  { title: 'Fee Structure 2026–27 (PDF)', category: 'Download', keywords: 'fee fees structure tuition pdf charges', href: '/fee-structure.pdf', external: true },
  { title: 'School Legacy & Heritage (Est. 2004)', category: 'About Us', keywords: 'legacy history founded 2004 silver jubilee milestones ethos', to: '/school-legacy' },
  { title: 'Vision & Mission', category: 'About Us', keywords: 'vision mission values nep 2020 philosophy', to: '/vision-mission' },
  { title: "Principal's Desk — Leadership Message", category: 'Leadership', keywords: 'principal message desk rupa tyagi monika sharma', to: '/principals-desk' },
  { title: "Director's Desk — Founder Vision", category: 'Leadership', keywords: 'director founder message satish yadav governance', to: '/directors-desk' },
  { title: '12-Acre Campus & Facilities', category: 'Facilities', keywords: 'campus infrastructure facilities auditorium library labs ground', to: '/facilities' },
  { title: 'Smart Digitized Classrooms', category: 'Facilities', keywords: 'smart classrooms ifpd digital interactive board', to: '/facilities#classrooms' },
  { title: 'Science, AI & Robotics Tinkering Labs', category: 'Facilities', keywords: 'science physics chemistry biology ai robotics atal tinkering lab stem', to: '/facilities#labs' },
  { title: 'Grand Central Knowledge Library', category: 'Facilities', keywords: 'library books kindle reading periodicals volumes', to: '/facilities#library' },
  { title: 'Olympic Sports Arena & Grounds', category: 'Facilities', keywords: 'sports cricket basketball football taekwondo yoga ground athletics', to: '/facilities#ground' },
  { title: 'Interactive Virtual Campus Tour', category: 'Action', keywords: 'virtual tour 360 campus spots photos', action: 'virtual-tour' },
  { title: 'Academic Downloads & Mandatory Disclosure', category: 'Downloads', keywords: 'downloads pdf syllabus curriculum datesheet mandatory disclosure cbse', to: '/downloads' },
  { title: 'CBSE Curriculum & Syllabus', category: 'Downloads', keywords: 'cbse curriculum syllabus science commerce humanities', to: '/downloads#curriculum' },
  { title: 'Examination Datesheets & Schedules', category: 'Downloads', keywords: 'exam datesheet schedule calendar timetable', to: '/downloads#datesheet' },
  { title: 'Campus Photo & Media Gallery', category: 'Gallery', keywords: 'gallery photos pictures events sports annual day', to: '/gallery' },
  { title: 'Parent ERP Portal Login', category: 'Portal', keywords: 'erp login parent portal attendance report card fee payment', action: 'erp-parent' },
  { title: 'Student Login Portal', category: 'Portal', keywords: 'student portal login homework syllabus', action: 'erp-student' },
  { title: 'Faculty & SEVA Portal Login', category: 'Portal', keywords: 'faculty staff teacher seva portal login', action: 'erp-staff' },
  { title: 'Contact Us & Campus Map', category: 'Contact', keywords: 'contact phone email address lal kuan pratap vihar ghaziabad map location', to: '/contact' },
  { title: 'Learning Stages (Pre-Primary to Secondary)', category: 'Academics', keywords: 'pre primary nursery lkg ukg middle secondary stages wings', to: '/#stages' },
  { title: 'Cultivating Exceptional Thinkers (Co-Curriculars)', category: 'Student Life', keywords: 'co-curriculars clubs experiential service learning activities music dance', to: '/#beyond' },
  { title: 'CBSE Board Toppers & Alumni Voices', category: 'Results', keywords: 'toppers alumni results board iit srcc stephens parents testimonial', to: '/#future' }
];
