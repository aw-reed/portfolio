import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { createPortal } from "react-dom";
import { 
  FolderClosed, Briefcase, User, Wrench, GraduationCap, Star, 
  FileText, Phone, Mail, Code2, Award, BookOpen, Cpu, Server, Github,
  Linkedin, Globe, Image as ImageIcon, ExternalLink, ChevronRight, X, Minus,
  ChevronLeft, ChevronDown, ChevronUp, Search, Moon, Sun, Zap, Play, Pause
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const THEME_STORAGE_KEY = "portfolio_theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  return prefersLight ? "light" : "dark";
}

// ------------------------------ CONTENT DATA ------------------------------
const ANDREW = {
  name: "Andrew Reed",
  title: "Class of 2025",
  location: "Los Angeles, CA",
  email: "reedandrew10@icloud.com",
  phone: "Phone Number Available in Application",
  github: "https://github.com/aw-reed",
  linkedin: "https://www.linkedin.com/in/andrew-walter-reed/",
  summary: `Computer Science & Engineering graduate from the University of California, Merced with hands-on experience across full‑stack web development, software engineering, data analysis, data collection and marketing. I enjoy shipping polished, user‑friendly tools and telling the story with clean UI, clear metrics, and documented code. I also have a passion for marketing making high quality posts, custom graphics, filiming content, conducting photoshoots and editing photos to look polished.`,
};

const EXPERIENCE = [
  {
    company: "Careful Security",
    role: "Marketing & Web Development Intern",
    period: "September 2025 - December 2025",
    bullets: [
      "Boosted LinkedIn brand engagement by 20% by creating and daily cybersecurity-focused content, including thought leadership posts, carousels, and digital campaigns using Adobe Creative Suite, Canva, and AI-powered content tools.",
      "Strengthened client retention and outreach by developing monthly email newsletters distributed to 500+ subscribers, driving continued engagement and repeat inquiries for cybersecurity services.",
      "Developed and maintained the company website, improving site performance, optimizing content strategy, and enhancing the user experience for both prospective and existing clients."
    ],
  },
  {
    company: "Office of Student Involvement at University of California, Merced",
    role: "Marketing, Assessment, Website & Data Lead",
    period: "August 2022 – August 2025",
    photo: "https://i.imgur.com/AGZEJeg.jpeg",
    bullets: [
      "In charge of Instagram marketing calendar which increased average amount of likes by 150+ per post via social media data analysis using platforms such as SocialPilot.",
      "Oversaw the creation of the Bobcat 411, UC Merced's biggest newsletter which spotlights clubs, departments, and events happening on campus every month.",
      "Conducted both solo and group photoshoots of clubs and organizations with quick photo editing using Adobe Lightroom.",
      "Created, designed flyers, filmed reels and approved final creative choices using Canva, CapCut and Adobe Illustrator; ensured brand consistency across all channels.",
      "Analyzed student involvement data such as event attendance, ASUCM election voters, etc. using platforms such as UC Merced's CatLife and Qualtrics XM. I also sent out surveys to event attendees to study how events could be done better creating recommendations based on real student feedback.",
      "Designed and revamped OSI's websites including the OSI, RCO, FSL, ASUCM and CAB websites using Drupal, Wix, HTML and CSS.",
      "Created UC Merced's Impact Report which is viewed by administrators and the public which showcases all the data regarding student involvement. Data includes how many attendees CAB events had, how much money FSL raised for philanthropies, and how many cases the Law Clinic dealt with in the past academic year."
    ],
  },
  {
    company: "University Tees",
    role: "Campus Manager",
    period: "August 2024 – May 2025",
    photo: "https://i.imgur.com/dkmZN7Z.png",
    bullets: [
      "Reached over $5K in sales pitching University Tees to be the main apparel provider for clubs and organizations at UC Merced.",
      "Directly worked with University Tees designers to create desired custom apparel for my clients including Alpha Kappa Psi, Campus Activities Board, Kappa Kappa Gamma and Nigerian Student Association",
      "Note: Greek House and University Tees merged companies which led to my new position into University Tees. Also, Black Shirts are a University Tees product."
    ],
  },
  {
    company: "The Diplomacy Lab at U.S. Department of State",
    role: "Software Engineer Intern",
    period: "August 2024 – December 2024",
    photo: "https://i.imgur.com/nrKcN8A.jpeg",
    bullets: [
      "Created a private custom application titled the Programming Assessment Scheduling Calendar within a team of 5 to automate the process for Training Specialists to automatically schedule progress assessments for newly recruited U.S. Diplomats. They must take a 24-week course and pass a series of assessments before being deployed in a foreign country. Previously to our application, Training Specialists would use Microsoft Excel sheets to keep track and manually send out appointment emails.",
      "Acted as the Frontend Developer of the team designing UI/UX features on Figma and translating them into real React and CSS code. Also helped with backend and database features using Flask Python and PostgreSQL practicing implementing security features such as salting passwords so that accounts can't be hacked.",
      "Application won 2nd Place at UC Merced's Innovate2Grow, a once-in-a-semester showcase where students can show off and present their Computer Science & Engineering capstone projects."
    ],
  },
  {
    company: "University of California, Merced",
    role: "Web Development Intern",
    period: "May 2024 – August 2024",
    photo: "https://i.imgur.com/vvuxFrR.png",
    bullets: [
      "Revamped and designed the Calvin E. Bright Success Center website alongside it's affiliate program pages using Drupal, HTML and CSS.",
      "Internship position created specifically for me by the Dean of Students, Chad Williams.",
    ],
  },
  {
    company: "Greek House",
    role: "Campus Representative",
    period: "July 2023 – August 2024",
    photo: "https://i.imgur.com/y0cau73.jpeg",
    bullets: [
      "Reached over $10K in sales pitching Greek House to be the main apparel provider for clubs and organizations at UC Merced.",
      "Directly worked with Greek House designers to create desired custom apparel for my clients including Alpha Kappa Psi, Campus Activities Board, Kappa Kappa Gamma and Nigerian Student Association",
      "Note: Blue Crewnecks are a Greek House product."
    ],
  },
  {
    company: "Los Angeles City College",
    role: "Tutor 1",
    period: "Summer 2022 - 2024",
    photo: "https://i.imgur.com/SVwjPQa.jpeg",
    bullets: [
      "Tutored high school students interested in getting ahead and attending higher education in College Geometry, Algebra 2, PreCalculus and Intro to Programming; assisted professors in creating modular lesson plans and making sure students never fell behind.",
      "Mentored students through SAT preperation, college applications, and transitioning to post high school life.",
    ],
  },
];

