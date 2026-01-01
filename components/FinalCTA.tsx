
import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-black to-[#0a0a0a] text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <h2 className="font-crimson text-5xl md:text-7xl text-white mb-6">Will you find the truth?</h2>
        <p className="text-gray-400 font-inter max-w-xl mx-auto mb-12 text-lg">
          The clock is ticking. The trail is going cold. If you missed the terminal at the top, scroll back and enter your credentials to begin.
        </p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-block border border-red-900/30 px-8 py-4 bg-red-950/10 rounded-sm"
        >
          <p className="font-elite text-red-500 uppercase tracking-widest text-sm">
            Justice Awaits the Bold.
          </p>
        </motion.div>
      </motion.div>

      {/* Footer-like subtle text */}
      <div className="mt-32 text-gray-700 font-elite text-xs tracking-[0.4em] uppercase">
        &copy; 2026 Hidden Truth Investigations. All rights reserved.
      </div>

      {/* Distorted Silhouette Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none w-full max-w-2xl blur-[2px]">
         <img src="https://picsum.photos/id/1014/800/400" alt="silhouette" className="w-full grayscale" />
      </div>
    </section>
  );
};