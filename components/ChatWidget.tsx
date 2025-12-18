
import React, { useState, useEffect, useRef } from 'react';
import { architectAI } from '../services/geminiService';
import { Message, Theme } from '../types';

interface Props {
  isOpen: boolean;
  theme: Theme;
}

const ChatWidget: React.FC<Props> = ({ isOpen, theme }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDarkRed = theme === 'dark-red';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await architectAI.sendMessage(input, messages);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.text,
      imageUrl: response.imageUrl,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 md:inset-auto md:right-8 md:bottom-28 md:w-[450px] lg:w-[500px] md:h-[70vh] lg:h-[750px] border shadow-[0_30px_100px_rgba(0,0,0,0.5)] z-[90] flex flex-col transition-all duration-700 rounded-none md:rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-bottom-12 ${
      isDarkRed 
        ? 'bg-zinc-950 border-zinc-800 text-zinc-100' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Terminal Header */}
      <div className={`p-6 md:p-8 border-b flex items-center justify-between backdrop-blur-3xl ${isDarkRed ? 'bg-zinc-950/90 border-zinc-900' : 'bg-white/90 border-slate-100'}`}>
        <div className="flex items-center gap-4 md:gap-5">
          <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center font-mono text-sm md:text-lg relative group overflow-hidden border transition-all ${isDarkRed ? 'bg-zinc-900 text-red-500 border-zinc-700 shadow-lg shadow-red-900/10' : 'bg-slate-100 text-blue-600 border-slate-200'}`}>
             <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity animate-pulse ${isDarkRed ? 'bg-red-500' : 'bg-blue-500'}`}></div>
             <span className="relative z-10 font-black">Ω</span>
          </div>
          <div>
            <h3 className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-black leading-tight">L'Architecte</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDarkRed ? 'bg-red-600' : 'bg-blue-600'}`}></span>
              <p className="text-[9px] opacity-40 uppercase tracking-[0.1em] md:tracking-[0.2em] font-mono whitespace-nowrap">v3.5 Terminal Active</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
           <div className={`w-2 h-2 rounded-full ${isDarkRed ? 'bg-zinc-800' : 'bg-slate-200'}`}></div>
           <div className={`w-2 h-2 rounded-full ${isDarkRed ? 'bg-zinc-800' : 'bg-slate-200'}`}></div>
        </div>
      </div>

      {/* Message Feed */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-6 md:p-10 space-y-10 md:space-y-12 scroll-smooth custom-scrollbar ${isDarkRed ? 'bg-zinc-950' : 'bg-slate-50/50'}`}
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 px-8 md:px-12">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border border-dashed flex items-center justify-center opacity-10 animate-spin-slow ${isDarkRed ? 'border-red-900' : 'border-blue-400'}`}>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-current rounded-full blur-2xl"></div>
            </div>
            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] leading-[2] md:leading-[2.5] opacity-20">
              Prêt pour l'analyse comportementale ou physique. <br className="hidden md:block" /> Établissez le contact.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} group`}
          >
            <div 
              className={`max-w-[95%] p-5 md:p-6 rounded-[1.4rem] md:rounded-[1.8rem] font-mono text-[11px] md:text-[12px] leading-relaxed transition-all relative ${
                msg.role === 'user' 
                  ? (isDarkRed ? 'bg-zinc-100 text-zinc-950 rounded-tr-none' : 'bg-zinc-900 text-white rounded-tr-none') 
                  : (isDarkRed ? 'bg-zinc-900/60 text-zinc-300 border border-zinc-800 rounded-tl-none shadow-inner' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-xl shadow-slate-200/50')
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.imageUrl && (
                <div className="mt-5 md:mt-6 overflow-hidden rounded-xl md:rounded-2xl border border-zinc-800 shadow-2xl transition-transform duration-700">
                  <img src={msg.imageUrl} alt="Strategic Data" className="w-full h-auto grayscale-80 hover:grayscale-0 transition-all duration-1000" />
                </div>
              )}
            </div>
            <span className={`text-[8px] opacity-20 mt-3 md:mt-4 font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] ${msg.role === 'user' ? 'mr-2' : 'ml-2'}`}>
              {msg.role === 'user' ? 'Subject' : 'Architect'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 pl-2 animate-pulse">
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkRed ? 'bg-red-900' : 'bg-blue-300'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkRed ? 'bg-red-700' : 'bg-blue-500'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkRed ? 'bg-red-500' : 'bg-blue-700'}`}></div>
            <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.4em] md:tracking-[0.5em] opacity-30 ml-2">Traitement...</span>
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <div className={`p-6 md:p-10 border-t ${isDarkRed ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-slate-100'}`}>
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Soumettez votre requête..."
            className={`w-full border rounded-[1.2rem] md:rounded-[1.5rem] py-4 md:py-6 pl-6 md:pl-8 pr-12 md:pr-16 text-[11px] md:text-[12px] font-mono focus:outline-none transition-all ${
              isDarkRed 
                ? 'bg-zinc-900 border-zinc-800 focus:border-red-900/40 text-zinc-100 placeholder:text-zinc-700' 
                : 'bg-slate-50 border-slate-200 focus:border-blue-400/30 text-slate-900 placeholder:text-slate-400'
            }`}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className={`absolute right-3 md:right-5 top-1/2 -translate-y-1/2 p-2 md:p-3 transition-all disabled:opacity-30 rounded-full ${isDarkRed ? 'text-zinc-500 hover:text-red-500' : 'text-slate-400 hover:text-blue-600'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between items-center mt-6 md:mt-8 opacity-20">
           <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-mono">Shadow Protocol v3.5</p>
           <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-mono">White Room Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
