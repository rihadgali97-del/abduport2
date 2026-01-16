
import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone, FileText, ExternalLink } from 'lucide-react';

interface ContactProps {
  onComingSoon: () => void;
  cvUrl: string;
}

const Contact: React.FC<ContactProps> = ({ onComingSoon, cvUrl }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComingSoon();
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Abdusemed_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Let's Create <br /> Something New</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              If you have a project in mind, want to collaborate, or just want to say hi, I'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-gray-900 border border-white/5 group-hover:border-blue-500/30 transition-all">
                  <Mail className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p className="text-gray-400">abdusamada4560@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="p-4 rounded-2xl bg-gray-900 border border-white/5 group-hover:border-blue-500/30 transition-all">
                  <MapPin className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Location</h4>
                  <p className="text-gray-400">Jimma, Ethiopia</p>
                </div>
              </div>
              
              {/* Resume Card */}
              <button 
                onClick={handleDownloadClick}
                className="w-full text-left flex items-start gap-6 group bg-blue-500/5 p-6 rounded-3xl border border-blue-500/10 hover:border-blue-500/40 transition-all hover:bg-blue-500/10"
              >
                <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 group-hover:bg-blue-600 transition-all">
                  <FileText className="text-blue-500 group-hover:text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold mb-1">Detailed Resume</h4>
                    <ExternalLink className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                  </div>
                  <p className="text-gray-400 text-sm">Download full CV as PDF</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-900/50 p-8 md:p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-gray-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all hover:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-gray-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all hover:bg-gray-800"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  placeholder="Tell me about your project..."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all hover:bg-gray-800 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl text-white font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
