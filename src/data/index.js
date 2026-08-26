import projectChat from "../assets/carrent.png";
import projectRoom from "../assets/jobit.png";
import project3d from "../assets/portfolio.png";
import insight from "../assets/in-blog.png";
import vietnews from "../assets/viet-news.png";

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
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Sass",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Expo", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg" },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
    ],
  },
  // {
  //   name: "3D / Creative",
  //   color: "#22d3ee",
  //   skills: [
  //     { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  //     {
  //       name: "React Three Fiber",
  //       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  //     },
  //     { name: "WebGL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/25/WebGL_Logo.svg" },
  //     { name: "GLSL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg" },
  //   ],
  // },
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
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    name: "Tools",
    color: "#f59e0b",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
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
      "A modern real-time chat platform built as a full-stack monorepo with Web, Mobile and API applications.",
    image: projectChat,
    technologies: ["Next.js", "React Native", "Node.js", "Express.js", "TypeScript", "Socket.IO", "MongoDB"],
    github: "https://github.com/kinghatrung/halo-chat-platform",
    demo: "https://github.com/kinghatrung/halo-chat-platform",
    color: "#4f8ef7",
  },
  {
    number: "02",
    title: "Room Finder Platform",
    description: "Smart rental platform for finding, listing, booking, and managing rooms across Web & Mobile.",
    image: projectRoom,
    technologies: ["Next.js", "React Native", "Node.js", "Express.js", "TypeScript", "MongoDB"],
    github: "https://github.com/kinghatrung/tro_oi_platform",
    demo: "https://github.com/kinghatrung/tro_oi_platform",
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
      "A full-stack news platform with separate Frontend, Backend and Machine Learning services for automated content moderation.",
    image: vietnews,
    technologies: ["React", "Node.js", "Express.js", "Python", "Flask", "NLP", "Machine Learning", "MongoDB"],
    github: "https://github.com/kinghatrung/vietnews",
    demo: "https://vietnews.onrender.com/",
    color: "#f59e0b",
  },
  {
    number: "05",
    title: "Insight - Blog & Analytics Platform",
    description:
      "Full-stack blog platform with analytics dashboard, RBAC, Redis view tracking, Cloudinary and modern React architecture.",
    image: insight,
    technologies: ["React", "Node.js", "Express.js", "TypeScript", "Redis", "Cloudinary", "MongoDB"],
    github: "https://github.com/kinghatrung/Insight_blog",
    demo: "https://insight-blog-eta.vercel.app/",
    color: "#f59e0b",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/kinghatrung", icon: "github" },
  { label: "Facebook", href: "https://www.facebook.com/huyen2706", icon: "facebook" },
  { label: "Email", href: "mailto:nmhuyen2706@gmail.com", icon: "mail" },
];
