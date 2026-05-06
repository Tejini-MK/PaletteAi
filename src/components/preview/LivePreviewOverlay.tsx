import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Laptop, Tablet, Smartphone, Moon, Sun, 
  Download, Layout, Copy, Check, ChevronRight,
  ExternalLink, Code2, Palette, Terminal
} from 'lucide-react';
import { usePreviewStore, TemplateType, DeviceType, ThemeMode } from '../../lib/store';
import { injectPreviewTheme, generateExportCode } from '../../lib/theme-engine';
import DeviceWrapper from './DeviceWrapper';
import SaaSLanding from './templates/SaaSLanding';
import DashboardTemplate from './templates/DashboardTemplate';
import PortfolioTemplate from './templates/PortfolioTemplate';
import EcommerceTemplate from './templates/EcommerceTemplate';
import AIStartupLanding from './templates/AIStartupLanding';
import MobileAppTemplate from './templates/MobileAppTemplate';
import { cn } from '../../lib/utils';

export default function LivePreviewOverlay() {
  const { 
    isOpen, activeTheme, device, mode, template, 
    closePreview, setDevice, setMode, setTemplate 
  } = usePreviewStore();
  
  const [showExport, setShowExport] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  useEffect(() => {
    if (activeTheme) {
      injectPreviewTheme(activeTheme);
    }
  }, [activeTheme]);

  if (!isOpen || !activeTheme) return null;

  const renderTemplate = () => {
    switch (template) {
      case 'SaaS': return <SaaSLanding device={device} />;
      case 'Dashboard': return <DashboardTemplate device={device} />;
      case 'Portfolio': return <PortfolioTemplate device={device} />;
      case 'Ecommerce': return <EcommerceTemplate device={device} />;
      case 'AI Startup': return <AIStartupLanding device={device} />;
      case 'Mobile App': return <MobileAppTemplate device={device} />;
      default: return <SaaSLanding />;
    }
  };

  const handleCopyExport = (type: 'tailwind' | 'css' | 'flutter' | 'json') => {
    const code = generateExportCode(type, activeTheme);
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-2xl flex flex-col"
        data-theme={mode}
      >
        {/* Header / Controls */}
        <header className="h-20 border-b border-white/5 bg-black/40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#a3a6ff] to-[#49339d] flex items-center justify-center">
                <Palette size={16} className="text-white" />
              </div>
              Live Preview
            </div>
            
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            
            {/* Template Selector */}
            <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
              {(['SaaS', 'Dashboard', 'Portfolio', 'Ecommerce', 'AI Startup', 'Mobile App'] as TemplateType[]).map((t) => (
                <button
                  key={t}
                onClick={() => setTemplate(t)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  template === t ? "bg-white text-black" : "text-white/40 hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Device Switcher */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
              {[
                { type: 'desktop', icon: Laptop },
                { type: 'tablet', icon: Tablet },
                { type: 'mobile', icon: Smartphone }
              ].map((d) => (
                <button
                  key={d.type}
                  onClick={() => setDevice(d.type as DeviceType)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    device === d.type ? "bg-white text-black" : "text-white/40 hover:text-white"
                  )}
                >
                  <d.icon size={18} />
                </button>
              ))}
            </div>

            {/* Mode Toggle */}
            <button
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:text-white transition-all"
            >
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="h-8 w-px bg-white/10" />

            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
            >
              <Download size={14} /> Export Theme
            </button>

            <button
              onClick={closePreview}
              className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:text-white transition-all hover:bg-rose-500/20"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative flex">
          <DeviceWrapper device={device}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={template + mode}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.4 }}
                 className="h-full"
                 style={{ colorScheme: mode }}
               >
                 {renderTemplate()}
               </motion.div>
             </AnimatePresence>
          </DeviceWrapper>
        </div>

        {/* Export Sidebar/Modal */}
        <AnimatePresence>
          {showExport && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExport(false)}
                className="absolute inset-0 bg-black/60 z-[1100]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0f172a] border-l border-white/10 z-[1200] p-8 shadow-2xl flex flex-col gap-8"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter text-white">Export Theme</h3>
                    <p className="text-sm font-medium text-white/40">Ready to use in your next project.</p>
                  </div>
                  <button onClick={() => setShowExport(false)} className="p-2 text-white/40 hover:text-white transition-colors"><X size={24} /></button>
                </div>

                <div className="space-y-6">
                  {[
                    { id: 'tailwind', label: 'Tailwind Config', icon: Code2 },
                    { id: 'css', label: 'CSS Variables', icon: Terminal },
                    { id: 'flutter', label: 'Flutter Theme', icon: Smartphone },
                    { id: 'json', label: 'JSON Object', icon: Copy }
                  ].map((exp) => (
                    <div key={exp.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <exp.icon size={18} className="text-[#a3a6ff]" />
                          <span className="text-sm font-black uppercase tracking-widest text-white/80">{exp.label}</span>
                        </div>
                        <button
                          onClick={() => handleCopyExport(exp.id as any)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                            copiedType === exp.id ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {copiedType === exp.id ? <Check size={14} /> : "Copy"}
                        </button>
                      </div>
                      <pre className="bg-black/40 p-4 rounded-xl text-[10px] text-white/60 font-mono overflow-x-auto">
                        {generateExportCode(exp.id as any, activeTheme)}
                      </pre>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/20">NexusAI Export v4.0</div>
                   <button className="flex items-center gap-2 text-sm font-black text-[#a3a6ff] hover:translate-x-2 transition-transform">
                     Documentation <ExternalLink size={14} />
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
