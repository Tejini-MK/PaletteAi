import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StyleMode = 
  | 'modern-saas'
  | 'cyberpunk'
  | 'glassmorphism'
  | 'neo-tokyo'
  | 'minimal-apple'
  | 'retro-wave'
  | 'luxury-gold'
  | 'gaming-rgb'
  | 'anime-neon'
  | 'ai-matrix';

interface StyleConfig {
  radius: string;
  shadow: string;
  border: string;
  blur: string;
  glow: string;
  spacing: string;
  fontFamily: string;
  animationSpeed: number;
}

const styleConfigs: Record<StyleMode, StyleConfig> = {
  'modern-saas': {
    radius: '1rem',
    shadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.04)',
    blur: '0px',
    glow: 'none',
    spacing: '1rem',
    fontFamily: "'Inter', sans-serif",
    animationSpeed: 0.3,
  },
  'cyberpunk': {
    radius: '0px',
    shadow: '0 0 15px rgba(var(--primary-rgb), 0.5)',
    border: '2px solid var(--primary)',
    blur: '0px',
    glow: 'drop-shadow(0 0 8px var(--primary))',
    spacing: '1.25rem',
    fontFamily: "'JetBrains Mono', monospace",
    animationSpeed: 0.1,
  },
  'glassmorphism': {
    radius: '2.5rem',
    shadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    blur: '20px',
    glow: 'none',
    spacing: '1.5rem',
    fontFamily: "'Inter', sans-serif",
    animationSpeed: 0.5,
  },
  'neo-tokyo': {
    radius: '0.75rem',
    shadow: '4px 4px 0px var(--accent)',
    border: '2px solid var(--text-primary)',
    blur: '0px',
    glow: 'none',
    spacing: '1rem',
    fontFamily: "'Space Grotesk', sans-serif",
    animationSpeed: 0.2,
  },
  'minimal-apple': {
    radius: '2rem',
    shadow: '0 20px 40px rgba(0,0,0,0.08)',
    border: 'none',
    blur: '0px',
    glow: 'none',
    spacing: '2rem',
    fontFamily: "'Inter', sans-serif",
    animationSpeed: 0.4,
  },
  'retro-wave': {
    radius: '0.5rem',
    shadow: '0 0 20px #ff00ff, 0 0 40px #00ffff',
    border: '1px solid #ff00ff',
    blur: '5px',
    glow: 'drop-shadow(0 0 10px #ff00ff)',
    spacing: '1.25rem',
    fontFamily: "'Orbitron', sans-serif",
    animationSpeed: 0.6,
  },
  'luxury-gold': {
    radius: '0.25rem',
    shadow: '0 10px 30px rgba(0,0,0,0.2)',
    border: '1px solid #d4af37',
    blur: '0px',
    glow: 'none',
    spacing: '1.5rem',
    fontFamily: "'Playfair Display', serif",
    animationSpeed: 0.8,
  },
  'gaming-rgb': {
    radius: '0.5rem',
    shadow: '0 0 10px var(--primary)',
    border: '1px solid var(--primary)',
    blur: '0px',
    glow: 'drop-shadow(0 0 5px var(--primary))',
    spacing: '1rem',
    fontFamily: "'Rajdhani', sans-serif",
    animationSpeed: 0.2,
  },
  'anime-neon': {
    radius: '1.5rem',
    shadow: '0 0 15px rgba(255,0,255,0.3)',
    border: '3px solid #fff',
    blur: '0px',
    glow: 'drop-shadow(0 0 12px #ff00ff)',
    spacing: '1.25rem',
    fontFamily: "'Outfit', sans-serif",
    animationSpeed: 0.3,
  },
  'ai-matrix': {
    radius: '0.1rem',
    shadow: '0 0 10px #00ff00',
    border: '1px solid #00ff00',
    blur: '0px',
    glow: 'drop-shadow(0 0 5px #00ff00)',
    spacing: '0.75rem',
    fontFamily: "'Fira Code', monospace",
    animationSpeed: 0.05,
  },
};

interface StyleModeState {
  currentMode: StyleMode;
  config: StyleConfig;
  setMode: (mode: StyleMode) => void;
}

export const useStyleModeStore = create<StyleModeState>()(
  persist(
    (set) => ({
      currentMode: 'modern-saas',
      config: styleConfigs['modern-saas'],
      setMode: (mode: StyleMode) => set({ 
        currentMode: mode,
        config: styleConfigs[mode]
      }),
    }),
    {
      name: 'style-mode-storage',
    }
  )
);
