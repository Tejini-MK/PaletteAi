import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, Search, Plus, Heart, User, 
  Menu, Bell, ChevronLeft, MoreHorizontal,
  Play, Filter, Star, Clock, MapPin
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DeviceType } from '@/src/lib/store';

export default function MobileAppTemplate({ device }: { device?: DeviceType }) {
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';

  return (
    <div className="h-full font-sans bg-[var(--preview-bg,var(--bg-app))] text-[var(--text-primary)] transition-colors duration-500 flex flex-col relative overflow-hidden">
      {/* App Header */}
      <header className="px-6 py-8 flex items-center justify-between">
        <button className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[var(--preview-primary)]" />
          <span className="text-xs font-black uppercase tracking-widest">San Francisco, CA</span>
        </div>
        <button className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm relative">
          <Bell size={20} />
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--preview-accent)] border-2 border-[var(--bg-surface)]" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
          <input 
            type="text" 
            placeholder="Discover something new..." 
            className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-4 text-sm font-bold shadow-xl shadow-black/5 outline-none"
          />
        </div>

        {/* Featured Card */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black tracking-tight uppercase italic">Featured <span className="text-[var(--preview-primary)]">Experience</span></h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-[var(--preview-primary)]">View All</button>
          </div>
          <div className={cn(
            "relative rounded-[2.5rem] bg-[var(--preview-gradient)] p-8 text-white flex flex-col justify-end gap-2 overflow-hidden shadow-2xl shadow-[var(--preview-primary)]/20 group",
            isMobile ? "aspect-[4/5]" : "aspect-[16/7]"
          )}>
             <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:scale-125 transition-transform duration-700">
                <Play size={120} fill="currentColor" />
             </div>
             <div className="flex items-center gap-2 mb-2">
               <span className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[8px] font-black uppercase tracking-widest">New Release</span>
               <div className="flex items-center gap-1 text-[8px] font-bold">
                 <Star size={10} fill="currentColor" /> 4.9 (1.2k)
               </div>
             </div>
             <h3 className={cn(
               "font-black tracking-tighter",
               isMobile ? "text-2xl" : "text-4xl"
             )}>Beyond the Horizon</h3>
             <p className="text-xs font-medium opacity-70">A deep dive into immersive spatial design.</p>
          </div>
        </section>

        {/* Categories */}
        <section className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
          {['All', 'Design', 'Development', 'Strategy', 'Marketing'].map((cat, i) => (
            <button 
              key={cat} 
              className={cn(
                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                i === 0 ? "bg-[var(--preview-primary)] text-white shadow-lg shadow-[var(--preview-primary)]/20" : "bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-secondary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Vertical List */}
        <section className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest opacity-40">Popular Tracks</h3>
          <div className="space-y-4">
            {[
              { title: "Fluid Motions", author: "Sarah Lee", time: "12:40", color: "var(--preview-primary)" },
              { title: "Glassmorphism v4", author: "Alex Rivers", time: "08:15", color: "var(--preview-accent)" },
              { title: "Spatial UI", author: "Mike Chen", time: "15:20", color: "var(--preview-secondary)" },
            ].map((track, i) => (
              <div key={i} className="p-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between shadow-sm hover:translate-x-2 transition-transform cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: track.color + '20' }}>
                    <div className="absolute inset-0 opacity-10 group-hover:scale-125 transition-transform" style={{ backgroundColor: track.color }} />
                    <Play size={20} className="relative transition-colors" style={{ color: track.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">{track.title}</h4>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{track.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold">{track.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-6 left-6 right-6 h-18 bg-[var(--bg-surface)]/80 backdrop-blur-2xl rounded-3xl border border-[var(--border-main)] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-around px-4 z-50">
        {[Home, Search, Plus, Heart, User].map((Icon, i) => (
          <button 
            key={i} 
            className={cn(
              "p-3 rounded-2xl transition-all",
              i === 0 ? "bg-[var(--preview-primary)] text-white shadow-lg shadow-[var(--preview-primary)]/20 translate-y-[-10px]" : "text-[var(--text-secondary)] hover:text-[var(--preview-primary)]"
            )}
          >
            <Icon size={20} />
          </button>
        ))}
      </nav>
    </div>
  );
}
