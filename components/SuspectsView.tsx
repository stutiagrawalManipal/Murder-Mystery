
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, Pin, Shirt } from 'lucide-react';
import { SUSPECTS } from '../data/database';

interface SuspectsViewProps {
  onBack: () => void;
}

export const SuspectsView: React.FC<SuspectsViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors font-elite text-xs uppercase mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <div className="bg-[#fdfdfd] text-slate-900 p-8 md:p-16 rounded-sm shadow-2xl relative font-elite border-t-[12px] border-zinc-800">
          <header className="mb-12">
            <div className="flex items-center space-x-3 mb-2">
              <Shirt className="w-5 h-5 text-green-600" />
              <h1 className="text-xl font-bold uppercase tracking-tight">Suspect Appearance & Clothing Record</h1>
            </div>
            <p className="text-sm font-bold mb-8">Team 1</p>
            
            <div className="space-y-2 text-[13px] leading-relaxed text-slate-700">
              <p><span className="font-bold">Compiled From:</span> CCTV visuals, witness recollections, access room observations</p>
              <p><span className="font-bold">Purpose:</span> To document physical appearance and attire of individuals present at the venue.</p>
              <p><span className="font-bold">Note:</span> This document records <span className="font-bold">observations only</span> and does not assign responsibility or intent.</p>
            </div>
            
            <div className="mt-12 pt-4 border-t border-slate-200">
               <h2 className="text-lg font-bold">Suspect Appearance Log</h2>
            </div>
          </header>

          <div className="space-y-10">
            {SUSPECTS.map((suspect, idx) => (
              <motion.div 
                key={suspect.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-[#3498db] text-white flex items-center justify-center text-xs font-bold rounded-sm">
                    {suspect.id}
                  </div>
                  <h3 className="text-md font-bold text-slate-900">{suspect.name}</h3>
                </div>

                <ul className="ml-9 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start">
                    <span className="mr-2 font-bold">•</span>
                    <p><span className="font-bold">Clothing:</span> {suspect.clothing}</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 font-bold">•</span>
                    <p><span className="font-bold">Footwear:</span> {suspect.footwear}</p>
                  </li>
                  {suspect.accessories && (
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <p><span className="font-bold">Accessories:</span> {suspect.accessories}</p>
                    </li>
                  )}
                  {suspect.notableDetail && (
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <p><span className="font-bold">Notable Detail:</span> {suspect.notableDetail}</p>
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>

          <footer className="mt-16 pt-8 border-t-2 border-slate-200">
            <div className="flex items-center space-x-2 mb-4 text-red-600">
              <Pin className="w-4 h-4 fill-current rotate-45" />
              <h3 className="font-bold text-md">General Note</h3>
            </div>
            <div className="space-y-2 text-[13px] text-slate-700">
              <p>All entries are based on available visual records and witness recollections.</p>
              <p>Clothing and appearance details are documented <span className="font-bold text-slate-900">for timeline and identification reference only.</span></p>
            </div>
          </footer>

          <div className="absolute bottom-4 right-8 opacity-10 pointer-events-none">
             <div className="text-[8px] uppercase tracking-widest text-right">
               PROPERTY OF THE STATE<br/>
               RECORDS_DIV_BUREAU
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
