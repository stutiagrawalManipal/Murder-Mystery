
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, BookOpen, Send, LogOut, ShieldAlert, Timer, Users } from 'lucide-react';

interface DashboardProps {
  startTime: number | null;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ startTime, onNavigate, onLogout }) => {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - startTime;
      
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      const formatted = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');

      setElapsed(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span className="font-elite text-red-600 uppercase tracking-widest text-sm">Active Operation: Team-1</span>
            </div>
            <h1 className="font-crimson text-5xl md:text-6xl text-white">Investigation Terminal</h1>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors font-elite text-xs uppercase tracking-widest bg-white/5 px-4 py-2 border border-white/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-sm">
            <p className="text-gray-500 font-elite text-[10px] uppercase tracking-widest mb-1">Scenario Assigned</p>
            <p className="text-white font-crimson text-2xl">The Last Trip</p>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-sm">
            <p className="text-gray-500 font-elite text-[10px] uppercase tracking-widest mb-1">Current Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-500 font-elite text-xl uppercase">In Progress</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-500 font-elite text-[10px] uppercase tracking-widest">Active Stopwatch</p>
              <Timer className="w-3 h-3 text-red-600 animate-pulse" />
            </div>
            <p className="text-white font-elite text-3xl tabular-nums tracking-wider">{elapsed}</p>
            <div className="absolute bottom-0 left-0 h-0.5 bg-red-600 w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NavCard 
            title="Case File (FIR)" 
            desc="Review police reports and victim profiles."
            icon={<FileText />}
            onClick={() => onNavigate('casefile')}
            accent="blue"
          />
          <NavCard 
            title="Suspect Appearance" 
            desc="Log of suspects seen near the scene."
            icon={<Users />}
            onClick={() => onNavigate('suspects')}
            accent="yellow"
          />
          <NavCard 
            title="Evidence Check" 
            desc="Verify discovered physical evidence."
            icon={<Search />}
            onClick={() => onNavigate('evidence')}
            accent="red"
          />
          <NavCard 
            title="Notes" 
            desc="Log findings and collaborate on theories."
            icon={<BookOpen />}
            onClick={() => onNavigate('notes')}
            accent="gray"
          />
          <NavCard 
            title="Final Submission" 
            desc="Deliver the verdict to HQ."
            icon={<Send />}
            onClick={() => onNavigate('submission')}
            accent="green"
          />
        </div>

        {/* Background Visuals */}
        <div className="mt-20 p-8 border border-white/5 bg-white/[0.02] rounded-lg">
           <p className="font-elite text-gray-600 text-[10px] uppercase tracking-[0.5em] mb-6">INTELLIGENCE_FLOW_STREAM</p>
           <div className="space-y-2 opacity-30">
              <div className="h-1 bg-red-900/20 w-full"></div>
              <div className="h-1 bg-red-900/20 w-3/4"></div>
              <div className="h-1 bg-red-900/20 w-1/2"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const NavCard = ({ title, desc, icon, onClick, accent }: any) => {
  const accentColors: any = {
    blue: "group-hover:text-blue-500 group-hover:bg-blue-900/20",
    red: "group-hover:text-red-500 group-hover:bg-red-900/20",
    gray: "group-hover:text-zinc-300 group-hover:bg-zinc-700/20",
    green: "group-hover:text-green-500 group-hover:bg-green-900/20",
    yellow: "group-hover:text-yellow-500 group-hover:bg-yellow-900/20",
  };

  return (
    <motion.button
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group bg-zinc-900 border border-white/5 p-8 text-left rounded-lg transition-all hover:border-white/20 hover:shadow-2xl flex flex-col justify-between min-h-[220px]"
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-sm bg-zinc-800 text-gray-500 transition-all ${accentColors[accent]}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-white font-elite text-lg uppercase tracking-tight mb-2">{title}</h3>
        <p className="text-gray-500 text-xs font-inter leading-relaxed">{desc}</p>
      </div>
    </motion.button>
  );
}
