export interface Personal {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  availability: string;
}

export interface About {
  bio: string;
  skills: string[];
}

export interface WorkEntry {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  highlights?: string[];
}

export interface OpenSourceEntry {
  project: string;
  role: string;
  link: string;
  description: string;
  highlights?: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  featured: boolean;
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  x: string;
  resume: string;
}

export interface PortfolioData {
  personal: Personal;
  about: About;
  work: WorkEntry[];
  openSource: OpenSourceEntry[];
  projects: Project[];
  achievements: Achievement[];
  socials: Socials;
}
