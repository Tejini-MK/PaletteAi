import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Shield, Globe, BarChart3, Users, ZapOff } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { DeviceType } from '@/src/lib/store';

export default function SaaSLanding({ device }: { device?: DeviceType }) {
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';
  return (
    <div className="min-h-full font-sans bg-[var(--preview-bg,var(--bg-app))] text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-[var(--border-main)]">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-[var(--app-radius)] bg-[var(--preview-primary)] flex items-center justify-center text-white" style={{ borderRadius: 'var(--app-radius)' }}>
            <Zap size={18} fill="currentColor" />
          </div>
          NexusAI
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold opacity-60">
          <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">Solutions</a>
          <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">Resources</a>
        </div>
        <button className="px-6 py-2.5 bg-[var(--preview-primary)] text-white text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[var(--app-shadow)]" style={{ borderRadius: 'var(--app-radius)' }}>
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-8 py-24 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 opacity-60 blur-[100px] rounded-full" style={{ backgroundImage: 'var(--preview-gradient)' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--preview-accent)]/10 text-[var(--preview-accent)] text-[10px] font-black uppercase tracking-widest border border-[var(--preview-accent)]/20" style={{ borderRadius: 'var(--app-radius)' }}>
            <Zap size={12} fill="currentColor" />
            Now Powered by v4.0
          </div>
          <h1 className={cn(
            "font-black tracking-tighter leading-[0.9]",
            isMobile ? "text-4xl" : isTablet ? "text-6xl" : "text-7xl"
          )}>
            Architecting the <span className="text-[var(--preview-primary)]">Future</span> of Design.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-xl mx-auto">
            Scale your infrastructure with AI-driven insights and real-time visualization. The only platform you'll ever need.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="px-10 py-5 bg-[var(--preview-primary)] text-white font-black uppercase tracking-widest text-xs shadow-[var(--app-shadow)] hover:translate-y-[-4px] transition-all" style={{ borderRadius: 'var(--app-radius)' }}>
              Launch Console
            </button>
            <button className="px-10 py-5 border border-[var(--border-main)] font-black uppercase tracking-widest text-xs hover:bg-[var(--bg-elevated)] transition-all" style={{ borderRadius: 'var(--app-radius)' }}>
              Book a Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className={cn(
          "grid gap-8",
          isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
        )}>
          {[
            { icon: Shield, title: "Enterprise Security", desc: "Military-grade encryption for all your design assets and tokens." },
            { icon: Globe, title: "Global CDN", desc: "Instant deployment to 200+ edge locations worldwide for sub-ms latency." },
            { icon: BarChart3, title: "Real-time Analytics", desc: "Monitor performance and engagement with live-updating dashboards." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-[var(--app-shadow)] hover:translate-y-[-8px] transition-all group"
              style={{ borderRadius: 'var(--app-radius)' }}
            >
              <div className="w-14 h-14 bg-[var(--preview-accent)]/10 flex items-center justify-center text-[var(--preview-accent)] mb-6 group-hover:bg-[var(--preview-accent)] group-hover:text-white transition-colors" style={{ borderRadius: 'var(--app-radius)' }}>
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-3">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-8 py-24 bg-[var(--bg-elevated)]/50 border-y border-[var(--border-main)]">
        <div className="max-w-xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tighter">Simple, transparent pricing.</h2>
          <p className="text-[var(--text-secondary)] font-medium">Choose the plan that fits your team's needs.</p>
        </div>
        <div className={cn(
          "max-w-5xl mx-auto grid gap-8",
          isMobile ? "grid-cols-1" : "grid-cols-2"
        )}>
          <div className="p-10 bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-8" style={{ borderRadius: 'var(--app-radius)' }}>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2">Startup</h4>
              <div className="text-5xl font-black tracking-tighter">$49<span className="text-lg opacity-40">/mo</span></div>
            </div>
            <ul className="space-y-4">
              {['Up to 5 Projects', '10GB Storage', 'Standard Support', 'Basic Analytics'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold opacity-70">
                  <Check size={16} className="text-[var(--preview-primary)]" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 border border-[var(--border-main)] font-black uppercase tracking-widest text-[10px] hover:bg-[var(--bg-elevated)] transition-all" style={{ borderRadius: 'var(--app-radius)' }}>
              Choose Plan
            </button>
          </div>
          <div className="p-10 bg-[var(--preview-primary)] text-white shadow-[var(--app-shadow)] space-y-8 relative overflow-hidden" style={{ borderRadius: 'var(--app-radius)' }}>
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Zap size={120} fill="currentColor" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Enterprise</h4>
              <div className="text-5xl font-black tracking-tighter">$199<span className="text-lg opacity-40">/mo</span></div>
            </div>
            <ul className="space-y-4 relative z-10">
              {['Unlimited Projects', 'Unlimited Storage', 'Priority 24/7 Support', 'Advanced AI Insights'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold">
                  <Check size={16} /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-white text-[var(--preview-primary)] font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all" style={{ borderRadius: 'var(--app-radius)' }}>
              Scale Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 text-center border-t border-[var(--border-main)]">
        <div className="text-xl font-black tracking-tighter mb-8">NexusAI</div>
        <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">
          © 2026 Nexus Design Systems. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
