export interface AvatarOption {
  id: string;
  name: string;
  category: 'Student' | 'Coder' | 'Professional' | 'Stylized';
  url: string;
}

export const PRESET_AVATARS: AvatarOption[] = [
  // Coders & Engineers
  {
    id: 'coder-female-1',
    name: 'Software Engineer (Priya)',
    category: 'Coder',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'coder-male-1',
    name: 'Tech Lead (Arun)',
    category: 'Coder',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'coder-male-2',
    name: 'Fullstack Dev (Rohan)',
    category: 'Coder',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'coder-female-2',
    name: 'Data Scientist (Ananya)',
    category: 'Coder',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'coder-male-3',
    name: 'Cloud Engineer (David)',
    category: 'Coder',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256'
  },

  // Students & Campus
  {
    id: 'student-female-1',
    name: 'Campus Scholar (Kavya)',
    category: 'Student',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'student-male-1',
    name: 'Final Year CSE (Vikram)',
    category: 'Student',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'student-female-2',
    name: 'AI Aspirant (Sneha)',
    category: 'Student',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'student-male-2',
    name: 'Competitive Programmer (Rahul)',
    category: 'Student',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256'
  },

  // Professionals
  {
    id: 'pro-female-1',
    name: 'Product Analyst (Meera)',
    category: 'Professional',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'pro-male-1',
    name: 'System Architect (Karthik)',
    category: 'Professional',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 'pro-female-2',
    name: 'Consultant (Deepa)',
    category: 'Professional',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256'
  },

  // Stylized Vector / Creative Badges
  {
    id: 'stylized-indigo-coder',
    name: 'Code Master (Indigo)',
    category: 'Stylized',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeMaster&backgroundColor=6366f1'
  },
  {
    id: 'stylized-emerald-hacker',
    name: 'Algorithm Wizard',
    category: 'Stylized',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AlgoWizard&backgroundColor=10b981'
  },
  {
    id: 'stylized-amber-spark',
    name: 'Tech Pioneer',
    category: 'Stylized',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=TechPioneer&backgroundColor=f59e0b'
  },
  {
    id: 'stylized-violet-ai',
    name: 'AI Innovator',
    category: 'Stylized',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AIInnovator&backgroundColor=8b5cf6'
  }
];

export const DEFAULT_AVATAR = PRESET_AVATARS[0].url;
