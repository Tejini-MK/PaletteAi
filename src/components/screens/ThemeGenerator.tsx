import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  RefreshCw, 
  Palette, 
  Search, 
  X, 
  Copy, 
  Check, 
  Wand2, 
  ArrowLeft, 
  Download, 
  Shield, 
  Layout, 
  Zap, 
  Loader2, 
  Heart, 
  ExternalLink,
  ShieldCheck,
  History,
  FileCode
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';
import { generateAIThemes, AIColorSet, generateDetailedTheme } from '@/src/services/aiService';
import { AIDetailedTheme } from '@/src/types';
import { useUIStore } from '../../store/uiStore';
import { AccessibilityPanel } from '../accessibility/AccessibilityPanel';
import { ExportModal } from '../exports/ExportModal';
import { autoFixContrast } from '../../lib/accessibility-engine';
import { useDesignData } from '../../contexts/DesignDataContext';
import { usePreviewStore } from '@/src/lib/store';

interface ColorSet extends AIColorSet {
  id: string;
}

export default function ThemeGenerator() {
  const { saveTheme, isThemeSaved, deleteTheme, savePair, deletePair, isPairSaved } = useDesignData();
  const openPreview = usePreviewStore(state => state.openPreview);
  const [colorSets, setColorSets] = useState<ColorSet[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const { addToHistory, toggleAccessibilityPanel } = useUIStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [colorCount, setColorCount] = useState<2 | 3 | 4>(2);
  
  // AI Engine States
  const [detailedTheme, setDetailedTheme] = useState<AIDetailedTheme | null>(null);
  const [isProcessingDetailed, setIsProcessingDetailed] = useState(false);

  const handleSaveTheme = () => {
    if (!detailedTheme) return;
    if (isThemeSaved(detailedTheme.title)) {
      deleteTheme(detailedTheme.title);
    } else {
      saveTheme(detailedTheme);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.9 }
      });
    }
  };

  const generateRandomPairs = async (countOverride?: number) => {
    setIsGenerating(true);
    try {
      const aiThemes = await generateAIThemes(countOverride || colorCount);
      if (aiThemes.length > 0) {
        const newSets: ColorSet[] = aiThemes.map((theme) => ({
          ...theme,
          id: Math.random().toString(36).substr(2, 9)
        }));
        setColorSets(newSets);
      }
    } catch (error) {
      console.error("Failed to generate AI themes:", error);
    } finally {
      setIsGenerating(false);
      setRevealedIds(new Set());
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
      });
    }
  };

  const handleDetailedSubmit = async () => {
    if (!chatInput.trim()) return;
    
    setIsProcessingDetailed(true);
    setIsChatOpen(false);
    
    try {
      const result = await generateDetailedTheme(chatInput);
      if (result) {
        setDetailedTheme(result);
        addToHistory(result);
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.5 },
          colors: Object.values(result.colors)
        });
      }
    } catch (error) {
      console.error("AI Engine Error:", error);
    } finally {
      setIsProcessingDetailed(false);
    }
  };

  // AI Auto-fix logic
  const handleAutoFix = () => {
    if (!detailedTheme) return;
    
    const fixedPrimary = autoFixContrast(detailedTheme.colors.primary, detailedTheme.colors.surface);
    const fixedSecondary = autoFixContrast(detailedTheme.colors.secondary, detailedTheme.colors.surface);
    
    setDetailedTheme({
      ...detailedTheme,
      colors: {
        ...detailedTheme.colors,
        primary: fixedPrimary,
        secondary: fixedSecondary
      }
    });
  };

  useEffect(() => {
    generateRandomPairs();
  }, []);

  const downloadReport = () => {
    if (!detailedTheme) return;
    
    const htmlReport = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${detailedTheme.title}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
        h1 { color: #49339d; border-bottom: 2px solid #a3a6ff; padding-bottom: 10px; }
        h2 { color: #a3a6ff; margin-top: 30px; }
        .swatch { display: inline-block; width: 20px; height: 20px; margin-right: 10px; vertical-align: middle; border: 1px solid #ddd; }
        .section { margin-bottom: 20px; padding: 15px; border-left: 5px solid #a3a6ff; background: #f8f9ff; }
      </style>
      </head>
      <body>
        <h1>PaletteAI - Design System Report</h1>
        <div class="section">
          <h2>Project: ${detailedTheme.title}</h2>
          <p><strong>Description:</strong> ${detailedTheme.description}</p>
        </div>

        <h2>Chromatic DNA</h2>
        <ul>
          <li><span class="swatch" style="background-color: ${detailedTheme.colors.primary}"></span> <strong>Primary:</strong> ${detailedTheme.colors.primary}</li>
          <li><span class="swatch" style="background-color: ${detailedTheme.colors.secondary}"></span> <strong>Secondary:</strong> ${detailedTheme.colors.secondary}</li>
          <li><span class="swatch" style="background-color: ${detailedTheme.colors.accent}"></span> <strong>Accent:</strong> ${detailedTheme.colors.accent}</li>
          <li><span class="swatch" style="background-color: ${detailedTheme.colors.background}"></span> <strong>Background:</strong> ${detailedTheme.colors.background}</li>
          <li><span class="swatch" style="background-color: ${detailedTheme.colors.surface}"></span> <strong>Surface:</strong> ${detailedTheme.colors.surface}</li>
        </ul>

        <h2>Design Rationale</h2>
        <p>${detailedTheme.rationale}</p>

        <h2>Usage Guidelines</h2>
        <div class="section">
          <p><strong>Headings:</strong> ${detailedTheme.usage.headings}</p>
          <p><strong>Body:</strong> ${detailedTheme.usage.body}</p>
          <p><strong>Buttons:</strong> ${detailedTheme.usage.buttons}</p>
          <p><strong>Cards:</strong> ${detailedTheme.usage.cards}</p>
        </div>

        <p style="font-size: 10px; color: #888; margin-top: 50px;">Generated via PaletteAI Engine v4.0</p>
      </body>
      </html>
    `.trim();

    const blob = new Blob([htmlReport], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${detailedTheme.title.replace(/\s+/g, '_')}_theme_report.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleReveal = (id: string) => {
    const next = new Set(revealedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setRevealedIds(next);
  };

  const handleCopy = (e: React.MouseEvent | null, color: string, id: string) => {
    if (e) e.stopPropagation();
    if (!color) return;
    
    navigator.clipboard.writeText(color);
    setCopiedId(`${id}-${color}`);
    setTimeout(() => setCopiedId(null), 2000);
    
    try {
      confetti({
        particleCount: 20,
        colors: [color],
        origin: e ? { 
          x: Math.max(0, Math.min(1, e.clientX / window.innerWidth)), 
          y: Math.max(0, Math.min(1, e.clientY / window.innerHeight)) 
        } : { y: 0.8 }
      });
    } catch (err) {
      console.warn("Confetti error:", err);
    }
  };

  return (
    <div className="h-full flex flex-col items-center p-6 md:p-12 relative overflow-y-auto custom-scrollbar transition-colors duration-300">
      <AnimatePresence mode="wait">
        {isProcessingDetailed ? (
          /* Processing Loader */
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-app)] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#a3a6ff]/20 blur-3xl animate-pulse" />
              <Loader2 size={60} className="text-[#a3a6ff] animate-spin relative" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter mb-4">Designing your Chromatic DNA...</h2>
            <p className="text-[var(--text-secondary)] max-w-sm">Gemini is analyzing your request to synthesize a perfect design system.</p>
          </motion.div>
        ) : detailedTheme ? (
          /* Detailed Result Page */
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-6xl z-[80] space-y-12 pb-32"
          >
            <AccessibilityPanel 
              colors={[detailedTheme.colors.primary, detailedTheme.colors.secondary, detailedTheme.colors.accent, detailedTheme.colors.surface]} 
              onAutoFix={handleAutoFix}
            />
            <ExportModal 
              isOpen={isExportModalOpen} 
              onClose={() => setIsExportModalOpen(false)}
              colors={detailedTheme.colors}
            />
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[var(--border-main)] pb-8">
              <div className="space-y-2">
                <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
                  {useUIStore.getState().history.slice(0, 10).map((hist, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDetailedTheme(hist);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-shrink-0 w-48 bg-[var(--bg-surface)] p-4 rounded-[2rem] border border-[var(--border-main)] hover:border-[#a3a6ff] hover:shadow-xl transition-all group text-left"
                    >
                      <div className="flex gap-1 mb-3">
                        {Object.values(hist.colors).map((c, i) => (
                          <div key={i} className="h-2 flex-1 rounded-full" style={{ backgroundColor: c as string }} />
                        ))}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-tight truncate">{hist.title}</p>
                      <p className="text-[8px] font-bold text-[var(--text-secondary)] uppercase mt-1 opacity-60">Restore Palette</p>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setDetailedTheme(null)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#a3a6ff] hover:translate-x-[-4px] transition-transform mb-4"
                >
                  <ArrowLeft size={14} /> Back to Library
                </button>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{detailedTheme.title}</h1>
                <p className="text-[var(--text-secondary)] font-medium md:text-lg">"{detailedTheme.description}"</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleSaveTheme}
                  className={cn(
                    "p-4 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all shadow-xl border",
                    isThemeSaved(detailedTheme.title) 
                      ? "bg-[#a3a6ff] text-white border-[#a3a6ff]" 
                      : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-main)] hover:bg-[var(--bg-elevated)]"
                  )}
                >
                  <Heart size={16} className={isThemeSaved(detailedTheme.title) ? "fill-white" : ""} />
                  {isThemeSaved(detailedTheme.title) ? "Saved to Hub" : "Save Theme"}
                </button>
                <button 
                  onClick={toggleAccessibilityPanel}
                  className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-4 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-[var(--border-main)] transition-colors shadow-xl"
                >
                  <ShieldCheck size={16} className="text-emerald-500" /> Check Accessibility
                </button>
                <button 
                  onClick={() => setIsExportModalOpen(true)}
                  className="bg-[var(--bg-surface)] border border-[var(--border-main)] p-4 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-[var(--border-main)] transition-colors shadow-xl"
                >
                  <FileCode size={16} /> Export Code
                </button>
                <button 
                  onClick={() => openPreview({
                    primary: detailedTheme.colors.primary,
                    secondary: detailedTheme.colors.secondary,
                    accent: detailedTheme.colors.accent,
                    background: detailedTheme.colors.background,
                    surface: detailedTheme.colors.surface
                  })}
                  className="bg-gradient-to-tr from-[#a3a6ff] to-[#49339d] text-white p-4 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
                >
                  <ExternalLink size={16} /> Live Preview
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Data & Swatches */}
              <div className="lg:col-span-4 space-y-8">
                {/* AI Insights (New Feature) */}
                <div className="bg-[#a3a6ff]/5 p-8 rounded-[3rem] border border-[#a3a6ff]/20 shadow-xl space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={48} className="text-[#a3a6ff]" />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#a3a6ff] flex items-center gap-2">
                    <Zap size={14} /> AI Design Insights
                  </h3>
                  <div className="space-y-4">
                    {detailedTheme.designInsights.map((insight, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#a3a6ff] mt-1.5 flex-shrink-0" />
                        <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed italic">"{insight}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--bg-surface)] p-8 rounded-[3rem] border border-[var(--border-main)] shadow-xl space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Chromatic DNA</h3>
                  <div className="space-y-4">
                    {Object.entries(detailedTheme.colors).map(([key, hexValue]) => {
                      const hex = hexValue as string;
                      return (
                        <div key={key} className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-xl shadow-lg border border-black/5 group-hover:scale-110 transition-transform" style={{ backgroundColor: hex }} />
                          <div className="flex-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] block">{key}</span>
                            <span className="font-mono text-sm font-bold uppercase">{hex}</span>
                          </div>
                          <button 
                            onClick={(e) => handleCopy(e, hex, `${key}-hex`)}
                            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-elevated)] rounded-lg"
                          >
                            {copiedId === `${key}-hex` ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-8 rounded-[3rem] border border-[var(--border-main)] bg-gradient-to-br from-[#a3a6ff10] to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles size={16} className="text-[#a3a6ff]" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Design Rationale</h3>
                  </div>
                  <p className="text-sm leading-relaxed font-medium text-[var(--text-secondary)]">{detailedTheme.rationale}</p>
                </div>
              </div>

              {/* Right Column: Live interface Preview */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-[var(--bg-surface)] rounded-[3rem] border border-[var(--border-main)] shadow-3xl overflow-hidden h-full min-h-[600px] flex flex-col transition-colors duration-300">
                  <div className="p-6 border-b border-[var(--border-main)] bg-[var(--bg-elevated)] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Live Interface Prototype</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                  </div>
                  
                  <div 
                    className="flex-1 p-12 space-y-12 overflow-y-auto"
                    style={{ backgroundColor: detailedTheme.colors.background }}
                  >
                    {/* Hero Section */}
                    <div className="space-y-6 max-w-lg">
                       <span 
                         className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                         style={{ backgroundColor: detailedTheme.colors.accent, color: '#fff' }}
                       >
                         v4.0 Technology
                       </span>
                       <h1 className="text-5xl font-black tracking-tight" style={{ color: detailedTheme.colors.primary }}>
                         Modernizing the standard of design.
                       </h1>
                       <p className="text-lg font-medium opacity-70" style={{ color: detailedTheme.colors.primary }}>
                         {detailedTheme.usage.body}
                       </p>
                       <div className="flex gap-4">
                         <button 
                           className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-transform hover:scale-105"
                           style={{ backgroundColor: detailedTheme.colors.primary, color: '#fff' }}
                         >
                           Get Started
                         </button>
                         <button 
                           className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border transition-colors"
                           style={{ borderColor: `${detailedTheme.colors.primary}20`, color: detailedTheme.colors.primary }}
                         >
                           View Demo
                         </button>
                       </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-6">
                       {[
                         { icon: Shield, title: 'Security First', desc: detailedTheme.usage.cards },
                         { icon: Zap, title: 'Instant Load', desc: 'Optimized performance for the modern web.' },
                       ].map((feat, i) => (
                         <div 
                           key={i}
                           className="p-8 rounded-[2.5rem] border shadow-2xl transition-all hover:translate-y-[-8px]"
                           style={{ 
                             backgroundColor: detailedTheme.colors.surface, 
                             borderColor: `${detailedTheme.colors.primary}10` 
                           }}
                         >
                           <feat.icon size={24} className="mb-4" style={{ color: detailedTheme.colors.accent }} />
                           <h4 className="font-black mb-2" style={{ color: detailedTheme.colors.primary }}>{feat.title}</h4>
                           <p className="text-xs opacity-60 leading-relaxed font-bold" style={{ color: detailedTheme.colors.primary }}>{feat.desc}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Standard View */
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-6xl z-10"
          >
            <header className="mb-8 flex flex-col xl:flex-row justify-between items-stretch xl:items-center bg-[var(--bg-surface)] backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-[var(--border-main)] sticky top-0 z-20 shadow-2xl transition-colors duration-300 gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-1">Theme Suggestions</h1>
                <p className="text-[var(--text-secondary)] text-xs md:text-sm font-medium">Synthesizing professional chromatic systems with Gemini AI.</p>
              </div>

              <button 
                onClick={generateRandomPairs}
                disabled={isGenerating}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-tr from-[#a3a6ff] to-[#49339d] text-white rounded-2xl transition-all shadow-xl font-black uppercase tracking-widest text-[10px] group active:scale-95 disabled:opacity-50"
              >
                <RefreshCw size={14} className={cn("group-hover:rotate-180 transition-transform duration-500", isGenerating && "animate-spin")} />
                {isGenerating ? "AI Generating..." : "Generate Fresh Sets"}
              </button>
            </header>

            {/* Configuration Selector */}
            <div className="mb-12 flex justify-center">
              <div className="bg-[var(--bg-surface)] p-2 rounded-[2rem] border border-[var(--border-main)] shadow-2xl flex items-center gap-1">
                {([2, 3, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                  setColorCount(n);
                  generateRandomPairs(n);
                }}
                    className={cn(
                      "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                      colorCount === n 
                        ? "bg-[#a3a6ff] text-[#0f00a4] shadow-lg" 
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                    )}
                  >
                    {n} Colors
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colorSets.map((set, i) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[var(--bg-surface)] p-8 rounded-[3rem] border border-[var(--border-main)] space-y-6 shadow-xl hover:bg-[var(--bg-elevated)] transition-all group cursor-pointer relative overflow-hidden"
              onClick={() => toggleReveal(set.id)}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Set {i + 1}</span>
                  <h3 className="text-sm font-black tracking-tighter uppercase">{set.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPairSaved(set.id)) deletePair(set.id);
                      else {
                        savePair(set);
                        confetti({ particleCount: 15, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
                      }
                    }}
                    className={cn(
                      "p-2 rounded-xl transition-all",
                      isPairSaved(set.id) ? "bg-pink-500/10 text-pink-500" : "opacity-40 group-hover:opacity-100 hover:text-pink-400"
                    )}
                  >
                    <Heart size={14} className={isPairSaved(set.id) ? "fill-pink-500" : ""} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openPreview({
                        primary: set.colors[0],
                        secondary: set.colors[1] || set.colors[0],
                        accent: set.colors[2] || set.colors[0],
                        background: set.colors[1] || '#ffffff',
                        surface: set.colors[3] || '#ffffff'
                      });
                    }}
                    className="p-2 rounded-xl opacity-40 group-hover:opacity-100 hover:text-[var(--preview-primary)] transition-all"
                  >
                    <Layout size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 h-40">
                {set.colors.map((color, idx) => (
                  <div 
                    key={idx}
                    className="flex-1 rounded-2xl relative overflow-hidden shadow-inner flex flex-col items-center justify-end p-4 border border-black/5"
                    style={{ backgroundColor: color }}
                  >
                    <AnimatePresence>
                      {revealedIds.has(set.id) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex flex-col items-center gap-2 w-full"
                        >
                           <button 
                             onClick={(e) => handleCopy(e, color, set.id)}
                             className="w-full py-2 bg-black/10 backdrop-blur-md rounded-xl hover:bg-black/20 transition-colors flex items-center justify-center gap-2"
                           >
                             {copiedId === `${set.id}-${color}` ? (
                               <Check size={10} className="text-white" />
                             ) : (
                               <Copy size={10} className="text-white/60" />
                             )}
                             <span className="text-[8px] font-mono font-black text-white tracking-tighter">{color}</span>
                           </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!revealedIds.has(set.id) && idx === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Reveal Codes</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      {/* AI Engine Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Dark/Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-[#060e20]/60 z-[60]"
            />

            {/* Centered Engine Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl px-6"
            >
              <div className="w-full bg-[var(--bg-surface)] backdrop-blur-3xl border border-[var(--border-main)] rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden p-3 flex items-center gap-3">
                <div className="flex-1 relative flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Describe your idea, and I'll bring it to life"
                    className="w-full bg-transparent px-6 py-5 text-lg text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]/40 font-bold tracking-tight"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        handleDetailedSubmit();
                      }
                    }}
                  />
                </div>
                <button 
                  onClick={handleDetailedSubmit}
                  className="p-5 bg-gradient-to-tr from-[#a3a6ff] via-[#49339d] to-[#1e1b4b] text-white rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center group"
                >
                  <Send size={24} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <p className="text-center text-[var(--text-secondary)] text-[10px] uppercase font-black tracking-[0.3em] mt-6 animate-pulse">
                Press Enter to Deploy Design
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex flex-col items-end gap-3">
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "h-16 px-8 rounded-full flex items-center gap-3 shadow-[0_20px_60px_rgba(163,166,255,0.3)] transition-all duration-500 relative group overflow-hidden border border-[var(--border-main)]",
            isChatOpen ? "bg-white text-black" : "bg-gradient-to-tr from-[#a3a6ff] via-[#49339d] to-[#1e1b4b] text-white"
          )}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <X size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Close Engine</span>
              </motion.div>
            ) : (
              <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Sparkles size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Engine</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
