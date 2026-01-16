
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  // Group skills by category for a more structured layout
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gray-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Technical Arsenal</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A specialized stack focused on high-performance infrastructure, networking, and multimedia systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((cat) => (
            <div key={cat} className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4 px-2">{cat}</h3>
              <div className="grid grid-cols-1 gap-4">
                {SKILLS.filter(s => s.category === cat).map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 bg-gray-900/40 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{skill.name}</span>
                        <span className="text-[10px] text-blue-400 font-black bg-blue-500/10 px-2 py-1 rounded-md">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-1500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
