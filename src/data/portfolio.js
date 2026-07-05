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
    "Software Engineer",
    "Freelance Developer"
  ],

  tagline: "I build production-grade web systems — from AI-powered prediction engines to multi-tenant e-commerce platforms — with clean architecture and measurable impact.",

  cta: {
    primary:   { label: "View My Work",    href: "#projects" },
    secondary: { label: "Download Resume", href: "/AjayS_Resume.pdf" },
  },

  badge: {
    text:   "Fresher · Freelance Developer · Open to Full-Time Roles",
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
    "I'm Ajay S, a Full Stack Developer who completed my MCA at SRM Easwari Engineering College in May 2026. I specialize in building scalable systems with React.js, Next.js, Node.js, TypeScript, and PostgreSQL — and I currently work as a freelance developer while actively seeking full-time opportunities.",
    "During my internship at Bluewhiz Infotech, I shipped 12+ production API endpoints that cut response time by 35% and reduced query latency by 40%. As a freelancer, I've since built an AI stock prediction platform running ensemble ML models at sub-500ms latency, and Flowerly — a 4-tier multi-tenant e-commerce ecosystem spanning 35+ pages.",
    "I care about clean architecture, horizontal scalability, and writing code that's actually testable — not just code that works."
  ],

  stats: [
    { value: 12,  suffix: "+", label: "API Endpoints Shipped" },
    { value: 35,  suffix: "%", label: "Faster API Response Time" },
    { value: 500, suffix: "K", label: "Rows Processed at <500ms" },
    { value: 180, suffix: "+", label: "DSA Problems Solved" },
  ],

  location: "Chennai, Tamil Nadu, India",
  image:     "/src/assets/hero.png",
};

export const skillCategories = [
  {
    category: "Languages",
    icon: "code",
    skills: [
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "TypeScript",       level: 88 },
      { name: "Python",           level: 82 },
      { name: "Java",             level: 80 },
      { name: "SQL",              level: 85 },
      { name: "HTML5",            level: 90 },
      { name: "CSS3",             level: 88 }
    ]
  },
  {
    category: "Frontend",
    icon: "layout",
    skills: [
      { name: "React.js",        level: 92 },
      { name: "Next.js",         level: 88 },
      { name: "React Native",    level: 80 },
      { name: "Tailwind CSS",    level: 90 },
      { name: "Framer Motion",   level: 82 },
      { name: "Shadcn UI",       level: 88 },
      { name: "Redux",           level: 84 },
      { name: "Bootstrap",       level: 80 }
    ],
  },
  {
    category: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js",         level: 90 },
      { name: "Express.js",      level: 88 },
      { name: "FastAPI",         level: 80 },
      { name: "Spring Boot",     level: 78 },
      { name: "Apache Kafka",    level: 75 },
      { name: "JWT",             level: 88 },
      { name: "RBAC",            level: 85 },
      { name: "Microservices",   level: 82 }
    ],
  },
  {
    category: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL",      level: 88 },
      { name: "MySQL",           level: 82 },
      { name: "MongoDB",         level: 85 },
      { name: "Redis",           level: 80 },
      { name: "Supabase",        level: 88 },
      { name: "Prisma ORM",      level: 85 }
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "cloud",
    skills: [
      { name: "Docker",          level: 82 },
      { name: "GitHub Actions",  level: 85 },
      { name: "AWS (EC2, S3)",   level: 78 },
      { name: "Azure",           level: 75 },
      { name: "Vercel",          level: 88 },
      { name: "Vite",            level: 85 },
      { name: "Postman",         level: 90 }
    ],
  },
  {
    category: "Practices",
    icon: "code",
    skills: [
      { name: "OOP",             level: 88 },
      { name: "TDD",             level: 80 },
      { name: "Design Patterns", level: 82 },
      { name: "System Design",   level: 84 },
      { name: "Agile/Scrum",     level: 88 },
      { name: "DSA",             level: 85 },
      { name: "Code Review",     level: 85 }
    ]
  }
];

export const languages = [
  "JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL", "HTML5", "CSS3",
  "Git", "GitHub", "Postman", "Vite", "Shadcn UI", "Tailwind CSS", "Redux", "Docker", "Agile/Scrum"
];

export const experience = [
  {
    role:     "Backend Developer Intern",
    company:  "Bluewhiz Infotech Pvt. Ltd.",
    location: "Dindigul, India",
    period:   "Apr 2025 – Aug 2025",
    type:     "Internship",
    stack:    ["React Native", "Node.js", "PostgreSQL", "Supabase", "REST APIs", "JWT", "RBAC", "Git", "Agile/Scrum"],
    
    highlights: [
      {
        metric: "⚡ 35% Faster",
        desc:   "Designed 12+ RESTful endpoints with JWT auth, validation, and error-handling middleware — 750ms → 490ms.",
      },
      {
        metric: "📡 500+ Nodes",
        desc:   "Deployed a React Native app managing real-time data for 500+ street-light nodes across 5 municipal zones.",
      },
      {
        metric: "🗄️ 40% Less",
        desc:   "Optimized PostgreSQL/Supabase schemas via compound indexing and real-time subscriptions.",
      },
      {
        metric: "🔍 6 PRs",
        desc:   "Reviewed 6 PRs enforcing clean-code standards; resolved 8 production defects via systematic log analysis.",
      },
      {
        metric: "🔄 3 Sprints",
        desc:   "Delivered features across 3 sprint cycles — requirements gathering through tested release, SDLC-aligned.",
      },
    ],
  },
];

