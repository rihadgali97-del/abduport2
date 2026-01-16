
import React from 'react';
import { EXPERIENCES } from '../constants';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-24 bg-gray-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">Career Journey</h2>

        <div className="space-y-8 md:space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Layout */}
              <div className="md:grid md:grid-cols-5 md:gap-10">
                {/* Desktop Date Column */}
                <div className="hidden md:block md:col-span-1 text-right pt-2">
                  <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full whitespace-nowrap">{exp.period}</span>
                </div>

                <div className="md:col-span-4 relative border-l-2 border-gray-800 md:border-l-2 md:pl-10 pb-10 md:pb-12 ml-4 md:ml-0">
                  {/* Timeline dot */}
                  <div className="absolute top-1.5 -left-[11px] md:-left-[11px] w-5 h-5 md:w-5 md:h-5 rounded-full bg-gray-950 border-4 border-blue-600 z-10"></div>
                  
                  {/* Mobile Date Label */}
                  <div className="md:hidden mb-4 pl-6">
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest">{exp.period}</span>
                  </div>

                  <div className="bg-gray-900/50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all group ml-6 md:ml-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">{exp.role}</h3>
                        <p className="text-gray-400 text-sm font-medium">{exp.company}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-400 text-xs md:text-sm leading-relaxed">
                          <span className="text-blue-500 mt-1 shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
