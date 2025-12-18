
import React from 'react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ theme, isOpen, onClose }) => {
  const isDarkRed = theme === 'dark-red';

  const dailyAdvice = [
    "Observez sans réagir. Le premier à parler perd l'initiative.",
    "La fatigue est une illusion mentale. Votre corps peut supporter 40% de plus.",
    "Identifiez la faille émotionnelle de votre interlocuteur : peur, ego ou solitude.",
    "Le silence est une arme de pression psychologique. Utilisez-le après une question.",
    "Conditionnez vos mains à rester immobiles sous le stress."
  ];

  const dailyQuotes = [
    "« La liberté n'est qu'un mot si l'on n'a pas le pouvoir de l'exercer. » — White Room",
    "« Un bon manipulateur ne force jamais, il suggère. » — L'Architecte",
    "« Tout le monde est un outil. » — Kiyotaka",
    "« La vérité n'est pas ce qui est, mais ce que les gens croient être. » — Johan",
    "« Mieux vaut être craint qu'aimé. » — Machiavel"
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 z-[70] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 border-r ${
        isDarkRed 
          ? 'bg-zinc-950 border-zinc-900 text-zinc-100' 
          : 'bg-white border-slate-100 text-slate-900'
      }`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-sm ${isDarkRed ? 'bg-red-600' : 'bg-blue-600'}`}></div>
              <span className="font-mono text-sm tracking-[0.3em] font-bold uppercase">Archive</span>
            </div>
            <button onClick={onClose} className="lg:hidden opacity-50 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar">
            {/* Advice Section */}
            <section>
              <h4 className={`text-[10px] font-mono uppercase tracking-[0.4em] mb-6 opacity-40 flex items-center gap-2`}>
                <span className="w-1 h-1 rounded-full bg-current"></span>
                Conseils du Jour
              </h4>
              <ul className="space-y-4">
                {dailyAdvice.map((advice, i) => (
                  <li key={i} className="group cursor-default">
                    <p className={`text-[11px] font-mono leading-relaxed transition-colors ${isDarkRed ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      <span className="mr-2 opacity-30">—</span> {advice}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Quote Section */}
            <section>
              <h4 className={`text-[10px] font-mono uppercase tracking-[0.4em] mb-6 opacity-40 flex items-center gap-2`}>
                <span className="w-1 h-1 rounded-full bg-current"></span>
                Citations Tactiques
              </h4>
              <ul className="space-y-6">
                {dailyQuotes.map((quote, i) => (
                  <li key={i} className={`p-4 border italic font-serif text-[12px] leading-relaxed rounded-xl transition-all ${isDarkRed ? 'bg-zinc-900/40 border-zinc-900 hover:border-red-900/30' : 'bg-slate-50 border-slate-100 hover:border-blue-100'}`}>
                    {quote}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Footer of Sidebar */}
          <div className="pt-8 border-t border-current/10 mt-8">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-zinc-900 border ${isDarkRed ? 'border-red-900/30 shadow-[0_0_15px_rgba(153,27,27,0.2)]' : 'border-blue-100 shadow-sm'}`}>
                AKD
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase font-black tracking-widest">Shadow Master</span>
                <span className="text-[8px] opacity-40 uppercase tracking-tighter">Identity: Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
