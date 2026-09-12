import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { DataService } from '../../lib/db';
import { UserProfile } from '../../types';
import { AvatarSelector } from '../common/AvatarSelector';
import { DEFAULT_AVATAR } from '../../data/avatars';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('4th Year');
  const [graduationYear, setGraduationYear] = useState<number>(2026);
  const [targetJobRole, setTargetJobRole] = useState('Software Developer');
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);
  const [showAvatarPickerInSignin, setShowAvatarPickerInSignin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your name.');
          setLoading(false);
          return;
        }
        const result = await DataService.signUp({
          fullName: fullName.trim(),
          email: email.trim(),
          college: college.trim() || 'Engineering Institute',
          department: department.trim() || 'Computer Science & Engineering',
          year,
          graduationYear,
          targetJobRole: targetJobRole.trim() || 'Software Developer',
          avatarUrl,
          password
        });
        if (result.error) {
          setErrorMsg(result.error);
        } else {
          setSuccessMsg('Account registered successfully! Redirecting to dashboard...');
          setTimeout(() => {
            onSuccess(result.user);
            onClose();
          }, 800);
        }
      } else if (mode === 'signin') {
        const result = await DataService.signIn(email.trim(), password, avatarUrl);
        if (result.error) {
          setErrorMsg(result.error);
        } else if (result.user) {
          setSuccessMsg('Login successful! Redirecting...');
          setTimeout(() => {
            onSuccess(result.user!);
            onClose();
          }, 600);
        }
      } else if (mode === 'forgot') {
        const result = await DataService.forgotPassword(email.trim());
        if (result.success) {
          setSuccessMsg(result.message);
        } else {
          setErrorMsg(result.message);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[95vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold transition"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200 font-black">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'signup' && 'Student Registration'}
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'signup' && 'Create your placement preparation profile with campus details.'}
            {mode === 'signin' && 'Sign in to sync your skills, mock scores, and job applications.'}
            {mode === 'forgot' && 'Enter your college email address to receive password reset link.'}
          </p>
        </div>

        {/* Notification alerts */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <>
              {/* Avatar DP Selection */}
              <AvatarSelector
                selectedAvatar={avatarUrl}
                onSelectAvatar={setAvatarUrl}
                title="Select Your Profile Picture / Avatar DP"
                subtitle="Choose an avatar character or upload your custom DP photo"
                compact
              />

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name (e.g. Alex Rivera)"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">College / University</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Tech / Anna Univ"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Science & Engg / IT"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Graduation Year</label>
                  <input
                    type="number"
                    required
                    min={2024}
                    max={2030}
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Developer"
                    value={targetJobRole}
                    onChange={(e) => setTargetJobRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {mode === 'signin' && (
            <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full ring-2 ring-indigo-400 overflow-hidden bg-white shadow-2xs">
                    <img src={avatarUrl} alt="Your DP" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">Profile Avatar / DP</p>
                    <p className="text-[10px] text-slate-500">Pick your preferred DP avatar for this session</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarPickerInSignin(!showAvatarPickerInSignin)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                >
                  {showAvatarPickerInSignin ? 'Hide Options' : 'Change DP'}
                </button>
              </div>

              {showAvatarPickerInSignin && (
                <div className="pt-2 border-t border-indigo-100/60">
                  <AvatarSelector
                    selectedAvatar={avatarUrl}
                    onSelectAvatar={(url) => {
                      setAvatarUrl(url);
                    }}
                    title="Select Avatar DP"
                    subtitle="Click any avatar or upload your photo"
                    compact
                  />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-200 mt-2"
          >
            {loading ? 'Processing...' : (
              mode === 'signup' ? 'Create Account & Open Dashboard' :
              mode === 'signin' ? 'Sign In to Dashboard' :
              'Send Password Reset Link'
            )}
          </button>
        </form>

        {/* Switch mode links */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          {mode === 'signin' && (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }} 
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign Up Here
              </button>
            </p>
          )}
          {mode === 'signup' && (
            <p>
              Already registered?{' '}
              <button 
                onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }} 
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
          {mode === 'forgot' && (
            <button 
              onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }} 
              className="font-bold text-indigo-600 hover:underline"
            >
              ← Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
