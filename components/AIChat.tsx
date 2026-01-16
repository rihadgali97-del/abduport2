
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I\'m Abdu\'s AI twin. Ask me anything about his experience or projects!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const responseText = await getGeminiResponse([...messages, userMessage]);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      {/* Chat Window - Fully Responsive */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-32px)] sm:w-[380px] md:w-[400px] h-[70vh] max-h-[600px] bg-gray-900 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 bg-blue-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Abdu AI Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white/70 text-[10px] uppercase font-bold tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth bg-[#030712]/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800 border border-white/5'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-blue-400" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-800 text-gray-300 border border-white/5 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-800 border border-white/5 flex items-center justify-center">
                    <Loader2 size={14} className="text-blue-400 animate-spin" />
                  </div>
                  <div className="p-3 bg-gray-800 text-gray-500 rounded-2xl text-[11px] italic border border-white/5">
                    Analyzing systems...
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-white/5 bg-gray-900">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Abdu AI..."
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors pr-12"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[9px] text-gray-500 text-center mt-3 uppercase tracking-tighter">
              Powered by Gemini AI • Always verify facts
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white p-4 md:px-6 md:py-4 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95"
        >
          <span className="hidden lg:block font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity absolute -left-20 bg-gray-900 px-3 py-1 rounded-md text-xs border border-white/10 whitespace-nowrap pointer-events-none">
            Ask my AI Assistant
          </span>
          <MessageSquare size={24} />
          <span className="font-bold hidden sm:inline">AI Chat</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 border-2 border-gray-950 rounded-full animate-ping"></span>
        </button>
      )}
    </div>
  );
};

export default AIChat;
