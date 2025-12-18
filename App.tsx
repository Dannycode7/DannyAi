
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import FloatingActionButton from './components/FloatingActionButton';
import ChatWidget from './components/ChatWidget';
import Sidebar from './components/Sidebar';
import { Theme } from './types';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark-red');

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${theme === 'dark-red' ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-8 left-8 z-[80] p-3 rounded-xl lg:hidden transition-all ${
          theme === 'dark-red' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-950 shadow-lg'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <Sidebar 
        theme={theme} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <div className={`transition-all duration-500 lg:ml-72 flex flex-col min-h-screen`}>
        <LandingPage theme={theme} setTheme={setTheme} />
        
        {/* Dark Overlay when chat is open on mobile */}
        {isChatOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in"
            onClick={() => setIsChatOpen(false)}
          />
        )}

        <ChatWidget isOpen={isChatOpen} theme={theme} />
        
        <FloatingActionButton 
          onClick={toggleChat} 
          isOpen={isChatOpen} 
        />
      </div>
    </div>
  );
};

export default App;
