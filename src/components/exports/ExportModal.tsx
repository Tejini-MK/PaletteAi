import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, FileCode, Smartphone, Code2, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
}

type ExportFormat = 'tailwind' | 'css' | 'scss' | 'flutter' | 'json';

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, colors }) => {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('tailwind');
  const [copied, setCopied] = useState(false);

  const getExportCode = () => {
    switch (activeFormat) {
      case 'tailwind':
        return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "${colors.primary}",
        secondary: "${colors.secondary}",
        accent: "${colors.accent}",
        background: "${colors.background}",
        surface: "${colors.surface}",
      }
    }
  }
}`;
      case 'css':
        return `:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --background: ${colors.background};
  --surface: ${colors.surface};
}`;
      case 'scss':
        return `$primary: ${colors.primary};
$secondary: ${colors.secondary};
$accent: ${colors.accent};
$background: ${colors.background};
$surface: ${colors.surface};

// Usage
body {
  background-color: $background;
  color: $primary;
}`;
      case 'flutter':
        return `// Palette AI Design System
class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF${colors.primary.replace('#', '')}),
        primary: const Color(0xFF${colors.primary.replace('#', '')}),
        secondary: const Color(0xFF${colors.secondary.replace('#', '')}),
        tertiary: const Color(0xFF${colors.accent.replace('#', '')}),
        surface: const Color(0xFF${colors.surface.replace('#', '')}),
        background: const Color(0xFF${colors.background.replace('#', '')}),
      ),
      cardTheme: CardTheme(
        color: const Color(0xFF${colors.surface.replace('#', '')}),
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
    );
  }
}`;
      case 'json':
        return JSON.stringify({
          name: "Palette AI Theme",
          version: "1.0",
          tokens: {
            colors: {
              primary: { value: colors.primary, type: "color" },
              secondary: { value: colors.secondary, type: "color" },
              accent: { value: colors.accent, type: "color" },
              background: { value: colors.background, type: "color" },
              surface: { value: colors.surface, type: "color" }
            }
          }
        }, null, 2);
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: ExportFormat; label: string; icon: any }[] = [
    { id: 'tailwind', label: 'Tailwind', icon: FileCode },
    { id: 'css', label: 'CSS', icon: Code2 },
    { id: 'scss', label: 'SCSS', icon: Terminal },
    { id: 'flutter', label: 'Flutter', icon: Smartphone },
    { id: 'json', label: 'JSON', icon: FileCode },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-[var(--border-main)] flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#a3a6ff]/10 rounded-2xl text-[#a3a6ff]">
                  <FileCode size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-[var(--text-primary)]">Export Theme</h2>
                  <p className="text-xs font-bold text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">Developer Handoff</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-[var(--border-main)] rounded-2xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Tabs */}
              <div className="flex gap-2 p-1 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-main)]">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFormat(tab.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        activeFormat === tab.id
                          ? "bg-white text-[var(--text-primary)] shadow-sm"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Code Preview */}
              <div className="relative group">
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-[#a3a6ff] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="bg-[#0f172a] text-slate-300 p-8 rounded-[2rem] font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner max-h-[300px] custom-scrollbar">
                  <code>{getExportCode()}</code>
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-[var(--bg-elevated)] border-t border-[var(--border-main)] flex justify-between items-center">
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Ready for production</p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--border-main)] transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
