
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeScreenProps {
  onComplete: () => void;
}

export const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-950 flex items-center justify-center p-6 overflow-hidden">
      <div className="max-w-xl w-full perspective-[1000px]">
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-[#d2b48c] p-12 shadow-2xl rounded-sm border-2 border-yellow-800/20 cursor-pointer relative group"
            onClick={() => setIsOpen(true)}
            whileHover={{ y: -10 }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] opacity-10"></div>
            <div className="relative text-center space-y-6">
              <div className="w-20 h-20 border-4 border-red-900 mx-auto flex items-center justify-center rounded-full">
                <span className="text-red-900 font-bold text-2xl font-elite">TOP SECRET</span>
              </div>
              <div className="space-y-1">
                <h2 className="font-elite text-slate-900 text-xl font-bold uppercase tracking-widest">Case #002: The Last Trip</h2>
                <p className="font-elite text-slate-700 text-xs">INVESTIGATION DIVISION</p>
              </div>
              <div className="pt-8 text-slate-800 font-elite text-sm animate-pulse">
                Click to break seal and begin...
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-10 md:p-16 text-slate-900 shadow-[20px_20px_60px_rgba(0,0,0,0.5)] relative font-elite"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <div className="w-16 h-16 border-2 border-black rotate-45"></div>
            </div>
            
            <div className="space-y-8">
              <div className="border-b-2 border-red-600 pb-4">
                <h3 className="text-2xl font-bold uppercase tracking-tighter">CONFIDENTIAL – CASE FILE ISSUED</h3>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed italic">
                <p>Welcome detectives, you have been granted access to a restricted case.</p>
                <p>Trust nothing. Question everything. Look beyond what is presented at the surface.</p>
                <p>Good luck. Justice depends on your clarity of mind.</p>
              </div>
              
              <div className="pt-10 flex flex-col items-end">
                <p className="font-bold text-sm">Central Investigation Bureau</p>
                <div className="w-32 h-12 bg-black/5 flex items-center justify-center mt-2 border border-black/10">
                   <span className="opacity-40 select-none">SIGNED</span>
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={onComplete}
                className="w-full bg-slate-900 text-white py-4 hover:bg-black transition-colors uppercase tracking-widest text-sm font-bold"
              >
                Proceed to Intelligence Dashboard
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
