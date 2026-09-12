import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Building2, 
  Briefcase, 
  Code2, 
  Calculator, 
  BrainCircuit, 
  FileText, 
  Target,
  Clock,
  Award,
  Zap,
  Users
} from 'lucide-react';
import { UserProfile, PlacementReadiness, TestAttempt } from '../types';
import { DataService, formatRelativeTime } from '../lib/db';

interface DashboardPageProps {
  user: UserProfile;
  readiness: PlacementReadiness;
  onNavigate: (page: string) => void;
  onSelectCompanyForMatch?: (companyName: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  readiness,
  onNavigate,
  onSelectCompanyForMatch
}) => {
  const recentTests = DataService.getTestAttempts().slice(0, 5);
  const joinedStudents = DataService.getJoinedStudents().slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* User Avatar DP */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-lg bg-indigo-900">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName || 'Student'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-xl text-white">
                    {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'ST'}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-full text-[10px] shadow">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-indigo-200">
                <Zap className="w-3 h-3 text-amber-300" />
                <span>Campus Hiring Drive Season 2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                <span>Welcome back, {user.fullName || 'Student'}!</span> 👋
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                Target: <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">{user.targetJobRole || 'Software Developer'}</span>
                {user.college && <span> • {user.college}</span>}
                {user.year && <span> ({user.year})</span>}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('Aptitude')}
              className="bg-white hover:bg-slate-100 text-indigo-900 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Start Aptitude Drill</span>
            </button>
            <button
              onClick={() => onNavigate('Skill Matching')}
              className="bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-400/40 px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Match Companies</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div>
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Core Placement Performance Indicators</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Readiness Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Readiness Score</span>
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Target className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{readiness.overallScore}%</span>
                <span className="text-xs font-semibold text-emerald-600">+4% this week</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full"
                  style={{ width: `${readiness.overallScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Weighted across Technical, Tests & Resume</p>
          </div>

          {/* Technical Skills Score */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Technical Skills</span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Code2 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{readiness.technicalScore}%</span>
                <span className="text-xs font-semibold text-slate-500">10 Skills Set</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${readiness.technicalScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Languages & Computer Science proficiencies</p>
          </div>

          {/* Coding & DSA Score */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Coding Score (DSA)</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{readiness.codingScore}%</span>
                <span className="text-xs font-semibold text-emerald-600">80% Accuracy</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${readiness.codingScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Based on solved algorithmic problems</p>
          </div>

          {/* Quantitative Aptitude */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Aptitude Score</span>
              <span className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                <Calculator className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{readiness.aptitudeScore}%</span>
                <span className="text-xs font-semibold text-sky-600">Average Pace: 45s</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${readiness.aptitudeScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Quantitative aptitude mock tests</p>
          </div>
        </div>

        {/* Secondary metric row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Logical Reasoning */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Reasoning Score</span>
              <span className="p-2 bg-violet-50 text-violet-600 rounded-xl">
                <BrainCircuit className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{readiness.reasoningScore}%</span>
              <span className="text-xs font-semibold text-violet-600">Logical Drills</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: `${readiness.reasoningScore}%` }} />
            </div>
          </div>

          {/* Resume ATS Score */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Resume Score</span>
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <FileText className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{readiness.resumeScore}%</span>
              <span className="text-xs font-semibold text-emerald-600">ATS Verified</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${readiness.resumeScore}%` }} />
            </div>
          </div>

          {/* Matching Companies Count */}
          <div 
            onClick={() => onNavigate('Skill Matching')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-400 transition shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Matching Companies</span>
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition">
                <Building2 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-600">{readiness.matchingCompaniesCount}</span>
              <span className="text-xs font-semibold text-slate-500">of 16 Top Firms</span>
            </div>
            <span className="text-[11px] text-indigo-600 font-bold block mt-1">View compatibility →</span>
          </div>

          {/* Available Jobs */}
          <div 
            onClick={() => onNavigate('Jobs')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-400 transition shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Available Jobs</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition">
                <Briefcase className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-600">{readiness.availableJobsCount}</span>
              <span className="text-xs font-semibold text-slate-500">Active Campus Drives</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-bold block mt-1">Explore job openings →</span>
          </div>
        </div>
      </div>

      {/* Visual Charts & Skill Gaps Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Preparation Readiness Visual Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Domain Mastery Distribution</h3>
              <p className="text-xs text-slate-500">Weighted scores for student campus selection clearance</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Target: 85%+
            </span>
          </div>

          {/* Interactive Visual Bar Representation */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-500" />
                  Technical Programming (Languages & Core CS)
                </span>
                <span className="text-slate-900 font-bold">{readiness.technicalScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${readiness.technicalScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Coding Practice & Algorithmic Problem Solving
                </span>
                <span className="text-slate-900 font-bold">{readiness.codingScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${readiness.codingScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-sky-500" />
                  Quantitative Aptitude (Speed & Accuracy)
                </span>
                <span className="text-slate-900 font-bold">{readiness.aptitudeScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-sky-500 rounded-full transition-all duration-500" 
                  style={{ width: `${readiness.aptitudeScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5 text-violet-500" />
                  Logical & Analytical Reasoning
                </span>
                <span className="text-slate-900 font-bold">{readiness.reasoningScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-violet-500 rounded-full transition-all duration-500" 
                  style={{ width: `${readiness.reasoningScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  Resume ATS Readiness & Key Project Metrics
                </span>
                <span className="text-slate-900 font-bold">{readiness.resumeScore}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full transition-all duration-500" 
                  style={{ width: `${readiness.resumeScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
            <span>Overall Clearance Index: <strong className="text-slate-800">{readiness.overallScore}/100</strong></span>
            <button 
              onClick={() => onNavigate('Progress')}
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View Full Weekly Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Col: Priority Skill Gaps */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-base">Target Skill Gaps</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                Action Required
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Missing competencies that are strictly required by your target campus recruiters:
            </p>

            <div className="space-y-3">
              {readiness.skillGaps.length > 0 ? (
                readiness.skillGaps.map((gap, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{gap.skill}</p>
                      <p className="text-[10px] text-slate-500">
                        Needed in: {gap.missingInCompanies.join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('My Skills')}
                      className="text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition"
                    >
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-emerald-600 text-xs font-semibold">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                  Great job! No critical skill gaps identified for your target companies.
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigate('Skill Matching')}
            className="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs py-2.5 rounded-xl transition text-center"
          >
            Launch Full Skill Matching Matrix →
          </button>
        </div>
      </div>

      {/* Recent Practice Results */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Recent Practice & Mock Results</h3>
            <p className="text-xs text-slate-500">Latest completed diagnostic and aptitude tests</p>
          </div>
          <button
            onClick={() => onNavigate('Aptitude')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Take New Test →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Topic / Subject</th>
                <th className="py-3 px-4">Questions</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Time Spent</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4">
                    <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${
                      test.category === 'Aptitude' 
                        ? 'bg-sky-50 text-sky-700'
                        : test.category === 'Reasoning'
                        ? 'bg-violet-50 text-violet-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {test.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{test.topic}</td>
                  <td className="py-3 px-4 text-slate-600">{test.correctAnswers}/{test.totalQuestions} Correct</td>
                  <td className="py-3 px-4">
                    <span className={`font-black ${
                      test.scorePercentage >= 80 ? 'text-emerald-600' : test.scorePercentage >= 60 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {test.scorePercentage}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {Math.round(test.timeSpentSeconds / 60)}m {test.timeSpentSeconds % 60}s
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">
                    {formatRelativeTime(test.completedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campus Placement Cohort - Recently Joined Candidates */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Campus Placement Cohort</h3>
              <p className="text-xs text-slate-500">Recently registered students preparing for 2026 hiring drives</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Community
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {joinedStudents.map((student) => {
            const isCurrentUser = user && student.fullName?.toLowerCase() === user.fullName?.toLowerCase();
            return (
              <div 
                key={student.id}
                className={`p-4 rounded-2xl border transition relative ${
                  isCurrentUser 
                    ? 'bg-indigo-50/70 border-indigo-200 ring-2 ring-indigo-500/20 shadow-sm' 
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-indigo-100 ring-2 ring-white shrink-0 shadow-xs">
                    <img 
                      src={student.avatarUrl} 
                      alt={student.fullName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                        <span>{student.fullName}</span>
                        {isCurrentUser && (
                          <span className="text-[9px] bg-indigo-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                            You
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {formatRelativeTime(student.joinedAt)}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-indigo-700 mt-0.5 truncate">
                      {student.targetJobRole}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {student.college}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