const EDUCATION = [
  {
    school: "University of California, Irvine",
    degree: "Master of Computer Science",
    period: "September 2026 - December 2027",
    bullets: [
      "Incoming Graduate Student at University of California, Irvine",
    ],
  },
  {
    school: "University of California, Merced",
    degree: "B.S. in Computer Science & Engineering",
    period: "August 2021 - May 2025",
    bullets: [
      "Proud Alumni of Campus Activities Board, Office of Student Involvement, and Alpha Kappa Psi - Psi Upsilon Chapter",
    ],
  },
  {
    school: "Fairfax Senior High School",
    degree: "High School Diploma",
    period: "August 2017 - June 2021",
    bullets: [
      "3.86 Unweighted GPA | 4.3+ Weighted GPA | 8 AP Courses",
    ],
  },
];

const EXTRAS = [
  { name: "Alpha Kappa Psi Professional Business Fraternity – Psi Upsilon Chapter", detail: "Alpha Epsilon Class External Affairs Lead, Vice President of External Affairs (Social Chair), Historian (Photographer / Website Developer), Director of Marketing, New Member Educator for Alpha Iota Class. Had key roles in planning out Recruitment, Appathon (UC Merced's biggest professional development event), and Paws for a Cause (AKPSI's Philanthropy Week) every year." },
  { name: "Campus Activities Board", detail: "Traditional Event Coordinator, Hospitality Manager, Website Developer. Lead role in planning out UC Merced's annual events such as CABapalooza, Drag Queen Bingo, Bobcats Got Talent! and CABsterical. Acted as a Hospitality Manager taking care of artists such as Drag Queen Silky Nutmeg Ganache and Indie Artist Eddie Zuko. Also oversaw the development and maintenance of CAB's official website." },
  { name: "The Marketing & Sales Club", detail: "Client Team Lead. In Charge of Marketing March project to encourage clubs and organizations on campus to practice better marketing strategies." },
  { name: "The Prestige", detail: "IT Director. In charge of design and maintenance of the Prestige's official website. A part of The Prestige's Founding Board, a project to bring back a campus newspaper to UC Merced." },
];

const PROJECTS = [
  {
    name: "Portfolio Website",
    tags: ["React.js", "TailwindCSS", "Framer Motion", "lucide-react"],
    link: "",
    desc: "Based off a modern iPhone look, if you are reading this then you are on my portfolio website!",
  },
  {
    name: "Paws for a Cause 2025 Website",
    tags: ["React.js", "HTML/CSS", "GitHub"],
    link: "https://akpsipawsforacause.com",
    desc: "Pioneered a trend for Fraternities on campus to create their own Phianthropy website. Website built from scratch as a Western‑themed microsite with a live leaderboard, gallery, and mobile‑first UI. Raised over $10,000 over the course of 1 week for New Beginnings for Merced County Animals. For the dogs!",
  },
  {
    name: "Alpha Kappa Psi - Psi Upsilon Chapter Website",
    tags: ["WordPress", "HTML/CSS"],
    link: "https://akpsiucm.com",
    desc: "Built and designed the Alpha Kappa Psi - Psi Upsilon Chapter Website from the ground up gifting the chapter a website for the first time in 7 years. Includes a look into the benefits of joining, the chapter's history, and insights from alumnni.",
  },
  {
    name: "Campus Activities Board Website",
    tags: ["Wix", "HTML/CSS"],
    link: "https://www.asucmcab.com",
    desc: "Completely redesigned the website to have a modern and sleek theme from the previous Website Developer, adding videos, a look into the Board members, insights from alumni, and more!",
  },
  {
    name: "The Prestige Website",
    tags: ["SquareSpace", "HTML/CSS"],
    link: "https://www.theprestigeucm.com",
    desc: "Created and updated the official website for The Prestige, the official relaunch of a newspaper on campus.",
  },
  {
    name: "Associated Students of UC Merced Website",
    tags: ["Drupal", "HTML/CSS"],
    link: "https://asucm.ucmerced.edu",
    desc: "Maintained and updated UC Merced's ASUCM website weekly providing students with informating regarding the student government on campus.",
  },
  {
    name: "Fraternity & Sorority Life Website",
    tags: ["Drupal", "HTML/CSS"],
    link: "https://fraternitysorority.ucmerced.edu",
    desc: "Maintained and updated UC Merced's Fraternity & Sorority Life website weekly providing students with informating regarding Greek Life on campus.",
  },
  {
    name: "Registered Clubs & Organizations Website",
    tags: ["Drupal", "HTML/CSS"],
    link: "https://clubsorganizations.ucmerced.edu",
    desc: "Maintained and updated UC Merced's Registered Clubs & Organizations website weekly providing students with informating regarding clubs on campus.",
  },
  {
    name: "Office of Student Involvement Website",
    tags: ["Drupal", "HTML/CSS"],
    link: "https://studentinvolvement.ucmerced.edu",
    desc: "Maintained and updated UC Merced's Office of Student Involvement website weekly providing students with informating regarding involvement on campus.",
  },
  {
    name: "Programming Assignments from UC Merced",
    tags: ["Assembly", "C", "C++", "HTML/CSS", "Python"],
    link: "https://github.com/aw-reed/school",
    desc: "Various programming assignments during my time at UC Merced. Shows profiency in different programming languages, and knowledgable about programming different famous algorithms in computer science.",
  },
];

const SKILLS = {
  Languages: ["C", "C++", "HTML/CSS", "Java", "JavaScript/TypeScript", "LaTeX","Python", "SQL", "Swift"],
  Frameworks: ["Angular.js", "AWS", "Flask", "Git", "Next.js", "Node.js", "React.js", "Tailwind"],
  Data: ["Microsoft Excel", "MySQL", "NumPy", "pandas", "PostgreSQL", "Power BI"],
  DevOps: ["Git/GitHub", "Vite", "Vercel"],
  Other: ["Adobe Creative Cloud", "ArcGIS Pro", "Canva", "Digital Marketing", "Debugging", "Figma", "Google Workspace", "Microsoft Office", "Photography", "Testing","UI/UX Design", "Version Control", "Wix", "WordPress"],
};

const COURSEWORK = [
  "CSE 015 - Discrete Mathematics", 
  "CSE 022 - Intro to Programming", 
  "CSE 024 - Advanced Programming", 
  "CSE 030 - Data Structures", 
  "CSE 031 - Computer Organization & Assembly Language",
  "CSE 100 - Algorithm Design & Analysis",
  "CSE 108 - Full-Stack Web Development",
  "CSE 120 - Software Engineering",
  "CSE 150 - Operating Systems",
  "CSE 155 - Human-Computer Interaction",
  "CSE 165 - Object Oriented Programming",
  "CSE 175 - Artifical Intelligence",
  "ENGR 065 - Circuit Theory",
  "ENGR 155 - Engineering Economic Analysis",
  "ENGR 180 - Spatial Analysis & Modeling",
  "MATH 005 - PreCalculus",
  "MATH 021 - Calculus I",
  "MATH 022 - Calculus II",
  "MATH 023 - Vector Calculus",
  "MATH 024 - Linear Algebra",
  "MATH 032 - Statistics",
  "MATH 141 - Linear Analysis",
];

