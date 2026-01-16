
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  onComingSoon: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onComingSoon }) => {
  const [activeTech, setActiveTech] = useState<string>('All');

  const techFilters = useMemo(() => {
    const techs = new Set<string>();
    PROJECTS.forEach(project => project.tech.forEach(t => techs.add(t)));
    return ['All', ...Array.from(techs).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTech === 'All') return PROJECTS;
    return PROJECTS.filter(project => project.tech.includes(activeTech));
  }, [activeTech]);

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    if (url === '#' || !url) {
      e.preventDefault();
      onComingSoon();
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured Work</h2>
            <p className="text-gray-400 text-base md:text-lg">
              A curated selection of systems and networking projects crafted with technical precision.
            </p>
          </div>
        </div>

        {/* Technology Filter Bar - Now horizontally scrollable on mobile */}
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 ml-1">Filter by Tech:</p>
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  activeTech === tech
                    ? 'bg-blue-600 border-blue-600 text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)]'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative bg-gray-900/40 rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-blue-500/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80"></div>
                
                {/* Visual Actions - Large targets for touch */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  {project.github && (
                    <a 
                      href={project.github} 
                      onClick={(e) => handleLinkClick(e, project.github || '#')}
                      className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-blue-600"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  <a 
                    href={project.link} 
                    onClick={(e) => handleLinkClick(e, project.link)}
                    className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-blue-600"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all ${
                        activeTech === t 
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' 
                        : 'bg-white/5 text-gray-500 border-white/5'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center animate-in fade-in duration-500">
            <p className="text-gray-500 text-lg mb-4 italic">No projects match this technology.</p>
            <button onClick={() => setActiveTech('All')} className="text-blue-500 font-bold hover:underline">View all projects</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
