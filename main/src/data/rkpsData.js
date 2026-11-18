// Import media assets from shared repository
import slide1Video from '@assets/slides/1.mp4';
import slide2Img from '@assets/photos/play-area.webp';
import slide3Img from '@assets/slides/3.webp';
import slide4Img from '@assets/photos/trophy-winners.webp';
import slide5Img from '@assets/slides/5.webp';
import principalImg from '@assets/photos/principal-rupa-tyagi.webp';
import directorImg from '@assets/photos/director.webp';
import exteriorImg from '@assets/Radha Krishna Public School Exterior.webp';
import admissionsStudentsImg from '@assets/photos/students-smiling.webp';
import logoImg from '@assets/logo.jpg';
import topper_anusha_pandey from '@assets/toppers/anusha-pandey.webp';
import topper_vidhi_gaur from '@assets/toppers/vidhi-gaur.webp';
import topper_pranav_pratap_singh from '@assets/toppers/pranav-pratap-singh.webp';
import topper_himani_bhardwaj from '@assets/toppers/himani-bhardwaj.webp';
import topper_aryan_yadav from '@assets/toppers/aryan-yadav.webp';
import topper_ashu_sharma from '@assets/toppers/ashu-sharma.webp';

export const SCHOOL_INFO = {
  name: "Radha Krishna Public School",
  tagline: "Quality Education for All",
  founded: "2004",
  yearsOfExcellence: "20+",
  affiliation: "Affiliated to CBSE, New Delhi (Affiliation Code: 2132212 / 2130572)",
  principal: "Dr. Rupa Tyagi",
  director: "Dr. Satish Yadav",
  campusAddresses: [
    {
      label: "Main Campus",
      address: "NH-9, Lal Kuan, Ghaziabad, Uttar Pradesh 201001"
    },
    {
      label: "City Wing",
      address: "Sector-11, Pratap Vihar, Ghaziabad, Uttar Pradesh 201009"
    }
  ],
  phones: ["9810624925", "9315099591", "9310300600", "+91 9718080400"],
  email: "rkps.gzb@gmail.com",
  socials: {
    facebook: "https://facebook.com/rkpsgzb",
    instagram: "https://instagram.com/rkpsgzb",
    youtube: "https://youtube.com/@rkpsgzb",
    linkedin: "https://linkedin.com/school/rkpsgzb"
  }
};

export const HERO_SLIDES = [
  {
    type: "video",
    src: slide1Video,
    title: "EDUCATION FOR ALL",
    kicker: "RADHA KRISHNA PUBLIC SCHOOL",
    subtitle: "CBSE-affiliated excellence, personalized care, and holistic growth for over 2,500 scholars across Ghaziabad.",
    cta1: "ADMISSIONS",
    cta2: "ACADEMICS"
  },
  {
    type: "image",
    src: slide2Img,
    title: "EXTRAORDINARY CARE",
    kicker: "NURTURING VALUES",
    subtitle: "A supportive sanctuary where every child is understood, mentored, and empowered to reach their highest potential.",
    cta1: "ADMISSIONS",
    cta2: "ACADEMICS"
  },
  {
    type: "image",
    src: slide3Img,
    title: "LOVE, JOY, FAITH",
    kicker: "HOLISTIC DEVELOPMENT",
    subtitle: "Balancing academic rigor with performing arts, sports academies, and lifelong character building.",
    cta1: "ADMISSIONS",
    cta2: "ACADEMICS"
  },
  {
    type: "image",
    src: slide4Img,
    title: "20 YEARS OF EXCELLENCE",
    kicker: "LEGACY SINCE 2004",
    subtitle: "Two decades of scholastic leadership, board merit distinctions, and competitive entrance triumphs.",
    cta1: "ADMISSIONS",
    cta2: "ACADEMICS"
  }
];

export const CORE_PILLARS = [
  {
    title: "QUALITY LEARNING",
    badge: "EXCELLENCE",
    desc: "CBSE academics in a stress-free setting that encourages creativity, conceptual clarity, and critical thinking with personalized teacher mentorship."
  },
  {
    title: "EVERY CHILD VALUED",
    badge: "EXTRAORDINARY CARE",
    desc: "A friendly school where each student is understood, valued, and given individual attention to foster self-confidence and moral integrity."
  },
  {
    title: "BEYOND THE CLASSROOM",
    badge: "POSSIBILITIES",
    desc: "Equal attention to athletics, yoga, music, dance, art and craft, abacus, and Vedic mathematics alongside traditional academic disciplines."
  }
];

