export const projectCategories = ["Web", "ML", "Cloud", "Mobile"] as const;
export type Category = (typeof projectCategories)[number];
export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  summary: string;
  categories: Category[];
  tech: string[];
  visual: "property" | "imagify" | "netflix" | "heart" | "mask" | "fuel" | "groom" | "generic";
  screenshot: { src: string; alt: string; width: number; height: number } | null;
  github: string | null;
  live: string | null;
  detail: string;
};

// Add a project here. Its displayed number and all project counts are automatic.
// Keep the Property Management System first: it owns the flagship case study.
export const projects: Project[] = ([
  { id: "property", title: "Property Management System", kind: "Full-stack · Real-time", summary: "Property operations, connected through a modern full-stack system.", categories: ["Web"], tech: ["Node.js", "React", "MongoDB", "Socket.IO", "TDD"], visual: "property", screenshot: null, github: null, live: null, detail: "A React and Node.js property management system using MongoDB and Socket.IO, developed with a TDD approach. [ADD DESCRIPTION] — Add your role, key workflows, architecture decisions, and verified results." },
  { id: "imagify", title: "Imagify", kind: "AI image generator", summary: "From a written prompt to a visual possibility, powered by AI.", categories: ["Web", "Cloud"], tech: ["React", "Express", "OpenAI API", "AWS"], visual: "imagify", screenshot: null, github: null, live: null, detail: "An AI image generation project built with React, Express, the OpenAI API, and AWS. [ADD DESCRIPTION] — Add the generation workflow, AWS services used, and your engineering contribution." },
  { id: "netflix", title: "NetflixAlt", kind: "AI-assisted discovery", summary: "A streaming-inspired interface with GPT-powered discovery.", categories: ["Web"], tech: ["React", "Redux", "GPT-3.5-turbo", "Firebase"], visual: "netflix", screenshot: null, github: null, live: null, detail: "A React and Redux project that brings together GPT-3.5-turbo and Firebase. [ADD DESCRIPTION] — Add discovery features, authentication details, and your key implementation decisions." },
  { id: "heart", title: "Heart Disease Prediction", kind: "Machine learning", summary: "A predictive model achieving 94% accuracy.", categories: ["ML"], tech: ["Machine learning"], visual: "heart", screenshot: null, github: null, live: null, detail: "A heart disease prediction machine learning model with 94% accuracy. [ADD DESCRIPTION] — Add the dataset, model, validation method, and evaluation metrics." },
  { id: "mask", title: "Face Mask Detection", kind: "Computer vision", summary: "Exploring visual recognition with a convolutional neural network.", categories: ["ML"], tech: ["CNN"], visual: "mask", screenshot: null, github: null, live: null, detail: "A face mask detection project using a convolutional neural network. [ADD DESCRIPTION] — Add dataset details, model architecture, evaluation, and your contribution." },
  { id: "fuel", title: "FuelLog", kind: "Nutrition & meal prep", summary: "Macro targets, grocery lists, and batch cooking in one meal-prep app.", categories: ["Mobile"], tech: ["[ADD TECH STACK]"], visual: "fuel", screenshot: null, github: null, live: null, detail: "A nutrition and meal-prep app covering macro targets, grocery lists, and a batch cooking guide. [ADD DESCRIPTION] — Add implementation details, target platform, and your contribution." },
  { id: "groom", title: "GroomSync", kind: "Progressive web app", summary: "A grooming reminder PWA for a more intentional routine.", categories: ["Web", "Mobile"], tech: ["PWA"], visual: "groom", screenshot: null, github: null, live: null, detail: "A grooming reminder progressive web app. [ADD DESCRIPTION] — Add reminder behaviour, installability, offline support, and the implementation stack." },
] satisfies Omit<Project, "index">[]).map((project, index) => ({
  ...project,
  index: String(index + 1).padStart(2, "0"),
}));

