
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, PROFILE_IMAGE } from '../constants';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onComingSoon: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onComingSoon }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        const offset = 90; // Balanced offset for the header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      e.preventDefault();
      onComingSoon();
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
        scrolled ? 'py-4 bg-gray-950/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="relative group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
            <img 
              src={PROFILE_IMAGE} 
              alt="Abdusemed A." 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Abdusemed+A&background=2563eb&color=fff";
              }}
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase tracking-widest hidden sm:block">
            Abdusemed
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold text-gray-400 hover:text-white transition-colors relative group uppercase tracking-widest"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button 
            onClick={onComingSoon}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black uppercase tracking-widest transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] text-white"
          >
            Hire Me
          </button>
        </div>

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-950 border-b border-white/10 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold text-gray-300 hover:text-white uppercase tracking-widest"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { onComingSoon(); setMobileMenuOpen(false); }}
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-black uppercase tracking-widest"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