export const projects = [
  {
    id:       "ai-stock",
    title:    "AI Stock Prediction & Monitoring System",
    date:     "March 2026",
    tagline:  "A full-stack Indian stock market platform (NSE/BSE) delivering real-time WebSocket data, AI-driven predictions, and a voice-enabled assistant — engineered for sub-500ms latency on a 500,000-row dataset.",
    image:    "/src/assets/hero.png",
    video:    "",
    accent:   "#7c3aed",
    stack:    ["React.js", "Node.js", "TypeScript", "Python FastAPI", "PostgreSQL", "Redis", "Socket.IO", "LSTM", "Transformer", "XGBoost"],
    bullets: [
      "ML ensemble: LSTM + Transformer + Random Forest + XGBoost + Reinforcement Learning",
      "RAG-style AI context retrieval with voice responses",
      "Sub-500ms prediction latency at 500K-row scale",
      "Secure Node.js backend: JWT · bcrypt · Helmet · rate limiting · CSRF protection",
      "Redis caching + optimized PostgreSQL aggregation queries",
    ],
    links: {
      live:   "",
      github: "https://github.com/Ajay-2k3",
    },
    featured: true,
  },
  {
    id:       "flowerly",
    title:    "Flowerly — Multi-Tenant Floral E-Commerce Platform",
    date:     "2026",
    tagline:  "A 4-tier multi-tenant ecosystem — Customer App, Seller Dashboard, Delivery Agent App, Admin Portal — built across 35+ responsive pages with glassmorphism UI and real-time order tracking.",
    image:    "/src/assets/hero.png",
    video:    "",
    accent:   "#06b6d4",
    stack:    ["Next.js 16", "React 19", "Tailwind CSS v4", "Prisma", "Supabase", "PostgreSQL", "Socket.IO", "Razorpay", "Bull MQ", "NextAuth"],
    bullets: [
      "4-tier architecture across 35+ responsive pages",
      "3-step checkout (Address → Slot → Payment) via Razorpay",
      "Real-time delivery tracking: Socket.IO + Google Maps API",
      "Glassmorphism UI with Framer Motion + Recharts",
      "Redis/Bull MQ async queues + NextAuth RBAC",
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
    institution: "SRM Easwari Engineering College, Chennai",
    location:    "Chennai, Tamil Nadu",
    period:      "Jun 2024 – May 2026",
    cgpa:        "8.37 / 10",
    status:      "Completed",
    highlight:   "CGPA 8.37 / 10",
    description: "Completed advanced master-level computer applications degree. Specialized in full-stack web architectures, software engineering, enterprise systems, and databases.",
  },
  {
    degree:      "Bachelor of Computer Applications (BCA)",
    institution: "Adhiparasakthi College of Arts & Science, Ranipet",
    location:    "Ranipet, Tamil Nadu",
    period:      "2021 – 2024",
    cgpa:        "6.9 / 10",
    status:      "Completed",
    highlight:   "CGPA 6.9 / 10",
    description: "Completed standard undergraduate computer applications curriculum with core coursework in Object Oriented Programming and Database Systems.",
  },
];

export const certifications = [
  {
    id:       "jpmorgan",
    title:    "Software Engineering Virtual Experience",
    issuer:   "JPMorgan Chase × Forage",
    platform: "Forage",
    date:     "April 2026",
    accent:   "#0052cc",
    description: "Built a Kafka consumer microservice in Java/Spring Boot with JPA persistence; 15+ JUnit tests, 100% pass rate.",
    stack: ["Java", "Spring Boot", "JPA", "Apache Kafka", "JUnit"],
    credentialId: "",
    verifyUrl:    "https://forage.com",
  },
  {
    id:       "java-diploma",
    title:    "Diploma in Java Programming",
    issuer:   "Certification Body",
    platform: "In-Person",
    date:     "November 2023",
    grade:    "Grade A",
    accent:   "#f59e0b",
    description: "Comprehensive Java programming diploma covering OOP, data structures, multithreading, and application development. Achieved Grade A.",
    stack: ["Java", "OOP", "Data Structures"],
  },
  {
    id:       "dsa-leetcode",
    title:    "180+ DSA Problems Solved",
    issuer:   "LeetCode",
    platform: "Online",
    date:     "April 2026",
    accent:   "#f97316",
    description: "Solved 180+ problems covering Dynamic Programming, Graph/Tree Algorithms, Sliding Window, and Binary Search — MNC screening level.",
    stack: ["Dynamic Programming", "Graphs", "Trees", "Binary Search", "Sliding Window"],
  },
];

export const contact = {
  heading:   "Let's Build Something Great.",
  subtext:   "I'm a fresher actively seeking full-time Full Stack Developer / Software Engineer roles, and also open to freelance projects. If you're building something real, let's talk.",
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
    { name: "message", label: "Message",      type: "textarea", placeholder: "Tell me about your project..." },
  ],
  submitLabel: "Send Message",
};

export const footer = {
  name:      "Ajay S",
  tagline:   "Built with React · Vite · GSAP · Framer Motion",
  year:      2025,
  marquee: [
    "Full Stack Developer", "React.js", "Node.js", "TypeScript",
    "Fresher", "Freelance", "Open to Work", "Chennai, India"
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
  description: "Full Stack Developer & Software Engineer. I build production-grade web systems with clean architecture and measurable impact. Available for full-time roles and freelance projects.",
  keywords:    ["Full Stack Developer", "Software Engineer", "Freelance Developer", "React", "Node.js", "Chennai", "Ajay S"],
  ogImage:     "/src/assets/hero.png",
  url:         "https://ajay-dev.vercel.app",
};
