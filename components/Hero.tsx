
import React, { useState, useRef } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowDown, FileDown, Upload, LogIn, X, CheckCircle2, Loader2, FileText, AlertCircle } from 'lucide-react';

interface HeroProps {
  onComingSoon: () => void;
  cvUrl: string;
  onCvUpdate: (url: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onComingSoon, cvUrl, onCvUpdate }) => {
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleActionClick = (e: React.MouseEvent) => {
    onComingSoon();
  };

  const handleDownloadCVClick = () => {
    setShowDownloadConfirm(true);
  };

  const executeDownload = () => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Abdusemed_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadConfirm(false);
    setCvMenuOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'abdusamada4560@gmail.com' && loginPassword === 'password') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect credentials. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onCvUpdate(result);
        setUploadStatus('success');
        
        setTimeout(() => {
          setUploadStatus('idle');
          setShowLoginModal(false);
          setIsLoggedIn(false);
          setLoginEmail('');
          setLoginPassword('');
          setCvMenuOpen(false);
        }, 2000);
      };
      
      reader.onerror = () => {
        setUploadStatus('idle');
        alert("Failed to read file. Please try again.");
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-20 md:pb-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-60 h-60 md:w-96 md:h-96 bg-blue-600/20 rounded-full filter blur-[60px] md:blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-64 md:h-64 bg-purple-600/20 rounded-full filter blur-[60px] md:blur-[100px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-sm font-bold uppercase tracking-widest animate-bounce">
          Mizan-Tepi University Graduate 2025
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1] sm:leading-tight">
          Designing Intelligent <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Information Systems
          </span>
        </h1>

        <p className="text-sm md:text-lg lg:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          I'm Abdusemed A., specializing in networking infrastructure and robust system architecture. Bridging the gap between complex data and intuitive interfaces.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 w-full max-w-[280px] sm:max-w-none mx-auto">
          <button 
            onClick={handleActionClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-950 font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
          >
            Explore Work
          </button>
          
          <div className="relative w-full sm:w-auto">
            {!cvMenuOpen ? (
              <button 
                onClick={() => setCvMenuOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-95"
              >
                <FileDown size={20} /> CV
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 animate-in fade-in zoom-in-95 duration-200">
                <button 
                  onClick={handleDownloadCVClick}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <FileDown size={18} /> Download
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-blue-800 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={18} /> Upload
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-6">
          {SOCIAL_LINKS.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3.5 md:p-4 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 text-gray-400 hover:text-white transition-all transform hover:scale-110"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Modals remain the same but use responsive padding */}
      {showDownloadConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDownloadConfirm(false)}></div>
          <div className="relative w-full max-w-sm bg-gray-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                <AlertCircle className="text-blue-500" size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Confirm Download</h3>
              <p className="text-gray-400 text-xs md:text-sm mb-6 md:mb-8">Are you sure you want to download Abdusemed's curriculum vitae?</p>
              
              <div className="flex flex-col gap-3">
                <button onClick={executeDownload} className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold">Download PDF</button>
                <button onClick={() => setShowDownloadConfirm(false)} className="w-full bg-white/5 py-4 rounded-xl text-white font-bold border border-white/10">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
          <div className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => { setShowLoginModal(false); setCvMenuOpen(false); }} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>
            {!isLoggedIn ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20"><LogIn className="text-blue-500" size={28} /></div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Admin Access</h3>
                </div>
                <div className="space-y-4">
                  <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Username" className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500" />
                  <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500" />
                </div>
                {loginError && <p className="text-blue-400 text-xs text-center font-bold">{loginError}</p>}
                <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold">Verify</button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6"><FileText className="text-blue-400" size={32} /></div>
                <h3 className="text-xl font-bold text-white mb-2">Upload New CV</h3>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
                <button onClick={() => fileInputRef.current?.click()} className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-3"><Upload size={20} /> Select File</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <ArrowDown size={20} className="text-gray-600" />
      </div>
    </section>
  );
};

export default Hero;