const CERTS_AWARDS = [
  { name: "Social Media Marketing", issuer: "Meta", year: "Certification" },
  { name: "2nd Place in Computer Science & Engineering Capstone Projects - Innovate2Grow", issuer: "University of California, Merced", year: "Award" },
];

const CONTACT = {
  email: ANDREW.email,
  phone: ANDREW.phone,
  github: ANDREW.github,
  linkedin: ANDREW.linkedin,
};

// ------------------------------ PORTFOLIO DATA ------------------------------
const PHOTO_PORTFOLIO = [
  {
    id: 1,
    src: "https://i.imgur.com/YKhAIwp.png",
    alt: "Portrait Photography",
    title: "Portrait Photography",
    description: "Professional Senior Headshots for a member of Delta Gamma"
  },
  {
    id: 2,
    src: "https://i.imgur.com/cQWW4Pg.png",
    alt: "Portrait Photography",
    title: "Portrait Photography",
    description: "Professional Studio Headshot for a member of Alpha Kappa Psi"
  },
  {
    id: 3,
    src: "https://i.imgur.com/ysPaDw3.png",
    alt: "Solo Photography",
    title: "Solo Photography",
    description: "Solo Photoshoot for a member of UC Merced's Soccer Team"
  },
  {
    id: 4,
    src: "https://i.imgur.com/aS72INc.png",
    alt: "Group Photography",
    title: "Group Photography",
    description: "Group Photoshoot for members of Theta Tau"
  },
  {
    id: 5,
    src: "https://i.imgur.com/m5Pyou2.png",
    alt: "Event Photography",
    title: "Event Photography",
    description: "Treats N' Beats 2023 Crowd"
  },
  {
    id: 6,
    src: "https://i.imgur.com/1W1z0lt.png",
    alt: "Lifestyle Photography",
    title: "Lifestyle Photography",
    description: "Some Pi Kapps dancing at AKPSI's Paws & Claws 2025"
  }
];

const MARKETING_PORTFOLIO = [
  {
    id: 1,
    src: "https://i.imgur.com/CS375xS.png",
    alt: "Instagram Marketing Post",
    title: "AKPSI Post",
    description: "Recruitment S25 Announcement",
    platform: "Instagram",
    link: "https://www.instagram.com/p/DFn9maATUW9/?igsh=NjZiM2M3MzIxNA%3D%3D"
  },
  {
    id: 2,
    src: "https://i.imgur.com/wEXDjlh.png",
    alt: "Instagram Marketing Post",
    title: "AKPSI Post",
    description: "Introduced the Alpha Iota Class to Greek Life at UC Merced",
    platform: "Instagram",
    link: "https://www.instagram.com/p/DJSbfgjzg73/?igsh=NjZiM2M3MzIxNA%3D%3D"
  },
  {
    id: 3,
    src: "https://i.imgur.com/3Q8AH7U.jpeg",
    alt: "Instagram Marketing Post",
    title: "Appathon Flyer",
    description: "Flyer for UC Merced's Biggest Professional Development Event",
    platform: "Instagram",
    link: "https://www.instagram.com/p/DHWuAZtSxrw/?igsh=NjZiM2M3MzIxNA%3D%3D"
  },
  {
    id: 4,
    src: "https://i.imgur.com/C2XM2Yu.png",
    alt: "Instagram Marketing Post",
    title: "Appathon Testimonial",
    description: "A testimonal of Appathon's Usefulness to promote the Event",
    platform: "Instagram",
    link: "https://www.instagram.com/p/DH1fZ-ATlH9/?igsh=NjZiM2M3MzIxNA%3D%3D"
  },
  {
    id: 5,
    src: "https://i.imgur.com/nKDGMeq.png",
    alt: "Instagram Marketing Post",
    title: "Graduation Post",
    description: "Graduation Post dedicated to the Office of Student Involvement's graduating interns",
    platform: "Instagram",
    link: "https://www.instagram.com/p/DJw1ZvVtika/?igsh=NjZiM2M3MzIxNA%3D%3D"
  },
  {
    id: 6,
    src: "https://i.imgur.com/FrgpVBb.png",
    alt: "Instagram Marketing Post",
    title: "Newsletter Announcement",
    description: "Monthly Announcement Post I would make for OSI's Bobcat 411",
    platform: "Instagram",
    link: "https://www.instagram.com/p/DJubQIrMIlv/?igsh=NjZiM2M3MzIxNA%3D%3D"
  },
  {
    id: 7,
    src: "https://i.imgur.com/t674mLD.png",
    alt: "Digital Magazine",
    title: "Bobcat 411",
    description: "Bobcat 411 Issues in which I was the Editor-in-Chief for",
    platform: "Website",
    link: "https://studentinvolvement.ucmerced.edu/media-archives/monthly-newsletter"
  },
  {
    id: 8,
    src: "https://i.imgur.com/INWTgpJ.png",
    alt: "Digital Magazine",
    title: "UC Merced Impact Report",
    description: "The Official UC Merced Impact Report for UC Merced's administrators",
    platform: "Website",
    link: ""
  }
];

// ------------------------------ HELPERS ------------------------------
function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/** Live battery via Battery Status API; falls back when missing or denied (e.g. many mobile browsers). */
const BATTERY_FALLBACK = { supported: false, level: 1, charging: false };

function useDeviceBattery() {
  const [battery, setBattery] = useState(BATTERY_FALLBACK);

  useEffect(() => {
    if (typeof navigator === "undefined" || typeof navigator.getBattery !== "function") {
      setBattery(BATTERY_FALLBACK);
      return undefined;
    }

    let cancelled = false;
    let bat = null;

    const sync = () => {
      if (cancelled || !bat) return;
      setBattery({
        supported: true,
        level: bat.level,
        charging: Boolean(bat.charging),
      });
    };

    navigator
      .getBattery()
      .then((b) => {
        if (cancelled) return;
        bat = b;
        sync();
        b.addEventListener("levelchange", sync);
        b.addEventListener("chargingchange", sync);
      })
      .catch(() => {
        if (!cancelled) setBattery(BATTERY_FALLBACK);
      });

    return () => {
      cancelled = true;
      if (bat) {
        bat.removeEventListener("levelchange", sync);
        bat.removeEventListener("chargingchange", sync);
      }
    };
  }, []);

  return battery;
}

