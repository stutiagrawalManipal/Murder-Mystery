
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const [teamCode, setTeamCode] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('connecting');
    
    // Simulate API call to backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hardcoded demo credentials
    if (teamCode.toUpperCase() === 'TEAM1' && password === 'PASSWORD1') {
      setStatus('success');
      setTimeout(() => onEnter(), 1000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
      <div className="fog-layer opacity-40"></div>
      <div className="fog-layer opacity-20" style={{ animationDelay: '-15s', animationDirection: 'reverse' }}></div>

      <div className="relative z-20 text-center px-4 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(10px)' }}
          animate={{ opacity: 1, letterSpacing: '0.1em', filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mb-2"
        >
          <span className="text-red-600 font-elite uppercase text-sm md:text-lg tracking-[0.5em]">Classified Evidence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="font-crimson text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tighter"
        >
          MURDER MYSTERY
          <br />
          <span className="text-gray-500 font-elite text-3xl md:text-5xl lg:text-6xl">– The Hidden Truth</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="relative space-y-6 bg-black/40 p-6 md:p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {status === 'connecting' ? (
                <motion.div 
                  key="connecting"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-elite text-red-500 animate-pulse uppercase tracking-[0.2em] text-sm text-center px-4">Querying Mainframe Database...</p>
                </motion.div>
              ) : status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="font-elite text-green-500 text-xl uppercase tracking-widest">Access Granted</p>
                  <p className="text-gray-500 text-xs mt-2 font-elite">Dossier #A7-293 Loading...</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="text-left">
                    <label className="block text-[10px] font-elite text-gray-500 uppercase tracking-widest mb-1 ml-1">Team Identifier</label>
                    <input 
                      type="text"
                      placeholder="e.g. TEAM1"
                      className="w-full bg-white/5 border border-white/10 p-3 text-white font-elite focus:outline-none focus:border-red-600 transition-colors uppercase"
                      value={teamCode}
                      onChange={(e) => setTeamCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-[10px] font-elite text-gray-500 uppercase tracking-widest mb-1 ml-1">Secure Passkey</label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 p-3 text-white font-elite focus:outline-none focus:border-red-600 transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-red-900/20 hover:bg-red-900/40 border border-red-600/50 text-red-500 font-elite py-3 transition-all hover:tracking-widest uppercase text-sm mt-4"
                  >
                    Establish Connection
                  </button>
                  {status === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 font-elite text-[10px] uppercase tracking-tighter mt-2 text-center"
                    >
                      Access Denied — Invalid Credentials
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-gray-600 text-[10px] font-elite uppercase tracking-[0.4em]"
        >
          Unauthorized data access is punishable by internal protocol
        </motion.p>
      </div>
    </section>
  );
};
