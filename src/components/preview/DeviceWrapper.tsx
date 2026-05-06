import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DeviceType } from '../../lib/store';
import { cn } from '../../lib/utils';

interface DeviceWrapperProps {
  device: DeviceType;
  children: React.ReactNode;
}

export default function DeviceWrapper({ device, children }: DeviceWrapperProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');

  React.useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const { width: cW, height: cH } = container.getBoundingClientRect();
      
      let dW = 0, dH = 0;
      if (device === 'mobile') { 
        dW = orientation === 'portrait' ? 375 + 24 : 667 + 24; 
        dH = orientation === 'portrait' ? 667 + 24 : 375 + 24; 
      }
      else if (device === 'tablet') { 
        dW = orientation === 'portrait' ? 768 + 32 : 1024 + 32; 
        dH = orientation === 'portrait' ? 1024 + 32 : 768 + 32; 
      }
      else { setScale(1); return; }

      const padding = 60;
      const scaleX = (cW - padding) / dW;
      const scaleY = (cH - padding) / dH;
      setScale(Math.min(1, scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [device, orientation]);

  const getDeviceStyles = () => {
    const isPortrait = orientation === 'portrait';
    switch (device) {
      case 'mobile':
        return isPortrait 
          ? 'w-[375px] h-[667px] rounded-[3rem] border-[12px] border-[#1e1b4b] shadow-2xl'
          : 'w-[667px] h-[375px] rounded-[3rem] border-[12px] border-[#1e1b4b] shadow-2xl';
      case 'tablet':
        return isPortrait
          ? 'w-[768px] h-[1024px] rounded-[2.5rem] border-[16px] border-[#1e1b4b] shadow-2xl'
          : 'w-[1024px] h-[768px] rounded-[2.5rem] border-[16px] border-[#1e1b4b] shadow-2xl';
      case 'desktop':
        return 'w-full h-full rounded-none lg:rounded-[2rem] lg:border-t-[32px] lg:border-x-[8px] lg:border-b-[8px] lg:border-[#1e1b4b] shadow-2xl';
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12 overflow-hidden relative">
      {/* Orientation Toggle */}
      {(device === 'mobile' || device === 'tablet') && (
        <button 
          onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
          className="absolute top-4 right-4 z-[60] bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white/60 hover:text-white transition-all backdrop-blur-md border border-white/5"
        >
          <div className={cn("transition-transform duration-500", orientation === 'landscape' ? "rotate-90" : "rotate-0")}>
            <Smartphone size={16} />
          </div>
        </button>
      )}

      <motion.div
        layout
        initial={false}
        animate={{ scale }}
        className={cn(
          "bg-[var(--bg-app)] relative transition-all duration-700 ease-in-out overflow-hidden origin-center",
          getDeviceStyles()
        )}
      >
        {/* Device Specific UI Elements */}
        {device === 'mobile' && orientation === 'portrait' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1e1b4b] rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-8 h-1 rounded-full bg-white/20" />
          </div>
        )}
        
        {device === 'desktop' && (
          <div className="hidden lg:flex absolute top-[-24px] left-1/2 -translate-x-1/2 w-full px-6 items-center justify-between z-50">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
               <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
             </div>
             <div className="flex-1 max-w-sm mx-auto h-4 bg-black/10 rounded-full flex items-center justify-center">
               <span className="text-[6px] font-black uppercase tracking-widest text-white/20">paletteai.studio/preview</span>
             </div>
             <div className="w-12" />
          </div>
        )}

        <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[var(--bg-app)]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

const Smartphone = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);
