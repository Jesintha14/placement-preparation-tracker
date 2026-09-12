import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { SkillsPage } from './pages/SkillsPage';
import { AptitudePage } from './pages/AptitudePage';
import { ReasoningPage } from './pages/ReasoningPage';
import { CodingPracticePage } from './pages/CodingPracticePage';
import { CompaniesPage } from './pages/CompaniesPage';
import { SkillMatchingPage } from './pages/SkillMatchingPage';
import { JobsPage } from './pages/JobsPage';
import { ResumePage } from './pages/ResumePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ProgressPage } from './pages/ProgressPage';
import { StartingSignInPage } from './pages/StartingSignInPage';
import { AuthModal } from './components/auth/AuthModal';
import { SupabaseConfigModal } from './components/common/SupabaseConfigModal';
import { DataService } from './lib/db';
import { UserProfile, PlacementReadiness } from './types';

export function App() {
  const [user, setUser] = useState<UserProfile | null>(() => DataService.getCurrentUser());
  const [isGuestBrowsing, setIsGuestBrowsing] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);
  const [selectedCompanyForMatch, setSelectedCompanyForMatch] = useState<string>('');
  const [readiness, setReadiness] = useState<PlacementReadiness>(() => DataService.calculateReadiness());

  const refreshReadiness = () => {
    setReadiness(DataService.calculateReadiness());
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' | 'forgot' = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setIsGuestBrowsing(false);
    refreshReadiness();
    setActivePage('Dashboard');
  };

  const handleLogout = async () => {
    await DataService.logout();
    setUser(null);
    setIsGuestBrowsing(false);
    refreshReadiness();
    setActivePage('Home');
  };

  const handleCompanySelectForMatch = (companyName: string) => {
    setSelectedCompanyForMatch(companyName);
    setActivePage('Skill Matching');
  };

  const handleGlobalSearch = (query: string) => {
    // Quick routing based on search intent
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('python') || q.includes('java') || q.includes('c++')) {
      setActivePage('My Skills');
    } else if (q.includes('job') || q.includes('drive') || q.includes('vacancy') || q.includes('apply')) {
      setActivePage('Jobs');
    } else if (q.includes('aptitude') || q.includes('percent') || q.includes('profit') || q.includes('ratio')) {
      setActivePage('Aptitude');
    } else if (q.includes('reasoning') || q.includes('series') || q.includes('blood') || q.includes('syllogism')) {
      setActivePage('Logical Reasoning');
    } else if (q.includes('resume') || q.includes('ats') || q.includes('cv')) {
      setActivePage('Resume');
    } else if (q.includes('roadmap') || q.includes('stage')) {
      setActivePage('Career Roadmap');
    } else {
      setSelectedCompanyForMatch(query);
      setActivePage('Companies');
    }
  };

  if (!user && !isGuestBrowsing) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        <StartingSignInPage
          onAuthenticated={handleAuthSuccess}
          onExploreAsGuest={() => setIsGuestBrowsing(true)}
        />
        <SupabaseConfigModal
          isOpen={isSupabaseModalOpen}
          onClose={() => setIsSupabaseModalOpen(false)}
          onConfigSaved={refreshReadiness}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        user={user}
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        onOpenAuth={() => setIsGuestBrowsing(false)}
        onLogout={handleLogout}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        onGlobalSearch={handleGlobalSearch}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
          readiness={readiness}
          onOpenSupabaseConfig={() => setIsSupabaseModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activePage === 'Home' && (
              <HomePage
                user={user}
                readiness={readiness}
                onNavigate={setActivePage}
                onOpenAuth={() => handleOpenAuth('signup')}
              />
            )}

            {activePage === 'Dashboard' && (
              user ? (
                <DashboardPage
                  user={user}
                  readiness={readiness}
                  onNavigate={setActivePage}
                  onSelectCompanyForMatch={handleCompanySelectForMatch}
                />
              ) : (
                <div className="max-w-xl mx-auto text-center py-16 px-4 space-y-6 bg-white rounded-3xl border border-slate-200 shadow-sm mt-8">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto ring-4 ring-indigo-50">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900">Student Dashboard</h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                      Sign in or create your student profile to view placement readiness scores, track company applications, and select your custom Avatar DP!
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleOpenAuth('signup')}
                      className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-200 transition"
                    >
                      Create Account & Choose Avatar DP
                    </button>
                    <button
                      onClick={() => handleOpenAuth('signin')}
                      className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
                    >
                      Sign In to Existing Profile
                    </button>
                  </div>
                </div>
              )
            )}

            {activePage === 'My Skills' && (
              <SkillsPage
                onSkillUpdated={refreshReadiness}
              />
            )}

            {activePage === 'Aptitude' && (
              <AptitudePage
                onTestCompleted={refreshReadiness}
              />
            )}

            {activePage === 'Logical Reasoning' && (
              <ReasoningPage
                onTestCompleted={refreshReadiness}
              />
            )}

            {activePage === 'Coding Practice' && (
              <CodingPracticePage
                onScoreUpdated={refreshReadiness}
              />
            )}

            {activePage === 'Companies' && (
              <CompaniesPage
                onSelectCompanyForMatch={handleCompanySelectForMatch}
                targetCompanyQuery={selectedCompanyForMatch}
              />
            )}

            {activePage === 'Skill Matching' && (
              <SkillMatchingPage
                initialCompany={selectedCompanyForMatch}
                onSkillUpdated={refreshReadiness}
                onNavigateToPrep={setActivePage}
              />
            )}

            {activePage === 'Jobs' && (
              <JobsPage
                onStatusUpdated={refreshReadiness}
              />
            )}

            {activePage === 'Resume' && (
              <ResumePage
                onScoreUpdated={refreshReadiness}
              />
            )}

            {activePage === 'Career Roadmap' && (
              <RoadmapPage
                onStageToggled={refreshReadiness}
                onNavigateToTopic={setActivePage}
              />
            )}

            {activePage === 'Progress' && (
              <ProgressPage
                readiness={readiness}
                onNavigateToTopic={setActivePage}
              />
            )}
          </div>
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Supabase Configuration Modal */}
      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onConfigSaved={refreshReadiness}
      />
    </div>
  );
}
