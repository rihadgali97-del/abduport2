
import React from 'react';
import { Project, Skill, Experience } from './types';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const RESUME_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

/** 
 * INSTRUCTIONS FOR ABDUSEMED:
 * To see YOUR specific photo:
 * 1. Upload your photo to GitHub: Abdusamada4560-lab/portfolio-assets
 * 2. Name it "graduation.jpg"
 * 3. The link below will then show your face!
 */
export const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1523240715630-9188450d0325?auto=format&fit=crop&q=80&w=1000';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Network Monitor Pro',
    description: 'A custom dashboard for real-time network traffic analysis and infrastructure health monitoring at the Cisco Center.',
    tech: ['React', 'Python', 'Tailwind'],
    image: 'https://picsum.photos/seed/network/800/600',
    link: '#',
    github: 'https://github.com/Abdusamada4560-lab'
  },
  {
    id: '2',
    title: 'IoT Smart Infrastructure',
    description: 'Implementation of sensor networks for automated facility monitoring and data collection.',
    tech: ['Java', 'Python', 'IoT'],
    image: 'https://picsum.photos/seed/iot/800/600',
    link: '#',
    github: 'https://github.com/Abdusamada4560-lab'
  },
  {
    id: '3',
    title: 'Prison Management System',
    description: 'A secure, high-integrity system designed for managing inmate records, visitor logs, and facility security protocols with robust data encryption.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: 'https://github.com/Abdusamada4560-lab'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Tailwind', category: 'Frontend', level: 95 },
  { name: 'JavaScript', category: 'Frontend', level: 92 },
  { name: 'React', category: 'Frontend', level: 94 },
  { name: 'Java', category: 'Backend', level: 88 },
  { name: 'Python', category: 'Backend', level: 85 },
  { name: 'IoT Architecture', category: 'Specialized', level: 90 },
  { name: 'Cisco Networking', category: 'Specialized', level: 93 },
  { name: 'Video Editing', category: 'Multimedia', level: 89 }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Jimma University Cisco Center',
    role: 'Networking & IoT Specialist',
    period: '2024 - Present',
    description: [
      'Networking troubleshooting and monitoring at Jimma University Cisco Center.',
      'Integration and management of IoT (Internet of Things) infrastructure.',
      'Self-standing video editing for technical project documentation and professional presentations.'
    ]
  },
  {
    company: 'Mizan-Tepi University',
    role: 'B.Sc. in Information Systems',
    period: '2020 - 2025',
    description: [
      'Graduated with a focus on Information Systems architectural logic.',
      'Developed core competencies in systems analysis and full-stack development.'
    ]
  }
];

export const SOCIAL_LINKS = [
  { icon: <Github size={20} />, href: 'https://github.com/Abdusamada4560-lab', label: 'GitHub' },
  { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <Mail size={20} />, href: 'mailto:abdusamada4560@gmail.com', label: 'Email' }
];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skill', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];
