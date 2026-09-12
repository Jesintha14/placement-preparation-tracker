import React, { useState, useEffect } from 'react';
import { 
  GitCompare, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  BookOpen, 
  Award,
  ChevronDown
} from 'lucide-react';
import { Company, StudentSkill } from '../types';
import { COMPANIES_LIST } from '../data/mockData';
import { DataService } from '../lib/db';

interface SkillMatchingPageProps {
  initialCompany?: string;
  onSkillUpdated?: () => void;
  onNavigateToPrep?: (topic: string) => void;
}

export const SkillMatchingPage: React.FC<SkillMatchingPageProps> = ({
  initialCompany,
  onSkillUpdated,
  onNavigateToPrep
}) => {
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>(
    initialCompany || COMPANIES_LIST[0].name
  );
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>(() => DataService.getStudentSkills());
  const [compareMode, setCompareMode] = useState<'Single' | 'AllRanked'>('Single');

  useEffect(() => {
    if (initialCompany) {
      setSelectedCompanyName(initialCompany);
    }
  }, [initialCompany]);

  const selectedCompany = COMPANIES_LIST.find(c => c.name.toLowerCase() === selectedCompanyName.toLowerCase()) || COMPANIES_LIST[0];

  const studentSkillNames = new Set(studentSkills.map(s => s.skillName.toLowerCase()));

  // Matched vs Missing
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  selectedCompany.requiredSkills.forEach(skill => {
    if (studentSkillNames.has(skill.toLowerCase())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const matchPercentage = Math.round((matchedSkills.length / selectedCompany.requiredSkills.length) * 100);

  // Recommendations generator
  const getRecommendations = (missing: string[], company: Company) => {
    const recs: { title: string; desc: string; action: string }[] = [];

    if (missing.some(m => m.toLowerCase().includes('data structures') || m.toLowerCase().includes('dsa') || m.toLowerCase().includes('algorithms'))) {
      recs.push({
        title: 'Sharpen Algorithmic Problem Solving',
        desc: `${company.name} screening heavily tests Array, String, and Tree manipulation in technical round 1.`,
        action: 'Coding Practice'
      });
    }

    if (missing.some(m => m.toLowerCase().includes('sql') || m.toLowerCase().includes('dbms'))) {
      recs.push({
        title: 'Master SQL Queries & Indexing',
        desc: 'Relational schema design and Joins are frequently asked during the technical interview.',
        action: 'My Skills'
      });
    }

    if (missing.some(m => m.toLowerCase().includes('system design'))) {
      recs.push({
        title: 'Study High-Level Architecture & Scaling',
        desc: 'Understand horizontal vs vertical scaling, load balancers, caching, and database partitioning.',
        action: 'Career Roadmap'
      });
    }

    if (missing.length > 0) {
      recs.push({
        title: `Acquire ${missing[0]} Core Concepts`,
        desc: `Bridge your gap in ${missing[0]} to raise your match score above ${Math.min(100, matchPercentage + 20)}%.`,
        action: 'My Skills'
      });
    } else {
      recs.push({
        title: 'Flawless Skill Compatibility!',
        desc: `You satisfy 100% of ${company.name}'s mandatory technical criteria. Focus now on speed in quantitative aptitude and mock interviews.`,
        action: 'Aptitude'
      });
    }

    return recs;
  };

  const recommendations = getRecommendations(missingSkills, selectedCompany);

  // Quick add missing skill
  const handleQuickAddSkill = (skill: string) => {
    const updated = DataService.updateSkill(skill, 'Intermediate', 'Language');
    setStudentSkills([...updated]);
    if (onSkillUpdated) onSkillUpdated();
  };

  // Ranked comparison across all 16 companies
  const rankedCompanies = COMPANIES_LIST.map(c => {
    let matches = 0;
    c.requiredSkills.forEach(req => {
      if (studentSkillNames.has(req.toLowerCase())) matches++;
    });
    const pct = Math.round((matches / c.requiredSkills.length) * 100);
    return { company: c, pct, matchedCount: matches, totalCount: c.requiredSkills.length };
  }).sort((a, b) => b.pct - a.pct);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <GitCompare className="w-7 h-7 text-indigo-600" />
            <span>Intelligent Skill Matching Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare your profile against recruiters to calculate real eligibility, pinpoint missing competencies, and view next steps.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setCompareMode('Single')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              compareMode === 'Single' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Target Company
          </button>
          <button
            onClick={() => setCompareMode('AllRanked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              compareMode === 'AllRanked' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Ranked Compatibility (All 16)
          </button>
        </div>
      </div>

      {compareMode === 'Single' ? (
        <div className="space-y-6">
          {/* Company Selector Quick Strip */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Target Recruiter for Instant Skill Audit
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {COMPANIES_LIST.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompanyName(comp.name)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCompanyName === comp.name
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Match Results Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Match Score & Overview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                      {selectedCompany.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">{selectedCompany.name}</h2>
                      <span className="text-xs font-bold text-emerald-600">{selectedCompany.packageLpa}</span>
                    </div>
                  </div>
                </div>

                {/* Score Gauge */}
                <div className="py-6 text-center">
                  <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full border-8 border-slate-100 relative">
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-indigo-600 border-t-transparent border-l-transparent transition-all duration-700"
                      style={{ transform: `rotate(${Math.min(360, (matchPercentage / 100) * 360)}deg)` }}
                    />
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{matchPercentage}%</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">Match Index</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-4 px-2">
                    {matchPercentage >= 75 ? (
                      <span className="text-emerald-700 font-bold">Excellent fit! You qualify for majority of technical screening filters.</span>
                    ) : matchPercentage >= 50 ? (
                      <span className="text-amber-700 font-bold">Moderate compatibility. Bridging 1-2 missing skills unlocks full eligibility.</span>
                    ) : (
                      <span className="text-rose-700 font-bold">Foundational gaps detected. Follow recommended learning roadmap below.</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min CGPA Required:</span>
                  <span className="font-bold text-slate-800">{selectedCompany.minimumCgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hiring Stages:</span>
                  <span className="font-bold text-slate-800">{selectedCompany.selectionRounds.length} Rounds</span>
                </div>
              </div>
            </div>

            {/* Right 2 Cols: Matched vs Missing Skills Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              {/* Matched vs Missing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched Card */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Matched Skills ({matchedSkills.length})</span>
                    </h3>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>

                  {matchedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {matchedSkills.map(skill => (
                        <span 
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1"
                        >
                          <span>✓</span>
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No skills currently matched for this target company.</p>
                  )}
                </div>

                {/* Missing Skills Card */}
                <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-rose-800">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      <span>Missing Skills ({missingSkills.length})</span>
                    </h3>
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                      Action Needed
                    </span>
                  </div>

                  {missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {missingSkills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleQuickAddSkill(skill)}
                          title="Click to add this skill to your profile"
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-indigo-50 text-rose-800 hover:text-indigo-700 border border-rose-200 hover:border-indigo-300 text-xs font-semibold flex items-center gap-1 transition group"
                        >
                          <Plus className="w-3 h-3 text-rose-500 group-hover:text-indigo-600" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> All required skills acquired!
                    </p>
                  )}
                </div>
              </div>

              {/* Learning Recommendations Section */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Personalized Recommendation Plan for {selectedCompany.name}</span>
                  </h3>
                  <span className="text-xs text-slate-400">Step-by-step strategy</span>
                </div>

                <div className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{rec.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rec.desc}</p>
                      </div>
                      {onNavigateToPrep && (
                        <button
                          onClick={() => onNavigateToPrep(rec.action)}
                          className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-indigo-700 text-xs font-bold rounded-lg transition shrink-0 shadow-2xs"
                        >
                          Open {rec.action} →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Ranked Compatibility Matrix (All 16) */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">All 16 Recruiters Ranked by Your Profile Match</h3>
              <p className="text-xs text-slate-500">Sorted from highest technical compatibility to lowest</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-4">Skills Matched</th>
                  <th className="py-3 px-4">Match %</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rankedCompanies.map((item, idx) => (
                  <tr key={item.company.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-bold text-slate-400">#{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-slate-900 text-sm">{item.company.name}</div>
                      <span className="text-[10px] text-slate-400">{item.company.eligibleDepartments.join(', ')}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">{item.company.packageLpa}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.matchedCount} of {item.totalCount} skills
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-black text-sm ${
                          item.pct >= 75 ? 'text-emerald-600' : item.pct >= 50 ? 'text-amber-600' : 'text-slate-600'
                        }`}>
                          {item.pct}%
                        </span>
                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full ${item.pct >= 75 ? 'bg-emerald-500' : item.pct >= 50 ? 'bg-amber-500' : 'bg-slate-400'}`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedCompanyName(item.company.name);
                          setCompareMode('Single');
                        }}
                        className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition"
                      >
                        Deep Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