export const WHY_CHOOSE_TABS = [
  {
    id: "EDUCATORS",
    tabLabel: "Educators",
    tag: "EDUCATORS",
    kicker: "OUR EDUCATORS",
    title: "TEACHERS WHO RAISE THE STANDARD",
    desc: "Led by Principal Dr. Rupa Tyagi, RKPS teachers focus on the academic growth and holistic well-being of every child through dedicated classroom mentoring and continuous innovation.",
    image: principalImg,
    stats: [
      { num: "100+", label: "Teachers & Mentors", icon: "GraduationCap" },
      { num: "8.5", label: "Avg Years Experience", icon: "Clock" },
      { num: "85%", label: "Post-Graduate Qualified", icon: "Award" },
      { num: "50+", label: "Annual Training Sessions", icon: "Users" }
    ]
  },
  {
    id: "COMMUNITY",
    tabLabel: "Community",
    tag: "COMMUNITY",
    kicker: "OUR COMMUNITY",
    title: "OVER TWO DECADES OF FAMILIES",
    desc: "Since 2004, RKPS has served families across Lal Kuan, Pratap Vihar, and Greater Ghaziabad. Parents and teachers work hand-in-hand through transparent communication and school events.",
    image: admissionsStudentsImg,
    stats: [
      { num: "15,000+", label: "Distinguished Alumni", icon: "GraduationCap" },
      { num: "2,000+", label: "Active Families", icon: "Users" },
      { num: "200+", label: "Parent Volunteers", icon: "Heart" },
      { num: "40+", label: "Annual Celebrations", icon: "Sparkles" }
    ]
  },
  {
    id: "FACILITIES",
    tabLabel: "Facilities",
    tag: "FACILITIES",
    kicker: "OUR CAMPUS",
    title: "SPACES BUILT FOR LEARNING",
    desc: "A rich learning environment equipped with modern digital smart classes, science laboratories, computer labs, an expansive library, sports grounds, yoga studio, and activity arenas.",
    image: exteriorImg,
    stats: [
      { num: "11", label: "Specialized Facility Areas", icon: "Building2" },
      { num: "20,000+", label: "Library Books & Resources", icon: "BookOpen" },
      { num: "5", label: "Advanced Science & STEM Labs", icon: "Microscope" },
      { num: "4", label: "Sports & Athletics Arenas", icon: "Trophy" }
    ]
  },
  {
    id: "HISTORY",
    tabLabel: "History",
    tag: "HISTORY",
    kicker: "OUR HISTORY",
    title: "A LEGACY SINCE 2004",
    desc: "Radha Krishna Public School began in 2004 and is proudly affiliated with the Central Board of Secondary Education, New Delhi. It has steadily grown with the families and aspirations of Ghaziabad.",
    image: directorImg,
    stats: [
      { num: "2004", label: "Founded with Quality Vision", icon: "Calendar" },
      { num: "100%", label: "CBSE Board Pass Record", icon: "CheckCircle2" },
      { num: "CBSE", label: "Affiliation #2132212 / 2130572", icon: "ShieldCheck" },
      { num: "20+", label: "Years of Scholastic Growth", icon: "Award" }
    ]
  },
  {
    id: "STUDENTS",
    tabLabel: "Students",
    tag: "STUDENTS",
    kicker: "OUR STUDENTS",
    title: "A FULL STUDENT LIFE",
    desc: "Students from Playgroup to Class X engage in challenging classroom curricula while actively taking part in sports, martial arts, abacus, Vedic mathematics, and performing arts.",
    image: slide3Img,
    stats: [
      { num: "14", label: "Classes (Play to Class X)", icon: "BookOpen" },
      { num: "2,500+", label: "Enrolled Scholars", icon: "Users" },
      { num: "4", label: "Houses & Activity Guilds", icon: "Shield" },
      { num: "30+", label: "Co-Curricular Activities", icon: "Trophy" }
    ]
  }
];

