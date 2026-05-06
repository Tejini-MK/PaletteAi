import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudUpload, RefreshCw, Copy, Check, Wand2, Sparkles, Image as ImageIcon, Layout, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';
import ColorThief from 'colorthief';
import { analyzeImageMood, ImageMood } from '@/src/services/aiService';
import { usePreviewStore } from '@/src/lib/store';

interface Swatch {
  hex: string;
  label: string;
}

export default function ImagePalette() {
  const openPreview = usePreviewStore(state => state.openPreview);
  const [swatches, setSwatches] = useState<Swatch[]>([]);
  const [swatchCount, setSwatchCount] = useState(12);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [imageMood, setImageMood] = useState<ImageMood | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rgbToHex = (r: number, g: number, b: number) => 
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    setImageMood(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const b64 = event.target?.result as string;
      setImageUrl(b64);
      
      const img = new Image();
      img.src = b64;
      img.onload = async () => {
        const colorThief = new ColorThief();
        try {
          const palette = colorThief.getPalette(img, swatchCount);
          const newSwatches: Swatch[] = palette.map((rgb: number[], i: number) => ({
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            label: i === 0 ? 'Background' : i === 1 ? 'Surface' : i === 2 ? 'Accent' : `Main ${i}`
          }));
          setSwatches(newSwatches);

          // AI Mood Analysis
          const base64Clean = b64.split(',')[1];
          const mood = await analyzeImageMood(base64Clean, file.type);
          if (mood) {
            setImageMood(mood);
          }

          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.9 },
            colors: newSwatches.map(s => s.hex)
          });
        } catch (err) {
          console.error("Extraction error:", err);
        } finally {
          setIsExtracting(false);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    confetti({
      particleCount: 20,
      colors: [hex]
    });
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto w-full h-full flex flex-col gap-12 overflow-y-auto custom-scrollbar transition-colors duration-300">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*" 
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[var(--border-main)] pb-8 transition-colors duration-300">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Image DNA</h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)]">Extract chromatic signatures and emotional mood from visual assets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Upload and Bento Palette */}
        <div className="lg:col-span-8 space-y-12">
          {/* Large Upload Zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-[2rem] md:rounded-[3rem] transition-all cursor-pointer group overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center justify-center shadow-xl",
              imageUrl ? "border-[#a3a6ff]/30" : "border-[var(--border-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)]"
            )}
          >
            {imageUrl ? (
              <>
                <img 
                  src={imageUrl} 
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Extracted asset"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 duration-500">
                  <div className="text-center scale-90 group-hover:scale-100 transition-all">
                    <CloudUpload size={48} className="text-white mx-auto mb-4" />
                    <p className="text-white font-black uppercase tracking-widest text-xs">Drop new signature</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-20 relative z-10 transition-colors duration-300">
                <div className="w-24 h-24 rounded-[2.5rem] bg-[#a3a6ff20] flex items-center justify-center mb-10 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  {isExtracting ? <Loader2 size={40} className="text-[#a3a6ff] animate-spin" /> : <CloudUpload size={40} className="text-[#a3a6ff]" />}
                </div>
                <h3 className="text-3xl font-black text-[var(--text-primary)] mb-3">Signature Deployment</h3>
                <p className="text-sm text-[var(--text-secondary)] font-medium max-w-xs mx-auto">Drop an image here to reveal its chromatic DNA and emotional score.</p>
              </div>
            )}
          </div>

          {/* Palette Row Layout */}
          <AnimatePresence>
            {imageUrl && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-8 overflow-hidden"
              >
                <div className="flex justify-between items-center border-b border-[var(--border-main)] pb-4">
                  <h2 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em]">Extracted Signature</h2>
                </div>

                <div className="flex flex-wrap items-start gap-x-8 gap-y-12 pt-8">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isExtracting ? (
                      /* Animated Placeholders during extraction */
                      Array.from({ length: 12 }).map((_, i) => (
                        <motion.div 
                          key={`loading-${i}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: [0.3, 0.6, 0.3], 
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                          className="w-20 h-20 bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border-main)] shadow-inner" 
                        />
                      ))
                    ) : swatches.length > 0 ? (
                      /* Actual extracted swatches with deliberate staggering */
                      swatches.map((swatch, i) => (
                        <motion.div
                          key={`${swatch.hex}-${i}`}
                          initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                          transition={{ 
                            type: "spring",
                            damping: 12,
                            stiffness: 100,
                            delay: i * 0.08, // Deliberate "one-by-one" feel
                          }}
                          onClick={() => handleCopy(swatch.hex)}
                          className="flex flex-col items-center gap-4 group cursor-pointer"
                        >
                          <div 
                            className="w-16 h-16 md:w-20 md:h-20 rounded-[15px] md:rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:scale-110 active:scale-95 border border-black/5 relative overflow-hidden"
                            style={{ backgroundColor: swatch.hex }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: (i * 0.08) + 0.2 }}
                            className="text-[11px] font-mono font-black text-[var(--text-secondary)] tracking-tighter group-hover:text-[var(--text-primary)] transition-colors"
                          >
                            {swatch.hex}
                          </motion.span>
                        </motion.div>
                      ))
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* AI REFINED SHADES SECTION */}
                {imageMood?.refinedPalette && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-16 space-y-10"
                  >
                    <div className="flex justify-between items-center border-b border-[var(--border-main)] pb-4">
                      <h2 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em]">AI Refined Spectrum</h2>
                    </div>

                    <div className="space-y-12">
                      {imageMood.refinedPalette.map((group, groupIdx) => (
                        <div key={group.name} className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a3a6ff]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">{group.name} System</span>
                          </div>
                          <div className="grid grid-cols-5 gap-3 h-24 md:h-28">
                            {group.shades.map((shade, shadeIdx) => (
                              <motion.div
                                key={`${shade}-${shadeIdx}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (groupIdx * 0.1) + (shadeIdx * 0.05) }}
                                onClick={() => handleCopy(shade)}
                                className="group relative cursor-pointer"
                              >
                                <div 
                                  className="w-full h-full rounded-2xl md:rounded-[2rem] border border-black/5 shadow-lg transition-transform group-hover:scale-[1.03] active:scale-95 group-hover:-translate-y-1 duration-300"
                                  style={{ backgroundColor: shade }}
                                />
                                <div className="absolute -bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  <span className="text-[9px] font-mono font-bold text-[var(--text-secondary)]">{shade.toUpperCase()}</span>
                                </div>
                                {shadeIdx === 2 && (
                                  <div className="absolute -top-1 -right-1">
                                    <Sparkles size={12} className="text-white drop-shadow-md" />
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Simulation and AI Mood */}
        <div className="lg:col-span-4 space-y-8 h-full">
          {/* AI Mood Insight */}
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] p-10 rounded-[3rem] border border-white/5 shadow-3xl space-y-6 min-h-[300px] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#a3a6ff20] rounded-xl">
                <Sparkles size={20} className="text-[#a3a6ff]" />
              </div>
              <span className="text-[10px] font-black text-[#a3a6ff] uppercase tracking-[0.3em]">AI Insight Score</span>
            </div>
            
            <AnimatePresence mode="wait">
              {imageMood ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-3xl font-black text-white leading-none tracking-tighter">{imageMood.mood}</h3>
                  <p className="text-sm text-[#a3aac4] leading-relaxed font-medium italic">"{imageMood.description}"</p>
                </motion.div>
              ) : (
                <div className="space-y-4 py-8">
                  <div className="h-8 w-2/3 bg-white/5 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-3 w-4/5 bg-white/5 rounded-lg animate-pulse" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Live Component Simulation */}
          <div className="bg-[var(--bg-surface)] backdrop-blur-2xl p-10 rounded-[3rem] border border-[var(--border-main)] shadow-3xl space-y-10 flex-1 transition-colors duration-300">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Interface Simulation</span>
              <Layout size={16} className="text-[var(--text-secondary)]/20" />
            </div>

            <div className="space-y-8">
              {/* Card Preview */}
              <motion.div 
                animate={{ 
                  backgroundColor: imageMood?.refinedPalette?.[0]?.shades[1] || (swatches.length > 2 ? swatches[2].hex : (document.documentElement.getAttribute('data-theme') === 'light' ? '#f1f5f9' : '#1e293b'))
                }}
                className="h-52 rounded-[2.5rem] p-10 flex flex-col justify-end gap-3 relative overflow-hidden group shadow-2xl border border-[var(--border-main)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl z-10 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: imageMood?.refinedPalette?.[0]?.shades[2] || (swatches.length > 0 ? swatches[Math.min(swatches.length - 1, 6)].hex : '#a3a6ff') }}
                >
                  <Sparkles size={24} className="text-white" />
                </div>
                <div className="z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40" style={{ color: '#fff' }}>System Accent</span>
                </div>
              </motion.div>

                  <button 
                    onClick={() => {
                      const colors = {
                        primary: imageMood?.refinedPalette?.[0]?.shades[2] || (swatches.length > 0 ? swatches[0].hex : '#a3a6ff'),
                        secondary: imageMood?.refinedPalette?.[1]?.shades[2] || (swatches.length > 1 ? swatches[1].hex : '#1e1b4b'),
                        accent: imageMood?.refinedPalette?.[2]?.shades[2] || (swatches.length > 2 ? swatches[2].hex : '#06b6d4'),
                        background: imageMood?.refinedPalette?.[0]?.shades[0] || (swatches.length > 0 ? swatches[0].hex : '#f8fafc'),
                      };
                      openPreview(colors);
                    }}
                    className="w-full mt-6 py-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-main)] text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)] hover:bg-[var(--preview-primary)] hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Layout size={14} /> Live Preview
                  </button>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

