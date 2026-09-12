import { 
  UserProfile, 
  StudentSkill, 
  TestAttempt, 
  JobOpening, 
  JobApplication, 
  ResumeAudit, 
  RoadmapStage, 
  PlacementReadiness,
  Company
} from '../types';
import { 
  COMPANIES_LIST, 
  SAMPLE_JOB_OPENINGS, 
  PROGRAMMING_LANGUAGES_LIST, 
  CORE_CS_SKILLS, 
  SOFTWARE_DEVELOPER_ROADMAP 
} from '../data/mockData';
import { PRESET_AVATARS, DEFAULT_AVATAR } from '../data/avatars';
import { getSupabaseClient } from './supabase';

const getIsoHoursAgo = (hours: number) => new Date(Date.now() - hours * 3600 * 1000).toISOString();
const getIsoDaysAgo = (days: number) => new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();

const STORAGE_KEY_USER = 'placement_tracker_user';
const STORAGE_KEY_SKILLS = 'placement_tracker_student_skills';
const STORAGE_KEY_TESTS = 'placement_tracker_tests';
const STORAGE_KEY_APPLICATIONS = 'placement_tracker_applications';
const STORAGE_KEY_RESUME = 'placement_tracker_resume';
const STORAGE_KEY_ROADMAP = 'placement_tracker_roadmap';
const STORAGE_KEY_JOINED_STUDENTS = 'placement_tracker_joined_students';

export interface JoinedStudent {
  id: string;
  fullName: string;
  email?: string;
  college: string;
  department?: string;
  targetJobRole: string;
  avatarUrl: string;
  joinedAt: string;
}

const DEFAULT_JOINED_STUDENTS: JoinedStudent[] = [
  {
    id: 'usr-seed-1',
    fullName: 'Aarav Patel',
    college: 'National Institute of Technology',
    department: 'Computer Science and Engineering',
    targetJobRole: 'Software Developer',
    avatarUrl: PRESET_AVATARS[0].url,
    joinedAt: getIsoHoursAgo(1)
  },
  {
    id: 'usr-seed-2',
    fullName: 'Ananya Sharma',
    college: 'Vellore Institute of Technology',
    department: 'Information Technology',
    targetJobRole: 'Full Stack Engineer',
    avatarUrl: PRESET_AVATARS[1].url,
    joinedAt: getIsoHoursAgo(3)
  },
  {
    id: 'usr-seed-3',
    fullName: 'Rohan Verma',
    college: 'PSG College of Technology',
    department: 'Electronics & Communication',
    targetJobRole: 'Cloud & DevOps Engineer',
    avatarUrl: PRESET_AVATARS[2].url,
    joinedAt: getIsoHoursAgo(6)
  }
];

export const DEFAULT_USER: UserProfile = {
  id: 'usr-student-guest',
  email: '',
  fullName: '',
  college: '',
  department: '',
  year: '4th Year',
  graduationYear: 2026,
  targetJobRole: 'Software Developer',
  cgpa: 8.5,
  phone: '',
  githubUrl: '',
  linkedinUrl: '',
  avatarUrl: DEFAULT_AVATAR,
  createdAt: new Date().toISOString()
};

