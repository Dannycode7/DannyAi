
import React from 'react';

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

const FloatingActionButton: React.FC<Props> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full transition-all duration-500 shadow-2xl group border border-zinc-800 ${
        isOpen 
          ? 'bg-zinc-100 text-zinc-950 rotate-45 scale-90' 
          : 'bg-zinc-950 text-zinc-100 hover:bg-zinc-900 animate-float'
      }`}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </div>
      {!isOpen && (
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase font-mono">
          Enter The White Room
        </span>
      )}
    </button>
  );
};

export default FloatingActionButton;