// ------------------------------ iOS APP MODEL ------------------------------
const IOS_APPS = [
  { id: "bio", title: "About Me", icon: User, tint: "from-sky-400 to-blue-600" },
  { id: "experience", title: "Experience", icon: Briefcase, tint: "from-amber-400 to-orange-600" },
  { id: "extracurriculars", title: "Activities", icon: Star, tint: "from-pink-400 to-rose-600" },
  { id: "projects", title: "Projects", icon: FolderClosed, tint: "from-violet-400 to-fuchsia-600" },
  { id: "portfolios", title: "Portfolio", icon: ImageIcon, tint: "from-emerald-400 to-teal-600" },
  { id: "skills", title: "Skills", icon: Wrench, tint: "from-zinc-400 to-slate-700" },
  { id: "coursework", title: "Courses", icon: GraduationCap, tint: "from-indigo-400 to-indigo-700" },
  { id: "certs", title: "Certs", icon: Award, tint: "from-yellow-300 to-amber-600" },
  { id: "contact", title: "Contact", icon: Phone, tint: "from-green-400 to-green-700" },
];

const IOS_DOCK_APPS = [
  { id: "contact", title: "Contact", icon: Phone, tint: "from-green-400 to-green-700" },
  { id: "projects", title: "Projects", icon: FolderClosed, tint: "from-violet-400 to-fuchsia-600" },
  { id: "portfolios", title: "Portfolio", icon: ImageIcon, tint: "from-emerald-400 to-teal-600" },
  { id: "bio", title: "About Me", icon: User, tint: "from-sky-400 to-blue-600" },
];

// ---------------------- IMAGE LIGHTBOX ----------------------
function ImageLightbox({ open, src, alt, link, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof document === "undefined" || !open) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="image-lightbox-shell"
          >
            <img
              src={src}
              alt={alt}
              className="image-lightbox-img"
            />
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-black shadow hover:bg-white sm:text-sm"
              >
                View <ExternalLink size={14} />
              </a>
            )}
          </motion.div>
          <button
            type="button"
            className="absolute top-3 right-3 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 touch-manipulation sm:top-4 sm:right-4"
            onClick={onClose}
            aria-label="Close image"
          >
            <X size={18} className="sm:h-5 sm:w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ---------------------- ZOOMABLE IMAGE COMPONENT ----------------------
function ZoomableImage({ src, alt, link, imgClassName, onOpenChange }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const openLightbox = useCallback(() => {
    setOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={classNames(
          "cursor-pointer rounded shadow hover:scale-[1.02] transition-transform",
          imgClassName || "w-full max-w-full h-auto max-h-56 object-contain"
        )}
        onClick={openLightbox}
        loading="lazy"
      />
      <ImageLightbox open={open} src={src} alt={alt} link={link} onClose={close} />
    </>
  );
}

// ---------------------- PHOTO CAROUSEL COMPONENT ----------------------
function PhotoCarousel({ photos, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const isLight = theme === "light";

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToPhoto = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(nextPhoto, 5000);
    return () => clearInterval(interval);
  }, [nextPhoto, paused]);

  return (
    <div className="relative">
      <div
        className={classNames(
          "relative overflow-hidden rounded-2xl p-2 sm:p-4 border backdrop-blur-3xl backdrop-saturate-150",
          "glass-panel-shadow",
          isLight ? "bg-white/45 border-white/70 ring-1 ring-white/45" : "bg-white/[0.12] border-white/22 ring-1 ring-white/12"
        )}
      >
        <motion.div
          className="flex"
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {photos.map((photo, i) => (
            <div key={photo.id} className="w-full flex-shrink-0 min-w-0">
              <div className="flex flex-col items-center gap-3 w-full min-w-0">
                <div className="w-full max-w-[280px] overflow-hidden rounded-xl">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="cursor-pointer rounded-xl shadow-md hover:scale-[1.02] transition-transform w-full h-auto max-h-[220px] object-contain bg-black/5"
                    onClick={() => { setOpenIndex(i); setPaused(true); }}
                    loading="lazy"
                  />
                </div>
                <div className="text-center w-full min-w-0 px-1">
                  <h3 className="font-semibold text-sm sm:text-base">{photo.title}</h3>
                  <p className={classNames("text-xs sm:text-sm mt-1", isLight ? "text-slate-700" : "text-white/75")}>{photo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <button
          onClick={prevPhoto}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors touch-manipulation"
        >
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors touch-manipulation"
        >
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPhoto(index)}
            className={classNames(
              "w-2 h-2 rounded-full transition-colors touch-manipulation",
              index === currentIndex
                ? (isLight ? "bg-slate-900" : "bg-white")
                : (isLight ? "bg-slate-400/60" : "bg-white/50")
            )}
          />
        ))}
      </div>

      <ImageLightbox
        open={openIndex !== null}
        src={openIndex !== null ? photos[openIndex].src : ""}
        alt={openIndex !== null ? photos[openIndex].alt : ""}
        onClose={() => {
          setOpenIndex(null);
          setPaused(false);
        }}
      />
    </div>
  );
}


