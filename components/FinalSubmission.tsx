
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, Lock, Clock, CheckCircle, Loader2, AlertCircle, ShieldCheck, Wifi } from 'lucide-react';
import { api } from '../api';

interface FinalSubmissionProps {
  startTime: number | null;
  onBack: () => void;
}

export const FinalSubmission: React.FC<FinalSubmissionProps> = ({ startTime, onBack }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalDuration, setFinalDuration] = useState('');
  const [formData, setFormData] = useState({
    culprit: '',
    motive: '',
    method: '',
    evidence: ''
  });

  useEffect(() => {
    const loadVerdict = async () => {
      const data = await api.getTeamData();
      if (data.verdict) {
        setIsLocked(true);
        setFormData(data.verdict);
        setFinalDuration(data.verdict.duration || 'N/A');
      }
    };
    loadVerdict();
  }, []);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isMissingFields = !formData.culprit || !formData.motive || !formData.method || !formData.evidence;
    if (isMissingFields) {
      setError("Incomplete Dossier: All intelligence fields must be populated.");
      return;
    }

    setIsConfirming(true);
  };

  const executeFinalSubmission = async () => {
    try {
      setIsSubmitting(true);
      setIsConfirming(false);
      
      let durationStr = "N/A";
      if (startTime) {
        const diff = Date.now() - startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        durationStr = `${hours}h ${minutes}m ${seconds}s`;
      }
      
      const payload = { 
        ...formData, 
        timestamp: new Date().toISOString(),
        duration: durationStr
      };
      
      // POST TO VIRTUAL BACKEND
      const success = await api.submitVerdict(payload);
      
      if (success) {
        setFinalDuration(durationStr);
        setIsLocked(true);
      } else {
        throw new Error("API Rejected Payload");
      }
    } catch (err) {
      setError("Server Error: Mainframe refused the connection. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          disabled={isSubmitting || isConfirming}
          className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors font-elite text-xs uppercase mb-12 disabled:opacity-20"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="font-crimson text-5xl text-white mb-4">Final Verdict</h1>
          <p className="text-gray-400 font-inter text-sm max-w-md mx-auto">
            Transmission portal for Case #002. Ensure all data is accurate before finalizing.
          </p>
        </div>

        <div className={`relative bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-lg transition-all duration-700 ${isLocked ? 'border-red-900/50 shadow-[0_0_50px_rgba(153,27,27,0.1)]' : ''}`}>
          <AnimatePresence>
            {isLocked && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md rounded-lg"
              >
                 <motion.div 
                   initial={{ scale: 0.9, y: 20 }}
                   animate={{ scale: 1, y: 0 }}
                   className="bg-zinc-950 p-10 border border-red-900/40 text-center space-y-6 max-w-sm shadow-2xl"
                 >
                    <Lock className="w-16 h-16 text-red-600 mx-auto" />
                    <h3 className="font-elite text-white uppercase text-2xl tracking-tighter">Case Sealed</h3>
                    <p className="text-gray-400 font-inter text-xs leading-relaxed">
                      Your analysis has been delivered to HQ. Time: {finalDuration}
                    </p>
                    <button 
                      onClick={onBack}
                      className="w-full bg-white/5 border border-white/10 text-white font-elite py-3 uppercase text-xs tracking-widest"
                    >
                      Return to Dashboard
                    </button>
                 </motion.div>
              </motion.div>
            )}

            {isConfirming && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-40 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm rounded-lg"
              >
                <div className="text-center p-8 space-y-6">
                  <ShieldCheck className="w-16 h-16 text-red-600 mx-auto" />
                  <h3 className="font-elite text-white uppercase text-xl">Confirm Transmission</h3>
                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={executeFinalSubmission}
                      className="bg-red-600 hover:bg-red-700 text-white font-elite py-4 px-8 uppercase tracking-widest transition-all"
                    >
                      Finalize & Send
                    </button>
                    <button 
                      onClick={() => setIsConfirming(false)}
                      className="text-gray-500 hover:text-white font-elite text-[10px] uppercase py-2 tracking-widest"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleInitialSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-elite text-red-600 uppercase tracking-widest opacity-70">Primary Suspect</label>
              <input 
                className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-inter focus:border-red-600 transition-colors rounded-sm"
                value={formData.culprit}
                onChange={e => setFormData({...formData, culprit: e.target.value})}
                disabled={isLocked || isSubmitting || isConfirming}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-elite text-red-600 uppercase tracking-widest opacity-70">Motive</label>
              <textarea 
                className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-inter h-28 resize-none"
                value={formData.motive}
                onChange={e => setFormData({...formData, motive: e.target.value})}
                disabled={isLocked || isSubmitting || isConfirming}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-elite text-red-600 uppercase tracking-widest opacity-70">Methodology</label>
              <textarea 
                className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-inter h-28 resize-none"
                value={formData.method}
                onChange={e => setFormData({...formData, method: e.target.value})}
                disabled={isLocked || isSubmitting || isConfirming}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-elite text-red-600 uppercase tracking-widest opacity-70">Smoking Gun Evidence</label>
              <textarea 
                className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-inter h-28 resize-none"
                value={formData.evidence}
                onChange={e => setFormData({...formData, evidence: e.target.value})}
                disabled={isLocked || isSubmitting || isConfirming}
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-600/50 p-4 flex items-center space-x-3 text-red-500 text-sm font-elite uppercase">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLocked || isSubmitting || isConfirming}
              className="w-full py-5 bg-red-950/20 hover:bg-red-900/30 border border-red-600 text-red-500 font-elite uppercase text-lg transition-all active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Transmitting to Mainframe...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-3">
                  <Wifi className="w-5 h-5" />
                  <span>{isLocked ? "Verdict Locked" : "Deliver Final Verdict"}</span>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
