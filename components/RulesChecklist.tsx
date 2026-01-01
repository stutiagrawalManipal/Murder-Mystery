
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const rules = [
  "No phones during active interrogation.",
  "Evidence must remain on-site at all times.",
  "Treat suspects with firm professionalism.",
  "Team collaboration is mandatory for success.",
  "Trust no one—not even your fellow detectives."
];

export const RulesChecklist: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-black relative">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1a1a1a] border border-white/10 p-10 md:p-16 rounded shadow-inner">
          <h2 className="font-elite text-3xl text-white mb-10 flex items-center space-x-4">
            <span className="w-12 h-[2px] bg-red-600"></span>
            <span>Rules of Engagement</span>
          </h2>
          
          <div className="space-y-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="mt-1 flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: (index * 0.2) + 0.3 }}
                    className="w-6 h-6 rounded bg-red-900/40 border border-red-500/50 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-red-200" />
                  </motion.div>
                </div>
                <p className="text-gray-300 font-inter text-lg">{rule}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5">
             <p className="text-gray-500 font-elite text-sm uppercase tracking-widest leading-loose">
               Failure to adhere to investigation protocols will result in immediate dismissal from the case.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};
