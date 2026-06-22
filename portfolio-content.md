# AJAY S — PORTFOLIO CONTENT
> Ready-to-paste content for every section. Use this in `src/data/portfolio.js`

---

## 🔷 NAVBAR

```js
export const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Projects",       href: "#projects" },
  { label: "Experience",     href: "#experience" },
  { label: "Education",      href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",        href: "#contact" },
];

export const logo = "AJ"; // or "Ajay S" — use monogram for magnetic effect
```

---

## 🔷 HERO

```js
export const hero = {
  greeting:    "Hey, I'm",
  name:        "Ajay S",
  
  // Roles for GSAP TextPlugin scramble — cycles through all 3 then settles
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Software Engineer",
  ],

  // Bio line — appears word-by-word via GSAP stagger
  tagline: "I build fast, scalable web & mobile apps — from IoT dashboards to AI-powered stock platforms.",

  // CTA buttons
  cta: {
    primary:   { label: "View My Work",    href: "#projects" },
    secondary: { label: "Download Resume", href: "/AjayS_Resume.pdf" },
  },

  // Floating badge (FM infinite float)
  badge: {
    text:   "Available for Work",
    status: "open", // drives the green pulse dot
  },

  // Social links row
  socials: [
    { label: "GitHub",   href: "https://github.com/Ajay-2k3",                   icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/ajay-s-4b3383267",       icon: "linkedin" },
    { label: "Email",    href: "mailto:ajaysettu1@gmail.com",                    icon: "mail" },
  ],
};
```

---

## 🔷 ABOUT

```js
export const about = {
  // Split into lines for GSAP SplitText line-by-line reveal
  bio: [
    "I'm a Full Stack Developer (MCA, SRM Easwari Engineering College) with hands-on production experience building web and mobile applications.",
    "During my internship at Bluewhiz Infotech, I reduced API response times by ~35% and shipped a React Native IoT app managing 500+ street-light nodes across 5 municipal zones.",
    "I'm obsessed with clean architecture, real-time systems, and shipping products that actually work at scale.",
  ],

  // Stat counters — GSAP countUp on scroll
  stats: [
    { value: 12,  suffix: "+", label: "Projects Built"   },
    { value: 180, suffix: "+", label: "DSA Problems"     },
    { value: 35,  suffix: "%", label: "API Speed Boost"  },
    { value: 500, suffix: "+", label: "IoT Nodes Managed"},
  ],

  location: "Chennai, Tamil Nadu, India",
  image:     "/images/ajay-portrait.jpg", // replace with your actual photo path
};
```

---

## 🔷 SKILLS

```js
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

// Tag cloud — for a secondary "languages" row
export const languages = [
  "JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL", "HTML5", "CSS3"
];
```

---

## 🔷 WORK EXPERIENCE

```js
export const experience = [
  {
    role:     "Backend Developer Intern",
    company:  "Bluewhiz Infotech Pvt. Ltd.",
    location: "Dindigul, India",
    period:   "Apr 2025 – Aug 2025",
    type:     "Internship",
    stack:    ["React Native", "PostgreSQL", "Supabase", "Node.js", "JWT", "RBAC", "REST APIs", "Tailwind CSS", "Agile"],
    
    // Each bullet is a standalone achievement — use for card reveals
    highlights: [
      {
        metric: "~35% faster",
        desc:   "Designed 12+ RESTful API endpoints with JWT auth and error-handling middleware — reduced avg response time from ~750 ms to ~490 ms.",
      },
      {
        metric: "500+ nodes",
        desc:   "Architected a cross-platform React Native IoT app managing real-time street-light telemetry across 5 municipal zones with multi-role RBAC.",
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
```

---

## 🔷 PROJECTS

