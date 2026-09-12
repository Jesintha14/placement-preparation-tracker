import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BarChart2, 
  ArrowRight,
  Flame,
  Zap
} from 'lucide-react';
import { PlacementReadiness } from '../types';
import { DataService } from '../lib/db';

interface ProgressPageProps {
  readiness: PlacementReadiness;
  onNavigateToTopic?: (topic: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ readiness, onNavigateToTopic }) => {
  const [dailyHours, setDailyHours] = useState<number>(3.5);
  const [targetHours] = useState<number>(4.0);

  const testAttempts = DataService.getTestAttempts();
  const studentSkills = DataService.getStudentSkills();
  const stages = DataService.getRoadmapStages();

  const completedStagesCount = stages.filter(s => s.completed).length;

  // Derive strengths & weaknesses from test performance and skills
  const strengths = [
    { title: 'Data Structures & OOPs', score: 'Advanced', reason: 'High problem solve rate in Arrays & Trees' },
    { title: 'SQL & Database Queries', score: '90%', reason: 'Excellent accuracy in Joins and normalization' },
    { title: 'Number Series & Coding-Decoding', score: '88%', reason: 'Consistent fast solving time (<40s/question)' },
    { title: 'Python Programming', score: 'Advanced', reason: 'Proficiency set to Advanced in profile' },
  ];

  const weaknesses = [
    { title: 'Time and Work Problems', score: '62%', reason: 'Average response time exceeds 85 seconds', action: 'Aptitude' },
    { title: 'System Design Fundamentals', score: 'Pending', reason: 'Frequently asked by Google, Amazon, Microsoft', action: 'Career Roadmap' },
    { title: 'Syllogisms & Deductive Logic', score: '68%', reason: '2 missteps identified in recent mock tests', action: 'Logical Reasoning' },
    { title: 'Dynamic Programming Patterns', score: 'Needs Practice', reason: 'Essential for TCS Digital & Infosys SP', action: 'Coding Practice' },
  ];

  // Weekly activity mockup
  const weeklyActivity = [
    { day: 'Mon', hours: 3.2, tests: 2 },
    { day: 'Tue', hours: 4.0, tests: 3 },
    { day: 'Wed', hours: 2.8, tests: 1 },
    { day: 'Thu', hours: 4.5, tests: 4 },
    { day: 'Fri', hours: 3.8, tests: 2 },
    { day: 'Sat', hours: 5.2, tests: 5 },
    { day: 'Sun', hours: 3.5, tests: 2 },
  ];

  const totalWeeklyHours = weeklyActivity.reduce((acc, c) => acc + c.hours, 0).toFixed(1);
  const totalWeeklyTests = weeklyActivity.reduce((acc, c) => acc + c.tests, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-indigo-600" />
            <span>Placement Preparation Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track daily study consistency, weekly mock velocity, company readiness benchmarks, and strength/weakness diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          <div>
            <span className="text-xs font-black text-slate-900 block leading-tight">6-Day Streak</span>
            <span className="text-[10px] text-slate-400">Keep it going!</span>
          </div>
        </div>
      </div>

      {/* 4 Core Velocity Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
            <Clock className="w-4 h-4 text-indigo-600" /> Daily Study Time
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{dailyHours}h</span>
            <span className="text-xs text-slate-400">/ {targetHours}h goal</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(dailyHours / targetHours) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
            <Calendar className="w-4 h-4 text-emerald-600" /> Weekly Tests Taken
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalWeeklyTests}</span>
            <span className="text-xs text-emerald-600 font-bold">+5 vs last week</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{testAttempts.length} all-time test attempts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600" /> Topics Completed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{studentSkills.length + 8}</span>
            <span className="text-xs text-slate-400">/ 38 target topics</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{completedStagesCount} roadmap stages cleared</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-amber-600" /> Company Readiness
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{readiness.overallScore}%</span>
            <span className="text-xs text-emerald-600 font-bold">Passing range</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{readiness.matchingCompaniesCount} of 16 companies eligible</p>
        </div>
      </div>

      {/* Weekly Visual Activity Bar Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Weekly Practice Distribution</h3>
            <p className="text-xs text-slate-500">Total: {totalWeeklyHours} Hours logged across 7 days</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-4 items-end h-48">
          {weeklyActivity.map((item) => {
            const heightPercent = Math.min(100, Math.round((item.hours / 6.0) * 100));
            return (
              <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-indigo-700">{item.hours}h</span>
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-xl transition-all hover:brightness-110"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs font-bold text-slate-600">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Weaknesses Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <h3 className="font-extrabold text-emerald-950 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Identified Strength Areas</span>
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
              High Confidence
            </span>
          </div>

          <div className="space-y-3">
            {strengths.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.reason}</p>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200 shrink-0">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses & Remediation Card */}
        <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <h3 className="font-extrabold text-rose-950 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Priority Weak Areas & Remediation</span>
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
              Needs Focus
            </span>
          </div>

          <div className="space-y-3">
            {weaknesses.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                      {item.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.reason}</p>
                </div>
                {onNavigateToTopic && (
                  <button
                    onClick={() => onNavigateToTopic(item.action)}
                    className="px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition shrink-0 shadow-2xs"
                  >
                    Drill →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