const INITIAL_STUDENT_SKILLS: StudentSkill[] = [
  { id: 'sk-1', userId: DEFAULT_USER.id, skillName: 'Python', category: 'Language', level: 'Advanced', updatedAt: new Date().toISOString() },
  { id: 'sk-2', userId: DEFAULT_USER.id, skillName: 'Java', category: 'Language', level: 'Intermediate', updatedAt: new Date().toISOString() },
  { id: 'sk-3', userId: DEFAULT_USER.id, skillName: 'C++', category: 'Language', level: 'Intermediate', updatedAt: new Date().toISOString() },
  { id: 'sk-4', userId: DEFAULT_USER.id, skillName: 'SQL', category: 'Language', level: 'Advanced', updatedAt: new Date().toISOString() },
  { id: 'sk-5', userId: DEFAULT_USER.id, skillName: 'JavaScript', category: 'Language', level: 'Intermediate', updatedAt: new Date().toISOString() },
  { id: 'sk-6', userId: DEFAULT_USER.id, skillName: 'HTML', category: 'Language', level: 'Advanced', updatedAt: new Date().toISOString() },
  { id: 'sk-7', userId: DEFAULT_USER.id, skillName: 'CSS', category: 'Language', level: 'Intermediate', updatedAt: new Date().toISOString() },
  { id: 'sk-8', userId: DEFAULT_USER.id, skillName: 'Data Structures', category: 'Core CS', level: 'Intermediate', updatedAt: new Date().toISOString() },
  { id: 'sk-9', userId: DEFAULT_USER.id, skillName: 'Algorithms', category: 'Core CS', level: 'Intermediate', updatedAt: new Date().toISOString() },
  { id: 'sk-10', userId: DEFAULT_USER.id, skillName: 'Database Management Systems (DBMS)', category: 'Core CS', level: 'Advanced', updatedAt: new Date().toISOString() },
];

const INITIAL_TEST_ATTEMPTS: TestAttempt[] = [
  { id: 'att-1', userId: DEFAULT_USER.id, category: 'Aptitude', topic: 'Percentages', totalQuestions: 10, correctAnswers: 8, scorePercentage: 80, timeSpentSeconds: 420, completedAt: getIsoHoursAgo(2) },
  { id: 'att-2', userId: DEFAULT_USER.id, category: 'Aptitude', topic: 'Time and Work', totalQuestions: 10, correctAnswers: 7, scorePercentage: 70, timeSpentSeconds: 510, completedAt: getIsoHoursAgo(5) },
  { id: 'att-3', userId: DEFAULT_USER.id, category: 'Reasoning', topic: 'Number Series', totalQuestions: 10, correctAnswers: 9, scorePercentage: 90, timeSpentSeconds: 320, completedAt: getIsoDaysAgo(1) },
  { id: 'att-4', userId: DEFAULT_USER.id, category: 'Reasoning', topic: 'Coding-Decoding', totalQuestions: 10, correctAnswers: 8, scorePercentage: 80, timeSpentSeconds: 380, completedAt: getIsoDaysAgo(2) },
  { id: 'att-5', userId: DEFAULT_USER.id, category: 'Technical', topic: 'Data Structures & Algorithms', totalQuestions: 15, correctAnswers: 12, scorePercentage: 80, timeSpentSeconds: 720, completedAt: getIsoDaysAgo(3) },
];

const INITIAL_APPLICATIONS: JobApplication[] = [
  { id: 'app-1', userId: DEFAULT_USER.id, jobId: 'job-1', status: 'Applied', appliedDate: new Date().toISOString().split('T')[0], bookmarked: true, notes: 'Completed registration on TCS NextStep portal. Hall ticket awaited.' },
  { id: 'app-2', userId: DEFAULT_USER.id, jobId: 'job-4', status: 'Online Assessment', appliedDate: new Date().toISOString().split('T')[0], bookmarked: true, notes: 'Round 1 online test scheduled for upcoming Saturday.' },
  { id: 'app-3', userId: DEFAULT_USER.id, jobId: 'job-3', status: 'Saved', appliedDate: new Date().toISOString().split('T')[0], bookmarked: true, notes: 'Targeting SDE 1 referral application.' },
];

