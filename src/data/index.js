import projectChat from "../assets/carrent.png";
import projectRoom from "../assets/jobit.png";
import project3d from "../assets/tripguide.png";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const experiences = [
  {
    title: "Frontend Engineer Intern",
    company: "Tech Startup",
    duration: "Jun 2024 – Sep 2024",
    description:
      "Built responsive React dashboards, integrated REST APIs, and improved core UI performance by 40% through code splitting and lazy loading techniques.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    iconBg: "#1e3a5f",
  },
  {
    title: "Freelance Creative Developer",
    company: "Self-employed",
    duration: "Jan 2024 – Present",
    description:
      "Designed and developed immersive 3D web experiences for clients using Three.js and React Three Fiber. Delivered end-to-end solutions from design system to deployment.",
    technologies: ["Three.js", "React Three Fiber", "Framer Motion", "GSAP"],
    iconBg: "#1a1a2e",
  },
  {
    title: "Full-Stack Developer",
    company: "Open Source Projects",
    duration: "Aug 2023 – Present",
    description:
      "Contributed to open source projects, building full-stack features using Node.js, PostgreSQL, and WebSocket for real-time communication platforms.",
    technologies: ["Node.js", "PostgreSQL", "Socket.IO", "Docker"],
    iconBg: "#0d2137",
  },
  {
    title: "Computer Science Student",
    company: "University",
    duration: "Sep 2022 – Present",
    description:
      "Pursuing Computer Science with a focus on web technologies, algorithms, and software engineering principles. Dean's List recipient for two consecutive semesters.",
    technologies: ["React", "Next.js", "Python", "Data Structures"],
    iconBg: "#1a0a2e",
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    color: "#4f8ef7",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    name: "3D / Creative",
    color: "#22d3ee",
    skills: [
      { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
      {
        name: "React Three Fiber",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      { name: "WebGL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/25/WebGL_Logo.svg" },
      { name: "GLSL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg" },
    ],
  },
  {
    name: "Backend",
    color: "#7c3aed",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    name: "Tools",
    color: "#f59e0b",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },
];

export const projects = [
  {
    number: "01",
    title: "Real-time Chat Platform",
    description:
      "A full-stack messenger-style application with real-time messaging, story sharing, file uploads, and end-to-end encryption. Built for performance with Socket.IO and optimized React Native client.",
    image: projectChat,
    technologies: ["React", "Node.js", "Socket.IO", "PostgreSQL"],
    github: "https://github.com/",
    demo: "https://github.com/",
    color: "#4f8ef7",
  },
  {
    number: "02",
    title: "Room Finder Platform",
    description:
      "A property rental platform with advanced map-based search, real-time availability, and landlord management portal. Features PostGIS spatial queries and a Next.js front-end.",
    image: projectRoom,
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/",
    demo: "https://github.com/",
    color: "#7c3aed",
  },
  {
    number: "03",
    title: "3D Creative Portfolio",
    description:
      "This very website — an immersive 3D portfolio built with React Three Fiber, custom GLSL shaders, and Framer Motion. Features interactive scenes, custom cursor, and cinematic loading screen.",
    image: project3d,
    technologies: ["React", "Three.js", "React Three Fiber", "Framer Motion"],
    github: "https://github.com/",
    demo: "#",
    color: "#22d3ee",
  },
  {
    number: "04",
    title: "News Aggregation Platform",
    description:
      "An AI-powered news aggregation platform that crawls, categorizes, and surfaces relevant articles. Python backend with NLP sentiment analysis and a clean editorial React UI.",
    image: null,
    technologies: ["React", "Express", "Python", "NLP"],
    github: "https://github.com/",
    demo: "https://github.com/",
    color: "#f59e0b",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
  { label: "Email", href: "mailto:huyen@example.com", icon: "mail" },
];