export const LEARNING_STAGES = [
  {
    id: "pre-primary",
    label: "Pre Primary",
    stageName: "Pre Primary Years",
    ageRange: "Play, Nursery, LKG & UKG • Ages 3–5",
    desc: "A calm, structured first step into school. Children build early language fluency, phonics, number sense, and social skills in a safe, play-way, and well-supervised setting.",
    btnText: "LEARN MORE ABOUT PRE PRIMARY",
    image: slide5Img,
    highlights: ["Sensory Discovery & Motor Skills", "Montessori Play-way Routines", "Phonics, Rhymes & Story Circles"]
  },
  {
    id: "primary",
    label: "Primary",
    stageName: "Primary School",
    ageRange: "Classes I to V • Ages 6–10",
    desc: "Strong foundations in reading, writing, and mathematics, taught with clear routines, interactive smartboards, and regular feedback to parents.",
    btnText: "LEARN MORE ABOUT PRIMARY SCHOOL",
    image: slide2Img,
    highlights: ["Mental Math & Bilingual Literacy", "Environmental Science Investigations", "Abacus & Computer Basics"]
  },
  {
    id: "middle",
    label: "Middle",
    stageName: "Middle School",
    ageRange: "Classes VI to VIII • Ages 11–13",
    desc: "Subjects deepen and expectations rise. Students learn to study independently with hands-on composite science labs while teachers track conceptual progress closely.",
    btnText: "LEARN MORE ABOUT MIDDLE SCHOOL",
    image: slide3Img,
    highlights: ["Physics, Chemistry & Biology Labs", "Advanced Problem Solving", "Inter-House Debates & Athletics"]
  },
  {
    id: "secondary",
    label: "Secondary",
    stageName: "Secondary School",
    ageRange: "Classes IX & X • Ages 14–16",
    desc: "Focused CBSE preparation with careful subject guidance, structured mock assessments, and steady academic and career support through the milestone board years.",
    btnText: "LEARN MORE ABOUT SECONDARY SCHOOL",
    image: slide4Img,
    highlights: ["Board Examination Mastery", "Regular Revision & Diagnostic Tests", "Personalized Mentor Guidance"]
  }
];

export const BEYOND_CLASSROOM_TABS = [
  {
    id: "co-curriculars",
    label: "Co-Curriculars",
    title: "CO-CURRICULARS",
    desc: "Our co-curricular program encourages character development through unique and rewarding experiences. Students learn to collaborate, take risks, and persevere. Our scholars gain a deeper understanding and appreciation of themselves and others through athletics, martial arts, music, dance, and Vedic mathematics.",
    cta: "MORE ABOUT CO-CURRICULARS",
    primaryImage: slide4Img,
    secondaryImage: admissionsStudentsImg
  },
  {
    id: "experiential",
    label: "Experiential Learning",
    title: "EXPERIENTIAL LEARNING",
    desc: "Hands-on discovery brings textbook principles into vivid life. Through our Atal Tinkering Lab, microclimate botanical study, interactive planetarium visits, and regional field trips, students develop critical inquiry and scientific temperament.",
    cta: "MORE ABOUT EXPERIENTIAL LEARNING",
    primaryImage: exteriorImg,
    secondaryImage: slide2Img
  },
  {
    id: "service",
    label: "Service Learning",
    title: "SERVICE LEARNING",
    desc: "Ethical leadership and community compassion are foundational at RKPS. Scholars lead cleanliness drives, environmental sapling plantations, and literacy outreach, understanding their vital civic duty to society and nation.",
    cta: "MORE ABOUT SERVICE LEARNING",
    primaryImage: slide3Img,
    secondaryImage: slide5Img
  }
];

// Real RKPS results, taken from the "Subject Toppers (Xth) CBSE 2025" banner (assets/slides/3.png).
// Photos are cropped from that banner into assets/toppers/. Add a student's own words in
// `quote` only if they have actually given one; an empty quote is simply not shown.
export const ALUMNI_TOPPERS = [
  {
    id: "anusha-pandey",
    name: "ANUSHA PANDEY",
    classYear: "CBSE Class X, 2025",
    score: "98/100",
    stream: "Subject Topper",
    highlight: "Top in Science (98) & English (91)",
    tenure: "RKPS Subject Topper 2025",
    quote: "",
    story: "Anusha Pandey was the RKPS subject topper in Science and English in the CBSE Class X board examinations 2025, scoring 98/100 in Science and 91/100 in English.",
    image: topper_anusha_pandey
  },
  {
    id: "vidhi-gaur",
    name: "VIDHI GAUR",
    classYear: "CBSE Class X, 2025",
    score: "94/100",
    stream: "Subject Topper",
    highlight: "Top in Hindi",
    tenure: "RKPS Subject Topper 2025",
    quote: "",
    story: "Vidhi Gaur was the RKPS subject topper in Hindi in the CBSE Class X board examinations 2025, scoring 94/100.",
    image: topper_vidhi_gaur
  },
  {
    id: "pranav-pratap-singh",
    name: "PRANAV PRATAP SINGH",
    classYear: "CBSE Class X, 2025",
    score: "96/100",
    stream: "Subject Topper",
    highlight: "Top in Social Science",
    tenure: "RKPS Subject Topper 2025",
    quote: "",
    story: "Pranav Pratap Singh was the RKPS subject topper in Social Science in the CBSE Class X board examinations 2025, scoring 96/100.",
    image: topper_pranav_pratap_singh
  },
  {
    id: "himani-bhardwaj",
    name: "HIMANI BHARDWAJ",
    classYear: "CBSE Class X, 2025",
    score: "92/100",
    stream: "Subject Topper",
    highlight: "Top in IT / AI",
    tenure: "RKPS Subject Topper 2025",
    quote: "",
    story: "Himani Bhardwaj was the RKPS subject topper in IT / AI in the CBSE Class X board examinations 2025, scoring 92/100.",
    image: topper_himani_bhardwaj
  },
  {
    id: "aryan-yadav",
    name: "ARYAN YADAV",
    classYear: "CBSE Class X, 2025",
    score: "86/100",
    stream: "Subject Topper",
    highlight: "Top in Maths (Basic)",
    tenure: "RKPS Subject Topper 2025",
    quote: "",
    story: "Aryan Yadav was the RKPS subject topper in Mathematics (Basic) in the CBSE Class X board examinations 2025, scoring 86/100.",
    image: topper_aryan_yadav
  },
  {
    id: "ashu-sharma",
    name: "ASHU SHARMA",
    classYear: "CBSE Class X, 2025",
    score: "81/100",
    stream: "Subject Topper",
    highlight: "Top in Maths (Standard)",
    tenure: "RKPS Subject Topper 2025",
    quote: "",
    story: "Ashu Sharma was the RKPS subject topper in Mathematics (Standard) in the CBSE Class X board examinations 2025, scoring 81/100.",
    image: topper_ashu_sharma
  }
];

