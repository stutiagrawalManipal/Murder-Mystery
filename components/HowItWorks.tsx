
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Users, ClipboardCheck, Award } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8 text-red-500" />,
    title: "Examine Clues",
    description: "Search the crime scene for hidden objects and encrypted messages."
  },
  {
    icon: <Users className="w-8 h-8 text-red-500" />,
    title: "Interrogate",
    description: "Listen closely to testimony. Detect lies through subtle inconsistencies."
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-red-500" />,
    title: "Build the Case",
    description: "Connect the dots on your evidence board to reveal the true killer."
  },
  {
    icon: <Award className="w-8 h-8 text-red-500" />,
    title: "Solve the Crime",
    description: "Present your findings. Justice—or a narrow escape—awaits."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-crimson text-5xl md:text-6xl text-white mb-4"
        >
          How It Works
        </motion.h2>
        <div className="w-24 h-1 bg-red-800 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative bg-[#111] p-8 rounded-lg border border-white/5 hover:border-red-900/40 transition-all"
          >
            <div className="mb-6 bg-red-900/10 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-red-900/30 transition-colors">
              {step.icon}
            </div>
            <h3 className="font-elite text-xl text-white mb-4 uppercase tracking-tight">{step.title}</h3>
            <p className="text-gray-400 font-inter leading-relaxed">
              {step.description}
            </p>
            {/* Background Number */}
            <span className="absolute top-4 right-4 text-6xl font-black text-white/5 pointer-events-none group-hover:text-red-900/10 transition-colors">
              0{index + 1}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
