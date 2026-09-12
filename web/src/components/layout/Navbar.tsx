import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Database, 
  User, 
  Menu, 
  X, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  LogIn,
  Camera,
  Clock
} from 'lucide-react';
import { UserProfile } from '../../types';
import { getSupabaseConfig } from '../../lib/supabase';

interface NavbarProps {
  user: UserProfile | null;
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenSupabaseConfig: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  onGlobalSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activePage,
  setActivePage,
  onOpenSupabaseConfig,
  onOpenAuth,
  onLogout,
  toggleSidebar,
  isSidebarOpen,
  onGlobalSearch
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const supabaseConfig = getSupabaseConfig();

  const [liveTime, setLiveTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [liveDate, setLiveDate] = useState<string>(() =>
    new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setLiveDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onGlobalSearch) {
        onGlobalSearch(searchQuery.trim());
      }
    }
  };

  const notifications = [
    { id: 1, title: 'TCS Digital Drive 2026', time: '2 hours ago', unread: true, desc: 'NQT registration closing in 5 days. Verify eligibility criteria.' },
    { id: 2, title: 'Infosys Specialist Mock', time: 'Yesterday', unread: true, desc: 'New dynamic programming problems added to practice hub.' },
    { id: 3, title: 'Skill Match Alert: Amazon SDE 1', time: '3 days ago', unread: false, desc: 'You are 2 skills away from reaching 80% compatibility.' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand/Breadcrumb */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm shadow-indigo-200">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-slate-900 text-base md:text-lg block leading-none">
                Placement<span className="text-indigo-600">Track</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider hidden sm:inline-block">
                Campus Preparation Platform
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search companies, topics, skills (e.g., TCS, DSA, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-transparent focus:border-indigo-500 focus:bg-white text-sm rounded-full pl-9 pr-4 py-2 outline-none transition text-slate-800 placeholder-slate-400"
            />
          </form>
        </div>

        {/* Right: Live Clock, DB Status, Notifications, User */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Live Synchronized Clock */}
          <div 
            title="Real-time synchronized local clock"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100/90 text-slate-700 border border-slate-200"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="tabular-nums font-mono font-bold text-slate-800">{liveTime}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 text-[11px]">{liveDate}</span>
          </div>

          {/* Supabase Status Pill */}
          <button
            onClick={onOpenSupabaseConfig}
            title={supabaseConfig.isConnected ? 'Connected to live Supabase project' : 'Running on responsive local storage. Click to connect remote Supabase.'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
              supabaseConfig.isConnected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{supabaseConfig.isConnected ? 'Supabase Live' : 'Local / Demo Mode'}</span>
            {supabaseConfig.isConnected ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition relative"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">Placement Alerts</h4>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`py-3 ${n.unread ? 'bg-indigo-50/30' : ''}`}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-900">{n.title}</span>
                        <span className="text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => { setActivePage('Jobs'); setShowNotifications(false); }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View All Active Campus Drives →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Account */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-full transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold flex items-center justify-center text-xs overflow-hidden ring-2 ring-indigo-100">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    user.fullName.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="hidden lg:block text-left pr-2">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">{user.fullName}</span>
                  <span className="text-[10px] text-slate-500 block leading-none">{user.targetJobRole}</span>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.fullName || 'Student'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email || 'No email set'}</p>
                    {user.college && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded truncate max-w-full">
                        {user.college}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => { onOpenSupabaseConfig(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Database className="w-3.5 h-3.5 text-slate-400" />
                    Supabase Configuration
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
