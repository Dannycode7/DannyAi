
import React from 'react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const LandingPage: React.FC<Props> = ({ theme, setTheme }) => {
  const isDarkRed = theme === 'dark-red';

  return (
    <div className={`min-h-screen transition-all duration-1000 overflow-x-hidden selection:bg-zinc-500 selection:text-white ${isDarkRed ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      {/* Dynamic Background Noise/Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {/* Themed Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-24 -left-24 w-[60vw] h-[60vw] rounded-full blur-[160px] transition-all duration-1000 ${isDarkRed ? 'bg-red-900/10' : 'bg-blue-100/40'}`}></div>
        <div className={`absolute -bottom-24 -right-24 w-[40vw] h-[40vw] rounded-full blur-[140px] transition-all duration-1000 ${isDarkRed ? 'bg-zinc-800/20' : 'bg-slate-200/30'}`}></div>
      </div>

      <nav className={`relative z-10 container mx-auto px-8 py-10 flex justify-between items-center border-b ${isDarkRed ? 'border-zinc-900' : 'border-slate-100'}`}>
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className={`w-12 h-12 transition-all duration-700 flex items-center justify-center rounded-sm ${isDarkRed ? 'bg-zinc-100 rotate-45 group-hover:rotate-180' : 'bg-zinc-900 -rotate-12 group-hover:rotate-0'}`}>
            <div className={`w-6 h-6 transition-colors ${isDarkRed ? 'bg-red-600 rotate-45' : 'bg-blue-500 rotate-12'}`}></div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xl tracking-[0.4em] uppercase font-black leading-none">Architect</span>
            <span className={`text-[8px] font-mono uppercase tracking-[0.6em] mt-1 transition-colors ${isDarkRed ? 'text-red-500' : 'text-blue-500'}`}>White Room Protocol</span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className={`hidden md:flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.3em] ${isDarkRed ? 'text-zinc-600' : 'text-slate-400'}`}>
            <a href="#" className="hover:text-current transition-colors">Archive</a>
            <a href="#" className="hover:text-current transition-colors">Tactiques</a>
            <a href="#" className="hover:text-current transition-colors">Shadow AKD</a>
          </div>
          
          <div className={`flex p-1 rounded-full border transition-colors ${isDarkRed ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
            <button 
              onClick={() => setTheme('white-blue')}
              className={`w-9 h-9 rounded-full transition-all flex items-center justify-center ${theme === 'white-blue' ? 'bg-white shadow-lg scale-110' : 'hover:bg-white/40'}`}
              title="White Room"
            >
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            </button>
            <button 
              onClick={() => setTheme('dark-red')}
              className={`w-9 h-9 rounded-full transition-all flex items-center justify-center ${theme === 'dark-red' ? 'bg-zinc-800 shadow-lg scale-110' : 'hover:bg-zinc-800/50'}`}
              title="Shadow Room"
            >
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-8 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16 opacity-40">
            <span className="w-12 h-[1px] bg-current"></span>
            <span className="text-[10px] font-mono uppercase tracking-[0.8em]">Transmission de Shadow AKD</span>
          </div>

          <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-20 select-none">
            ESPRIT <br /> 
            <span className={`outline-text ${isDarkRed ? 'text-red-950/20' : 'text-blue-900/5'}`}>SANS FAILLE</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-32 items-start">
            <div className="space-y-12">
              <p className={`text-2xl leading-relaxed font-extralight tracking-tight ${isDarkRed ? 'text-zinc-400' : 'text-slate-500'}`}>
                Bienvenue dans l'épicentre du contrôle. Ici, nous ne formons pas des élèves, nous forgeons des <span className="font-normal italic">Anomalies</span>. Une fusion de psychologie noire, de stoïcisme et de puissance physique brute.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {['Kiyotaka Logic', 'Johan Manipulation', 'Physical Hardening', 'Shadow AKD Ethics'].map(tag => (
                  <div key={tag} className={`px-6 py-3 border text-[9px] font-mono uppercase tracking-[0.2em] rounded-none transition-all cursor-default ${isDarkRed ? 'border-zinc-800 text-zinc-500 hover:border-red-900 hover:text-red-500' : 'border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500'}`}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-20 border-l border-current/10 pl-12">
              {[
                { title: 'Anatomie de la Frappe', desc: 'Neutralisation immédiate. Ne frappez pas pour blesser, frappez pour terminer. Maîtrise des points vitaux.' },
                { title: 'Génie Taciturne', desc: 'Le silence est une pression. Apprenez à extraire la vérité des autres sans jamais prononcer un mot superflu.' },
                { title: 'Dissonance Cognitive', desc: 'L\'art de briser la cohérence mentale de votre adversaire pour qu\'il devienne son propre saboteur.' }
              ].map((feature, i) => (
                <div key={i} className="group relative">
                  <span className={`absolute -left-16 top-0 font-mono text-xs opacity-20 transition-opacity group-hover:opacity-100 ${isDarkRed ? 'text-red-500' : 'text-blue-500'}`}>
                    P.0{i+1}
                  </span>
                  <h3 className={`text-sm font-mono uppercase tracking-[0.5em] mb-6 transition-colors ${isDarkRed ? 'text-zinc-100 group-hover:text-red-500' : 'text-slate-900 group-hover:text-blue-600'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors font-light ${isDarkRed ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={`relative z-10 container mx-auto px-8 py-16 border-t flex flex-col md:flex-row justify-between items-end gap-12 ${isDarkRed ? 'border-zinc-900' : 'border-slate-100'}`}>
        <div className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.6em] opacity-30">
            Archive.PDF Chapter 12: Mental Indestructible
          </p>
          <div className="flex gap-4 opacity-20 hover:opacity-100 transition-opacity">
            <div className="w-12 h-[2px] bg-current"></div>
            <div className="w-6 h-[2px] bg-current"></div>
            <div className="w-24 h-[2px] bg-current"></div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mb-2">Architected by</span>
          <div className={`text-xl font-black tracking-[0.3em] uppercase px-6 py-2 transition-all ${isDarkRed ? 'bg-zinc-900 text-white border border-red-900/30' : 'bg-zinc-950 text-white'}`}>
            Shadow AKD
          </div>
        </div>
      </footer>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px currentColor;
          color: transparent;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
