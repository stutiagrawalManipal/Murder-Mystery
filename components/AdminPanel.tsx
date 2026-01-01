
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Database, Terminal, Shield, RefreshCw, Server, Activity } from 'lucide-react';
import { api, ApiLog, TeamData } from '../api';

interface AdminPanelProps {
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [db, setDb] = useState<TeamData | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const refresh = async () => {
    const data = await api.getTeamData();
    setDb(data);
    setLogs(api.getLogs());
  };

  useEffect(() => {
    refresh();
    const handleLogUpdate = () => refresh();
    window.addEventListener('api_log_updated', handleLogUpdate);
    return () => window.removeEventListener('api_log_updated', handleLogUpdate);
  }, []);

  const handleWipe = async () => {
    if (confirm("RESTRICTED ACTION: Wipe all investigation data and server records?")) {
      setIsResetting(true);
      await api.resetAll();
      setIsResetting(false);
      refresh();
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-crimson text-4xl text-white">Central Mainframe Console</h1>
            <p className="text-gray-500 font-elite text-xs uppercase tracking-widest mt-2 flex items-center">
                <Shield className="w-3 h-3 mr-2 text-red-600" /> Administrative Bypass Enabled
            </p>
          </div>
          <button 
            onClick={onBack}
            className="font-elite text-[10px] text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 px-6 py-2"
          >
            Log Out of Console
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Server Logs */}
          <div className="bg-black border border-white/5 rounded-lg overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 bg-zinc-900 border-b border-white/5 flex items-center space-x-3">
              <Terminal className="w-4 h-4 text-green-500" />
              <span className="font-elite text-xs text-white uppercase tracking-widest">Live API Logs</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start space-x-2 border-l-2 border-white/10 pl-3 py-1">
                   <span className="text-gray-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                   <span className={`font-bold ${log.method === 'POST' ? 'text-yellow-500' : 'text-blue-500'}`}>{log.method}</span>
                   <span className="text-gray-400">{log.endpoint}</span>
                   <span className="text-green-600">({log.status})</span>
                </div>
              ))}
              {logs.length === 0 && <p className="text-gray-700 italic">No network activity detected...</p>}
            </div>
          </div>

          {/* Database Viewer */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-lg overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 bg-zinc-900 border-b border-white/5 flex items-center space-x-3">
              <Database className="w-4 h-4 text-blue-500" />
              <span className="font-elite text-xs text-white uppercase tracking-widest">Team-1 Store</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
               <div className="bg-black/60 p-6 rounded border border-white/5 font-mono text-[11px] text-green-400">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(db, null, 2)}</pre>
               </div>
            </div>
          </div>

          {/* Server Control */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-white/5 rounded-lg p-6">
               <h3 className="font-elite text-white text-xs uppercase tracking-widest mb-6 flex items-center">
                  <Server className="w-4 h-4 mr-2 text-red-500" /> Server Health
               </h3>
               <div className="space-y-4">
                  <HealthStat label="CPU Load" value="4%" />
                  <HealthStat label="Uptime" value="12h 44m" />
                  <HealthStat label="Storage" value="0.4 / 50 MB" />
               </div>
            </div>

            <div className="bg-red-950/10 border border-red-900/20 rounded-lg p-6">
               <h3 className="font-elite text-red-600 text-xs uppercase tracking-widest mb-4 flex items-center">
                  <Activity className="w-4 h-4 mr-2" /> Danger Zone
               </h3>
               <p className="text-[10px] text-gray-500 mb-6 uppercase leading-relaxed">
                  Purging records will reset Team-1's investigation journal and verdict state.
               </p>
               <button 
                onClick={handleWipe}
                disabled={isResetting}
                className="w-full bg-red-900/20 border border-red-600/40 text-red-500 font-elite text-[10px] py-4 uppercase tracking-widest hover:bg-red-900/40 transition-all disabled:opacity-50"
               >
                 {isResetting ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : "Wipe Investigation Records"}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthStat = ({ label, value }: any) => (
  <div className="flex justify-between items-center text-[11px]">
    <span className="text-gray-500 uppercase font-elite">{label}</span>
    <span className="text-white font-mono">{value}</span>
  </div>
);
