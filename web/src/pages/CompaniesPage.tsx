import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ExternalLink,
  Target,
  Sparkles
} from 'lucide-react';
import { Company } from '../types';
import { COMPANIES_LIST } from '../data/mockData';
import { DataService } from '../lib/db';

interface CompaniesPageProps {
  onSelectCompanyForMatch: (companyName: string) => void;
  targetCompanyQuery?: string;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({
  onSelectCompanyForMatch,
  targetCompanyQuery = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(targetCompanyQuery);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filterType, setFilterType] = useState<'All' | 'Product' | 'Service' | 'HighPackage'>('All');

  const studentSkills = DataService.getStudentSkills();
  const studentSkillNames = new Set(studentSkills.map(s => s.skillName.toLowerCase()));

  const filteredCompanies = COMPANIES_LIST.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      company.packageLpa.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'Product') {
      return ['Amazon', 'Microsoft', 'Google', 'Zoho', 'Oracle', 'Freshworks'].includes(company.name);
    }
    if (filterType === 'Service') {
      return ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Capgemini', 'IBM', 'HCL', 'Tech Mahindra', 'Deloitte'].includes(company.name);
    }
    if (filterType === 'HighPackage') {
      return company.name === 'Amazon' || company.name === 'Microsoft' || company.name === 'Google' || company.name === 'Oracle';
    }

    return true;
  });

  // Calculate quick match % for a given company
  const getCompanyMatchPercent = (company: Company) => {
    let matched = 0;
    company.requiredSkills.forEach(req => {
      if (studentSkillNames.has(req.toLowerCase())) matched++;
    });
    return Math.round((matched / company.requiredSkills.length) * 100);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Building2 className="w-7 h-7 text-indigo-600" />
            <span>Campus Recruitment Companies</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official selection processes, exam patterns, minimum CGPA thresholds, and package tiers for 16 premier recruiters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            {COMPANIES_LIST.length} Companies Analyzed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterType('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterType === 'All' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 16 Companies
          </button>
          <button
            onClick={() => setFilterType('Product')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterType === 'Product' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Product / FAANG+
          </button>
          <button
            onClick={() => setFilterType('Service')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterType === 'Service' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IT Services & Consulting
          </button>
          <button
            onClick={() => setFilterType('HighPackage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterType === 'HighPackage' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            20+ LPA Dream Tier
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, required skill, or package..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Main Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company) => {
          const matchPercent = getCompanyMatchPercent(company);
          return (
            <div 
              key={company.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition">
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition">
                        {company.name}
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {company.packageLpa}
                      </span>
                    </div>
                  </div>

                  {/* Quick Match Pill */}
                  <div className="text-right">
                    <span className={`text-[11px] font-black px-2 py-1 rounded-lg ${
                      matchPercent >= 75 ? 'bg-emerald-100 text-emerald-800' :
                      matchPercent >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {matchPercent}% Match
                    </span>
                  </div>
                </div>

                {/* Eligibility & Departments */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 font-semibold block">Min CGPA</span>
                    <strong className="text-slate-800">{company.minimumCgpa}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 font-semibold block">Rounds</span>
                    <strong className="text-slate-800">{company.selectionRounds.length} Stages</strong>
                  </div>
                </div>

                {/* Required Skills Chips */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Required Skills
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {company.requiredSkills.map((skill) => {
                      const hasSkill = studentSkillNames.has(skill.toLowerCase());
                      return (
                        <span 
                          key={skill}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                            hasSkill 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {hasSkill ? '✓ ' : ''}{skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Exam Pattern Preview */}
                <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100/70 text-[11px] text-slate-600">
                  <span className="text-[9px] font-bold uppercase text-indigo-700 block mb-0.5">Exam Pattern</span>
                  <p className="line-clamp-2 leading-relaxed">{company.examPattern}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900"
                >
                  View Details & Rounds
                </button>
                <button
                  onClick={() => onSelectCompanyForMatch(company.name)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Match Skills</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                  {selectedCompany.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedCompany.name}</h2>
                  <p className="text-xs font-semibold text-emerald-600">Package: {selectedCompany.packageLpa}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompany(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Criteria Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Minimum CGPA</span>
                <strong className="text-slate-900 text-sm">{selectedCompany.minimumCgpa}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Package Offering</span>
                <strong className="text-emerald-700 text-sm">{selectedCompany.packageLpa}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-slate-400 font-medium block">Eligibility</span>
                <strong className="text-slate-900">{selectedCompany.eligibleDepartments.join(', ')}</strong>
              </div>
            </div>

            {/* Selection Rounds Breakdown */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Selection Process & Hiring Stages</span>
              </h3>
              <div className="space-y-2">
                {selectedCompany.selectionRounds.map((round, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{round.name}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{round.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Pattern & Syllabus */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider">Exam Pattern & Syllabus Focus</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedCompany.examPattern}</p>
            </div>

            {/* Required Skills Match Status */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2">
                Required Technical Proficiencies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompany.requiredSkills.map(skill => {
                  const hasSkill = studentSkillNames.has(skill.toLowerCase());
                  return (
                    <span
                      key={skill}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg border ${
                        hasSkill
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {hasSkill ? '✓ ' : '✕ Missing: '}{skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCompany(null);
                  onSelectCompanyForMatch(selectedCompany.name);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
              >
                Compare in Skill Match Engine →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