const INITIAL_RESUME_AUDIT: ResumeAudit = {
  id: 'res-default-1',
  userId: DEFAULT_USER.id,
  fileName: 'Student_Resume_SoftwareDev.pdf',
  fileSize: '184 KB',
  uploadedAt: new Date().toISOString(),
  readinessScore: 82,
  atsScore: 78,
  missingSkills: ['System Design', 'Docker', 'Kubernetes'],
  missingSections: ['Honors & Leadership (Recommended for Tier-1 firms)'],
  suggestedImprovements: [
    'Quantify project outcomes: e.g. "Improved query performance by 35% with Redis caching".',
    'Include active GitHub commit links and live project URLs for all capstone entries.',
    'Add relevant coursework in Operating Systems, Distributed Systems and Cloud Computing.',
    'Ensure standard single-column ATS readable headers without tables or embedded icons.'
  ],
  checklist: [
    { category: 'Contact Information', passed: true, description: 'Email, Phone, LinkedIn, and GitHub links cleanly visible.' },
    { category: 'Education & CGPA', passed: true, description: 'College, Degree, Graduation Year (2026), and CGPA (8.75) present.' },
    { category: 'Technical Skills Section', passed: true, description: 'Grouped by Languages, Frameworks, Databases and Tools.' },
    { category: 'Projects with Measurable Metrics', passed: true, description: 'Full stack web applications documented with tech stack used.' },
    { category: 'Work Experience / Internships', passed: false, description: 'No prior internship recorded yet. Emphasize open-source contributions or research.' },
    { category: 'Certifications', passed: true, description: 'Cloud or competitive coding credentials noted.' },
    { category: 'ATS Standard Font & Layout', passed: true, description: 'Clean hierarchical headings, sans-serif font, no floating tables.' },
  ]
};

// Database Service Class
export class DataService {
  // Current User
  static getCurrentUser(): UserProfile | null {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (!data) {
      return null;
    }
    try {
      const parsed = JSON.parse(data);
      // Strictly prevent old cached Jesintha name from ever persisting
      if (parsed && parsed.fullName && /jesintha/i.test(parsed.fullName)) {
        localStorage.removeItem(STORAGE_KEY_USER);
        return null;
      }
      // Ensure user has an avatarUrl
      if (parsed && !parsed.avatarUrl) {
        parsed.avatarUrl = DEFAULT_AVATAR;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  // Joined Placement Students / Candidates
  static getJoinedStudents(): JoinedStudent[] {
    const data = localStorage.getItem(STORAGE_KEY_JOINED_STUDENTS);
    if (!data) {
      return DEFAULT_JOINED_STUDENTS;
    }
    try {
      const list: JoinedStudent[] = JSON.parse(data);
      // Filter out any stale item with jesintha
      return list.filter(s => s.fullName && !/jesintha/i.test(s.fullName));
    } catch {
      return DEFAULT_JOINED_STUDENTS;
    }
  }

  static addJoinedStudent(student: JoinedStudent): void {
    if (!student.fullName || /jesintha/i.test(student.fullName)) return;
    const existing = this.getJoinedStudents().filter(
      s => s.id !== student.id && s.fullName.toLowerCase() !== student.fullName.toLowerCase()
    );
    const updated = [student, ...existing];
    localStorage.setItem(STORAGE_KEY_JOINED_STUDENTS, JSON.stringify(updated));
  }

  static setCurrentUser(user: UserProfile | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY_USER);
    } else {
      if (!user.avatarUrl) {
        user.avatarUrl = DEFAULT_AVATAR;
      }
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  }

  static updateProfile(updates: Partial<UserProfile>): UserProfile | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated: UserProfile = { ...current, ...updates };
    this.setCurrentUser(updated);

    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.from('profiles').upsert({
        id: updated.id,
        email: updated.email,
        full_name: updated.fullName,
        college: updated.college,
        department: updated.department,
        year: updated.year,
        graduation_year: updated.graduationYear,
        target_job_role: updated.targetJobRole,
        cgpa: updated.cgpa,
        phone: updated.phone,
        github_url: updated.githubUrl,
        linkedin_url: updated.linkedinUrl,
        avatar_url: updated.avatarUrl
      }).then();
    }
    return updated;
  }

