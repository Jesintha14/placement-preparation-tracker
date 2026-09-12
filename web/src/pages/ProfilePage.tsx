import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Save, 
  CheckCircle2, 
  Phone, 
  Github, 
  Linkedin,
  Award,
  Calendar,
  Camera,
  Sparkles,
  LogIn
} from 'lucide-react';
import { UserProfile } from '../types';
import { DataService } from '../lib/db';
import { AvatarSelector } from '../components/common/AvatarSelector';
import { DEFAULT_AVATAR } from '../data/avatars';

interface ProfilePageProps {
  user: UserProfile | null;
  onUserUpdated: (user: UserProfile) => void;
  onOpenAuth?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUserUpdated, onOpenAuth }) => {
  const [formData, setFormData] = useState<UserProfile>(() => {
    if (user) return { ...user };
    return {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email: '',
      fullName: '',
      college: '',
      department: '',
      year: '4th Year',
      graduationYear: 2026,
      targetJobRole: 'Software Developer',
      cgpa: 8.5,
      avatarUrl: DEFAULT_AVATAR,
      createdAt: new Date().toISOString()
    };
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    const updated = DataService.updateProfile(formData) || formData;
    DataService.setCurrentUser(updated);
    onUserUpdated(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAvatarChange = (newUrl: string) => {
    const updated = { ...formData, avatarUrl: newUrl };
    setFormData(updated);
    if (user) {
      DataService.updateProfile({ avatarUrl: newUrl });
      onUserUpdated(updated);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <User className="w-7 h-7 text-indigo-600" />
            <span>Student Placement Profile</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalize your name, profile avatar DP, academic details, and target recruiter roles.
          </p>
        </div>

        {!user && onOpenAuth && (
          <button
            type="button"
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Existing Account</span>
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile and chosen Avatar DP saved successfully!</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Avatar & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-2xl flex items-center justify-center overflow-hidden ring-4 ring-indigo-50 shadow-md">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt={formData.fullName || 'Student Avatar'} className="w-full h-full object-cover" />
                ) : (
                  formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'ST'
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md transition"
                title="Change Avatar DP"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">
                  {formData.fullName || 'New Student'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                >
                  {showAvatarPicker ? 'Close Picker' : 'Choose Avatar DP'}
                </button>
              </div>
              <p className="text-xs text-indigo-600 font-semibold">{formData.targetJobRole || 'Software Developer'}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {formData.college ? formData.college : 'College Not Specified'} • Class of {formData.graduationYear}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showAvatarPicker ? 'Hide Avatar Gallery' : 'Change Avatar DP'}</span>
          </button>
        </div>

        {/* Collapsible Avatar Picker Gallery */}
        {showAvatarPicker && (
          <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 animate-in fade-in">
            <AvatarSelector
              selectedAvatar={formData.avatarUrl || DEFAULT_AVATAR}
              onSelectAvatar={handleAvatarChange}
              title="Select Your Profile Picture / DP"
              subtitle="Pick an avatar or upload your own custom photo"
            />
          </div>
        )}

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              placeholder="Enter your name (e.g. Alex Rivera)"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="student@college.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">College / Institute</label>
            <input
              type="text"
              required
              placeholder="e.g. National Institute of Tech / Anna Univ"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Engineering Department</label>
            <input
              type="text"
              required
              placeholder="e.g. Computer Science & Engineering"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Current Academic Year</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-700"
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
              max={2032}
              value={formData.graduationYear}
              onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Placement Role</label>
            <input
              type="text"
              required
              placeholder="e.g. Software Developer"
              value={formData.targetJobRole}
              onChange={(e) => setFormData({ ...formData, targetJobRole: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Current CGPA (Out of 10.0)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={formData.cgpa || ''}
              onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
              placeholder="e.g. 8.75"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">GitHub Profile URL</label>
            <input
              type="url"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={formData.linkedinUrl || ''}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Avatar DP</span>
          </button>
        </div>
      </form>
    </div>
  );
};