export const PARENT_TESTIMONIALS = [
  {
    parent: "Kanika Pandey",
    role: "Parent of Grade IV Student",
    text: "Praises the cooperative staff and management, and the extra effort teachers put into her daughter's holistic growth and moral values."
  },
  {
    parent: "Rajesh & Sunita Verma",
    role: "Parents of Grade X Scholar",
    text: "The dedicated faculty guidance and regular revision tests gave our child the confidence to excel in board examinations."
  },
  {
    parent: "Amitabh Srivastava",
    role: "Parent of Grade VII Student",
    text: "RKPS provides a wonderful balance of rigorous academics, yoga, and sports. The teachers truly care about every child."
  }
];

export const COLLEGE_MARQUEE = [
  "IIT DELHI",
  "AIIMS NEW DELHI",
  "SRCC DELHI UNIVERSITY",
  "ST. STEPHEN'S COLLEGE",
  "DELHI TECHNOLOGICAL UNIVERSITY (DTU)",
  "NIT ALLAHABAD",
  "BITS PILANI",
  "NATIONAL DEFENCE ACADEMY (NDA)",
  "100% CBSE BOARD RESULTS"
];

export const CAMPUS_STORIES = [
  {
    title: "Annual Sports Championship & Yoga Showcase",
    tag: "Athletics",
    img: slide4Img
  },
  {
    title: "Science & Robotics Innovation Exhibition",
    tag: "STEM & Labs",
    img: slide2Img
  },
  {
    title: "Cultural Heritage & Annual Day Celebrations",
    tag: "Performing Arts",
    img: slide3Img
  },
  {
    title: "Pre-Primary Sensory & Nature Exploration",
    tag: "Early Years",
    img: slide5Img
  },
  {
    title: "Digital Smart Classroom Interactive Session",
    tag: "Academics",
    img: admissionsStudentsImg
  },
  {
    title: "Campus Botanical Garden Ecological Field Study",
    tag: "Environment",
    img: exteriorImg
  }
];

// Student testimonial reels in /public/videos (portrait 9:16), used by the
// "What's your story?" slider and the Students tab in "Reasons to soar".
// TODO: replace the placeholder titles with each student's name or quote.
export const STUDENT_VOICES = [
  "20261004212448",
  "20261004215809",
  "20261004220635",
  "20261004221458",
  "20261004222631"
].map((stamp, i) => ({
  title: `Student Story ${String(i + 1).padStart(2, "0")}`,
  src: `/videos/lv_0_${stamp}.mp4`,
  poster: `/videos/lv_0_${stamp}.jpg`
}));

// Cards for the "Beyond the classroom" facts slider (SAS panel-5 .facts-slider).
export const BEYOND_FACTS = [
  { kicker: "STEM", title: "Atal Tinkering Lab", desc: "Hands-on building, coding and robotics that turn textbook principles into working projects." },
  { kicker: "Athletics", title: "Sports & Yoga", desc: "Daily physical education, yoga and an annual sports championship for every age group." },
  { kicker: "Performing Arts", title: "Music & Dance", desc: "Vocal, instrumental and classical dance training that builds stage confidence." },
  { kicker: "Creative Arts", title: "Art & Craft", desc: "Studio time for drawing, painting and craft that nurtures imagination and fine motor skills." },
  { kicker: "Mental Maths", title: "Abacus & Vedic Maths", desc: "Speed-calculation methods that sharpen concentration and number sense." },
  { kicker: "Experiential", title: "Field Trips & Planetarium", desc: "Regional excursions, planetarium visits and botanical study that take learning outdoors." }
];
