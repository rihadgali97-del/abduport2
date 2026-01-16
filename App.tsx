
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Info } from 'lucide-react';
import { RESUME_URL, PROFILE_IMAGE } from './constants';

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [cvUrl, setCvUrl] = useState<string>(RESUME_URL);

  useEffect(() => {
    const savedCv = localStorage.getItem('abdu_portfolio_cv');
    if (savedCv) {
      setCvUrl(savedCv);
    }
  }, []);

  const handleCvUpdate = (newUrl: string) => {
    setCvUrl(newUrl);
    localStorage.setItem('abdu_portfolio_cv', newUrl);
  };

  const triggerToast = useCallback(() => {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative selection:bg-blue-500 selection:text-white">
      <div className="fixed inset-0 bg-[#030712] z-[-2]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,transparent_50%)] opacity-30 z-[-1]"></div>
      
      {showToast && (
        <div className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-32px)] max-w-md animate-in slide-in-from-top-10 duration-500">
          <div className="bg-blue-600/90 backdrop-blur-xl text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Info size={18} />
            </div>
            <div>
              <p className="font-bold text-xs tracking-wide">Feature coming soon!</p>
              <p className="text-blue-200 text-[9px] font-bold uppercase tracking-widest">Yeroo Dhihootti!</p>
            </div>
          </div>
        </div>
      )}

      <CustomCursor />
      <Navbar onComingSoon={triggerToast} />
      
      <main>
        <Hero onComingSoon={triggerToast} cvUrl={cvUrl} onCvUpdate={handleCvUpdate} />
        
        {/* About Section - Order reversed for mobile (Text first) */}
        <section id="about" className="py-20 md:py-32 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6 md:space-y-8 order-1 md:order-2">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">
                Systems Analyst & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Information Specialist</span>
              </h2>
              <p className="text-gray-400 text-base md:text-xl leading-relaxed">
                I am Abdusemed A., a graduate of <strong>Mizan-Tepi University</strong>. 
                My expertise lies in architecting robust information systems that bridge the gap 
                between raw data and actionable business intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {[
                { title: 'Systems Logic', desc: 'Designing scalable foundations.' },
                { title: 'Full-Stack Dev', desc: 'Modern React interfaces.' },
                { title: 'Data Design', desc: 'Optimizing SQL architectures.' },
                { title: 'MTU Scholar', desc: 'Information Systems Focus.' }
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-blue-600/30 pl-4 py-1">
                  <h4 className="text-white font-bold text-base md:text-lg mb-0.5">{item.title}</h4>
                  <p className="text-gray-500 text-[10px] md:text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={triggerToast}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              My Story
              <span className="text-blue-400">→</span>
            </button>
          </div>

          <div className="relative order-2 md:order-1 mt-8 md:mt-0">
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[4rem] blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative aspect-square max-w-[320px] sm:max-w-[400px] mx-auto md:max-w-none rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={PROFILE_IMAGE} 
                alt="Abdusemed A. Portrait" 
                className="w-full h-full object-cover object-center" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Abdusemed+A&background=2563eb&color=fff";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent"></div>
            </div>

            <div className="absolute -bottom-4 -right-2 md:-bottom-10 md:-right-6 w-32 h-24 md:w-48 md:h-36 bg-blue-600 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-2xl -rotate-6 transition-transform hover:rotate-0 border-4 border-gray-950 z-20">
              <span className="text-xl md:text-4xl font-black tracking-tighter">2025</span>
              <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-80">Class of MTU</span>
              <div className="absolute -top-2 -left-2 w-8 h-8 md:w-10 md:h-10 bg-indigo-500 rounded-full flex items-center justify-center text-xs">🎓</div>
            </div>
          </div>
        </section>

        <Skills />
        <Projects onComingSoon={triggerToast} />
        <Experience />
        <Contact onComingSoon={triggerToast} cvUrl={cvUrl} />
      </main>

      <footer className="py-12 border-t border-white/5 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-gray-500 text-[10px] md:text-sm font-medium">
            © {new Date().getFullYear()} Abdusemed A. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={triggerToast} className="text-gray-500 hover:text-white text-[10px] md:text-sm font-bold uppercase tracking-widest">Privacy</button>
            <button onClick={triggerToast} className="text-gray-500 hover:text-white text-[10px] md:text-sm font-bold uppercase tracking-widest">Terms</button>
          </div>
          <div className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em]">
            Developed with <span className="text-blue-500">✦</span> by Abdu
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;
