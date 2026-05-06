import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Shield, Globe, BarChart3, Users, ZapOff, Brain, Cpu, MessageSquare } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { DeviceType } from '@/src/lib/store';

export default function AIStartupLanding({ device }: { device?: DeviceType }) {
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';
  return (
    <div className="min-h-full font-sans bg-[#020617] text-white transition-colors duration-500 overflow-x-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 opacity-30 blur-[150px] bg-[var(--preview-gradient)] rounded-full" />
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-8">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Brain size={24} className="text-[var(--preview-primary)]" fill="currentColor" />
          </div>
          NeuralNexus
        </div>
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          <a href="#" className="hover:text-white transition-colors">Neural Engine</a>
          <a href="#" className="hover:text-white transition-colors">API Docs</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="px-8 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          Join Beta
        </button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-32 text-center max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[var(--preview-primary)]"
        >
          <Cpu size={14} /> Intelligence Level: Superhuman
        </motion.div>
        
        <h1 className={cn(
          "font-black tracking-tighter leading-[0.8] uppercase italic",
          isMobile ? "text-5xl" : isTablet ? "text-7xl" : "text-9xl"
        )}>
          Cognitive <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--preview-primary)] to-[var(--preview-accent)]">Architecture.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/40 font-medium max-w-2xl mx-auto leading-relaxed">
          Deploy production-ready neural networks in seconds. Nexus is the first autonomous agent system for enterprise-scale design.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-8">
          <button className="px-12 py-6 rounded-[2rem] bg-[var(--preview-primary)] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-[var(--preview-primary)]/40 hover:translate-y-[-8px] transition-all flex items-center gap-3">
            Get API Key <ArrowRight size={18} />
          </button>
          <button className="px-12 py-6 rounded-[2rem] bg-white/5 border border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
            Read Whitepaper
          </button>
        </div>
      </section>

      {/* Grid Features */}
      <section className={cn(
        "px-8 py-24 grid gap-4 max-w-7xl mx-auto",
        isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-4"
      )}>
        {[
          { title: "Self-Optimizing", icon: Zap, color: "var(--preview-primary)" },
          { title: "Global Sync", icon: Globe, color: "var(--preview-accent)" },
          { title: "Vault-Grade", icon: Shield, color: "var(--preview-secondary)" },
          { title: "Neural Chat", icon: MessageSquare, color: "var(--preview-primary)" },
        ].map((feat, i) => (
          <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
               <feat.icon size={120} />
            </div>
            <feat.icon size={32} className="mb-6" style={{ color: feat.color }} />
            <h3 className="text-lg font-black tracking-tighter uppercase mb-2">{feat.title}</h3>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-loose">Automated efficiency for high-scale teams.</p>
          </div>
        ))}
      </section>

      {/* Code Section */}
      <section className="px-8 py-24 max-w-7xl mx-auto">

        <div className="rounded-[4rem] bg-white/5 border border-white/10 p-12 lg:p-20 flex flex-col lg:flex-row gap-16 items-center overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--preview-primary)] opacity-10 blur-[100px] -z-10" />
           
           <div className="flex-1 space-y-8">
              <h2 className="text-5xl font-black tracking-tighter leading-none uppercase">Developer <br/> First Interface.</h2>
              <p className="text-white/40 font-medium leading-relaxed">Nexus integrates directly with your existing CI/CD pipelines. Build once, deploy anywhere with a single line of code.</p>
              <div className="space-y-4">
                 {['Universal SDK Support', 'Real-time Telemetry', 'Auto-scaling Core'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 rounded-full bg-[var(--preview-accent)]" /> {item}
                   </div>
                 ))}
              </div>
           </div>

           <div className="flex-1 w-full bg-[#0a0a0a] rounded-[3rem] p-8 border border-white/10 shadow-3xl relative overflow-hidden group">
              <div className="flex gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
              <pre className="text-xs font-mono leading-loose text-white/40 group-hover:text-white/60 transition-colors">
                <code>
                  <span className="text-[var(--preview-primary)]">import</span> Nexus <span className="text-[var(--preview-primary)]">from</span> <span className="text-[var(--preview-accent)]">'@nexus/core'</span>;<br/><br/>
                  <span className="text-white/20">// Initialize Autonomous Hub</span><br/>
                  <span className="text-[var(--preview-primary)]">const</span> engine = <span className="text-[var(--preview-primary)]">new</span> Nexus.Engine({`{`}<br/>
                  &nbsp;&nbsp;apiKey: <span className="text-[var(--preview-accent)]">process.env.NEXUS_KEY</span>,<br/>
                  &nbsp;&nbsp;mode: <span className="text-[var(--preview-accent)]">'superhuman'</span><br/>
                  {`}`});<br/><br/>
                  <span className="text-white/20">// Deploy design architecture</span><br/>
                  engine.deploy(<span className="text-[var(--preview-accent)]">'chromatic-dna-v4'</span>);
                </code>
              </pre>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-black tracking-tighter flex items-center gap-2">NexusAI</div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
           <span>Terms</span>
           <span>Privacy</span>
           <span>Status</span>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
        </div>
      </footer>
    </div>
  );
}