  static async signUp(formData: {
    fullName: string;
    email: string;
    college: string;
    department: string;
    year: string;
    graduationYear: number;
    targetJobRole: string;
    avatarUrl?: string;
    password?: string;
  }): Promise<{ user: UserProfile; error?: string }> {
    const supabase = getSupabaseClient();
    let supabaseUserId = 'usr-' + Math.random().toString(36).substring(2, 9);
    const chosenAvatar = formData.avatarUrl || DEFAULT_AVATAR;

    if (supabase && formData.password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              college: formData.college,
              department: formData.department,
              year: formData.year,
              graduation_year: formData.graduationYear,
              target_job_role: formData.targetJobRole,
              avatar_url: chosenAvatar
            }
          }
        });
        if (error) {
          console.warn('Supabase auth signup notice:', error.message);
        } else if (data.user) {
          supabaseUserId = data.user.id;
        }
      } catch (err) {
        console.error('Supabase signup error:', err);
      }
    }

    const newUser: UserProfile = {
      id: supabaseUserId,
      email: formData.email,
      fullName: formData.fullName,
      college: formData.college,
      department: formData.department,
      year: formData.year,
      graduationYear: formData.graduationYear,
      targetJobRole: formData.targetJobRole,
      avatarUrl: chosenAvatar,
      cgpa: 8.0,
      createdAt: new Date().toISOString()
    };

    this.setCurrentUser(newUser);

    // Add new user to joined students roster so their name is mentioned
    this.addJoinedStudent({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      college: newUser.college,
      department: newUser.department,
      targetJobRole: newUser.targetJobRole,
      avatarUrl: newUser.avatarUrl || DEFAULT_AVATAR,
      joinedAt: new Date().toISOString()
    });

    // Also sync to Supabase profiles table if available
    if (supabase) {
      try {
        await supabase.from('profiles').upsert({
          id: newUser.id,
          email: newUser.email,
          full_name: newUser.fullName,
          college: newUser.college,
          department: newUser.department,
          year: newUser.year,
          graduation_year: newUser.graduationYear,
          target_job_role: newUser.targetJobRole,
          avatar_url: newUser.avatarUrl,
          cgpa: newUser.cgpa
        });
      } catch (e) {
        console.warn('Profiles table sync:', e);
      }
    }

    return { user: newUser };
  }

  static async signIn(email: string, password?: string, avatarUrl?: string): Promise<{ user?: UserProfile; error?: string }> {
    const supabase = getSupabaseClient();
    if (supabase && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          return { error: error.message };
        }
        if (data.user) {
          // fetch profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const user: UserProfile = profile ? {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            college: profile.college,
            department: profile.department,
            year: profile.year,
            graduationYear: profile.graduation_year,
            targetJobRole: profile.target_job_role,
            cgpa: profile.cgpa,
            phone: profile.phone,
            githubUrl: profile.github_url,
            linkedinUrl: profile.linkedin_url,
            avatarUrl: profile.avatar_url || avatarUrl || DEFAULT_AVATAR
          } : {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || (email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
            college: data.user.user_metadata?.college || 'Engineering Institute',
            department: data.user.user_metadata?.department || 'Computer Science & Engineering',
            year: data.user.user_metadata?.year || '4th Year',
            graduationYear: data.user.user_metadata?.graduation_year || 2026,
            targetJobRole: data.user.user_metadata?.target_job_role || 'Software Developer',
            avatarUrl: data.user.user_metadata?.avatar_url || avatarUrl || DEFAULT_AVATAR
          };
          this.setCurrentUser(user);
          return { user };
        }
      } catch (err: any) {
        return { error: err.message || 'Authentication failed' };
      }
    }

    // Local authentication fallback
    const currentUser = this.getCurrentUser();
    const existingJoined = this.getJoinedStudents().find(s => s.email?.toLowerCase() === email.toLowerCase());

    if (currentUser && (currentUser.email.toLowerCase() === email.toLowerCase() || email.length > 3)) {
      if (currentUser.email.toLowerCase() !== email.toLowerCase()) {
        currentUser.email = email;
      }
      if (existingJoined && existingJoined.fullName) {
        currentUser.fullName = existingJoined.fullName;
      }
      if (avatarUrl) {
        currentUser.avatarUrl = avatarUrl;
      }
      this.setCurrentUser(currentUser);
      this.addJoinedStudent({
        id: currentUser.id,
        fullName: currentUser.fullName,
        email: currentUser.email,
        college: currentUser.college || 'Engineering Institute',
        department: currentUser.department || 'Computer Science',
        targetJobRole: currentUser.targetJobRole,
        avatarUrl: currentUser.avatarUrl || DEFAULT_AVATAR,
        joinedAt: new Date().toISOString()
      });
      return { user: currentUser };
    }

    // Create a new session if unknown email - derive clean friendly display name from email or existing record
    const derivedName = existingJoined?.fullName || (
      email.includes('@')
        ? email.split('@')[0].replace(/[._0-9]/g, ' ').trim().replace(/\b\w/g, l => l.toUpperCase()) || 'Student'
        : 'Student'
    );

    const newUser: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      fullName: derivedName,
      college: existingJoined?.college || 'Institute of Technology',
      department: existingJoined?.department || 'Computer Science and Engineering',
      year: '4th Year',
      graduationYear: 2026,
      targetJobRole: existingJoined?.targetJobRole || 'Software Developer',
      avatarUrl: avatarUrl || existingJoined?.avatarUrl || DEFAULT_AVATAR,
      cgpa: 8.4,
      createdAt: new Date().toISOString()
    };
    this.setCurrentUser(newUser);
    this.addJoinedStudent({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      college: newUser.college,
      department: newUser.department,
      targetJobRole: newUser.targetJobRole,
      avatarUrl: newUser.avatarUrl || DEFAULT_AVATAR,
      joinedAt: new Date().toISOString()
    });
    return { user: newUser };
  }

  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          return { success: false, message: error.message };
        }
        return { success: true, message: `Password reset instructions sent to ${email}` };
      } catch (err: any) {
        return { success: false, message: err.message || 'Failed to send reset link' };
      }
    }
    return { 
      success: true, 
      message: `Password reset link simulated for ${email}. (In connected Supabase mode, an email is dispatched instantly).` 
    };
  }

  static async logout(): Promise<void> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    this.setCurrentUser(null);
  }

  // Skills
  static getStudentSkills(): StudentSkill[] {
    const data = localStorage.getItem(STORAGE_KEY_SKILLS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(INITIAL_STUDENT_SKILLS));
      return INITIAL_STUDENT_SKILLS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_STUDENT_SKILLS;
    }
  }

  static updateSkill(skillName: string, level: 'Beginner' | 'Intermediate' | 'Advanced', category: 'Language' | 'Core CS' | 'Framework' | 'Tool' = 'Language'): StudentSkill[] {
    const user = this.getCurrentUser();
    const userId = user ? user.id : 'usr-1';
    const skills = this.getStudentSkills();
    const existingIndex = skills.findIndex(s => s.skillName.toLowerCase() === skillName.toLowerCase());

    if (existingIndex >= 0) {
      skills[existingIndex].level = level;
      skills[existingIndex].updatedAt = new Date().toISOString();
    } else {
      skills.push({
        id: 'sk-' + Math.random().toString(36).substring(2, 8),
        userId,
        skillName,
        category,
        level,
        updatedAt: new Date().toISOString()
      });
    }

    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skills));

    // Async sync to Supabase if connected
    const supabase = getSupabaseClient();
    if (supabase && user) {
      supabase.from('student_skills').upsert({
        user_id: user.id,
        skill_name: skillName,
        category,
        level,
        updated_at: new Date().toISOString()
      }).then();
    }

    return skills;
  }

  static deleteSkill(skillName: string): StudentSkill[] {
    const skills = this.getStudentSkills().filter(s => s.skillName.toLowerCase() !== skillName.toLowerCase());
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skills));
    return skills;
  }

  // Test Attempts
  static getTestAttempts(): TestAttempt[] {
    const data = localStorage.getItem(STORAGE_KEY_TESTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(INITIAL_TEST_ATTEMPTS));
      return INITIAL_TEST_ATTEMPTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_TEST_ATTEMPTS;
    }
  }

  static saveTestAttempt(attempt: Omit<TestAttempt, 'id' | 'userId' | 'completedAt'>): TestAttempt {
    const user = this.getCurrentUser();
    const userId = user ? user.id : 'usr-1';
    const newAttempt: TestAttempt = {
      ...attempt,
      id: 'att-' + Math.random().toString(36).substring(2, 8),
      userId,
      completedAt: new Date().toISOString()
    };

    const attempts = this.getTestAttempts();
    attempts.unshift(newAttempt);
    localStorage.setItem(STORAGE_KEY_TESTS, JSON.stringify(attempts));

    const supabase = getSupabaseClient();
    if (supabase && user) {
      supabase.from('test_attempts').insert({
        id: newAttempt.id,
        user_id: user.id,
        category: newAttempt.category,
        topic: newAttempt.topic,
        total_questions: newAttempt.totalQuestions,
        correct_answers: newAttempt.correctAnswers,
        score_percentage: newAttempt.scorePercentage,
        time_spent_seconds: newAttempt.timeSpentSeconds,
        completed_at: newAttempt.completedAt
      }).then();
    }

    return newAttempt;
  }

  // Job Applications & Bookmarks
  static getApplications(): JobApplication[] {
    const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  static toggleBookmark(jobId: string): boolean {
    const applications = this.getApplications();
    const user = this.getCurrentUser();
    const userId = user ? user.id : 'usr-1';
    const existing = applications.find(a => a.jobId === jobId);

    let isBookmarked = true;
    if (existing) {
      existing.bookmarked = !existing.bookmarked;
      isBookmarked = existing.bookmarked;
    } else {
      applications.push({
        id: 'app-' + Math.random().toString(36).substring(2, 8),
        userId,
        jobId,
        status: 'Saved',
        appliedDate: new Date().toISOString().split('T')[0],
        bookmarked: true
      });
      isBookmarked = true;
    }

    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    return isBookmarked;
  }

  static updateApplicationStatus(jobId: string, status: JobApplication['status'], notes?: string): JobApplication {
    const applications = this.getApplications();
    const user = this.getCurrentUser();
    const userId = user ? user.id : 'usr-1';
    let app = applications.find(a => a.jobId === jobId);

    if (app) {
      app.status = status;
      if (notes !== undefined) app.notes = notes;
    } else {
      app = {
        id: 'app-' + Math.random().toString(36).substring(2, 8),
        userId,
        jobId,
        status,
        appliedDate: new Date().toISOString().split('T')[0],
        bookmarked: false,
        notes
      };
      applications.push(app);
    }

    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    return app;
  }

  // Resume Audit
  static getResumeAudit(): ResumeAudit {
    const data = localStorage.getItem(STORAGE_KEY_RESUME);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(INITIAL_RESUME_AUDIT));
      return INITIAL_RESUME_AUDIT;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_RESUME_AUDIT;
    }
  }

  static saveResumeAudit(audit: ResumeAudit): void {
    localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(audit));
  }

  // Roadmap Stages
  static getRoadmapStages(): RoadmapStage[] {
    const data = localStorage.getItem(STORAGE_KEY_ROADMAP);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(SOFTWARE_DEVELOPER_ROADMAP));
      return SOFTWARE_DEVELOPER_ROADMAP;
    }
    try {
      return JSON.parse(data);
    } catch {
      return SOFTWARE_DEVELOPER_ROADMAP;
    }
  }

  static toggleRoadmapStage(stageId: number): RoadmapStage[] {
    const stages = this.getRoadmapStages();
    const stage = stages.find(s => s.id === stageId);
    if (stage) {
      stage.completed = !stage.completed;
      stage.completionPercentage = stage.completed ? 100 : 50;
      localStorage.setItem(STORAGE_KEY_ROADMAP, JSON.stringify(stages));
    }
    return stages;
  }

  // Placement Readiness Calculation
  static calculateReadiness(): PlacementReadiness {
    const skills = this.getStudentSkills();
    const testAttempts = this.getTestAttempts();
    const resume = this.getResumeAudit();
    const companies = COMPANIES_LIST;
    const jobs = SAMPLE_JOB_OPENINGS;

    // Technical score (based on number of skills and proficiency)
    let techPoints = 0;
    skills.forEach(s => {
      if (s.level === 'Advanced') techPoints += 15;
      else if (s.level === 'Intermediate') techPoints += 10;
      else techPoints += 5;
    });
    const technicalScore = Math.min(100, Math.round(techPoints * 0.9));

    // Aptitude score from attempts
    const aptAttempts = testAttempts.filter(t => t.category === 'Aptitude');
    const aptitudeScore = aptAttempts.length > 0
      ? Math.round(aptAttempts.reduce((acc, curr) => acc + curr.scorePercentage, 0) / aptAttempts.length)
      : 65;

    // Reasoning score from attempts
    const reaAttempts = testAttempts.filter(t => t.category === 'Reasoning');
    const reasoningScore = reaAttempts.length > 0
      ? Math.round(reaAttempts.reduce((acc, curr) => acc + curr.scorePercentage, 0) / reaAttempts.length)
      : 70;

    // Coding score from tech attempts & problem count
    const techAttempts = testAttempts.filter(t => t.category === 'Technical');
    const codingScore = techAttempts.length > 0
      ? Math.round(techAttempts.reduce((acc, curr) => acc + curr.scorePercentage, 0) / techAttempts.length)
      : 75;

    const resumeScore = resume.atsScore || 78;

    // Overall weighted formula
    // 25% Technical, 20% Coding, 20% Aptitude, 20% Reasoning, 15% Resume
    const overallScore = Math.round(
      (technicalScore * 0.25) +
      (codingScore * 0.20) +
      (aptitudeScore * 0.20) +
      (reasoningScore * 0.20) +
      (resumeScore * 0.15)
    );

    // Matching companies (companies where at least 60% skills matched)
    const studentSkillNames = new Set(skills.map(s => s.skillName.toLowerCase()));
    let matchingCompaniesCount = 0;
    const missingSkillMap: Record<string, string[]> = {};

    companies.forEach(company => {
      const required = company.requiredSkills;
      let matched = 0;
      required.forEach(req => {
        if (studentSkillNames.has(req.toLowerCase())) {
          matched++;
        } else {
          if (!missingSkillMap[req]) missingSkillMap[req] = [];
          missingSkillMap[req].push(company.name);
        }
      });
      const matchPct = (matched / required.length) * 100;
      if (matchPct >= 50) {
        matchingCompaniesCount++;
      }
    });

    const skillGaps = Object.entries(missingSkillMap)
      .map(([skill, missingInCompanies]) => ({
        skill,
        importance: (missingInCompanies.length >= 4 ? 'High' : 'Medium') as 'High' | 'Medium',
        missingInCompanies: missingInCompanies.slice(0, 3)
      }))
      .sort((a, b) => b.missingInCompanies.length - a.missingInCompanies.length)
      .slice(0, 6);

    return {
      overallScore,
      technicalScore,
      codingScore,
      aptitudeScore,
      reasoningScore,
      resumeScore,
      matchingCompaniesCount,
      availableJobsCount: jobs.length,
      skillGaps
    };
  }
}

export function formatRelativeTime(isoString?: string): string {
  if (!isoString) return 'Recent';
  try {
    const diff = Date.now() - new Date(isoString).getTime();
    if (diff < 0) return 'Just now';
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recent';
  }
}