export const portfolio = {
  name: "Prem",
  fullName: "Prem",
  title: "Software engineer in the making. Product thinker by instinct.",
  description: "Prem — software engineering postgraduate at Deakin University, Melbourne. Building thoughtful web products, cloud systems and machine learning projects. Seeking graduate and internship roles in Australia.",
  location: "Melbourne, Australia",
  availability: "Open to graduate & internship roles",
  graduation: "November 2026",
  email: "lingutlapremkumar2694@gmail.com",
  github: "https://github.com/premkumar2002",
  linkedin: "https://www.linkedin.com/in/premkumar2694/",
  resume: null as string | null, // Add /resume/prem-resume.pdf after placing your PDF in public/resume/.
  nav: [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Stack" },
    { id: "experience", label: "Journey" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "SOFTWARE ENGINEERING · MELBOURNE",
    lines: ["Thoughtful code.", "Real-world impact."],
    intro: "I’m Prem. I build web experiences, explore intelligent systems, and turn complex problems into clear, useful products.",
    footnote: "MASTER OF IT / DEAKIN UNIVERSITY / CLASS OF 2026",
  },
  about: {
    eyebrow: "01 / THE PERSON BEHIND THE PIXELS",
    heading: "Curiosity is the starting point. Craft is the difference.",
    paragraphs: [
      "I’m a Master of Information Technology student at Deakin University, specialising in Software Engineering and Services. Based in Melbourne and graduating in November 2026, I’m looking for a team where I can contribute, learn fast, and build software that matters.",
      "My path has taken me from a Computer Science degree at Amrita University to a software engineering internship at Volvo Group India, where I automated AWS cloud monitoring dashboards using Grafana. Today, I bring that systems mindset to full-stack development, machine learning, and product design.",
    ],
    note: "The sweet spot? Useful products, reliable systems, and the details that make both feel effortless.",
    stats: [
      { value: 93, suffix: "%", label: "B.Sc. aggregate", detail: "Amrita University" },
      { value: 94, suffix: "%", label: "ML model accuracy", detail: "Heart Disease Prediction" },
      { value: projects.length, suffix: "", label: "Projects to explore", detail: projectCategories.join(" · ") },
    ],
  },
  skills: [
    { title: "Languages", code: "01", description: "The foundations for clear, maintainable logic.", items: ["Python", "JavaScript", "TypeScript", "Java", "Kotlin", "C++"] },
    { title: "Frontend", code: "02", description: "Interfaces with intention, from state to styling.", items: ["React", "Redux", "Tailwind CSS"] },
    { title: "Backend & data", code: "03", description: "The systems and storage behind the experience.", items: ["Node.js", "Express", "MongoDB", "MySQL", "PostgreSQL"] },
    { title: "Cloud & DevOps", code: "04", description: "Build, ship, and understand what’s running.", items: ["AWS EC2", "AWS S3", "CloudWatch", "GCP", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Grafana", "Kibana"] },
    { title: "Data & intelligence", code: "05", description: "From structured data to intelligent experiences.", items: ["Pandas", "Scikit-learn", "TensorFlow", "Keras", "OpenAI API"] },
    { title: "Design & mobile", code: "06", description: "Think in journeys. Build for the person using it.", items: ["Figma", "Android Studio"] },
  ],
  experience: [
    { period: "IN PROGRESS · GRADUATING NOV 2026", title: "Master of Information Technology", organisation: "Deakin University", location: "Melbourne, Australia", type: "Education", description: "Specialising in Software Engineering and Services. Building on a Computer Science foundation with a focus on engineering useful, reliable software." },
    { period: "JAN — JUL 2024", title: "Software Engineering Intern", organisation: "Volvo Group India", location: "India", type: "Experience", description: "Automated AWS cloud monitoring dashboards using Grafana, bringing cloud infrastructure signals into a clearer monitoring workflow." },
    { period: "GRADUATED JUN 2024", title: "B.Sc. Computer Science", organisation: "Amrita University", location: "India", type: "Education", description: "Graduated with a 93% aggregate. A strong foundation in computing, carried into full-stack development and machine learning projects." },
  ],
  certifications: [
    { issuer: "Google", title: "UX Design Foundations", mark: "G" },
    { issuer: "Meta", title: "React Developer", mark: "M" },
    { issuer: "ACS", title: "Student Member · since Feb 2025", mark: "A" },
  ],
  caseStudy: {
    eyebrow: "02 / SELECTED WORK",
    headline: "Built to solve. Designed to feel right.",
    label: "FLAGSHIP PROJECT / FULL-STACK",
    heading: "A connected foundation for property management.",
    intro: "A property management system built with React, Node.js and MongoDB, with Socket.IO for real-time communication and a test-driven development approach.",
    chapters: [
      { number: "01", title: "The problem", text: "[ADD DESCRIPTION] — Describe the property management problem, intended users, and their most important workflow." },
      { number: "02", title: "The engineering", text: "React on the frontend. Node.js on the backend. MongoDB for persistence. Socket.IO for real-time communication. A TDD approach to development." },
      { number: "03", title: "The outcome", text: "[ADD DESCRIPTION] — Add verified outcomes, your contribution, test coverage, and what you learned." },
    ],
  },
  contact: {
    eyebrow: "06 / NEXT CHAPTER",
    heading: "Good work starts with a conversation.",
    intro: "Hiring a graduate or intern? Have a product worth building? I’d love to hear about it.",
    note: "Based in Melbourne. Seeking opportunities across Australia.",
  },
  sections: {
    skills: { eyebrow: "03 / THE TOOLKIT", heading: "Versatile by design.", description: "A full-stack perspective, from the first wireframe to the last deployment." },
    journey: { eyebrow: "04 / THE JOURNEY", heading: "Every chapter adds perspective." },
    credentials: { eyebrow: "05 / CONTINUOUS LEARNING" },
  },
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com").replace(/\/$/, "");
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const assetPath = (path: string) => `${basePath}${path}`;
