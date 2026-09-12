import React, { useState } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Clock, 
  BookOpen, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { RoadmapStage } from '../types';
import { DataService } from '../lib/db';

interface RoadmapPageProps {
  onStageToggled?: () => void;
  onNavigateToTopic?: (topic: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onStageToggled, onNavigateToTopic }) => {
  const [stages, setStages] = useState<RoadmapStage[]>(() => DataService.getRoadmapStages());

  const handleToggle = (stageId: number) => {
    const updated = DataService.toggleRoadmapStage(stageId);
    setStages([...updated]);
    if (onStageToggled) onStageToggled();
  };

  const completedCount = stages.filter(s => s.completed).length;
  const overallPercentage = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Map className="w-7 h-7 text-indigo-600" />
            <span>10-Stage Placement Preparation Roadmap</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A battle-tested structured path to land high-tier software engineering offers. Mark milestones as you progress.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Milestones Completed</span>
            <span className="text-base font-black text-indigo-600">{completedCount} of 10 Stages</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 flex items-center justify-center font-bold text-xs text-indigo-700">
            {overallPercentage}%
          </div>
        </div>
      </div>

      {/* Progress Line Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-700">
          <span>Overall Roadmap Completion</span>
          <span className="text-indigo-600 font-extrabold">{overallPercentage}% Complete</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* 10 Stages Timeline */}
      <div className="relative border-l-2 border-indigo-100 ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
        {stages.map((stage) => {
          const isDone = stage.completed;
          return (
            <div key={stage.id} className="relative group">
              {/* Node Marker */}
              <button
                onClick={() => handleToggle(stage.id)}
                className={`absolute -left-[35px] md:-left-[51px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 ring-4 ring-emerald-50'
                    : 'bg-white border-2 border-indigo-400 text-slate-400 hover:border-indigo-600 hover:text-indigo-600 ring-4 ring-slate-50'
                }`}
                title={isDone ? 'Mark as incomplete' : 'Mark stage as completed'}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{stage.id}</span>}
              </button>

              {/* Stage Card */}
              <div className={`p-6 rounded-3xl border transition-all ${
                isDone 
                  ? 'bg-white border-emerald-200 shadow-sm' 
                  : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-xs'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Stage {stage.id}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{stage.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {stage.estimatedWeeks}
                    </span>
                    <button
                      onClick={() => handleToggle(stage.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isDone ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{stage.description}</p>

                {/* Sub-topics list */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Topics & Milestones
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.subtopics.map((sub) => (
                      <span
                        key={sub}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                          isDone
                            ? 'bg-emerald-50/60 text-emerald-800 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isDone ? '✓ ' : '• '}{sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
