import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Briefcase, Users, Zap, Info, ArrowRight, Loader2 } from 'lucide-react';
import { generateDetailedTheme } from '@/src/services/aiService';
import { AIDetailedTheme } from '@/src/types';
import { useDesignData } from '@/src/contexts/DesignDataContext';
import { cn } from '@/src/lib/utils';
import { useStyleModeStore } from '@/src/store/styleModeStore';
import { usePreviewStore } from '@/src/lib/store';

export default function BrandDNAEngine() {
  const { setActiveTheme } = useDesignData();
  const { setMode } = useStyleModeStore();
  const openPreview = usePreviewStore(state => state.openPreview);
  const setPreviewMode = usePreviewStore(state => state.setMode);
  
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    audience: '',
    vibe: 'futuristic',
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIDetailedTheme | null>(null);

  const industries = ['Fintech', 'Luxury Fashion', 'AI/SaaS', 'Gaming', 'Healthcare', 'E-commerce'];
  const vibes = ['Futuristic', 'Minimalist', 'Brutalist', 'Elegant', 'High-Energy', 'Trusted'];

  const handleAnalyze = async () => {
    if (!formData.name || !formData.industry) return;
    
    setIsAnalyzing(true);
    const prompt = `Create a brand design system for a ${formData.vibe} ${formData.industry} brand named "${formData.name}". Target audience: ${formData.audience}. Describe the visual identity and emotional tone.`;
    
    try {
      const theme = await generateDetailedTheme(prompt);
      if (theme) {
        setResult(theme);
        
        // Map detailed AI colors to our core ColorTheme
        const mappedTheme = {
          primary: theme.colors.primary,
          surface: theme.colors.surface,
          background: theme.colors.background,
          accent: theme.colors.accent,
          secondary: theme.colors.secondary,
          onPrimary: '#ffffff',
          onSurface: theme.colors.primary,
          primaryContainer: theme.colors.primary + '20',
        };
        
        setActiveTheme(mappedTheme);
        
        // Automatically switch to a relevant style mode based on vibe
        if (formData.vibe.toLowerCase() === 'futuristic') setMode('cyberpunk');
        else if (formData.vibe.toLowerCase() === 'minimalist') setMode('minimal-apple');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-12 pb-32">
      <header className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Brand DNA Engine</h1>
        <p className="text-[var(--text-secondary)] text-xl max-w-2xl font-medium">Synthesize a complete brand identity and emotional persona for your next venture.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[var(--bg-surface)] p-8 rounded-[3rem] border border-[var(--border-main)] shadow-2xl space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Brand Identity</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Brand Name"
                className="w-full bg-[var(--bg-app)] border border-[var(--border-main)] p-5 rounded-2xl outline-none focus:border-[#a3a6ff] transition-all font-bold"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Industry</label>
              <div className="grid grid-cols-2 gap-2">
                {industries.map(ind => (
                  <button
                    key={ind}
                    onClick={() => setFormData({...formData, industry: ind})}
                    className={cn(
                      "p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                      formData.industry === ind ? "bg-[#a3a6ff] border-[#a3a6ff] text-white" : "border-[var(--border-main)] hover:bg-[var(--bg-app)]"
                    )}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Emotional Vibe</label>
              <select 
                value={formData.vibe}
                onChange={(e) => setFormData({...formData, vibe: e.target.value})}
                className="w-full bg-[var(--bg-app)] border border-[var(--border-main)] p-5 rounded-2xl outline-none font-bold"
              >
                {vibes.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-[#a3a6ff] to-[#49339d] text-white py-5 rounded-[2rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={16} />}
              {isAnalyzing ? "Synthesizing DNA..." : "Generate Brand DNA"}
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full border-2 border-dashed border-[var(--border-main)] rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center space-y-4"
              >
                <div className="p-6 bg-[var(--bg-elevated)] rounded-full text-[var(--text-secondary)]">
                  <Zap size={48} />
                </div>
                <h3 className="text-2xl font-black">Ready to Analyze</h3>
                <p className="text-[var(--text-secondary)] max-w-xs font-medium">Input your brand details to unlock AI-powered design insights and visual personality.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Brand Personality Card */}
                <div className="bg-[var(--bg-surface)] p-10 rounded-[3.5rem] border border-[var(--border-main)] shadow-2xl space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-4xl font-black tracking-tighter">{result.title}</h2>
                      <p className="text-[#a3a6ff] font-bold uppercase text-[10px] tracking-widest">{formData.industry} IDENTITY</p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Analyzed
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                      <Info size={12} /> Strategic Rationale
                    </h4>
                    <p className="text-lg font-medium leading-relaxed text-[var(--text-primary)]">
                      {result.rationale}
                    </p>
                  </div>

                  {/* Brand Palette */}
                  <div className="space-y-4 pt-8 border-t border-[var(--border-main)]">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">AI Recommended Palette</h4>
                    <div className="grid grid-cols-5 gap-3 h-20">
                      {Object.entries(result.colors).map(([key, color]) => (
                        <div key={key} className="group relative flex flex-col gap-2">
                          <div 
                            className="flex-1 rounded-2xl shadow-inner border border-black/5"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[8px] font-bold text-center uppercase tracking-tighter opacity-40">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--border-main)]">
                    {result.designInsights.map((insight, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#a3a6ff]" />
                        <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      if (!result) return;
                      const mappedTheme = {
                        primary: result.colors.primary,
                        accent: result.colors.accent,
                        secondary: result.colors.secondary,
                        onPrimary: '#ffffff',
                        onSurface: result.colors.primary,
                        primaryContainer: result.colors.primary + '20',
                      };
                      if (result.recommendedMode) {
                        setPreviewMode(result.recommendedMode);
                      }
                      openPreview(mappedTheme);
                    }}
                    className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-main)] p-6 rounded-3xl flex items-center justify-between group hover:border-[#a3a6ff] transition-all"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase text-[var(--text-secondary)]">Next Step</p>
                      <p className="font-black">Live preview playground</p>
                    </div>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
