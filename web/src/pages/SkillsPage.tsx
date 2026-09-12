import React, { useState } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2, 
  Search, 
  BarChart3, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { StudentSkill, SkillLevel } from '../types';
import { PROGRAMMING_LANGUAGES_LIST, CORE_CS_SKILLS } from '../data/mockData';
import { DataService } from '../lib/db';

interface SkillsPageProps {
  onSkillUpdated?: () => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onSkillUpdated }) => {
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>(() => DataService.getStudentSkills());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'Languages' | 'Core CS' | 'All'>('All');
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [customSkillCategory, setCustomSkillCategory] = useState<'Language' | 'Core CS' | 'Framework' | 'Tool'>('Framework');
  const [customSkillLevel, setCustomSkillLevel] = useState<SkillLevel>('Intermediate');

  const handleLevelChange = (skillName: string, level: SkillLevel, category: 'Language' | 'Core CS' | 'Framework' | 'Tool' = 'Language') => {
    const updated = DataService.updateSkill(skillName, level, category);
    setStudentSkills([...updated]);
    if (onSkillUpdated) onSkillUpdated();
  };

  const handleDeleteSkill = (skillName: string) => {
    const updated = DataService.deleteSkill(skillName);
    setStudentSkills([...updated]);
    if (onSkillUpdated) onSkillUpdated();
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const updated = DataService.updateSkill(customSkillInput.trim(), customSkillLevel, customSkillCategory);
    setStudentSkills([...updated]);
    setCustomSkillInput('');
    if (onSkillUpdated) onSkillUpdated();
  };

  // Skill lookups
  const skillMap = new Map<string, SkillLevel>();
  studentSkills.forEach(s => skillMap.set(s.skillName.toLowerCase(), s.level));

  const filteredLanguages = PROGRAMMING_LANGUAGES_LIST.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCore = CORE_CS_SKILLS.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const beginnerCount = studentSkills.filter(s => s.level === 'Beginner').length;
  const intermediateCount = studentSkills.filter(s => s.level === 'Intermediate').length;
  const advancedCount = studentSkills.filter(s => s.level === 'Advanced').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Programming Languages & Technical Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep your language proficiencies updated to optimize placement readiness and company match scores.
          </p>
        </div>

        {/* Skill Proficiency Distribution Badges */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            {advancedCount} Advanced
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 font-bold text-xs border border-sky-200">
            {intermediateCount} Intermediate
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
            {beginnerCount} Beginner
          </span>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'All' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Skills
          </button>
          <button
            onClick={() => setActiveTab('Languages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'Languages' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            14 Programming Languages
          </button>
          <button
            onClick={() => setActiveTab('Core CS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'Core CS' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Core CS Subjects
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search programming language or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* 14 Programming Languages Section */}
      {(activeTab === 'All' || activeTab === 'Languages') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              <span>14 Mandatory Programming Languages</span>
            </h2>
            <span className="text-xs text-slate-500">C, C++, Java, Python, JS, TS, SQL, HTML, CSS, PHP, C#, Go, Kotlin, Rust</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLanguages.map((lang) => {
              const currentLevel = skillMap.get(lang.name.toLowerCase());
              return (
                <div 
                  key={lang.name}
                  className={`p-5 rounded-2xl border transition-all ${
                    currentLevel
                      ? 'bg-white border-indigo-200 shadow-sm'
                      : 'bg-white/80 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{lang.icon}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {lang.name}
                          {currentLevel && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </h3>
                        <span className="text-[10px] font-semibold text-slate-400">{lang.popularity}</span>
                      </div>
                    </div>

                    {currentLevel && (
                      <button
                        onClick={() => handleDeleteSkill(lang.name)}
                        className="text-slate-300 hover:text-rose-500 transition p-1"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{lang.desc}</p>

                  {/* Level Radio / Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Proficiency:</span>
                    <div className="flex items-center gap-1">
                      {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => {
                        const isSelected = currentLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            onClick={() => handleLevelChange(lang.name, lvl, 'Language')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                              isSelected
                                ? lvl === 'Advanced'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : lvl === 'Intermediate'
                                  ? 'bg-sky-600 text-white shadow-xs'
                                  : 'bg-amber-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Core CS Concepts Section */}
      {(activeTab === 'All' || activeTab === 'Core CS') && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Core Computer Science Foundations</span>
            </h2>
            <span className="text-xs text-slate-500">Crucial for Technical Screening & Interviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCore.map((csSkill) => {
              const currentLevel = skillMap.get(csSkill.toLowerCase());
              return (
                <div 
                  key={csSkill}
                  className={`p-4 rounded-2xl border transition-all ${
                    currentLevel
                      ? 'bg-white border-indigo-200 shadow-sm'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900 text-xs truncate" title={csSkill}>
                      {csSkill}
                    </span>
                    {currentLevel && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentLevel === 'Advanced' ? 'bg-emerald-100 text-emerald-800' :
                        currentLevel === 'Intermediate' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {currentLevel}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleLevelChange(csSkill, lvl, 'Core CS')}
                        className={`py-1 text-[10px] font-bold rounded-md transition ${
                          currentLevel === lvl
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {lvl.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Add Custom Skill Card */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-600" />
          <span>Add Custom Framework, Tool, or Cloud Skill</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          e.g. React, Spring Boot, Docker, Kubernetes, AWS, Node.js, Redis, MongoDB
        </p>

        <form onSubmit={handleAddCustomSkill} className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Skill name (e.g., Docker, React, AWS)..."
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 focus:bg-white"
          />

          <select
            value={customSkillCategory}
            onChange={(e: any) => setCustomSkillCategory(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-semibold text-slate-700"
          >
            <option value="Framework">Framework / Library</option>
            <option value="Tool">Tool / DevOps</option>
            <option value="Core CS">Core CS</option>
            <option value="Language">Language</option>
          </select>

          <select
            value={customSkillLevel}
            onChange={(e: any) => setCustomSkillLevel(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-semibold text-slate-700"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
          >
            Save Skill
          </button>
        </form>
      </section>
    </div>
  );
};
