
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, AlertCircle, FileText, User, MapPin, Activity } from 'lucide-react';
import { CASE_FILES } from '../data/database';

interface CaseFileViewProps {
  onBack: () => void;
}

export const CaseFileView: React.FC<CaseFileViewProps> = ({ onBack }) => {
  const content = CASE_FILES["002"];

  if (!content) return <div>Error: Case Data Not Found</div>;

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

        <div className="bg-[#fdfdfd] text-slate-900 p-8 md:p-16 rounded-sm shadow-2xl relative overflow-hidden font-elite border-t-[12px] border-red-800">
          {/* Official Document Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b-2 border-slate-300 pb-8">
            <div className="space-y-1">
              <h1 className="text-xl font-bold tracking-widest text-slate-800">FIR & CASE STORYLINE — TEAM 1</h1>
              <p className="text-sm">Case Title: <span className="italic font-normal">{content.caseTitle}</span></p>
              <p className="text-sm">Date of Incident: <span className="font-normal">{content.dateOfIncident}</span></p>
            </div>
            <div className="mt-4 md:mt-0 bg-slate-100 p-3 border border-slate-200 text-xs rounded-sm">
              <p className="font-bold text-red-700">CONFIDENTIAL DATA</p>
              <p className="text-[10px] text-slate-500">ID: {content.firDetails.firNo}</p>
            </div>
          </div>

          <div className="space-y-10">
            {/* Storyline Section */}
            <div className="bg-slate-50/80 p-6 border-l-4 border-yellow-500">
              <h2 className="text-lg font-bold flex items-center mb-4">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" /> Brief Case Storyline
              </h2>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{content.storyline}</p>
            </div>

            {/* FIR Official Box */}
            <div className="border border-slate-200 rounded-sm">
              <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> First Information Report (FIR)
                </h2>
                <span className="text-[10px] opacity-70">OFFICIAL RECORD</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white text-[11px]">
                <div>
                  <p className="text-slate-400 font-bold uppercase mb-1">Police Station</p>
                  <p className="text-slate-900 font-bold">{content.firDetails.station}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase mb-1">FIR No.</p>
                  <p className="text-slate-900 font-bold">{content.firDetails.firNo}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase mb-1">Registration Date</p>
                  <p className="text-slate-900 font-bold">{content.firDetails.dateOfReg}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase mb-1">Registration Time</p>
                  <p className="text-slate-900 font-bold">{content.firDetails.timeOfReg}</p>
                </div>
              </div>
            </div>

            {/* Structured Sections mirroring PDF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Section 
                number="1" 
                title="Complainant Details" 
                icon={<User className="w-4 h-4"/>}
                content={
                  <div className="space-y-1 text-sm">
                    <p><span className="font-bold">Name:</span> {content.complainant.name}</p>
                    <p><span className="font-bold">Age:</span> {content.complainant.age}</p>
                    <p><span className="font-bold">Relation:</span> {content.complainant.relation}</p>
                  </div>
                }
              />
              <Section 
                number="2" 
                title="Victim Details" 
                icon={<User className="w-4 h-4"/>}
                content={
                  <div className="space-y-1 text-sm">
                    <p><span className="font-bold">Name:</span> {content.victim.name}</p>
                    <p><span className="font-bold">Age:</span> {content.victim.age}</p>
                    <p><span className="font-bold">Occupation:</span> {content.victim.occupation}</p>
                  </div>
                }
              />
            </div>

            <Section 
              number="3" 
              title="Date, Time & Place of Occurrence" 
              icon={<MapPin className="w-4 h-4"/>}
              content={
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  <li><span className="font-bold">Date:</span> {content.occurrence.date}</li>
                  <li><span className="font-bold">Time:</span> {content.occurrence.time}</li>
                  <li><span className="font-bold">Place:</span> {content.occurrence.place}</li>
                </ul>
              }
            />

            <Section 
              number="4" 
              title="Nature of Incident" 
              content={<p className="text-sm leading-relaxed italic">{content.nature}</p>}
            />

            <Section 
              number="5" 
              title="Brief Statement of Facts" 
              content={<p className="text-sm leading-relaxed whitespace-pre-line">{content.statementOfFacts}</p>}
            />

            <Section 
              number="6" 
              title="Preliminary Observations" 
              icon={<Activity className="w-4 h-4"/>}
              content={
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  {content.observations.map((obs, i) => <li key={i}>{obs}</li>)}
                </ul>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Section number="7" title="Persons Present" content={<p className="text-sm">{content.personsPresent}</p>} />
               <Section 
                number="8" 
                title="Articles Involved" 
                content={
                  <ul className="list-disc list-inside text-sm">
                    {content.articles.map((art, i) => <li key={i}>{art}</li>)}
                  </ul>
                } 
              />
            </div>

            <div className="border-t-2 border-slate-100 pt-8">
               <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-red-800">9. Current Status</h3>
               </div>
               <p className="text-sm font-bold text-slate-800 italic">{content.currentStatus}</p>
            </div>
          </div>

          <div className="mt-20 flex justify-between items-end opacity-40">
            <div className="space-y-1">
               <div className="w-24 h-6 bg-slate-300"></div>
               <p className="text-[8px] font-bold">STATION_HOUSE_OFFICER_SIGNATURE</p>
            </div>
            <div className="text-[8px] font-bold text-right">
               PROPERTY OF THE STATE<br/>CENTRAL INVESTIGATION BUREAU
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ number, title, content, icon }: any) => {
  return (
    <div className="border-b border-slate-100 pb-6 mb-2">
      <div className="flex items-center space-x-2 mb-4">
        <span className="bg-slate-800 text-white w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-sm">
          {number}
        </span>
        <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm flex items-center">
          {icon && <span className="mr-2 opacity-50">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="px-1">{content}</div>
    </div>
  );
}
