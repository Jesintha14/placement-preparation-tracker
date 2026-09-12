export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  college: string;
  department: string;
  year: string; // '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
  graduationYear: number;
  targetJobRole: string;
  cgpa?: number;
  phone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface StudentSkill {
  id: string;
  userId: string;
  skillName: string;
  category: 'Language' | 'Core CS' | 'Framework' | 'Tool';
  level: SkillLevel;
  updatedAt: string;
}

export interface Question {
  id: string;
  topic: string;
  category: 'Aptitude' | 'Reasoning' | 'Technical';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface TestAttempt {
  id: string;
  userId: string;
  category: 'Aptitude' | 'Reasoning' | 'Technical' | 'Company Mock';
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  completedAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  tier: 'Tier 1' | 'Tier 2' | 'Product' | 'Consulting';
  roles: string[];
  requiredSkills: string[];
  programmingLanguages: string[];
  aptitudeRequirements: string;
  logicalReasoningRequirements: string;
  dsaRequirements: string;
  eligibility: string;
  salaryPackage: string; // e.g. "7 - 12 LPA"
  locations: string[];
  openingsCount: number;
  applicationUrl: string;
  isVerified: boolean;
  notes?: string;
}

export interface JobOpening {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  role: string;
  location: string;
  eligibility: string;
  requiredSkills: string[];
  salary: string;
  jobType: 'Full-time' | 'Internship' | 'Drive';
  postedDate: string;
  closingDate: string;
  applicationLink: string;
  isVerified: boolean;
}

export type ApplicationStatus = 'Saved' | 'Applied' | 'Online Assessment' | 'Technical Interview' | 'HR Round' | 'Offer Received' | 'Not Selected';

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  appliedDate: string;
  notes?: string;
  bookmarked: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    python: string;
    java: string;
    cpp: string;
    javascript: string;
  };
  hints: string[];
  solved?: boolean;
}

export interface ResumeAudit {
  id: string;
  userId: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  readinessScore: number;
  atsScore: number;
  missingSkills: string[];
  missingSections: string[];
  suggestedImprovements: string[];
  checklist: {
    category: string;
    passed: boolean;
    description: string;
  }[];
}

export interface RoadmapStage {
  id: number;
  title: string;
  description: string;
  topics: string[];
  resources: { name: string; url: string; type: 'doc' | 'video' | 'practice' }[];
  completed: boolean;
  completionPercentage: number;
}

export interface PlacementReadiness {
  overallScore: number;
  technicalScore: number;
  codingScore: number;
  aptitudeScore: number;
  reasoningScore: number;
  resumeScore: number;
  matchingCompaniesCount: number;
  availableJobsCount: number;
  skillGaps: { skill: string; importance: 'High' | 'Medium'; missingInCompanies: string[] }[];
}
