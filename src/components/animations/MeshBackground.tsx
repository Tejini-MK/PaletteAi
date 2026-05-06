import { motion } from 'motion/react';
import { useUIStore } from '../../store/uiStore';

export const MeshBackground = () => {
  const { showMeshBackground } = useUIStore();

  if (!showMeshBackground) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
      {/* Primary Blob */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#a3a6ff]/20 blur-[120px] rounded-full"
      />

      {/* Secondary Blob */}
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -100, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#49339d]/10 blur-[120px] rounded-full"
      />

      {/* Accent Streak */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-[150%] h-[20%] bg-gradient-to-r from-transparent via-[#a3a6ff]/5 to-transparent blur-[80px]"
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
};
