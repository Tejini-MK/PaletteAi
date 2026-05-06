import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Layers, 
  Image as ImageIcon, 
  Search, 
  Layout, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  BarChart3,
  Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useDesignData } from '@/src/contexts/DesignDataContext';
import { usePreviewStore } from '@/src/lib/store';

export default function Dashboard({ setMode }: { setMode: (mode: any) => void }) {
  const { savedThemes, likedGradients, savedPairs, analyzedImagesCount, auditScore, activity7, activity30, resetUsageActivity } = useDesignData();
  const openPreview = usePreviewStore(state => state.openPreview);
  const [period, setPeriod] = React.useState<'7' | '30'>('7');
  
  const currentActivity = period === '7' ? activity7 : activity30;

  const stats = [
    { label: 'Active Themes', value: (savedThemes.length + savedPairs.length).toString(), icon: Palette, color: 'text-blue-400' },
    { label: 'Saved Gradients', value: likedGradients.length.toString(), icon: Layers, color: 'text-purple-400' },
    { label: 'Analysed Images', value: analyzedImagesCount.toString(), icon: ImageIcon, color: 'text-pink-400' },
    { label: 'Audit Score', value: `${auditScore}%`, icon: ShieldCheck, color: 'text-green-400' },
  ];

  /* Combine and sort for recent entries */
  const recentItems = [
    ...savedThemes.map(t => ({ 
      name: t.title, 
      type: 'Theme', 
      date: 'Stored', 
      color: t.colors.primary,
      raw: t 
    })),
    ...savedPairs.map(p => ({
      name: p.name,
      type: 'Set',
      date: 'Generated',
      color: p.colors[0],
      raw: p
    })),
    ...likedGradients.map(g => ({ 
      name: g.name, 
      type: 'Gradient', 
      date: 'Liked', 
      color: g.colors[0],
      raw: g 
    }))
  ].slice(0, 8);

  return (
    <div className="p-6 md:p-12 space-y-12 max-w-7xl mx-auto w-full transition-colors duration-300">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter"
          >
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]">Hub.</span>
          </motion.h1>
          <p className="text-[var(--text-secondary)] text-lg">Your central workspace for color engineering and design systems.</p>
        </div>
        <button 
          onClick={() => setMode('Theme Generator')}
          className="bg-[var(--text-primary)] text-[var(--bg-app)] px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-80 transition-all shadow-xl"
        >
          New Project <Zap size={16} />
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--bg-surface)] p-6 rounded-3xl border border-[var(--border-main)] flex items-center justify-between group hover:bg-[var(--bg-elevated)] transition-all cursor-pointer shadow-lg"
          >
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-[var(--text-primary)]">{stat.value}</h3>
            </div>
            <div className={cn("p-3 rounded-2xl bg-[#a3a6ff]/5 group-hover:scale-110 transition-transform", stat.color)}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity Chart Area */}
        <div className="lg:col-span-2 bg-[var(--bg-surface)] rounded-[2.5rem] p-10 border border-[var(--border-main)] space-y-8 shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
              <BarChart3 size={20} className="text-[#a3a6ff]" /> Usage Activity
            </h3>
            <div className="flex gap-2">
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value as '7' | '30')}
                className="bg-[var(--bg-elevated)] border-none text-xs font-bold text-[var(--text-secondary)] rounded-lg px-4 py-2 outline-none"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
              <button 
                onClick={() => resetUsageActivity(period)}
                className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 rounded-lg text-xs font-bold"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="h-64 overflow-x-auto custom-scrollbar">
            <div className="h-full flex items-end gap-2 px-4 min-w-[600px]">
              {currentActivity.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className={cn(
                    "flex-1 min-w-[12px] rounded-t-lg transition-all",
                    "bg-[#a3a6ff]/20 hover:bg-[#a3a6ff]/40"
                  )}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest px-2">
            {period === '7' ? (
              <>
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </>
            ) : (
              <span>Last 30 Days</span>
            )}
           
          </div>
        </div>

        {/* Recent Sidebar */}
        <div className="bg-[var(--bg-surface)] rounded-[2.5rem] p-10 border border-[var(--border-main)] space-y-8 flex flex-col shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Library Hub</h3>
            <Clock size={16} className="text-[#a3a6ff]" />
          </div>
          
          <div className="space-y-4 flex-1">
            {recentItems.length > 0 ? (
              recentItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  onClick={() => {
                    if (item.type === 'Theme') {
                      const t = item.raw as any;
                      openPreview({
                        primary: t.colors.primary,
                        secondary: t.colors.secondary,
                        accent: t.colors.accent,
                        background: t.colors.background,
                        surface: t.colors.surface
                      });
                    } else if (item.type === 'Set') {
                      const s = item.raw as any;
                      openPreview({
                        primary: s.colors[0],
                        secondary: s.colors[1] || s.colors[0],
                        accent: s.colors[2] || s.colors[0],
                        background: s.colors[1] || '#ffffff',
                        surface: s.colors[3] || '#ffffff'
                      });
                    } else if (item.type === 'Gradient') {
                      const g = item.raw as any;
                      openPreview({
                        primary: g.colors[0],
                        secondary: g.colors[g.colors.length - 1],
                        accent: g.colors[Math.floor(g.colors.length / 2)],
                        gradients: g.colors
                      });
                    }
                  }}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--bg-elevated)] cursor-pointer transition-all border border-transparent hover:border-[var(--border-main)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl shadow-lg border border-white/5" style={{ backgroundColor: item.color }} />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{item.name}</h4>
                      <p className="text-[10px] text-[var(--text-secondary)] font-medium">{item.type}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase">{item.date}</span>
                    <ArrowUpRight size={14} className="text-[#a3a6ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
                <Palette size={40} className="mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">No creations yet.<br/>Start in the AI Engine.</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setMode('Theme Generator')}
            className="w-full py-4 rounded-xl border border-[var(--border-main)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Explore All
          </button>
        </div>
      </div>
    </div>
  );
}
