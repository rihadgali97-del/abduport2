
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Specialized' | 'Multimedia' | 'Tools';
  level: number; // 0-100
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
