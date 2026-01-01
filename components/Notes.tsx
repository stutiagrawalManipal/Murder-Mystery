
import React, { useState, useEffect } from 'react';
import { ChevronLeft, CloudUpload, CloudCheck } from 'lucide-react';
import { api } from '../api';

interface NotesProps {
  onBack: () => void;
}

export const Notes: React.FC<NotesProps> = ({ onBack }) => {
  const [content, setContent] = useState('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  useEffect(() => {
    const loadNotes = async () => {
      const data = await api.getTeamData();
      setContent(data.notes);
    };
    loadNotes();
  }, []);

  useEffect(() => {
    if (syncStatus === 'synced') return;
    
    const timeout = setTimeout(async () => {
      if (content !== '') {
        setSyncStatus('syncing');
        await api.updateNotes(content);
        setSyncStatus('synced');
        // Reset to idle after a moment
        setTimeout(() => setSyncStatus('idle'), 2000);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto h-[70vh] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors font-elite text-xs uppercase"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 font-elite text-[10px] uppercase tracking-widest transition-all duration-500 ${syncStatus !== 'idle' ? 'opacity-100' : 'opacity-0'}`}>
              {syncStatus === 'syncing' ? (
                <>
                  <CloudUpload className="w-3 h-3 text-blue-500 animate-bounce" />
                  <span className="text-blue-500">Syncing to Mainframe</span>
                </>
              ) : (
                <>
                  <CloudCheck className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">Cloud Data Secured</span>
                </>
              )}
            </div>
            <div className="bg-zinc-900 border border-white/10 px-4 py-2 text-[10px] font-elite text-gray-500 uppercase tracking-widest">
              Server ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-zinc-800/50 p-4 border-b border-white/5 flex justify-between items-center">
            <span className="font-elite text-xs text-gray-400 uppercase tracking-widest">Team-1 Intelligence Log</span>
            <span className="text-red-900 font-bold text-[10px]">REMOTE_STORAGE_ACTIVE</span>
          </div>
          <textarea
            className="flex-1 w-full bg-transparent p-8 text-gray-300 font-inter text-lg focus:outline-none resize-none leading-relaxed placeholder:text-gray-800"
            placeholder="Awaiting intelligence input..."
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
                setSyncStatus('idle');
            }}
            style={{ caretColor: '#dc2626' }}
          />
        </div>
      </div>
    </div>
  );
};
