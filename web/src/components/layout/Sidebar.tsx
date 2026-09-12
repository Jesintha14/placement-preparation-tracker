import React from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  Calculator, 
  BrainCircuit, 
  TerminalSquare, 
  Building2, 
  Briefcase, 
  GitCompare, 
  FileText, 
  TrendingUp, 
  Map, 
  User, 
  Home, 
  Sparkles, 
  CheckCircle,
  Database
} from 'lucide-react';
import { PlacementReadiness } from '../../types';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  closeSidebar: () => void;
  readiness: PlacementReadiness;
  onOpenSupabaseConfig: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  isOpen,
  closeSidebar,
  readiness,
  onOpenSupabaseConfig
}) => {
  const navSections = [
    {
      heading: 'MAIN',
      items: [
        { id: 'Home', label: 'Home', icon: Home },
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'Career Roadmap', label: 'Personalized Roadmap', icon: Map, badge: 'Target' },
        { id: 'Progress', label: 'Progress Tracker', icon: TrendingUp },
      ]
    },
    {
      heading: 'PREPARATION & SKILLS',
      items: [
        { id: 'My Skills', label: 'My Skills & Languages', icon: Code2, badge: '14+' },
        { id: 'Aptitude', label: 'Quantitative Aptitude', icon: Calculator, badge: '12 Topics' },
        { id: 'Logical Reasoning', label: 'Logical Reasoning', icon: BrainCircuit, badge: '12 Topics' },
        { id: 'Coding Practice', label: 'Coding Practice', icon: TerminalSquare, badge: 'DSA' },
      ]
    },
    {
      heading: 'CAMPUS PLACEMENTS',
      items: [
        { id: 'Companies', label: 'Companies (16 Tier-1)', icon: Building2 },
        { id: 'Skill Matching', label: 'Intelligent Skill Match', icon: GitCompare, highlight: true },
        { id: 'Jobs', label: 'Jobs & Vacancies', icon: Briefcase, badge: 'Drives' },
        { id: 'Resume', label: 'Resume & ATS Review', icon: FileText, badge: `${readiness.resumeScore}%` },
      ]
    },
    {
      heading: 'SETTINGS & DATABASE',
      items: [
        { id: 'Supabase Config', label: 'Supabase Database', icon: Database, action: onOpenSupabaseConfig },
      ]
    }
  ];

  const handleItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      setActivePage(item.id);
    }
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside className={`fixed lg:static top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base leading-tight tracking-tight">
                Placement<span className="text-indigo-600">Track</span>
              </h1>
              <p className="text-[11px] font-medium text-slate-500">Student Placement Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
                {section.heading}
              </p>
              <div className="space-y-1">
                {section.items.map((item: any) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                          : item.highlight
                          ? 'bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 hover:bg-indigo-100/70 border border-indigo-100'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition ${
                          isActive ? 'text-white' : item.highlight ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'
                        }`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Readiness Meter Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                Readiness Score
              </span>
              <span className="font-extrabold text-indigo-600 text-sm">{readiness.overallScore}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${readiness.overallScore}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>{readiness.matchingCompaniesCount} Matching Firms</span>
              <button 
                onClick={() => setActivePage('Skill Matching')} 
                className="text-indigo-600 font-semibold hover:underline"
              >
                Match Now →
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
