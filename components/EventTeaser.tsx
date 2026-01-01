
import React from 'react';
import { motion } from 'framer-motion';

export const EventTeaser: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#d2b48c] text-slate-900 p-8 md:p-12 shadow-2xl relative rotate-1 rounded-sm border-l-8 border-yellow-700/20"
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")',
            boxShadow: '20px 20px 60px rgba(0,0,0,0.8)'
          }}
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>
          
          <div className="flex justify-between items-start mb-10 border-b border-black/20 pb-4">
            <div>
              <h2 className="font-elite text-2xl uppercase font-bold tracking-tighter">Case Briefing: #001-A</h2>
              <p className="font-elite text-xs text-red-800 font-bold tracking-widest">PERSONAL & CONFIDENTIAL</p>
            </div>
            <div className="text-right">
              <p className="font-elite text-sm">STATUS: ACTIVE</p>
              <p className="font-elite text-sm">RE: WELCOME INVESTIGATORS</p>
            </div>
          </div>

          <div className="space-y-6 font-elite text-lg leading-relaxed">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
              className="font-bold"
            >
              GREETINGS, TEAM.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              viewport={{ once: true }}
            >
              You have been selected for this assignment based on your unparalleled reputation for precision and discretion. Today, you are no longer civilians. You are the final line between a cold case and the absolute truth.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              viewport={{ once: true }}
            >
              The scene is waiting. The shadows are long. Trust your instincts, but verify every word. Your objective is simple: Unmask the killer before the clock runs out.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center space-x-4 border-t border-black/10 pt-8"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                <span className="font-bold text-xs uppercase">Chief</span>
              </div>
              <p className="italic text-sm text-black/60 tracking-tight">Approved for deployment - Central Intelligence Command</p>
            </motion.div>
          </div>

          {/* Fingerprint Image Placeholder */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 pointer-events-none grayscale">
            <img src="https://picsum.photos/id/10/200/200" alt="fingerprint" className="rounded-full blur-[1px]" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="white">
           <path d="M50 0 L100 100 L0 100 Z" />
        </svg>
      </div>
    </section>
  );
};
