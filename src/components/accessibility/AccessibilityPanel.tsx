import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, RefreshCcw, Eye } from 'lucide-react';
import { useUIStore, ColorBlindnessMode } from '../../store/uiStore';
import { getContrastRatio, getWCAGScore, calculateAccessibilityGrade } from '../../lib/accessibility-engine';
import { cn } from '../../lib/utils';

interface AccessibilityPanelProps {
  colors: string[];
  onAutoFix?: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ colors, onAutoFix }) => {
  const { 
    showAccessibilityPanel, 
    toggleAccessibilityPanel, 
    colorBlindnessMode, 
    setColorBlindnessMode 
  } = useUIStore();

  if (colors.length < 2) return null;

  const background = colors[colors.length - 1]; // Use last as surface
  const primary = colors[0];
  const ratio = getContrastRatio(primary, background);
  const score = getWCAGScore(ratio);
  const grade = calculateAccessibilityGrade(colors);

  const blindnessModes: { label: string; value: ColorBlindnessMode }[] = [
    { label: 'Normal', value: 'none' },
    { label: 'Protanopia', value: 'protanopia' },
    { label: 'Deuteranopia', value: 'deuteranopia' },
    { label: 'Tritanopia', value: 'tritanopia' },
    { label: 'Achromatopsia', value: 'achromatopsia' },
  ];

  return (
    <AnimatePresence>
      {showAccessibilityPanel && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed right-6 top-24 bottom-6 w-80 bg-[var(--bg-surface)] backdrop-blur-2xl border border-[var(--border-main)] rounded-[2.5rem] shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-main)] flex justify-between items-center bg-white/50">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)]">Compliance</h2>
              <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-60">WCAG 2.1 ANALYSIS</p>
            </div>
            <button 
              onClick={toggleAccessibilityPanel}
              className="p-2 hover:bg-[var(--border-main)] rounded-xl transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {/* Score Overview */}
            <div className="text-center space-y-2">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-[var(--border-main)]"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * grade) / 100 }}
                    className={cn(
                      grade > 90 ? "text-emerald-500" : grade > 70 ? "text-amber-500" : "text-rose-500"
                    )}
                  />
                </svg>
                <span className="absolute text-xl font-black">{grade}%</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Accessibility Grade</p>
            </div>

            {/* Contrast Checks */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                <CheckCircle2 size={12} className="text-emerald-500" /> Contrast Matrix
              </h3>
              
              <div className="space-y-4">
                {colors.slice(0, -1).map((color, idx) => {
                  const pairRatio = getContrastRatio(color, background);
                  const pairScore = getWCAGScore(pairRatio);
                  const labels = ['Primary', 'Secondary', 'Accent', 'Surface'];
                  const label = labels[idx] || `Color ${idx + 1}`;

                  return (
                    <div key={idx} className="bg-[var(--bg-elevated)] p-4 rounded-2xl border border-[var(--border-main)] space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                        </div>
                        <div className="flex gap-1">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black",
                            pairRatio >= 4.5 ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                          )}>AA</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[8px] font-black",
                            pairRatio >= 7 ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                          )}>AAA</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-black tracking-tighter">{pairRatio.toFixed(1)}:1</span>
                        <span className={cn(
                          "text-[8px] font-bold uppercase tracking-widest",
                          pairRatio >= 4.5 ? "text-emerald-500" : "text-rose-500"
                        )}>
                          {pairRatio >= 4.5 ? "Readable" : "Low Contrast"}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--border-main)] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((pairRatio / 10) * 100, 100)}%` }}
                          className={cn(
                            "h-full rounded-full",
                            pairRatio >= 4.5 ? "bg-emerald-500" : "bg-rose-500"
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color Blindness Simulation */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                <Eye size={12} className="text-[#a3a6ff]" /> Vision Simulation
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {blindnessModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setColorBlindnessMode(mode.value)}
                    className={cn(
                      "flex justify-between items-center p-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-wider",
                      colorBlindnessMode === mode.value 
                        ? "bg-[#a3a6ff] border-[#a3a6ff] text-white shadow-lg" 
                        : "bg-[var(--bg-app)] border-[var(--border-main)] hover:border-[#a3a6ff]"
                    )}
                  >
                    {mode.label}
                    {colorBlindnessMode === mode.value && <CheckCircle2 size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer: AI Fixer */}
          <div className="p-6 bg-[var(--bg-elevated)] border-t border-[var(--border-main)]">
            <button
              onClick={onAutoFix}
              className="w-full bg-gradient-to-r from-[#a3a6ff] to-[#49339d] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <RefreshCcw size={16} /> AI Auto-Fix Contrast
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
