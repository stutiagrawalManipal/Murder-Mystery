
import React from 'react';
import { motion } from 'framer-motion';
import { SCENARIOS } from '../data/database';

export const ScenarioPreview: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-zinc-950 relative border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-elite text-red-600 mb-4 uppercase tracking-[0.3em] text-sm"
          >
            Ongoing Investigations
          </motion.p>
          <h2 className="font-crimson text-5xl md:text-6xl text-white">The Active Dossiers</h2>
        </div>
        
        <div className="space-y-4">
          {SCENARIOS.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative py-8 border-b border-white/5 overflow-hidden flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-all px-6 rounded-lg"
            >
              <div className="text-left relative z-10 flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <span className="text-[10px] font-elite text-gray-600 uppercase tracking-widest">Case #{scenario.id}</span>
                  <div className={`px-2 py-0.5 rounded-full border text-[8px] font-elite uppercase tracking-widest ${
                    scenario.status === 'Open' ? 'border-green-900/50 text-green-500 bg-green-900/5' : 'border-red-900/50 text-red-500 bg-red-900/5'
                  }`}>
                    {scenario.status}
                  </div>
                </div>
                <h3 className="font-crimson text-3xl md:text-5xl text-gray-300 group-hover:text-white transition-colors">
                  {scenario.name}
                </h3>
                <p className="text-gray-500 font-inter text-sm max-w-xl mt-3 leading-relaxed">
                  {scenario.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-8 mt-6 md:mt-0 relative z-10">
                <div className="text-right">
                  <p className="text-[10px] text-gray-600 font-elite uppercase tracking-wider">Operatives</p>
                  <p className="text-xl font-crimson text-white">{scenario.operatives}</p>
                </div>
                <div className="text-right border-l border-white/10 pl-8">
                  <p className="text-[10px] text-gray-600 font-elite uppercase tracking-wider">Solved Rate</p>
                  <p className="text-xl font-crimson text-white">{scenario.solvedRate}</p>
                </div>
                <div className="text-right border-l border-white/10 pl-8 hidden lg:block">
                  <p className="text-[10px] text-gray-600 font-elite uppercase tracking-wider">Difficulty</p>
                  <div className="flex space-x-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-3 rounded-full ${i < scenario.difficulty ? 'bg-red-600' : 'bg-zinc-800'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover highlight line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between p-6 bg-red-950/5 border border-red-900/20 rounded-lg"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
            <p className="italic text-gray-400 font-inter text-sm">
              Live Feed: Data synchronization in progress...
            </p>
          </div>
          <p className="text-gray-500 font-elite text-[10px] uppercase tracking-widest text-center md:text-right">
            Dossier access requires level 4 clearance or higher.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
