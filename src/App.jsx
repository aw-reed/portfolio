import React, { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import { 
  FolderClosed, Briefcase, User, Wrench, GraduationCap, Star, 
  FileText, Phone, Mail, Code2, Award, BookOpen, Cpu, Server, Github,
  Linkedin, Globe, Image as ImageIcon, ExternalLink, ChevronRight, X, Minus,
  ChevronLeft, ChevronDown, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ------------------------------ XP THEME TOKENS ------------------------------
const XP = {
  taskbarBlue: "#245EDB",
  taskbarBorder: "#163C8C",
  startGreen: "#3C8D0D",
  startGreenDark: "#2D6A0A",
  startGreenLight: "#5FB71E",
  titleBlue: "#3A6EA5",
  titleBlueDark: "#2B4E75",
  titleBlueLight: "#5A8BD3",
  windowBg: "#ECE9D8",
  desktopSky: "linear-gradient(to bottom, #87CEFA 0%, #87CEFA 50%, #9AD0FF 100%)",
  desktopHill: "linear-gradient(to top, #3ca52c 0%, #62c64d 60%, #7bd165 100%)",
};

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
    company: "Office of Student Involvement, UC Merced",
    role: "Marketing, Assessment, Website & Data Lead",
    period: "July 2022 – July 2025",
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
    company: "U.S. Department of State",
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
    company: "Calvin E. Bright Success Center, UC Merced",
    role: "Frontend Developer Intern",
    period: "May 2024 – August 2025",
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
  {
    company: "Citicorp & Associates",
    role: "Scheduling Manager",
    period: "Summer 2022 - 2024",
    photo: "https://i.imgur.com/K4L1ABd.png",
    bullets: [
      "Approved and managed schedules and hours for all security staff, optimizing workforce efficiency. ",
      "Developed and implemented strategies to minimize overtime hours, successfully reducing labor costs and enhancing scheduling efficiency.",
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
    desc: "Based off a simplistic Windows XP look, if you are reading this then you are on my portfolio website!",
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
  Languages: ["C", "C++", "Go", "HTML/CSS", "Java", "JavaScript/TypeScript", "Python", "SQL", "Swift"],
  Frameworks: ["Angular.js", "AWS", "Flask", "Git", "Next.js", "Node.js", "React.js", "Tailwind"],
  Data: ["Microsoft Excel", "MySQL", "NumPy", "pandas", "PostgreSQL", "Power BI"],
  DevOps: ["Git/GitHub", "Vite", "Vercel"],
  Other: ["Adobe Creative Cloud (PhotoShop/Illustrator/Lightroom)", "ArcGIS Pro", "Canva", "Digital Marketing", "Debugging/Testing", "Figma", "Google Workspace", "Microsoft Office", "Photography/Photoshoots", "UI/UX Design", "Version Control"],
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

// ------------------------------ DESKTOP ICONS ------------------------------
const ICONS = {
  Biography: User,
  Experience: Briefcase,
  Extracurriculars: Star,
  Projects: FolderClosed,
  Skills: Wrench,
  Coursework: GraduationCap,
  Certifications: Award,
  Resume: FileText,
  Contact: Phone,
  Gallery: ImageIcon,
  Blog: BookOpen,
  TechStack: Cpu,
  Deployments: Server,
  Portfolios: ImageIcon,
};

const DESKTOP_FOLDERS = [
  { id: "bio", title: "Biography", icon: "Biography" },
  { id: "experience", title: "Work Experience", icon: "Experience" },
  { id: "extracurriculars", title: "Extracurriculars", icon: "Extracurriculars" },
  { id: "projects", title: "Projects", icon: "Projects" },
  { id: "portfolios", title: "Portfolios", icon: "Portfolios" },
  { id: "skills", title: "Skills", icon: "Skills" },
  { id: "coursework", title: "Coursework", icon: "Coursework" },
  { id: "certs", title: "Certifications", icon: "Certifications" },
  { id: "contact", title: "Contact", icon: "Contact" },
];

// ---------------------- ZOOMABLE IMAGE COMPONENT ----------------------
function ZoomableImage({ src, alt, link, imgClassName, onOpenChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={classNames(
          "cursor-pointer rounded shadow hover:scale-105 transition-transform",
          imgClassName || "w-full max-w-xs sm:max-w-sm"
        )}
        onClick={() => {
          setOpen(true);
          onOpenChange?.(true);
        }}
        loading="lazy"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div onClick={(e) => e.stopPropagation()} className="relative">
              <img
                src={src}
                alt={alt}
                className="max-h-[85vh] max-w-[95vw] rounded shadow-lg"
              />
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-black rounded px-3 py-1 text-xs sm:text-sm absolute left-1/2 -translate-x-1/2 -bottom-10 shadow"
                >
                  View <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 touch-manipulation"
              onClick={() => {
                setOpen(false);
                onOpenChange?.(false);
              }}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------- PHOTO CAROUSEL COMPONENT ----------------------
function PhotoCarousel({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

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
      <div className="relative overflow-hidden rounded-lg bg-white/60 p-2 sm:p-4">
        <motion.div
          className="flex"
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {photos.map((photo, i) => (
            <div key={photo.id} className="w-full flex-shrink-0">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="cursor-pointer rounded shadow hover:scale-105 transition-transform w-full max-w-xs sm:max-w-sm"
                    onClick={() => { setOpenIndex(i); setPaused(true); }}
                    loading="lazy"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-sm sm:text-base">{photo.title}</h3>
                  <p className="text-xs sm:text-sm opacity-70 mt-1">{photo.description}</p>
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
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
            onClick={() => { setOpenIndex(null); setPaused(false); }}
          >
            <motion.img
              key={openIndex}
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              className="max-h-[85vh] max-w-[95vw] rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 touch-manipulation"
              onClick={() => { setOpenIndex(null); setPaused(false); }}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// ---------------------- PORTFOLIO CONTENT COMPONENT ----------------------
function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("photo");

  return (
    <div className="space-y-4">
      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-gray-300">
        <button
          onClick={() => setActiveSection("photo")}
          className={classNames(
            "px-3 py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation",
            activeSection === "photo" 
              ? "text-black border-b-2 border-black" 
              : "text-gray-600 hover:text-black"
          )}
        >
          📸 Photography
        </button>
        <button
          onClick={() => setActiveSection("marketing")}
          className={classNames(
            "px-3 py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation",
            activeSection === "marketing" 
              ? "text-black border-b-2 border-black" 
              : "text-gray-600 hover:text-black"
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
              <h3 className="text-sm sm:text-base font-semibold text-black">Photography Portfolio</h3>
              <p className="text-xs sm:text-sm text-gray-700">
                A collection of my photography work including portraits, events, and creative compositions.
              </p>
              <PhotoCarousel photos={PHOTO_PORTFOLIO} />
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
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-semibold text-black">Digital Marketing Portfolio</h3>
              <p className="text-xs sm:text-sm text-gray-700">
                Social media content, magazines, and design work that drove engagement and results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MARKETING_PORTFOLIO.map((item) => (
                  <div key={item.id} className="rounded-lg bg-white/60 p-3 shadow">
                    <div className="flex flex-col sm:flex-row items-start gap-3">
                      <div className="flex-shrink-0">
                        <ZoomableImage
                          src={item.src}
                          alt={item.alt}
                          link={item.link}
                          imgClassName="w-[150px] h-[190px] sm:w-[190px] sm:h-[238px] object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base break-words">{item.title}</h4>
                        <p className="text-xs sm:text-sm opacity-70 mt-1 break-words whitespace-normal">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] sm:text-xs underline inline-flex items-center gap-1"
                            >
                              View post <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------------------------------ WINDOW CONTENT ------------------------------
const WindowContent = memo(function WindowContent({ id }) {
  switch (id) {
    case "bio":
      return (
        <div className="prose prose-sm max-w-none">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src="https://i.imgur.com/8knrUmx.png" 
              alt="Andrew Reed" 
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border flex-shrink-0" 
              loading="lazy"
            />
            <div className="text-center sm:text-left">
              <p><strong>{ANDREW.name}</strong> — {ANDREW.title}</p>
              <p className="text-sm sm:text-base">{ANDREW.summary}</p>
              <p><em>Based in:</em> {ANDREW.location}</p>
            </div>
          </div>
        </div>
      );
    case "experience":
      return (
        <div className="space-y-3 sm:space-y-4">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="rounded-xl bg-white/60 p-2 sm:p-3 shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                <div className="font-semibold text-sm sm:text-base">{e.role} – {e.company}</div>
                <div className="text-xs opacity-70">{e.period}</div>
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
        <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm space-y-2">
          {EXTRAS.map((x, i) => (
            <li key={i}><span className="font-medium">{x.name}:</span> {x.detail}</li>
          ))}
        </ul>
      );
    case "projects":
      return (
        <div className="space-y-3">
          {PROJECTS.map((p, i) => (
            <div key={i} className="rounded-xl bg-white/60 p-2 sm:p-3 shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base">{p.name}</div>
                  <div className="text-xs opacity-70">{p.tags.join(" • ")}</div>
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
            <div key={group} className="rounded-xl bg-white/60 p-2 sm:p-3 shadow">
              <div className="font-semibold mb-1 text-sm sm:text-base">{group}</div>
              <div className="text-xs sm:text-sm flex flex-wrap gap-1 sm:gap-2">
                {items.map((s) => (
                  <span key={s} className="rounded bg-white px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs shadow border">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "coursework":
      return (
        <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
          {COURSEWORK.map((c) => (
            <span key={c} className="rounded bg-white px-1.5 sm:px-2 py-0.5 shadow border">{c}</span>
          ))}
        </div>
      );
    case "certs":
      return (
        <div className="space-y-2 text-xs sm:text-sm">
          {CERTS_AWARDS.map((c, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded bg-white/60 p-2 shadow gap-1 sm:gap-0">
              <div>
                <div className="font-medium text-sm sm:text-base">{c.name}</div>
                <div className="text-xs opacity-70">{c.issuer}</div>
              </div>
              <div className="text-xs opacity-70">{c.year}</div>
            </div>
          ))}
        </div>
      );
    
    case "contact":
      return (
        <div className="text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2"><Mail size={14} className="sm:w-4 sm:h-4"/> <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
          <div className="flex items-center gap-2"><Phone size={14} className="sm:w-4 sm:h-4"/> <span>{CONTACT.phone}</span></div>
          <div className="flex items-center gap-2"><Github size={14} className="sm:w-4 sm:h-4"/> <a className="underline" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a></div>
          <div className="flex items-center gap-2"><Linkedin size={14} className="sm:w-4 sm:h-4"/> <a className="underline" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
      );
    case "portfolios":
      return <PortfolioContent />;
    default:
      return <div>Coming soon…</div>;
  }
});

// ------------------------------ DESKTOP ICON COMPONENT ------------------------------
const DesktopIcon = memo(function DesktopIcon({ title, Icon, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group w-16 sm:w-20 md:w-24 select-none text-white hover:cursor-pointer touch-manipulation"
    >
      <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow group-hover:scale-105 group-active:scale-95 transition-transform">
        <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </div>
      <div className="mt-1 text-center text-[10px] sm:text-xs drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] leading-tight">
        {title}
      </div>
    </button>
  );
});

// ------------------------------ WINDOW (DRAGGABLE) ------------------------------
function XPWindow({ id, title, Icon, content, z, onFocus, onClose, onMinimize, defaultPos }) {
  const windowRef = useRef(null);
  const [pos, setPos] = useState(defaultPos || { x: 200, y: 120 });
  const [drag, setDrag] = useState(null);

  const handleFocus = () => onFocus?.();

  const onMouseDown = (e) => {
    if (!(e.target).closest) return;
    const isTitlebar = (e.target).closest(".xp-titlebar");
    if (!isTitlebar) return;
    const rect = windowRef.current?.getBoundingClientRect();
    setDrag({
      offsetX: e.clientX - (rect?.left || 0),
      offsetY: e.clientY - (rect?.top || 0),
    });
  };

  const onMouseMove = (e) => {
    if (!drag) return;
    setPos({ x: e.clientX - drag.offsetX, y: e.clientY - drag.offsetY });
  };

  const onMouseUp = () => setDrag(null);

  useEffect(() => {
    if (drag) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [drag]);

  return (
    <motion.div
      ref={windowRef}
      onMouseDown={handleFocus}
      onMouseUp={handleFocus}
      onMouseDownCapture={onMouseDown}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className="fixed" 
      style={{ left: pos.x, top: pos.y, zIndex: z }}
    >
      <div className="w-[95vw] sm:w-[90vw] md:w-[680px] max-w-[95vw] rounded-xl overflow-hidden shadow-2xl border border-black/30">
        <div 
          className="xp-titlebar flex items-center justify-between px-2 py-1 text-white"
          style={{
            background: `linear-gradient(180deg, ${XP.titleBlueLight}, ${XP.titleBlue})`,
            boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon size={16} />
            <span className="font-medium text-sm">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onMinimize} className="rounded-sm bg-white/20 px-2 py-0.5 hover:bg-white/30 active:translate-y-[1px]">
              <Minus size={14} />
            </button>
            <button onClick={onClose} className="rounded-sm bg-white/20 px-2 py-0.5 hover:bg-white/30 active:translate-y-[1px]">
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/70 px-3 py-1 text-xs border-b">
          <span className="inline-flex items-center gap-1"><FileText size={14}/> File</span>
          <span className="inline-flex items-center gap-1"><BookOpen size={14}/> Edit</span>
          <span className="inline-flex items-center gap-1"><Wrench size={14}/> View</span>
          <span className="inline-flex items-center gap-1"><HelpIcon/> Help</span>
        </div>
        <div
          className="p-2 sm:p-4"
          style={{
            background: XP.windowBg,
            maxHeight: "70vh",    
            overflowY: "auto",    
            overflowX: "auto",    
          }}
        >
          <WindowContent id={id} />
        </div>
      </div>
    </motion.div>
  );
}

function HelpIcon(){
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-.25 15.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 6.5a4 4 0 0 0-4 4 1 1 0 1 0 2 0 2 2 0 1 1 2.915 1.8c-1.004.48-1.665 1.468-1.665 2.55V15a1 1 0 1 0 2 0v-.15c0-.282.17-.54.43-.666A4 4 0 0 0 12 6.5Z"/></svg>
  )
}

// ------------------------------ TASKBAR ------------------------------
function Taskbar({ windows, onToggleMin, onFocusStart }) {
  const time = useClock();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-1"
      style={{ background: `linear-gradient(180deg, ${XP.taskbarBlue}, ${XP.taskbarBorder})`, boxShadow: "0 -2px 8px rgba(0,0,0,0.25)" }}
    >
      {/* Start Button */}
      <button
        onClick={onFocusStart}
        className="flex items-center gap-1 sm:gap-2 rounded-md px-2 sm:px-3 py-1 text-white shadow border touch-manipulation"
        style={{ background: `linear-gradient(180deg, ${XP.startGreenLight}, ${XP.startGreen})`, borderColor: XP.startGreenDark }}
      >
        <WindowsLogo />
        <span className="font-semibold text-xs sm:text-sm">Start</span>
      </button>

      {/* Open windows */}
      <div className="flex-1 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-thin">
        {windows.map((w) => (
          <button
            key={w.id}
            onClick={() => onToggleMin(w.id)}
            className={classNames(
              "flex items-center gap-1 sm:gap-2 rounded bg-white/20 px-1 sm:px-2 py-1 text-white border touch-manipulation",
              w.minimized ? "opacity-70" : "opacity-100"
            )}
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
            title={w.title}
          >
            <w.Icon size={14} className="sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs truncate max-w-[80px] sm:max-w-[160px]">{w.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2 text-white">
        <span className="text-[10px] sm:text-xs opacity-90">{time}</span>
      </div>
    </div>
  );
}

function WindowsLogo(){
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="drop-shadow sm:w-[18px] sm:h-[18px]">
      <path d="M3 4l8-1v9H3V4zm9-1l9-1v11h-9V3zM3 13h8v9l-8-1v-8zm9 0h9v10l-9-1V13z"/>
    </svg>
  );
}

// ------------------------------ START MENU ------------------------------
function StartMenu({ open, onOpenFolder }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.12 }}
          className="fixed bottom-10 left-1 sm:left-2 w-[90vw] sm:w-72 max-w-72 rounded-xl overflow-hidden shadow-2xl border"
          style={{ borderColor: XP.taskbarBorder }}
        >
          <div className="bg-white/90">
            <div className="px-2 sm:px-3 py-2 border-b text-sm font-medium" style={{ background: XP.windowBg }}>
              <div className="text-sm sm:text-base">{ANDREW.name}</div>
              <div className="text-xs opacity-70">{ANDREW.title}</div>
            </div>
            <div className="p-1 sm:p-2 max-h-[60vh] overflow-y-auto">
              {DESKTOP_FOLDERS.map((f) => {
                const Icon = ICONS[f.icon];
                return (
                  <button
                    key={f.id}
                    onClick={() => onOpenFolder(f.id)}
                    className="w-full flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5 text-left touch-manipulation"
                  >
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="text-xs sm:text-sm">{f.title}</span>
                    <ChevronRight size={14} className="ml-auto opacity-60 sm:w-4 sm:h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ------------------------------ DESKTOP BACKGROUND ------------------------------
function BlissBackground(){
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0" style={{ background: XP.desktopSky }} />
      <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: XP.desktopHill, clipPath: "ellipse(120% 80% at 50% 100%)" }} />
    </div>
  );
}

// ------------------------------ MAIN APP ------------------------------
export default function WindowsXPPortfolio() {
  const [zTop, setZTop] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [windows, setWindows] = useState([]);
  const { width } = useWindowSize();

  const bringToFront = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: zTop + 1, minimized: false } : w)));
    setZTop((z) => z + 1);
  }, [zTop]);

  const makeWindow = useCallback((folderId) => {
    const def = DESKTOP_FOLDERS.find((f) => f.id === folderId);
    if (!def) return;
    const Icon = ICONS[def.icon];
    const newWin = {
      id: `${folderId}-${Date.now()}`,
      key: `${folderId}-${Date.now()}`,
      folderId,
      title: def.title,
      Icon,
      minimized: false,
      z: zTop + 1,
    };
    setZTop((z) => z + 1);
    setWindows((prev) => [...prev, newWin]);
    setStartOpen(false);
  }, [zTop]);

  const closeWindow = useCallback((id) => setWindows((prev) => prev.filter((w) => w.id !== id)), []);
  const minimizeWindow = useCallback((id) => setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))), []);

  const toggleMinFromTaskbar = useCallback((id) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized, z: zTop + (!w.minimized ? 0 : 1) } : w)));
    setZTop((z) => z + 1);
  }, [zTop]);

  const visibleWindows = windows.filter((w) => !w.minimized);

  return (
    <div className="h-screen w-screen overflow-hidden select-none">
      <BlissBackground />

      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-4 sm:gap-8 md:gap-12">
        <div className="flex flex-col gap-2 sm:gap-4">
          {DESKTOP_FOLDERS.filter((_, i) => i % 2 === 0).map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <DesktopIcon
                key={f.id}
                title={f.title}
                Icon={Icon}
                onOpen={() => makeWindow(f.id)}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          {DESKTOP_FOLDERS.filter((_, i) => i % 2 === 1).map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <DesktopIcon
                key={f.id}
                title={f.title}
                Icon={Icon}
                onOpen={() => makeWindow(f.id)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {visibleWindows.map((w, i) => (
          <XPWindow
            key={w.id}
            id={w.folderId}
            title={w.title}
            Icon={w.Icon}
            content={<WindowContent id={w.folderId} />}
            z={w.z}
            onFocus={() => bringToFront(w.id)}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            defaultPos={{ 
              x: width > 768 ? 140 + (i % 3) * 40 : 20 + (i % 2) * 20, 
              y: width > 768 ? 120 + (i % 3) * 40 : 80 + (i % 2) * 20 
            }}
          />
        ))}
      </AnimatePresence>

      <StartMenu open={startOpen} onOpenFolder={makeWindow} />

      <Taskbar
        windows={windows}
        onToggleMin={toggleMinFromTaskbar}
        onFocusStart={() => setStartOpen((v) => !v)}
      />

    </div>
  );
}