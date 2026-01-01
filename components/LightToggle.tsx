
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, LightbulbOff } from 'lucide-react';

interface LightToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const LightToggle: React.FC<LightToggleProps> = ({ enabled, onToggle }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="fixed bottom-8 right-8 z-[10000] p-4 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-md shadow-2xl hover:bg-zinc-800 transition-colors group"
      title={enabled ? "Switch to Room Lights" : "Enable Flashlight Mode"}
    >
      {enabled ? (
        <Lightbulb className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400" />
      ) : (
        <LightbulbOff className="w-6 h-6 text-gray-500 group-hover:text-gray-400" />
      )}
      
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 border border-white/10 text-white font-elite text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity rounded pointer-events-none">
        {enabled ? "Illumination Required?" : "Return to Shadows"}
      </span>
    </motion.button>
  );
};
