export const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Experience",     href: "#experience" },
  { label: "Education",      href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

export const logo = "AJ";

export const hero = {
  greeting:    "Hey, I'm",
  name:        "Ajay S",
  
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Software Engineer",
  ],

  tagline: "I build fast, scalable web & mobile apps — specializing in clean, modern full-stack development.",

  cta: {
    primary:   { label: "View My Work",    href: "#projects" },
    secondary: { label: "Download Resume", href: "/AjayS_Resume.pdf" },
  },

  badge: {
    text:   "Available for Work",
    status: "open",
  },

  socials: [
    { label: "GitHub",   href: "https://github.com/Ajay-2k3",                   icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/ajay-s-4b3383267",       icon: "linkedin" },
    { label: "Email",    href: "mailto:ajaysettu1@gmail.com",                    icon: "mail" },
  ],
};

export const about = {
  bio: [
    "I'm a Full Stack Developer (MCA, SRM Easwari Engineering College) with hands-on production experience building web and mobile applications.",
    "During my internship at Bluewhiz Infotech, I reduced API response times by ~35% and developed secure, scalable mobile interfaces connecting users to relational databases.",
    "I'm obsessed with clean architecture, real-time systems, and shipping products that actually work at scale.",
  ],

  stats: [
    { value: 12,  suffix: "+", label: "Projects Built"   },
    { value: 180, suffix: "+", label: "DSA Problems"     },
    { value: 35,  suffix: "%", label: "API Speed Boost"  },
    { value: 15,  suffix: "+", label: "API Endpoints Built"},
  ],

  location: "Chennai, Tamil Nadu, India",
  image:     "/src/assets/hero.png", // fallback or placeholder photo path
};

export const skillCategories = [
  {
    category: "Frontend",
    icon: "layout",
    skills: [
      { name: "React.js",        level: 92 },
      { name: "Next.js",         level: 85 },
      { name: "React Native",    level: 80 },
      { name: "TypeScript",      level: 82 },
      { name: "Tailwind CSS",    level: 90 },
      { name: "Framer Motion",   level: 78 },
    ],
  },
  {
    category: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js",         level: 90 },
      { name: "Express.js",      level: 88 },
      { name: "FastAPI (Python)",level: 75 },
      { name: "Spring Boot",     level: 70 },
      { name: "REST API Design", level: 92 },
      { name: "Apache Kafka",    level: 68 },
    ],
  },
  {
    category: "Database",
    icon: "database",
    skills: [
      { name: "PostgreSQL",      level: 88 },
      { name: "MongoDB",         level: 80 },
      { name: "Redis",           level: 75 },
      { name: "Prisma ORM",      level: 82 },
      { name: "Supabase",        level: 85 },
      { name: "MySQL",           level: 78 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "cloud",
    skills: [
      { name: "Git / GitHub",    level: 90 },
      { name: "Docker",          level: 72 },
      { name: "AWS (EC2, S3)",   level: 68 },
      { name: "CI/CD Pipelines", level: 70 },
      { name: "Vercel",          level: 85 },
      { name: "Linux",           level: 75 },
    ],
  },
];

export const languages = [
  "JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL", "HTML5", "CSS3"
];

export const experience = [
  {
    role:     "Backend Developer Intern",
    company:  "Bluewhiz Infotech Pvt. Ltd.",
    location: "Dindigul, India",
    period:   "Apr 2025 – Aug 2025",
    type:     "Internship",
    stack:    ["React Native", "PostgreSQL", "Supabase", "Node.js", "JWT", "RBAC", "REST APIs", "Tailwind CSS", "Agile"],
    
    highlights: [
      {
        metric: "~35% faster",
        desc:   "Designed 12+ RESTful API endpoints with JWT auth and error-handling middleware — reduced avg response time from ~750 ms to ~490 ms.",
      },
      {
        metric: "RBAC secure",
        desc:   "Architected a cross-platform React Native mobile client supporting secure multi-role RBAC access and optimized transaction processing.",
      },
      {
        metric: "~40% less latency",
        desc:   "Optimized PostgreSQL/Supabase schemas with compound indexing and real-time subscriptions under concurrent user load.",
      },
      {
        metric: "8 bugs fixed",
        desc:   "Reviewed 6 pull requests, enforced RESTful standards, and resolved 8 production defects via systematic log analysis.",
      },
      {
        metric: "3 sprints",
        desc:   "Collaborated across 3 Agile sprint cycles to gather, document, and implement requirements following SDLC best practices.",
      },
    ],
  },
];

export const projects = [
  {
    id:       "ai-stock",
    title:    "AI Stock Prediction & Monitoring System",
    date:     "Mar 2026",
    tagline:  "Real-time NSE/BSE market intelligence with ML ensemble predictions.",
    image:    "/src/assets/hero.png",
    video:    "",
    accent:   "#7c3aed", // violet
    stack:    ["React.js", "Node.js", "TypeScript", "Python FastAPI", "PostgreSQL", "Redis", "Socket.IO", "LSTM", "XGBoost"],
    bullets: [
      "Real-time WebSocket stock streaming, live charts, portfolio analytics, and AI voice assistant — sub-500 ms prediction latency on 500K-row dataset.",
      "Node.js/TypeScript backend with JWT, bcrypt, Helmet, rate limiting, CSRF; background jobs for stock/news fetch, predictions, and WhatsApp alerts.",
      "Python FastAPI ML microservice — ensemble of LSTM, Transformer, Random Forest, XGBoost, and RL models with RAG-style AI context retrieval.",
      "Normalized PostgreSQL schema with Redis caching; ML, data access, and API layers independently testable and horizontally scalable.",
    ],
    links: {
      live:   "",
      github: "https://github.com/Ajay-2k3",
    },
    featured: true,
  },
  {
    id:       "flowerly",
    title:    "Flowerly — Multi-Tenant Floral E-Commerce",
    date:     "2025",
    tagline:  "A 4-tier SaaS e-commerce ecosystem for floral businesses.",
    image:    "/src/assets/hero.png",
    video:    "",
    accent:   "#06b6d4", // cyan
    stack:    ["Next.js 16", "React 19", "Tailwind CSS v4", "Prisma", "Supabase", "Socket.IO", "Razorpay", "Bull MQ", "NextAuth"],
    bullets: [
      "4-tier multi-tenant ecosystem: Customer App, Seller Dashboard, Delivery Agent App, and Admin Analytics Portal — 35+ responsive pages.",
      "Framer Motion animations, Shadcn UI, Recharts data visualizations, glassmorphism design across all tiers.",
      "3-step checkout (Address → Time Slot → Payment) with Razorpay, custom subscription plans, real-time delivery tracking via Socket.IO + Google Maps.",
      "Prisma ORM + Supabase relational schemas, NextAuth RBAC, Redis/Bull MQ for async order processing queues.",
    ],
    links: {
      live:   "",
      github: "https://github.com/Ajay-2k3",
    },
    featured: true,
  },
  {
    id:       "task-portal",
    title:    "TaskSphere — Real-Time Collaboration Portal",
    date:     "2025",
    tagline:  "Real-time task tracking with collaborative canvases and drag-and-drop boards.",
    image:    "/src/assets/hero.png",
    video:    "",
    accent:   "#ec4899", // pink
    stack:    ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Redux Toolkit", "Tailwind CSS", "JWT"],
    bullets: [
      "Designed real-time workspace dashboards using Socket.IO for instant sync of task boards among concurrent users.",
      "Implemented secure JWT authentication, session validations, and custom middleware to prevent unauthorized access.",
      "Optimized MongoDB aggregations to retrieve workspaces, task metrics, and user activity logs with sub-100 ms latency.",
    ],
    links: {
      live:   "",
      github: "https://github.com/Ajay-2k3",
    },
    featured: true,
  },
];

export const education = [
  {
    degree:      "Master of Computer Applications (MCA)",
    institution: "SRM Easwari Engineering College",
    location:    "Chennai, Tamil Nadu",
    period:      "Jun 2024 – May 2026",
    cgpa:        "9.0 / 10",
    status:      "ongoing",
    highlight:   "CGPA 9.0",
  },
  {
    degree:      "Bachelor of Computer Applications (BCA)",
    institution: "Adhiparasakthi College of Arts and Science",
    location:    "Ranipet, Tamil Nadu",
    period:      "2021 – 2024",
    cgpa:        "6.9 / 10",
    status:      "completed",
    highlight:   "Foundation",
  },
];

export const certifications = [
  {
    id:       "jpmorgan",
    title:    "Software Engineering Virtual Experience Program",
    issuer:   "JPMorgan Chase & Co.",
    platform: "Forage",
    date:     "Apr 2026",
    accent:   "#0052cc",
    description:
      "Built a Java-based Apache Kafka consumer microservice for high-volume financial data streams. Integrated JPA entity persistence with REST API using Controller/Service/Repository layering. Validated with 15+ JUnit tests — 100% pass rate.",
    stack: ["Java", "Spring Boot", "JPA", "Apache Kafka", "JUnit"],
    credentialId: "",
    verifyUrl:    "https://forage.com",
  },
  {
    id:       "java-diploma",
    title:    "Diploma in Java Programming",
    issuer:   "Certification Body",
    platform: "In-Person",
    date:     "Nov 2023",
    grade:    "Grade A",
    accent:   "#f59e0b",
    description:
      "Comprehensive Java programming diploma covering OOP, data structures, multithreading, and application development. Achieved Grade A.",
    stack: ["Java", "OOP", "Data Structures"],
  },
  {
    id:       "dsa-leetcode",
    title:    "180+ DSA Problems Solved",
    issuer:   "LeetCode & HackerRank",
    platform: "Online",
    date:     "Ongoing",
    accent:   "#f97316",
    description:
      "Solved 180+ problems covering Dynamic Programming, Graph/Tree Algorithms, Sliding Window, and Binary Search — targeting MNC screening difficulty.",
    stack: ["Dynamic Programming", "Graphs", "Trees", "Binary Search", "Sliding Window"],
  },
];

export const contact = {
  heading:   "Let's Build Something Great.",
  subtext:   "Open to full-time Software Engineer / Full Stack Developer roles. Also happy to collaborate on interesting side projects.",
  email:     "ajaysettu1@gmail.com",
  phone:     "+91-9344170591",
  location:  "Chennai, Tamil Nadu, India",
  socials: [
    { label: "GitHub",   href: "https://github.com/Ajay-2k3",             icon: "github"   },
    { label: "LinkedIn", href: "https://linkedin.com/in/ajay-s-4b3383267", icon: "linkedin" },
    { label: "Email",    href: "mailto:ajaysettu1@gmail.com",               icon: "mail"     },
  ],
  formFields: [
    { name: "name",    label: "Your Name",    type: "text",     placeholder: "John Doe"            },
    { name: "email",   label: "Your Email",   type: "email",    placeholder: "john@example.com"     },
    { name: "subject", label: "Subject",      type: "text",     placeholder: "Let's work together!" },
    { name: "message", label: "Message",      type: "textarea", placeholder: "Tell me about your project..." },
  ],
  submitLabel: "Send Message",
};

export const footer = {
  name:      "Ajay S",
  tagline:   "Built with React · Vite · GSAP · Framer Motion",
  year:      2026,
  marquee: [
    "React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL",
    "Framer Motion", "GSAP", "Supabase", "Redis", "Docker",
    "FastAPI", "MongoDB", "Tailwind CSS", "Socket.IO", "AWS",
  ],
  navLinks: [
    { label: "About",          href: "#about"          },
    { label: "Projects",       href: "#projects"       },
    { label: "Experience",     href: "#experience"     },
    { label: "Contact",        href: "#contact"        },
  ],
};

export const meta = {
  title:       "Ajay S — Full Stack Developer",
  description: "Full Stack Developer specializing in React, Node.js, and scalable web apps. Available for Software Engineer roles.",
  keywords:    ["Full Stack Developer", "MERN Stack", "React Developer", "Node.js", "Chennai", "Ajay S"],
  ogImage:     "/src/assets/hero.png",
  url:         "https://ajay-dev.vercel.app",
};
