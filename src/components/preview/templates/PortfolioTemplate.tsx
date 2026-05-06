import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DeviceType } from '@/src/lib/store';

export default function PortfolioTemplate({ device }: { device?: DeviceType }) {
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';

  return (
    <div className="min-h-full font-sans bg-[var(--preview-bg,var(--bg-app))] text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden">
      {/* Header */}
      <header className="px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 max-w-6xl mx-auto">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter">Alex Rivers.</h1>
          <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em]">Independent Product Designer</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="p-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] hover:text-[var(--preview-primary)] transition-colors shadow-sm"><Twitter size={18} /></a>
          <a href="#" className="p-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] hover:text-[var(--preview-primary)] transition-colors shadow-sm"><Github size={18} /></a>
          <a href="#" className="p-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] hover:text-[var(--preview-primary)] transition-colors shadow-sm"><Instagram size={18} /></a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-24 max-w-6xl mx-auto border-t border-[var(--border-main)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-3xl space-y-8"
        >
          <h2 className={cn(
            "font-black tracking-tighter leading-[0.85]",
            isMobile ? "text-5xl" : isTablet ? "text-7xl" : "text-8xl"
          )}>
            Creating <span className="text-[var(--preview-primary)]">meaningful</span> digital experiences.
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[var(--text-secondary)] leading-relaxed">
            I help early-stage startups design and ship products that users love. Currently building the future at <span className="text-[var(--text-primary)] border-b-2 border-[var(--preview-accent)]">Nexus Labs</span>.
          </p>
          <div className="flex gap-6">
            <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[var(--preview-primary)] group">
              View Work <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
              Contact Me
            </button>
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="px-8 py-24 max-w-6xl mx-auto border-t border-[var(--border-main)]">
        <div className="flex justify-between items-end mb-16">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Selected Works — 2023</h3>
          {!isMobile && <p className="text-xs font-bold opacity-40">SCROLL TO EXPLORE</p>}
        </div>
        
        <div className={cn(
          "grid gap-12",
          isMobile ? "grid-cols-1" : "grid-cols-2"
        )}>
          {[
            { title: "Velocity Cloud", category: "Saas Platform", color: "var(--preview-primary)" },
            { title: "Lumina", category: "Mobile App", color: "var(--preview-accent)" },
            { title: "Kryptos", category: "Web3 Wallet", color: "var(--preview-secondary)" },
            { title: "Aura Home", category: "IOT App", color: "var(--preview-primary)" },
          ].map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6 group cursor-pointer"
            >
              <div 
                className="aspect-[4/3] rounded-[2.5rem] relative overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-xl"
              >
                <div 
                  className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-700" 
                  style={{ backgroundColor: project.color }} 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">
                    {project.title[0]}
                  </div>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 rounded-full bg-white text-black shadow-xl">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-black tracking-tight group-hover:text-[var(--preview-primary)] transition-colors">{project.title}</h4>
                  <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-24 max-w-6xl mx-auto border-t border-[var(--border-main)] flex flex-col items-center gap-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center">Let's build something <span className="text-[var(--preview-accent)]">great</span> together.</h2>
        <a 
          href="mailto:hello@alexrivers.design" 
          className="text-2xl md:text-3xl font-black tracking-tighter border-b-4 border-[var(--preview-primary)] hover:translate-y-[-4px] transition-transform inline-block"
        >
          hello@alexrivers.design
        </a>
      </footer>
    </div>
  );
}
