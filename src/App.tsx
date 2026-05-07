import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SideNavBar from '@/src/components/SideNavBar';
import Dashboard from '@/src/components/screens/Dashboard';
import ThemeGenerator from '@/src/components/screens/ThemeGenerator';
import GradientStudio from '@/src/components/screens/GradientStudio';
import ImagePalette from '@/src/components/screens/ImagePalette';
import BrandDNAEngine from '@/src/components/brand-dna/BrandDNAEngine';

import Settings from '@/src/components/screens/Settings';
import LandingPage from '@/src/components/screens/LandingPage';
import { AppMode } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { UserProvider } from '@/src/contexts/UserContext';
import { DesignDataProvider } from '@/src/contexts/DesignDataContext';
import LivePreviewOverlay from '@/src/components/preview/LivePreviewOverlay';
import { MeshBackground } from '@/src/components/animations/MeshBackground';
import { ColorBlindnessFilters } from '@/src/components/accessibility/ColorBlindnessFilters';
import { useUIStore } from '@/src/store/uiStore';
import { useStyleModeStore } from '@/src/store/styleModeStore';
import { CursorGlow } from '@/src/components/motion/CursorGlow';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('Landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { colorBlindnessMode } = useUIStore();
  const { config } = useStyleModeStore();

  useEffect(() => {
    // Inject Style Mode Tokens
    const root = document.documentElement;
    root.style.setProperty('--app-radius', config.radius);
    root.style.setProperty('--app-shadow', config.shadow);
    root.style.setProperty('--app-border', config.border);
    root.style.setProperty('--app-blur', config.blur);
    root.style.setProperty('--app-glow', config.glow);
    root.style.setProperty('--app-font', config.fontFamily);
  }, [config]);

  const renderScreen = () => {
    switch (currentMode) {
      case 'Landing':
        return <LandingPage onStart={(mode) => setCurrentMode(mode || 'Dashboard')} />;
      case 'Dashboard':
        return <Dashboard setMode={handleSetMode} />;
      case 'Theme Generator':
        return <ThemeGenerator />;
      case 'Gradient AI':
        return <GradientStudio />;
      case 'Image Palette':
        return <ImagePalette />;
      case 'Brand DNA':
        return <BrandDNAEngine />;

      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard setMode={handleSetMode} />;
    }
  };

  const handleSetMode = (mode: AppMode) => {
    setCurrentMode(mode);
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <DesignDataProvider>
          <MeshBackground />
          <CursorGlow />
          <ColorBlindnessFilters />
          
          <div 
            className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex overflow-x-hidden transition-all duration-500 ease-in-out"
            style={{ 
              filter: colorBlindnessMode !== 'none' ? `url(#${colorBlindnessMode})` : 'none',
              fontFamily: config.fontFamily
            }}
          >
            {currentMode !== 'Landing' && (
              <SideNavBar 
                currentMode={currentMode} 
                setMode={handleSetMode} 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
              />
            )}
            
            <div className={cn(
              "flex-1 flex flex-col min-h-screen transition-all duration-300",
              currentMode !== 'Landing' && "lg:ml-64 w-full"
            )}>
              {currentMode !== 'Landing' && (
                <header className="lg:hidden p-6 flex justify-between items-center border-b border-[var(--border-main)] bg-[var(--bg-surface)] sticky top-0 z-40">
                  <div className="text-xl font-black tracking-tighter">PaletteAI</div>
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-main)]"
                  >
                    <div className="w-6 h-0.5 bg-[var(--text-primary)] mb-1.5" />
                    <div className="w-6 h-0.5 bg-[var(--text-primary)] mb-1.5" />
                    <div className="w-6 h-0.5 bg-[var(--text-primary)]" />
                  </button>
                </header>
              )}

              <main className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMode}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
            
            {/* Immersive Live Preview System */}
            <LivePreviewOverlay />
          </div>
        </DesignDataProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

