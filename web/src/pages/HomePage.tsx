import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  Building2, 
  Code2, 
  Calculator, 
  BrainCircuit, 
  FileCheck2, 
  TrendingUp, 
  Target,
  ShieldCheck
} from 'lucide-react';
import { UserProfile, PlacementReadiness } from '../types';

interface HomePageProps {
  user: UserProfile | null;
  readiness: PlacementReadiness;
  onNavigate: (page: string) => void;
  onOpenAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  user,
  readiness,
  onNavigate,
  onOpenAuth
}) => {
  const topCompanies = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Amazon', 'Microsoft', 'Google', 'Zoho', 'Deloitte', 'Oracle', 'Freshworks'];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-8 md:p-14 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AI Studio Student Placement Preparation Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Master Campus Drives. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Track, Prepare & Get Placed.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
            A comprehensive, all-in-one placement preparation engine. Compare your skills against tier-1 recruiters, solve 24+ aptitude and reasoning topics, analyze resumes with ATS verification, and follow a personalized role roadmap.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('Dashboard')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Go to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('Skill Matching')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm transition"
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Instant Skill Matcher</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">16+</p>
              <p className="text-xs text-slate-400">Top Recruiters Mapped</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-300">24</p>
              <p className="text-xs text-slate-400">Aptitude & Logic Topics</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-300">14</p>
              <p className="text-xs text-slate-400">Programming Languages</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-amber-300">10-Stage</p>
              <p className="text-xs text-slate-400">Personalized Roadmap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Recruiters Marquee */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
          Preparation Patterns & Eligibility Mapped for Top Recruiters
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {topCompanies.map((comp) => (
            <button
              key={comp}
              onClick={() => onNavigate('Companies')}
              className="px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-xs font-bold rounded-xl transition"
            >
              {comp}
            </button>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need for Campus Selection
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Structured step-by-step modules designed specifically to eliminate skill gaps and boost placement test speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div 
            onClick={() => onNavigate('Skill Matching')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
              Intelligent Skill Matching
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compare your current student profile against company prerequisites (TCS, Amazon, Zoho) to calculate match percentages and identify missing competencies.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 mt-4 group-hover:translate-x-1 transition">
              Analyze Matches →
            </span>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onNavigate('Aptitude')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
              12 Aptitude Practice Modules
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Percentages, Profit & Loss, Time and Work, Probability and Data Interpretation. Features timed countdowns, instant scoring, and step-by-step math derivations.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4 group-hover:translate-x-1 transition">
              Start Aptitude Drill →
            </span>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onNavigate('Logical Reasoning')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
              12 Logical Reasoning Topics
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Number Series, Blood Relations, Syllogisms, Coding-Decoding, Seating Arrangements, and Data Sufficiency with detailed logical proofs.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 mt-4 group-hover:translate-x-1 transition">
              Practice Reasoning →
            </span>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onNavigate('My Skills')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
              14 Programming Languages
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              C, C++, Java, Python, JavaScript, TypeScript, SQL, HTML, CSS, PHP, C#, Go, Kotlin, and Rust. Update proficiencies from Beginner to Advanced anytime.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 mt-4 group-hover:translate-x-1 transition">
              Manage Skills →
            </span>
          </div>

          {/* Card 5 */}
          <div 
            onClick={() => onNavigate('Resume')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-violet-600 group-hover:text-white transition">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
              Resume & ATS Auditor
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload your resume for real-time ATS scoring, keyword detection, section-by-section checklist validation, and targeted bullet point suggestions.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 mt-4 group-hover:translate-x-1 transition">
              Audit Resume →
            </span>
          </div>

          {/* Card 6 */}
          <div 
            onClick={() => onNavigate('Career Roadmap')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition">
              10-Stage Career Roadmap
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              From Syntax Basics and Data Structures to Projects, Mock Simulators, and HR Behavioral Rounds. Track stage completion progress interactively.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 mt-4 group-hover:translate-x-1 transition">
              View Roadmap →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
