import React from 'react';
import { Code, Copy, Terminal, Download } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

export default function ExportPanel() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a3a6ff', '#9396ff', '#49339d']
    });
  };

  return (
    <aside className="w-80 bg-[#091328] border-l border-white/5 flex flex-col p-6 fixed right-0 top-20 h-[calc(100vh-5rem)] z-40">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-[#dee5ff]">Export Panel</h2>
        <p className="text-[#a3aac4] text-xs mt-1">Material System</p>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        <button 
          onClick={() => handleCopy('/* CSS Export */')}
          className="group flex items-center gap-4 px-4 py-3 rounded-lg text-[#a3aac4] hover:text-[#dee5ff] hover:bg-[#192540] border-r-2 border-transparent hover:border-[#a3a6ff] transition-all duration-200 text-left"
        >
          <Code size={18} className="text-[#a3a6ff]" />
          <span className="text-xs font-bold uppercase tracking-widest leading-none">Export CSS</span>
        </button>

        <button 
          onClick={() => handleCopy('#6366F1')}
          className="group flex items-center gap-4 px-4 py-3 rounded-lg text-[#dee5ff] bg-gradient-to-r from-[#192540] to-transparent border-r-2 border-[#a3a6ff] transition-all duration-200 text-left shadow-lg"
        >
          <Copy size={18} className="text-[#a3a6ff]" />
          <span className="text-xs font-bold uppercase tracking-widest leading-none">Copy HEX</span>
        </button>

        <button 
          onClick={() => handleCopy('// Tailwind Config')}
          className="group flex items-center gap-4 px-4 py-3 rounded-lg text-[#a3aac4] hover:text-[#dee5ff] hover:bg-[#192540] border-r-2 border-transparent hover:border-[#a3a6ff] transition-all duration-200 text-left"
        >
          <Terminal size={18} className="text-[#a3a6ff]" />
          <span className="text-xs font-bold uppercase tracking-widest leading-none">Tailwind Config</span>
        </button>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button 
          onClick={() => confetti()}
          className="w-full bg-gradient-to-br from-[#a3a6ff] to-[#9396ff] text-[#0f00a4] rounded-lg py-3 font-bold text-sm shadow-[0_8px_20px_-4px_rgba(163,166,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Download JSON
        </button>
      </div>
    </aside>
  );
}
