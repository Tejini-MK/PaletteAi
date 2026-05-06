import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  Palette, 
  Layout, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle2,
  ExternalLink,
  Github,
  Twitter,
  Globe
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { AppMode } from '@/src/types';

interface LandingPageProps {
  onStart: (mode?: AppMode) => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const features = [
    {
      title: 'AI Theme Engine',
      desc: 'Generate professional palettes using Gemini 1.5 Pro with natural language prompts.',
      icon: Palette,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Live Preview System',
      desc: 'See your theme applied instantly across Dashboard, eCommerce, and SaaS templates.',
      icon: Layout,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'Accessibility Checker',
      desc: 'Real-time WCAG 2.1 contrast audits and AI-powered color blindness simulations.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
    {
      title: 'Brand DNA Engine',
      desc: 'Inject industry-specific brand identity into your design tokens automatically.',
      icon: Sparkles,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10'
    },
    {
      title: 'Motion Engine',
      desc: 'Fine-tune the mathematical DNA of your UI with experimental mesh and noise shaders.',
      icon: Zap,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10'
    },
    {
      title: 'Export System',
      desc: 'Developer-ready handoffs for Tailwind, Flutter, CSS Variables, and JSON tokens.',
      icon: Layers,
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10'
    }
  ];

  const stats = [
    { label: 'Themes Generated', value: '1.2M+' },
    { label: 'Accessibility Audits', value: '850K+' },
    { label: 'Live Previews', value: '2.4M+' },
    { label: 'Design Systems', value: '120K+' },
  ];

  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-[#a3a6ff]/30 selection:text-white font-['Inter',sans-serif]">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-indigo-500/5 blur-[80px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#a3a6ff] to-[#49339d] rounded-xl flex items-center justify-center">
              <Zap size={16} fill="white" className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">PaletteAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Showcase</a>
            <button onClick={() => onStart('Theme Generator')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Generator</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onStart('Dashboard')}
              className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-white/90 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#a3a6ff] text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles size={14} />
              <span>Version 4.0 is now live</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl font-black tracking-tight leading-[1.05]"
            >
              Create Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Design Systems</span> <br />
              with AI.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/60 max-w-lg leading-relaxed font-medium"
            >
              Generate beautiful palettes, gradients, accessibility-friendly themes, and live UI previews instantly. Professional design engineering, simplified.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => onStart('Dashboard')}
                className="group px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
              >
                Dive Into Creativity
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                Explore Features
              </button>
            </motion.div>
          </div>

          {/* Hero Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a3a6ff]/20 to-purple-500/20 blur-[100px] opacity-30" />
            
            {/* Visual Mockup Panels */}
            <div className="relative w-full h-full max-w-md bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden p-8 space-y-8">
              <div className="flex justify-between items-center">
                 <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                   <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Engine Running</div>
              </div>
              
              <div className="space-y-6">
                <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                <div className="h-32 w-full bg-gradient-to-br from-[#a3a6ff]/20 via-purple-500/20 to-transparent rounded-[2rem] border border-white/5" />
                
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                       <div className="w-1/2 h-1/2 rounded-full bg-white/10" />
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-20 bg-white/20 rounded-full" />
                    <div className="h-2 w-8 bg-[#a3a6ff] rounded-full" />
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#a3a6ff]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -right-8 p-4 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl"
            >
              <Palette size={24} className="text-[#a3a6ff]" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-40 -left-12 p-4 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl"
            >
              <Sparkles size={24} className="text-amber-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a3a6ff]">Core Infrastructure</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">Everything you need to build <br /> world-class design systems.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500", feat.bg, feat.color)}>
                  <feat.icon size={24} />
                </div>
                <h4 className="text-xl font-black mb-3">{feat.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed font-medium">
                  {feat.desc}
                </p>
                <div className="pt-6">
                   <div className="w-8 h-1 bg-white/10 rounded-full group-hover:w-16 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview Showcase */}
      <section id="showcase" className="py-32 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-amber-400">
               <Monitor size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Interactive Handoff</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              One theme. <br />
              Infinite possibilities.
            </h3>
            <p className="text-lg text-white/60 font-medium leading-relaxed">
              Our live preview system allows you to stress-test your design tokens across mobile, tablet, and desktop environments instantly. Switch templates with zero latency.
            </p>
            
            <ul className="space-y-4">
              {[
                'Real-time design token injection',
                'Device simulation with frame precision',
                'Accessibility-first rendering',
                'Smooth motion system previews'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/80">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-[#a3a6ff]/10 blur-[120px] rounded-full opacity-50" />
             <div className="relative grid grid-cols-2 gap-4">
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="aspect-[4/5] bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl"
               >
                 <Smartphone size={24} className="text-[#a3a6ff]" />
                 <div className="space-y-2">
                   <div className="h-1 w-full bg-white/20 rounded-full" />
                   <div className="h-1 w-2/3 bg-white/10 rounded-full" />
                 </div>
               </motion.div>
               <motion.div 
                 whileHover={{ y: -10 }}
                 className="aspect-[4/5] bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl translate-y-8"
               >
                 <Tablet size={24} className="text-purple-400" />
                 <div className="space-y-2">
                   <div className="h-1 w-full bg-white/20 rounded-full" />
                   <div className="h-1 w-1/2 bg-white/10 rounded-full" />
                 </div>
               </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/[0.02] blur-[150px] pointer-events-none" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            Start Designing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#49339d]">Smarter with AI.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => onStart('Dashboard')}
              className="px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
            >
              Dive Into Creativity
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-gradient-to-tr from-[#a3a6ff] to-[#49339d] rounded-xl flex items-center justify-center">
                 <Zap size={16} fill="white" className="text-white" />
               </div>
               <span className="text-xl font-black tracking-tighter">PaletteAI</span>
             </div>
             <p className="text-xs text-white/40 font-medium leading-relaxed">
               The world's most advanced AI design system engine. Built for designers, engineered for developers.
             </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Product</h4>
            <ul className="space-y-4 text-xs font-bold text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Showcase</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design Tokens</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Company</h4>
            <ul className="space-y-4 text-xs font-bold text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Connect</h4>
            <div className="flex gap-4">
               <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"><Twitter size={18} /></a>
               <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"><Github size={18} /></a>
               <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"><Globe size={18} /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">© 2026 Palette AI Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
