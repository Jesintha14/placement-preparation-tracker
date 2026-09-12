import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Briefcase, 
  Calculator, 
  BrainCircuit, 
  Code2, 
  ArrowRight,
  ShieldCheck,
  Users,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { DataService, JoinedStudent, formatRelativeTime } from '../lib/db';
import { AvatarSelector } from '../components/common/AvatarSelector';
import { DEFAULT_AVATAR } from '../data/avatars';

interface StartingSignInPageProps {
  onAuthenticated: (user: UserProfile) => void;
  onExploreAsGuest: () => void;
}

export const StartingSignInPage: React.FC<StartingSignInPageProps> = ({
  onAuthenticated,
  onExploreAsGuest
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const [targetJobRole, setTargetJobRole] = useState('Software Developer');
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudent[]>(() => DataService.getJoinedStudents());

  // Real-time live clock
  const [currentTime, setCurrentTime] = useState(() => 
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [currentDate, setCurrentDate] = useState(() => 
    new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address to sign in.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await DataService.signIn(email.trim(), password.trim() || undefined, avatarUrl);
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        setJoinedStudents(DataService.getJoinedStudents());
        onAuthenticated(result.user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name so you can be mentioned in the campus cohort.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await DataService.signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        college: college.trim() || 'Engineering Institute',
        department,
        year: '4th Year',
        graduationYear: 2026,
        targetJobRole,
        avatarUrl,
        password: password.trim() || undefined
      });

      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        setJoinedStudents(DataService.getJoinedStudents());
        onAuthenticated(result.user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-lg tracking-tight">PlacementTrack</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  Drive 2026
                </span>
              </div>
              <p className="text-xs text-slate-500">Tier-1 Campus Hiring & Aptitude Preparation Portal</p>
            </div>
          </div>

          {/* Synchronized Live Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 rounded-full border border-slate-200 text-xs text-slate-700 font-medium">
            <Clock className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span className="font-mono font-bold text-slate-900">{currentTime}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline text-slate-500 text-[11px]">{currentDate}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-8 sm:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Primary: Sign In & Registration Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setError(null); }}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                  activeTab === 'signin'
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Account</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(null); }}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>New Student Registration</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {activeTab === 'signin' ? (
                /* Sign In Form */
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="text-left">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Sign In to Your Account</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Access your personal placement dashboard, test records, and target company tracker.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Student Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. yourname@college.edu or gmail.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      <span className="text-[11px] text-slate-400">Optional for local session</span>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <AvatarSelector
                      selectedAvatar={avatarUrl}
                      onSelectAvatar={(url) => setAvatarUrl(url)}
                      compact={true}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Signing in...</span>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In to Placement Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-3 text-center">
                    <p className="text-xs text-slate-500">
                      New to the placement portal?{' '}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('register'); setError(null); }}
                        className="font-bold text-indigo-600 hover:underline"
                      >
                        Create an account with your name →
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* Registration Form */
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="text-left">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Student Registration</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Register your candidate profile. Your name will be mentioned in the campus placement cohort!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Rivera or Rahul Sharma"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="candidate@college.edu"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        College / Institution
                      </label>
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. Institute of Technology"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Target Job Role
                      </label>
                      <select
                        value={targetJobRole}
                        onChange={(e) => setTargetJobRole(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      >
                        <option value="Software Developer">Software Developer (SDE)</option>
                        <option value="Full Stack Engineer">Full Stack Engineer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Engineer">Backend Engineer</option>
                        <option value="Data Scientist">Data Scientist / AI Engineer</option>
                        <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Department / Specialization
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <AvatarSelector
                      selectedAvatar={avatarUrl}
                      onSelectAvatar={(url) => setAvatarUrl(url)}
                      compact={true}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Creating Account...</span>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Register & Join Placement Drive</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-3 text-center">
                    <p className="text-xs text-slate-500">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('signin'); setError(null); }}
                        className="font-bold text-indigo-600 hover:underline"
                      >
                        Sign in to your account →
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* Guest Exploration Option */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Prefer to explore placement drives without signing in?</span>
                <button
                  type="button"
                  onClick={onExploreAsGuest}
                  className="font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1 transition"
                >
                  <span>Explore as Guest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right / Secondary: Recently Joined Students & Live Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {/* Recently Joined Students Feed */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">Recently Joined Students</h3>
                    <p className="text-[11px] text-slate-500">New candidate signups mentioned live</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Cohort
                </span>
              </div>

              <div className="divide-y divide-slate-100 mt-2">
                {joinedStudents.map((student) => (
                  <div key={student.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-indigo-100 ring-2 ring-slate-100 shrink-0">
                        <img 
                          src={student.avatarUrl || DEFAULT_AVATAR} 
                          alt={student.fullName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{student.fullName}</span>
                          <Sparkles className="w-3 h-3 text-amber-500" />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate max-w-[170px]">
                          {student.targetJobRole} • {student.college}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {formatRelativeTime(student.joinedAt)}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                        Joined
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 bg-indigo-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                <p className="text-[11px] text-indigo-900 leading-relaxed">
                  💡 <strong>Campus Note:</strong> When new candidates register, their actual name is automatically recorded and mentioned across the active hiring portal.
                </p>
              </div>
            </div>

            {/* Preparation Modules Preview */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-black text-sm tracking-tight text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>2026 Campus Drive Syllabus</span>
              </h3>
              <p className="text-xs text-indigo-200 mb-4">
                Structured test drill engines and ATS resume audit calibrated for Tier-1 companies.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl text-xs">
                  <Calculator className="w-4 h-4 text-indigo-300 shrink-0" />
                  <span className="font-medium">Quantitative Aptitude: 12 Core Speed Math Modules</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl text-xs">
                  <BrainCircuit className="w-4 h-4 text-violet-300 shrink-0" />
                  <span className="font-medium">Logical Reasoning: Coding-Decoding, Syllogisms, Series</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl text-xs">
                  <Code2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="font-medium">DSA Coding Practice: Arrays, Trees, DP & Graphs</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl text-xs">
                  <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-medium">16 Tier-1 Companies: TCS, Infosys, Amazon, Wipro</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        <p>PlacementTrack Campus Platform • Accurate Real-time Evaluation System • Academic Season 2026</p>
      </footer>
    </div>
  );
};