```js
export const projects = [
  {
    id:       "ai-stock",
    title:    "AI Stock Prediction & Monitoring System",
    date:     "Mar 2026",
    tagline:  "Real-time NSE/BSE market intelligence with ML ensemble predictions.",
    image:    "/images/projects/ai-stock.png",   // replace with screenshot
    video:    "/videos/projects/ai-stock.mp4",   // optional hover-preview
    accent:   "#7c3aed", // violet

    // Shown as animated badges on card hover
    stack:    ["React.js", "Node.js", "TypeScript", "Python FastAPI", "PostgreSQL", "Redis", "Socket.IO", "LSTM", "XGBoost"],

    bullets: [
      "Real-time WebSocket stock streaming, live charts, portfolio analytics, and AI voice assistant — sub-500 ms prediction latency on 500K-row dataset.",
      "Node.js/TypeScript backend with JWT, bcrypt, Helmet, rate limiting, CSRF; background jobs for stock/news fetch, predictions, and WhatsApp alerts.",
      "Python FastAPI ML microservice — ensemble of LSTM, Transformer, Random Forest, XGBoost, and RL models with RAG-style AI context retrieval.",
      "Normalized PostgreSQL schema with Redis caching; ML, data access, and API layers independently testable and horizontally scalable.",
    ],

    links: {
      live:   "", // add if deployed
      github: "https://github.com/Ajay-2k3",
    },

    featured: true,
  },
  {
    id:       "flowerly",
    title:    "Flowerly — Multi-Tenant Floral E-Commerce",
    date:     "2025",
    tagline:  "A 4-tier SaaS e-commerce ecosystem for floral businesses.",
    image:    "/images/projects/flowerly.png",
    video:    "/videos/projects/flowerly.mp4",
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
];
```

---

## 🔷 EDUCATION

```js
export const education = [
  {
    degree:      "Master of Computer Applications (MCA)",
    institution: "SRM Easwari Engineering College",
    location:    "Chennai, Tamil Nadu",
    period:      "Jun 2024 – May 2026",
    cgpa:        "9.0 / 10",
    status:      "ongoing",   // drives a "In Progress" badge
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
```

---

## 🔷 CERTIFICATIONS

```js
export const certifications = [
  {
    id:       "jpmorgan",
    title:    "Software Engineering Virtual Experience Program",
    issuer:   "JPMorgan Chase & Co.",
    platform: "Forage",
    date:     "Apr 2026",
    accent:   "#0052cc",

    // Flip-card back content
    description:
      "Built a Java-based Apache Kafka consumer microservice for high-volume financial data streams. Integrated JPA entity persistence with REST API using Controller/Service/Repository layering. Validated with 15+ JUnit tests — 100% pass rate.",
    stack: ["Java", "Spring Boot", "JPA", "Apache Kafka", "JUnit"],
    credentialId: "", // add if available
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
```

---

## 🔷 CONTACT

```js
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

  // Form field labels (FM stagger reveal)
  formFields: [
    { name: "name",    label: "Your Name",    type: "text",     placeholder: "John Doe"            },
    { name: "email",   label: "Your Email",   type: "email",    placeholder: "john@example.com"     },
    { name: "subject", label: "Subject",      type: "text",     placeholder: "Let's work together!" },
    { name: "message", label: "Message",      type: "textarea", placeholder: "Tell me about your project..." },
  ],

  submitLabel: "Send Message",
};
```

---

## 🔷 FOOTER

```js
export const footer = {
  name:      "Ajay S",
  tagline:   "Built with React · Vite · GSAP · Framer Motion",
  year:      2026,

  // Infinite GSAP marquee — duplicated automatically in component
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
```

---

## 🔷 SEO / META

```js
export const meta = {
  title:       "Ajay S — Full Stack Developer",
  description: "Full Stack Developer specializing in React, Node.js, and scalable web apps. Available for Software Engineer roles.",
  keywords:    ["Full Stack Developer", "MERN Stack", "React Developer", "Node.js", "Chennai", "Ajay S"],
  ogImage:     "/images/og-cover.png",
  url:         "https://ajay-dev.vercel.app", // replace with your actual domain
};
```

---

## 🔷 QUICK COPY — HERO ANIMATION STRINGS

These are ready for GSAP TextPlugin / SplitText:

| Element | Content |
|---------|---------|
| Name (SplitText chars) | `Ajay S` |
| Scramble roles | `Full Stack Developer` → `MERN Stack Engineer` → `Software Engineer` |
| Tagline (word stagger) | `I build fast, scalable web & mobile apps — from IoT dashboards to AI-powered stock platforms.` |
| About kinetic text | `Let's` / `Build` / `Something` / `Great.` |

---

> **File:** `src/data/portfolio.js` — export all constants from here and import in each section component.
