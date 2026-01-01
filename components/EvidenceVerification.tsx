
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, CheckCircle2, AlertTriangle, Loader2, Database, ShieldCheck, History } from 'lucide-react';
import { api } from '../api';

interface EvidenceVerificationProps {
  onBack: () => void;
}

const OFFICIAL_CODES: Record<string, { title: string, message: string }> = {
  "PHY-09": { title: "Physical Evidence", message: "Valid Physical Evidence" },
  "DIG-14": { title: "Digital Evidence", message: "Digital Record Confirmed" },
  "CCTV-21": { title: "CCTV Footage", message: "Footage Log Accepted" },
  "FOR-33": { title: "Forensic Report", message: "Forensic Match Verified" },
  "WIT-07": { title: "Witness Testimony", message: "Witness Account Logged" },
  "SUS-56": { title: "Suspect ID List", message: "Suspect Identity Confirmed" },
};

export const EvidenceVerification: React.FC<EvidenceVerificationProps> = ({ onBack }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'result'>('idle');
  const [result, setResult] = useState<any>(null);
  const [verifiedList, setVerifiedList] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await api.getTeamData();
      setVerifiedList(data.verifiedEvidence || []);
    };
    loadHistory();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.toUpperCase().trim();
    if (!cleanCode) return;

    setStatus('checking');
    
    // Simulate lookup
    const match = OFFICIAL_CODES[cleanCode];
    
    if (match) {
      // Sync with backend
      await api.verifyEvidence(cleanCode);
      setVerifiedList(prev => prev.includes(cleanCode) ? prev : [...prev, cleanCode]);
      setResult({ ...match, isValid: true });
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult({ 
        title: "Wrong code", 
        message: "❌ Invalid — Solve Puzzle Again", 
        isValid: false 
      });
    }
    
    setStatus('result');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Input and Results */}
        <div className="lg:col-span-2">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors font-elite text-xs uppercase mb-12"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>

          <div className="mb-12">
            <h1 className="font-crimson text-5xl text-white mb-4">Forensic Terminal</h1>
            <p className="text-gray-500 font-inter text-sm">Synchronize physical evidence markers with the central database.</p>
          </div>

          <form onSubmit={handleVerify} className="relative mb-12">
            <div className="absolute -top-3 left-4 px-2 bg-zinc-950 text-[10px] font-elite text-red-600 uppercase tracking-widest z-10">
              Input Verification Sequence
            </div>
            <input 
              type="text"
              placeholder="e.g. PHY-09"
              className="w-full bg-zinc-900/50 border border-white/10 p-6 text-white font-elite focus:outline-none focus:border-red-600 transition-all uppercase text-2xl tracking-[0.2em] rounded-lg placeholder:text-zinc-800"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={status === 'checking'}
            />
            <button 
              type="submit"
              disabled={status === 'checking'}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white p-4 rounded transition-colors group"
            >
              {status === 'checking' ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {status === 'result' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-8 rounded-lg border-2 flex items-start space-x-6 relative overflow-hidden ${
                  result.isValid 
                    ? 'bg-green-950/10 border-green-500/30 text-green-500' 
                    : 'bg-red-950/10 border-red-500/30 text-red-500'
                }`}
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                   <Database className="w-12 h-12" />
                </div>
                <div className="mt-1">
                  {result.isValid ? <ShieldCheck className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
                </div>
                <div>
                  <h3 className="font-elite text-xl uppercase mb-2 tracking-tighter">
                    {result.title}
                  </h3>
                  <p className={`font-inter text-lg ${result.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {result.message}
                  </p>
                  {result.isValid && (
                    <div className="mt-4 flex items-center space-x-2 text-[9px] font-elite uppercase tracking-widest opacity-60">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>Encrypted Record Saved to Mainframe</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Verified Feed */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-lg p-6 flex flex-col h-fit">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
             <div className="flex items-center space-x-2">
                <History className="w-4 h-4 text-gray-500" />
                <h2 className="font-elite text-xs text-white uppercase tracking-widest">Intelligence Feed</h2>
             </div>
             <span className="text-[10px] font-mono text-red-900 font-bold">{verifiedList.length} ITEMS</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {verifiedList.length === 0 ? (
              <div className="py-12 text-center text-gray-700 italic font-inter text-xs">
                Awaiting first intelligence verification...
              </div>
            ) : (
              [...verifiedList].reverse().map((vCode, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/40 border border-white/5 p-3 rounded flex justify-between items-center group hover:border-green-500/30 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-elite text-green-600 tracking-widest">{vCode}</span>
                    <span className="text-[9px] text-gray-500 font-inter uppercase">
                      {OFFICIAL_CODES[vCode]?.title || "Unclassified Item"}
                    </span>
                  </div>
                  <CheckCircle2 className="w-3 h-3 text-green-800 opacity-50 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-white/5">
             <div className="p-3 bg-red-950/10 border border-red-900/20 rounded">
                <p className="text-[8px] text-gray-500 font-elite uppercase leading-relaxed">
                   Evidence synchronization is strictly monitored. Unauthorized attempts will trigger a session lockout.
                </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
