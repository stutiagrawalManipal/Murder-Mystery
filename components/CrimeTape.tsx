
import React from 'react';
import { motion } from 'framer-motion';

interface CrimeTapeProps {
  reverse?: boolean;
}

export const CrimeTape: React.FC<CrimeTapeProps> = ({ reverse }) => {
  return (
    <div className={`relative w-full h-16 overflow-hidden bg-yellow-500 border-y-4 border-black z-30 ${reverse ? '-rotate-2 -translate-y-4 scale-110' : 'rotate-2 translate-y-4 scale-110 shadow-2xl'}`}>
      <motion.div 
        animate={{ x: reverse ? [0, 400] : [0, -400] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex whitespace-nowrap items-center h-full"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="text-black font-black text-2xl px-12 italic uppercase tracking-tighter">
            CRIME SCENE - DO NOT CROSS - CRIME SCENE - DO NOT CROSS
          </span>
        ))}
      </motion.div>
    </div>
  );
};
