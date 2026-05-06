import { 
  Layout, 
  Palette, 
  Layers, 
  Image as ImageIcon, 
  ShieldCheck, 
  Monitor,
  Settings as SettingsIcon,
  UserCircle,
  Zap,
  Sun,
  Moon,
  Beaker
} from 'lucide-react';
import { AppMode } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useUser } from '@/src/contexts/UserContext';
import { X } from 'lucide-react';

import { StyleModeSelector } from './style-modes/StyleModeSelector';
import { Sparkles } from 'lucide-react';

interface SideNavBarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SideNavBar({ currentMode, setMode, isOpen, onClose }: SideNavBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { userName, userInitials } = useUser();
  const navItems: { mode: AppMode; icon: any }[] = [
    { mode: 'Dashboard', icon: Layout },
    { mode: 'Theme Generator', icon: Palette },
    { mode: 'Brand DNA', icon: Sparkles },
    { mode: 'Gradient AI', icon: Layers },
    { mode: 'Image Palette', icon: ImageIcon },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed top-0 bottom-0 w-64 bg-[var(--bg-surface)]/80 backdrop-blur-xl border-r border-[var(--border-main)] flex flex-col z-[70] transition-transform duration-300 transform shadow-[20px_0_60px_rgba(0,0,0,0.02)]",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setMode('Dashboard')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-[#a3a6ff] to-[#49339d] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#a3a6ff]/20 group-hover:scale-110 transition-all duration-500">
              <Zap size={20} fill="white" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tighter text-[var(--text-primary)]">PaletteAI</div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#a3a6ff]">Premium Engine</p>
            </div>
          </div>
        </div>
      
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar space-y-8 mt-8">
        <nav className="space-y-1.5">
          <div className="px-4 mb-4 flex justify-between items-center">
            <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] opacity-50">Main Menu</p>
            <div className="flex gap-1">
               <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
               <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
            </div>
          </div>
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => setMode(item.mode)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group relative",
                currentMode === item.mode 
                  ? "bg-white text-[var(--text-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[var(--border-main)]" 
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-main)]/50"
              )}
            >
              <item.icon 
                size={16} 
                className={cn(
                  "transition-all duration-500",
                  currentMode === item.mode ? "text-[#a3a6ff] scale-110" : "text-[var(--text-secondary)] group-hover:scale-110"
                )} 
              />
              {item.mode}
              {currentMode === item.mode && (
                <motion.div 
                  layoutId="active-nav-pill"
                  className="absolute right-3 w-1.5 h-1.5 bg-[#a3a6ff] rounded-full shadow-[0_0_10px_#a3a6ff]"
                />
              )}
            </button>
          ))}
        </nav>



        {/* AI Infrastructure Status */}
        <div className="px-4 py-6 bg-gradient-to-br from-[#a3a6ff08] to-transparent rounded-[2rem] border border-[#a3a6ff15] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)]">AI Neural Load</span>
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Optimal</span>
          </div>
          <div className="h-1 w-full bg-[var(--border-main)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              className="h-full bg-gradient-to-r from-[#a3a6ff] to-[#49339d] rounded-full"
            />
          </div>
          <p className="text-[7px] font-bold text-[var(--text-secondary)] opacity-40 uppercase leading-relaxed">
            Infrastructure running on Groq Llama 3.3 with Gemini fallback.
          </p>
        </div>
      </div>

      <div className="p-6 mt-auto">
        <div className="bg-[var(--bg-elevated)]/50 backdrop-blur-lg p-4 rounded-[2rem] border border-[var(--border-main)] flex items-center justify-between group hover:bg-[var(--bg-elevated)] transition-colors">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a3a6ff] to-[#49339d] flex items-center justify-center font-black text-white shadow-xl group-hover:rotate-6 transition-transform">
               {userInitials}
             </div>
             <div className="overflow-hidden">
               <p className="text-xs font-black text-[var(--text-primary)] leading-none truncate w-24">{userName}</p>
               <div className="flex items-center gap-1 mt-1">
                 <div className="w-1 h-1 rounded-full bg-[#a3a6ff]" />
                 <p className="text-[8px] font-black text-[#a3a6ff] uppercase tracking-widest">Founder Tier</p>
               </div>
             </div>
          </div>
          <button 
            onClick={() => setMode('Settings')}
            className={cn(
              "p-2.5 rounded-xl transition-all",
              currentMode === 'Settings' ? "bg-[#a3a6ff] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            <SettingsIcon size={16} />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