// ---------------------- PORTFOLIO CONTENT COMPONENT ----------------------
function PortfolioContent({ theme }) {
  const [activeSection, setActiveSection] = useState("photo");
  const isLight = theme === "light";

  return (
    <div className="space-y-4">
      {/* Section Tabs */}
      <div className={classNames("flex gap-2 border-b", isLight ? "border-slate-300" : "border-white/20")}>
        <button
          onClick={() => setActiveSection("photo")}
          className={classNames(
            "px-3 py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation",
            activeSection === "photo" 
              ? (isLight ? "text-slate-900 border-b-2 border-slate-900" : "text-white border-b-2 border-white")
              : (isLight ? "text-slate-600 hover:text-slate-900" : "text-white/70 hover:text-white")
          )}
        >
          📸 Photography
        </button>
        <button
          onClick={() => setActiveSection("marketing")}
          className={classNames(
            "px-3 py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation",
            activeSection === "marketing" 
              ? (isLight ? "text-slate-900 border-b-2 border-slate-900" : "text-white border-b-2 border-white")
              : (isLight ? "text-slate-600 hover:text-slate-900" : "text-white/70 hover:text-white")
          )}
        >
          📱 Digital Marketing
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeSection === "photo" && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              <h3 className={classNames("text-sm sm:text-base font-semibold", isLight ? "text-slate-900" : "text-white")}>
                Photography Portfolio
              </h3>
              <p className={classNames("text-xs sm:text-sm", isLight ? "text-slate-700" : "text-white/80")}>
                A collection of my photography work including portraits, events, and creative compositions.
              </p>
              <PhotoCarousel photos={PHOTO_PORTFOLIO} theme={theme} />
            </div>
          </motion.div>
        )}

        {activeSection === "marketing" && (
          <motion.div
            key="marketing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3 min-w-0">
              <h3 className={classNames("text-sm sm:text-base font-semibold", isLight ? "text-slate-900" : "text-white")}>
                Digital Marketing Portfolio
              </h3>
              <p className={classNames("text-xs sm:text-sm", isLight ? "text-slate-700" : "text-white/80")}>
                Social media content, magazines, and design work that drove engagement and results.
              </p>
              <div className="flex flex-col gap-3 w-full min-w-0">
                {MARKETING_PORTFOLIO.map((item) => (
                  <article
                    key={item.id}
                    className={classNames(
                      "rounded-[20px] p-3 w-full min-w-0 border backdrop-blur-3xl backdrop-saturate-150",
                      "glass-panel-shadow-md",
                      isLight
                        ? "bg-white/45 border-white/70 ring-1 ring-white/40"
                        : "bg-white/[0.12] border-white/22 ring-1 ring-white/12"
                    )}
                  >
                    <div className="flex flex-col gap-3 w-full min-w-0">
                      <div
                        className={classNames(
                          "w-full overflow-hidden rounded-2xl ring-1",
                          isLight ? "ring-black/5" : "ring-white/10"
                        )}
                      >
                        <ZoomableImage
                          src={item.src}
                          alt={item.alt}
                          link={item.link}
                          imgClassName="w-full max-h-[200px] h-auto object-contain object-center rounded-2xl"
                        />
                      </div>
                      <div className="min-w-0 space-y-2">
                        <h4 className={classNames("font-semibold text-sm break-words", isLight ? "text-slate-900" : "text-white")}>
                          {item.title}
                        </h4>
                        <p className={classNames("text-xs sm:text-sm break-words leading-snug", isLight ? "text-slate-700" : "text-white/80")}>
                          {item.description}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className={classNames(
                              "inline-flex items-center gap-1 text-xs font-medium rounded-full px-3 py-1.5 border backdrop-blur-md w-fit",
                              isLight
                                ? "bg-white/70 border-slate-200/80 text-blue-700"
                                : "bg-white/10 border-white/20 text-blue-300"
                            )}
                          >
                            View post <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------ APP SCREEN CONTENT ------------------------------
const AppContent = memo(function AppContent({ id, theme }) {
  const isLight = theme === "light";
  const cardClass = classNames(
    "rounded-[20px] p-3 sm:p-4 border relative overflow-hidden",
    "backdrop-blur-3xl backdrop-saturate-150",
    "app-card-shadow",
    isLight ? "bg-white/45 border-white/75 ring-1 ring-white/45" : "bg-white/[0.12] border-white/22 ring-1 ring-white/12"
  );
  const chipClass = classNames(
    "rounded-full px-2.5 py-1 text-[10px] sm:text-xs border backdrop-blur",
    isLight ? "bg-slate-100/80 border-slate-200 text-slate-700" : "bg-white/10 border-white/20 text-white/80"
  );

  switch (id) {
    case "bio":
      return (
        <div className="space-y-4">
          <div className={classNames(cardClass, "flex flex-col sm:flex-row items-center gap-4")}>
            <div className={classNames("absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl", isLight ? "bg-sky-300/40" : "bg-fuchsia-500/30")} />
            <img 
              src="https://i.imgur.com/8knrUmx.png" 
              alt="Andrew Reed" 
              className={classNames("w-32 h-32 sm:w-48 sm:h-48 rounded-full border flex-shrink-0 relative z-10", isLight ? "border-slate-300" : "border-white/30")} 
              loading="lazy"
            />
            <div className="text-center sm:text-left">
              <div className={classNames("text-base sm:text-lg font-semibold", isLight ? "text-slate-900" : "text-white")}>{ANDREW.name}</div>
              <div className={classNames("text-xs sm:text-sm mt-0.5", isLight ? "text-slate-600" : "text-white/70")}>
                {ANDREW.title} • {ANDREW.location}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={chipClass}>Full-Stack</span>
                <span className={chipClass}>Marketing</span>
                <span className={chipClass}>Design</span>
              </div>
            </div>
          </div>
          <div className={cardClass}>
            <div className={classNames("text-sm sm:text-base leading-relaxed", isLight ? "text-slate-900" : "text-white")}>
              {ANDREW.summary}
            </div>
          </div>
          <div>
            <h3 className={classNames("text-sm sm:text-base font-semibold mb-3", isLight ? "text-slate-900" : "text-white")}>
              Education
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {EDUCATION.map((edu, i) => (
                <div key={i} className={cardClass}>
                  <div className={classNames("absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl", isLight ? "bg-emerald-200/50" : "bg-emerald-400/20")} />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <div className="font-semibold text-sm sm:text-base">
                      {edu.degree} – {edu.school}
                    </div>
                    <div className={classNames("text-xs", isLight ? "text-slate-600" : "text-white/70")}>{edu.period}</div>
                  </div>
                  <ul className="mt-2 list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
                    {edu.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "experience":
      return (
        <div className="space-y-3 sm:space-y-4">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className={cardClass}>
              <div className={classNames("absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl", isLight ? "bg-blue-200/50" : "bg-cyan-400/20")} />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                <div className="font-semibold text-sm sm:text-base">{e.role} – {e.company}</div>
                <div className={classNames("text-xs", isLight ? "text-slate-600" : "text-white/70")}>{e.period}</div>
              </div>
              <ul className="mt-2 list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-1">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              {e.photo && (
                <div className="mt-2">
                  <ZoomableImage src={e.photo} alt={`${e.company} photo`} />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case "extracurriculars":
      return (
        <ul className={classNames("list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-2 rounded-2xl p-4 border backdrop-blur-xl", isLight ? "bg-white/55 border-white/70" : "bg-white/10 border-white/20")}>
          {EXTRAS.map((x, i) => (
            <li key={i}><span className="font-medium">{x.name}:</span> {x.detail}</li>
          ))}
        </ul>
      );
    case "projects":
      return (
        <div className="space-y-3">
          {PROJECTS.map((p, i) => (
            <div key={i} className={cardClass}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base">{p.name}</div>
                  <div className={classNames("text-xs", isLight ? "text-slate-600" : "text-white/70")}>{p.tags.join(" • ")}</div>
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-xs underline inline-flex items-center gap-1 self-start sm:self-auto">
                    View <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className={cardClass}>
              <div className="font-semibold mb-1 text-sm sm:text-base">{group}</div>
              <div className="text-xs sm:text-sm flex flex-wrap gap-1 sm:gap-2">
                {items.map((s) => (
                  <span key={s} className={chipClass}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "coursework":
      return (
        <div className={classNames("flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm rounded-2xl p-4 border backdrop-blur-xl", isLight ? "bg-white/55 border-white/70" : "bg-white/10 border-white/20")}>
          {COURSEWORK.map((c) => (
            <span key={c} className={chipClass}>{c}</span>
          ))}
        </div>
      );
    case "certs":
      return (
        <div className="space-y-2 text-xs sm:text-sm">
          {CERTS_AWARDS.map((c, i) => (
            <div key={i} className={classNames(cardClass, "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0")}>
              <div>
                <div className="font-medium text-sm sm:text-base">{c.name}</div>
                <div className={classNames("text-xs", isLight ? "text-slate-600" : "text-white/70")}>{c.issuer}</div>
              </div>
              <div className={classNames("text-xs", isLight ? "text-slate-600" : "text-white/70")}>{c.year}</div>
            </div>
          ))}
        </div>
      );
    
    case "contact":
      return (
        <div className={classNames("text-xs sm:text-sm space-y-2 rounded-2xl p-4 border backdrop-blur-xl", isLight ? "bg-white/55 border-white/70" : "bg-white/10 border-white/20")}>
          <div className="flex items-center gap-2"><Mail size={14} className="sm:w-4 sm:h-4"/> <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
          <div className="flex items-center gap-2"><Phone size={14} className="sm:w-4 sm:h-4"/> <span>{CONTACT.phone}</span></div>
          <div className="flex items-center gap-2"><Github size={14} className="sm:w-4 sm:h-4"/> <a className="underline" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a></div>
          <div className="flex items-center gap-2"><Linkedin size={14} className="sm:w-4 sm:h-4"/> <a className="underline" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
      );
    case "portfolios":
      return <PortfolioContent theme={theme} />;
    default:
      return <div>Coming soon…</div>;
  }
});

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** iOS-style “liquid glass” surface (frosted + specular edge) */
function liquidGlass(theme, { rounded = "rounded-[22px]", extra = "" } = {}) {
  return classNames(
    rounded,
    "border backdrop-blur-3xl backdrop-saturate-150",
    theme === "light"
      ? "liquid-glass-light bg-white/40 border-white/70 ring-1 ring-white/50"
      : "liquid-glass-dark bg-white/[0.14] border-white/25 ring-1 ring-white/15",
    extra
  );
}

function useEscapeToClose(enabled, onClose) {
  useEffect(() => {
    if (!enabled) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, onClose]);
}

function IosStatusBar({ theme }) {
  const time = useClock();
  const { supported, level, charging } = useDeviceBattery();
  const pct = Math.min(100, Math.max(0, Math.round(level * 100)));
  const fillPct = `${Math.max(6, pct)}%`;
  const fillClass = !supported
    ? theme === "light"
      ? "bg-slate-800"
      : "bg-white"
    : charging
      ? "bg-emerald-400"
      : pct <= 20
        ? "bg-red-500"
        : theme === "light"
          ? "bg-slate-800"
          : "bg-white";

  return (
    <div
      className={classNames(
        "absolute top-0 left-0 right-0 z-[45] px-5 pt-3 select-none pointer-events-none",
        theme === "light" ? "text-black" : "text-white"
      )}
    >
      <div className="flex items-center justify-between text-[11px] tracking-wide">
        <div className="font-semibold">{time}</div>
        <div
          className="flex items-center gap-1 opacity-95"
          title={
            supported
              ? charging
                ? `Charging · ${pct}%`
                : `Battery · ${pct}%`
              : "Battery status unavailable — showing default indicator"
          }
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="drop-shadow shrink-0">
            <path d="M1 11h2V7H1v4Zm4 0h2V5H5v6Zm4 0h2V3H9v8Zm4 0h2V1h-2v10Z" fill="currentColor"/>
          </svg>
          <svg width="18" height="12" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow shrink-0">
            <path d="M12 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm-7-6 2 2c2.76-2.76 7.24-2.76 10 0l2-2c-3.87-3.86-10.13-3.86-14 0Zm-4-4 2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 8Z"/>
          </svg>
          {supported && (
            <span className="tabular-nums text-[10px] font-semibold opacity-90 shrink-0">{pct}</span>
          )}
          {supported && charging && (
            <Zap size={11} className="text-amber-300 shrink-0 -ml-0.5" fill="currentColor" aria-hidden />
          )}
          <div className="flex items-center gap-0.5 shrink-0">
            <div
              className={classNames(
                "w-6 h-3 rounded-[3px] border relative overflow-hidden",
                theme === "light" ? "border-slate-700/50" : "border-white/70"
              )}
            >
              <div
                className={classNames(
                  "absolute inset-y-[1px] left-[1px] rounded-[2px] transition-[width] duration-300 ease-out",
                  fillClass
                )}
                style={{ width: supported ? fillPct : "92%" }}
              />
            </div>
            <div className={classNames("w-0.5 h-2 rounded-sm", theme === "light" ? "bg-slate-700/50" : "bg-white/70")} />
          </div>
        </div>
      </div>

      {/* Dynamic Island / notch */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-2 w-44 h-7 rounded-full bg-black/55 backdrop-blur border border-white/10 dynamic-island-shadow" />
    </div>
  );
}

function IosHomeIndicator({ theme }) {
  return (
    <div
      className={classNames(
        "absolute bottom-2 left-1/2 -translate-x-1/2 z-[45] w-32 h-1.5 rounded-full backdrop-blur-md pointer-events-none",
        theme === "light" ? "bg-black/25 ring-1 ring-black/10" : "bg-white/70 ring-1 ring-white/30"
      )}
    />
  );
}

const IosAppIcon = memo(function IosAppIcon({ title, Icon, tint, onOpen, theme }) {
  return (
    <button
      onClick={onOpen}
      className="touch-manipulation group flex flex-col items-center gap-1.5 select-none"
      aria-label={`Open ${title}`}
    >
      <div className={classNames(
        "w-14 h-14 rounded-[20px] bg-gradient-to-br border backdrop-blur-xl backdrop-saturate-150",
        "ios-icon-shadow",
        "border-white/35 ring-1 ring-white/25",
        tint
      )}>
        <div className="w-full h-full flex items-center justify-center">
          <Icon className="text-white drop-shadow" size={24} />
        </div>
      </div>
      <div
        className={classNames(
          "text-[11px] max-w-[72px] truncate",
          theme === "light"
            ? "text-slate-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.35)]"
            : "text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        )}
      >
        {title}
      </div>
    </button>
  );
});

function IosAppScreen({ app, onClose, theme }) {
  useEscapeToClose(true, onClose);

  return (
    <motion.div
      className="absolute inset-0 z-30 rounded-[44px] overflow-hidden"
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 18 }}
      transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.8 }}
    >
      <div className={classNames("absolute inset-0", theme === "light" ? "bg-white" : "bg-[#0b1220]")} />
      <div className={classNames("absolute inset-0 pointer-events-none", theme === "light" ? "ios-app-overlay-light" : "ios-app-overlay-dark")} />

      <div className="absolute inset-0 flex flex-col">
        {/* Nav bar */}
        <div
          className={classNames(
            "pt-16 pb-3 px-4 border-b backdrop-blur-3xl backdrop-saturate-150",
            "ios-app-nav-shadow",
            theme === "light"
              ? "bg-white/55 border-white/60 ring-1 ring-white/40"
              : "bg-white/[0.08] border-white/15 ring-1 ring-white/10"
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className={classNames(
                "inline-flex items-center gap-1 font-medium text-sm touch-manipulation",
                theme === "light" ? "text-blue-600" : "text-blue-400"
              )}
              aria-label="Back"
            >
              <ChevronLeft size={18} />
              <span>Home</span>
            </button>
            <div className={classNames("text-sm font-semibold truncate", theme === "light" ? "text-black" : "text-white")}>
              {app.title}
            </div>
            <div className="w-[64px] flex justify-end">
              <button
                onClick={onClose}
                className={classNames(
                  "w-8 h-8 rounded-full inline-flex items-center justify-center touch-manipulation",
                  theme === "light"
                    ? "bg-black/5 hover:bg-black/10 active:bg-black/15"
                    : "bg-white/10 hover:bg-white/15 active:bg-white/20"
                )}
                aria-label="Close app"
                title="Close"
              >
                <X size={16} className={classNames(theme === "light" ? "text-black/70" : "text-white/80")} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className={classNames(
            "flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 min-h-0",
            theme === "light"
              ? "bg-gradient-to-b from-white/90 to-slate-100/90 text-black"
              : "bg-gradient-to-b from-[#0b1220]/92 to-[#050914]/95 text-white"
          )}
        >
          <div className={classNames(theme === "light" ? "text-black" : "text-white")}>
            <AppContent id={app.id} theme={theme} />
          </div>
          <div className="h-10" />
        </div>
      </div>
    </motion.div>
  );
}

function IosWallpaper({ theme }) {
  return (
    <div className="absolute inset-0">
      {theme === "light" ? (
        <>
          <div className="absolute inset-0 ios-wallpaper-light-main" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-transparent to-white/25" />
          <div className="absolute inset-0 opacity-[0.14] ios-wallpaper-light-dots" />
          <div className="absolute inset-0 ios-wallpaper-light-sheen mix-blend-overlay" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 ios-wallpaper-dark-main" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/30" />
          <div className="absolute inset-0 opacity-[0.09] ios-wallpaper-dark-dots" />
          <div className="absolute inset-0 ios-wallpaper-dark-sheen" />
        </>
      )}
    </div>
  );
}

const NOW_PLAYING_ITUNES_QUERY = "Rauw Alejandro Desenfocao";

function IosNowPlayingWidget({ theme }) {
  const audioRef = useRef(null);
  const [meta, setMeta] = useState(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      NOW_PLAYING_ITUNES_QUERY
    )}&entity=song&limit=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const t = data?.results?.[0];
        if (!t?.previewUrl) {
          setFetchFailed(true);
          return;
        }
        const art =
          typeof t.artworkUrl100 === "string"
            ? t.artworkUrl100.replace(/100x100bb\.jpg$/i, "600x600bb.jpg")
            : t.artworkUrl100;
        setMeta({
          previewUrl: t.previewUrl,
          artworkUrl: art,
          title: t.trackName ?? "Desenfocao'",
          artist: t.artistName ?? "Rauw Alejandro",
          album: t.collectionName ?? "VICE VERSA",
        });
      })
      .catch(() => {
        if (!cancelled) setFetchFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !meta?.previewUrl) return;
    el.src = meta.previewUrl;
    el.load();
  }, [meta?.previewUrl]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el || !meta) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [meta]);

  const onTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setProgress(el.currentTime / el.duration);
  }, []);

  const onEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    const el = audioRef.current;
    if (el) el.currentTime = 0;
  }, []);

  const subline = meta
    ? `${meta.artist} · ${meta.album}`
    : fetchFailed
      ? "Could not load track"
      : "Loading…";

  return (
    <div className={classNames(liquidGlass(theme, { rounded: "rounded-2xl" }), "px-3 py-2.5 min-h-[72px]")}>
      <audio
        ref={audioRef}
        className="hidden"
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <div className={classNames("text-[11px]", theme === "light" ? "text-slate-600" : "text-white/70")}>Now Playing</div>
      <div className="mt-1.5 flex items-center gap-3">
        <div
          className={classNames(
            "relative w-14 h-14 shrink-0 rounded-xl overflow-hidden shadow-md ring-1",
            theme === "light" ? "ring-black/10 bg-slate-200" : "ring-white/15 bg-white/10"
          )}
        >
          {meta?.artworkUrl ? (
            <img src={meta.artworkUrl} alt="" className="w-full h-full object-cover" decoding="async" />
          ) : (
            <div
              className={classNames(
                "w-full h-full flex items-center justify-center text-[10px] font-medium text-center px-1 leading-tight",
                theme === "light" ? "text-slate-500" : "text-white/50"
              )}
            >
              {fetchFailed ? "—" : "…"}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={classNames(
              "text-xs font-semibold leading-snug break-words",
              theme === "light" ? "text-slate-900" : "text-white"
            )}
          >
            {meta?.title ?? "Desenfocao'"}
          </div>
          <div
            className={classNames(
              "text-[10px] leading-snug mt-0.5 break-words",
              theme === "light" ? "text-slate-600" : "text-white/65"
            )}
          >
            {subline}
          </div>
          {meta && (
            <div
              className={classNames(
                "mt-1.5 h-0.5 rounded-full overflow-hidden",
                theme === "light" ? "bg-black/10" : "bg-white/15"
              )}
              aria-hidden
            >
              <div
                className={classNames("h-full rounded-full transition-[width] duration-150", theme === "light" ? "bg-slate-800" : "bg-white/90")}
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={togglePlay}
          disabled={!meta}
          className={classNames(
            "shrink-0 w-9 h-9 rounded-full flex items-center justify-center touch-manipulation transition-colors",
            !meta && "opacity-40 cursor-not-allowed",
            meta &&
              (theme === "light"
                ? "bg-black/10 hover:bg-black/15 active:bg-black/20 text-slate-900"
                : "bg-white/15 hover:bg-white/20 active:bg-white/25 text-white")
          )}
          aria-label={playing ? "Pause preview" : "Play preview"}
        >
          {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}

function IosDeviceFrame({ children }) {
  return (
    <div className="relative">
      <div className="absolute -inset-[12px] rounded-[62px] bg-gradient-to-br from-white/35 via-zinc-300/25 to-zinc-700/35 blur-[0.5px]" />
      <div className="absolute -inset-[12px] rounded-[62px] device-frame-shadow-outer" />
      <div className="relative rounded-[56px] bg-gradient-to-br from-zinc-700 via-zinc-900 to-black p-[11px] device-frame-shadow-body ring-1 ring-white/20">
        <div className="rounded-[46px] bg-gradient-to-b from-zinc-900 to-black p-[2px]">
          {/* Tall Pro Max–style canvas + liquid glass era framing */}
          <div className="relative w-[430px] h-[1120px] max-w-[92vw] max-h-[93vh] rounded-[50px] overflow-hidden bg-black device-screen-inset">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------ MAIN APP ------------------------------
export default function IPhonePortfolio() {
  const { width, height } = useWindowSize();
  const [openAppId, setOpenAppId] = useState(null);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const appsById = useMemo(() => {
    const map = new Map();
    for (const app of IOS_APPS) map.set(app.id, app);
    return map;
  }, []);

  const openApp = useCallback((id) => {
    setOpenAppId(id);
  }, []);

  const closeApp = useCallback(() => setOpenAppId(null), []);

  const openAppDef = openAppId ? appsById.get(openAppId) : null;

  const scale = useMemo(() => {
    const targetW = 500;
    const targetH = 1240;
    const s = Math.min(width / targetW, height / targetH);
    return clamp(s, 0.68, 1);
  }, [width, height]);

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return IOS_APPS;
    return IOS_APPS.filter((a) => a.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-hidden">
      {/* Page background (outside the phone) */}
      {theme === "light" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200" />
          <div className="absolute inset-0 opacity-30 page-bg-dots-light" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
          <div className="absolute inset-0 opacity-40 page-bg-dots-dark" />
        </>
      )}

      <div className="relative min-h-dvh flex items-center justify-center px-4 py-10">
        <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
          <IosDeviceFrame>
            <IosWallpaper theme={theme} />
            <IosStatusBar theme={theme} />
            <IosHomeIndicator theme={theme} />

            {/* Home screen — equal gap-5: header↔search↔Now Playing, Now Playing↔apps, apps↔dock */}
            <div className="relative z-10 flex h-full min-h-0 w-full flex-col gap-5 overflow-y-auto overscroll-contain px-6 pt-14 pb-32">
              <div className="flex shrink-0 flex-col gap-5">
                <div className="flex shrink-0 items-center justify-between gap-3">
                  <div className={classNames(theme === "light" ? "text-slate-900" : "text-white")}>
                    <div className={classNames("text-[13px]", theme === "light" ? "opacity-80" : "opacity-90")}>Portfolio</div>
                    <div className="text-xl font-semibold tracking-tight leading-tight">
                      {ANDREW.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                      className={classNames(
                        "w-10 h-10 rounded-full border backdrop-blur flex items-center justify-center touch-manipulation",
                        theme === "light"
                          ? "bg-black/5 border-black/10 hover:bg-black/10 active:bg-black/15"
                          : "bg-white/10 border-white/15 hover:bg-white/15 active:bg-white/20"
                      )}
                      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                      title={theme === "dark" ? "Light mode" : "Dark mode"}
                    >
                      {theme === "dark" ? (
                        <Sun size={18} className={classNames(theme === "light" ? "text-slate-900" : "text-white")} />
                      ) : (
                        <Moon size={18} className={classNames(theme === "light" ? "text-slate-900" : "text-white")} />
                      )}
                    </button>
                    <a
                      href={ANDREW.github}
                      target="_blank"
                      rel="noreferrer"
                      className={classNames(
                        "w-10 h-10 rounded-full border backdrop-blur flex items-center justify-center touch-manipulation",
                        theme === "light"
                          ? "bg-black/5 border-black/10 hover:bg-black/10 active:bg-black/15"
                          : "bg-white/10 border-white/15 hover:bg-white/15 active:bg-white/20"
                      )}
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <Github size={18} className={classNames(theme === "light" ? "text-slate-900" : "text-white")} />
                    </a>
                    <a
                      href={ANDREW.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className={classNames(
                        "w-10 h-10 rounded-full border backdrop-blur flex items-center justify-center touch-manipulation",
                        theme === "light"
                          ? "bg-black/5 border-black/10 hover:bg-black/10 active:bg-black/15"
                          : "bg-white/10 border-white/15 hover:bg-white/15 active:bg-white/20"
                      )}
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <Linkedin size={18} className={classNames(theme === "light" ? "text-slate-900" : "text-white")} />
                    </a>
                  </div>
                </div>

                <div
                  className={classNames(
                    liquidGlass(theme, { rounded: "rounded-2xl" }),
                    "shrink-0 px-3 py-2.5 flex items-center gap-2"
                  )}
                >
                  <Search size={16} className={classNames(theme === "light" ? "text-slate-700" : "text-white/80")} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search apps"
                    className={classNames(
                      "bg-transparent outline-none text-[13px] w-full",
                      theme === "light"
                        ? "text-slate-900 placeholder:text-slate-600"
                        : "text-white placeholder:text-white/55"
                    )}
                    aria-label="Search apps"
                  />
                  {!!query && (
                    <button
                      onClick={() => setQuery("")}
                      className={classNames(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        theme === "light"
                          ? "bg-black/5 hover:bg-black/10 active:bg-black/15"
                          : "bg-white/15 hover:bg-white/20 active:bg-white/25"
                      )}
                      aria-label="Clear search"
                    >
                      <X size={14} className={classNames(theme === "light" ? "text-slate-800" : "text-white/90")} />
                    </button>
                  )}
                </div>

                <div className="shrink-0">
                  <IosNowPlayingWidget theme={theme} />
                </div>
              </div>

              <div className="grid shrink-0 grid-cols-4 gap-x-5 gap-y-6 mb-5">
                {filteredApps.map((app) => (
                  <IosAppIcon
                    key={app.id}
                    title={app.title}
                    Icon={app.icon}
                    tint={app.tint}
                    theme={theme}
                    onOpen={() => openApp(app.id)}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-9 z-[25] px-6">
              <div
                className={classNames(
                  liquidGlass(theme, { rounded: "rounded-[32px]" }),
                  "px-5 py-3.5"
                )}
              >
                <div className="flex items-end justify-between">
                  {IOS_DOCK_APPS.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => openApp(app.id)}
                      className="touch-manipulation group flex flex-col items-center gap-1 select-none"
                      aria-label={`Open ${app.title}`}
                    >
                      <div className={classNames(
                        "w-14 h-14 rounded-[20px] bg-gradient-to-br border backdrop-blur-xl backdrop-saturate-150",
                        "ios-icon-shadow",
                        "border-white/35 ring-1 ring-white/25",
                        app.tint
                      )}>
                        <div className="w-full h-full flex items-center justify-center">
                          <app.icon className="text-white drop-shadow" size={24} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Opened app */}
            <AnimatePresence>
              {openAppDef && (
                <IosAppScreen
                  key={openAppDef.id}
                  app={openAppDef}
                  onClose={closeApp}
                  theme={theme}
                />
              )}
            </AnimatePresence>
          </IosDeviceFrame>
        </div>
      </div>
    </div>
  );
}