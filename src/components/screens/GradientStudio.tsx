import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Heart, RefreshCw, Layers, Wand2, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';
import { generateAIGradients, AIGradient } from '@/src/services/aiService';
import { useDesignData } from '@/src/contexts/DesignDataContext';
import { usePreviewStore } from '@/src/lib/store';

export default function GradientStudio() {
  const { likeGradient, unlikeGradient, isGradientLiked } = useDesignData();
  const openPreview = usePreviewStore(state => state.openPreview);
  const [selectedGradient, setSelectedGradient] = useState<AIGradient | null>(null);
  const [suggestions, setSuggestions] = useState<AIGradient[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleLikeToggle = () => {
    if (!selectedGradient) return;
    if (isGradientLiked(selectedGradient.name)) {
      unlikeGradient(selectedGradient.name);
    } else {
      likeGradient(selectedGradient);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: selectedGradient.colors
      });
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const aiGradients = await generateAIGradients();
      if (aiGradients && aiGradients.length > 0) {
        setSuggestions(aiGradients);
        setSelectedGradient(aiGradients[0]);
        
        // Trigger confetti with the NEW results directly
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: aiGradients[0].colors
        });
      }
    } catch (error) {
      console.error("Failed to generate AI gradients:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  useEffect(() => {
    handleRegenerate();
  }, []);

  const handleCopy = (colors: string[]) => {
    navigator.clipboard.writeText(colors.join(', '));
    confetti({
      particleCount: 50,
      colors: colors
    });
  };

  return (
    <div className="p-6 md:p-12 h-screen overflow-y-auto custom-scrollbar transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">Gradient Studio</h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] flex items-center gap-2">
            AI-generated luminous blends for modern interfaces.
          </p>
        </div>

        <div className="w-full md:w-auto flex items-center gap-4 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-main)] shadow-xl justify-between md:justify-start">
          <div className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-[var(--text-primary)] border-r border-[var(--border-main)]">
             <Layers size={18} className="text-[#a3a6ff]" />
             SaaS Platform
          </div>
          <button 
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex-1 md:flex-none bg-gradient-to-br from-[#a3a6ff] to-[#49339d] text-white px-6 py-2 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
             {isRegenerating ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
             <span className="whitespace-nowrap">{isRegenerating ? "Thinking..." : "Regenerate"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[600px] pb-12">
        {/* Large Preview */}
        <motion.div 
          layoutId="main-gradient"
          className="col-span-1 md:col-span-8 bg-[var(--bg-app)] rounded-3xl p-6 md:p-8 relative overflow-hidden group border border-[var(--border-main)] shadow-2xl min-h-[400px] md:min-h-0"
        >
          {selectedGradient && (
            <div 
              className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${selectedGradient.colors.join(', ')})`,
                opacity: 0.8
              }}
            />
          )}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <span className="bg-black/20 backdrop-blur-3xl px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">
                 Current Blend
               </span>
               <button 
                 onClick={handleLikeToggle}
                 className={cn(
                   "p-3 backdrop-blur-3xl rounded-full border transition-all",
                   selectedGradient && isGradientLiked(selectedGradient.name)
                     ? "bg-[#a3a6ff] text-white border-[#a3a6ff]"
                     : "bg-black/20 text-white border-white/10 hover:bg-white/10"
                 )}
               >
                 <Heart size={20} className={selectedGradient && isGradientLiked(selectedGradient.name) ? "fill-white" : ""} />
               </button>
            </div>

            {selectedGradient ? (
              <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 max-w-md shadow-2xl transition-colors duration-300">
                <h3 className="text-3xl font-black mb-3 text-white">{selectedGradient.name}</h3>
                <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                  {selectedGradient.colors.map((c, i) => (
                    <React.Fragment key={i}>
                      <span>{c}</span>
                      {i < selectedGradient.colors.length - 1 && <span className="opacity-30">→</span>}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                   <button 
                    onClick={() => openPreview({
                      primary: selectedGradient.colors[0],
                      secondary: selectedGradient.colors[selectedGradient.colors.length - 1],
                      accent: selectedGradient.colors[Math.floor(selectedGradient.colors.length / 2)],
                      gradients: selectedGradient.colors
                    })}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <ExternalLink size={14} /> Live Preview
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 max-w-md shadow-2xl animate-pulse">
                <div className="h-8 w-48 bg-white/10 rounded-lg mb-4" />
                <div className="h-4 w-32 bg-white/10 rounded-lg" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Suggestions */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          {suggestions.map((grad, i) => (
            <motion.div
              key={grad.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedGradient(grad)}
              className={cn(
                "flex-1 p-6 rounded-3xl cursor-pointer bg-[var(--bg-surface)] border transition-all hover:scale-[1.02] flex flex-col group shadow-xl",
                selectedGradient?.name === grad.name ? "border-[#a3a6ff]" : "border-[var(--border-main)] hover:bg-[var(--bg-elevated)]"
              )}
            >
              <div 
                className="h-24 rounded-2xl w-full mb-4 shadow-lg group-hover:scale-[1.02] transition-transform"
                style={{ background: `linear-gradient(to right, ${grad.colors.join(', ')})` }}
              />
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-[var(--text-primary)]">{grad.name}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (isGradientLiked(grad.name)) unlikeGradient(grad.name);
                      else likeGradient(grad.name);
                    }}
                    className={cn(
                      "p-2 transition-colors",
                      isGradientLiked(grad.name) ? "text-pink-500" : "text-[var(--text-secondary)] hover:text-pink-400"
                    )}
                  >
                    <Heart size={16} className={isGradientLiked(grad.name) ? "fill-pink-500" : ""} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCopy(grad.colors); }}
                    className="p-2 text-[var(--text-secondary)] hover:text-[#a3a6ff] transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
