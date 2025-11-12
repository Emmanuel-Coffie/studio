export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML5 & CSS3', level: 100 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Firebase', level: 85 },
      { name: 'SQL (Postgres)', level: 70 },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 60 },
      { name: 'Figma', level: 70 },
      { name: 'Vercel', level: 90 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink: string;
  repoLink: string;
  imagePlaceholder: string;
};

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce site with product listings, user authentication, and a Stripe-integrated checkout process.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Stripe'],
    liveLink: '#',
    repoLink: '#',
    imagePlaceholder: 'project-1',
  },
  {
    id: 'proj-2',
    title: 'Task Management App',
    description:
      'A responsive web app for managing tasks and projects, featuring drag-and-drop functionality and real-time collaboration.',
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    liveLink: '#',
    repoLink: '#',
    imagePlaceholder: 'project-2',
  },
  {
    id: 'proj-5',
    title: 'Strategic Performance Monitoring System',
    description:
      'A system to track and analyze key performance indicators for business strategy, enabling data-driven decision-making.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    liveLink: '#',
    repoLink: '#',
    imagePlaceholder: 'project-5',
  },
  {
    id: 'proj-3',
    title: 'Data Visualization Dashboard',
    description:
      'An analytics dashboard that visualizes complex data sets using D3.js, providing interactive charts and graphs.',
    techStack: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
    liveLink: '#',
    repoLink: '#',
    imagePlaceholder: 'project-3',
  },
  {
    id: 'proj-4',
    title: 'Personal Blog',
    description:
      'A performant, statically-generated blog built with a headless CMS for easy content management and optimal SEO.',
    techStack: ['Gatsby', 'GraphQL', 'Contentful', 'Styled Components'],
    liveLink: '#',
    repoLink: '#',
    imagePlaceholder: 'project-4',
  },
];

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  imagePlaceholder: string;
};

export const blogData: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mastering Modern Web Development',
    excerpt:
      'A deep dive into the tools and techniques that define modern frontend development, from frameworks to build tools.',
    date: 'July 15, 2024',
    link: '#',
    imagePlaceholder: 'blog-1',
  },
  {
    id: 'blog-2',
    title: 'The Art of Clean Code',
    excerpt:
      'Exploring principles of software craftsmanship and how writing clean, maintainable code can improve your projects and career.',
    date: 'June 28, 2024',
    link: '#',
    imagePlaceholder: 'blog-2',
  },
  {
    id: 'blog-3',
    title: 'From Monolith to Microservices',
    excerpt:
      'A case study on migrating a large-scale application architecture, discussing the challenges and benefits.',
    date: 'May 10, 2024',
    link: '#',
    imagePlaceholder: 'blog-3',
  },
];
