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
    id: 'proj-2',
    title: 'Task Management App',
    description:
      'A responsive web app designed for student athletes to balance academics and training schedules effectively.',
    techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    liveLink: 'https://studio--studio-9801103337-6fd4f.us-central1.hosted.app/',
    repoLink: '',
    imagePlaceholder: 'project-2',
  },
  {
    id: 'proj-5',
    title: 'Strategic Performance Monitoring System',
    description:
      'A system to track and analyze key performance indicators for business strategy, enabling data-driven decision-making.',
    techStack: ['React', 'Node.js', 'MySQL', 'MUI', 'Chart.js'],
    liveLink: 'https://performance-admin.vercel.app/',
    repoLink: 'https://github.com/Emmanuel-Coffie/performance-admin',
    imagePlaceholder: 'project-5',
  },
  {
    id: 'proj-3',
    title: 'Data Visualization Dashboard',
    description:
      'An analytics dashboard that visualizes complex data sets using D3.js, providing interactive charts and graphs.',
    techStack: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
    liveLink: '',
    repoLink: 'https://github.com/Emmanuel-Coffie/Call-center-data',
    imagePlaceholder: 'project-3',
  },
  {
    id: 'proj-4',
    title: 'Personal Blog',
    description:
      'A performant, statically-generated blog built with a headless CMS for easy content management and optimal SEO.',
    techStack: ['Gatsby', 'GraphQL', 'Contentful', 'Styled Components'],
    liveLink: '',
    repoLink: '',
    imagePlaceholder: 'project-4',
  },
];

export type Experience = {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
};

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'Full-Stack Developer',
    organization: 'Tech Innovators Inc.',
    period: '2023 - Present',
    description: 'Leading the development of scalable web applications using React and Node.js. Focused on optimizing performance and user experience.',
    type: 'work',
  },
  {
    id: 'exp-2',
    title: 'Freelance Software Engineer',
    organization: 'Self-Employed',
    period: '2021 - 2023',
    description: 'Developed custom digital solutions for small businesses, including e-commerce platforms and automated booking systems.',
    type: 'work',
  },
  {
    id: 'exp-3',
    title: 'B.Sc. Computer Science',
    organization: 'University of Technology',
    period: '2017 - 2021',
    description: 'Graduated with honors, focusing on software engineering principles, algorithms, and data structures.',
    type: 'education',
  },
  {
    id: 'exp-4',
    title: 'Collegiate Track Athlete',
    organization: 'University Athletics',
    period: '2017 - 2021',
    description: 'Represented the university in regional and national competitions, balancing rigorous training with academic excellence.',
    type: 'achievement',
  },
];
