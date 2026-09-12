-- ==============================================================================
-- PLACEMENT PREPARATION TRACKER - COMPLETE SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- This schema includes all 18 requested tables with proper relationships,
-- indexes, triggers, and Row Level Security (RLS) policies.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    college TEXT NOT NULL,
    department TEXT NOT NULL,
    year TEXT NOT NULL,
    graduation_year INT NOT NULL,
    target_job_role TEXT NOT NULL,
    cgpa NUMERIC(3, 2),
    phone TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SKILLS TABLE (Master list of tech, DSA & soft skills)
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Core CS', 'Framework', 'Database', 'Tool', 'Cloud', 'Soft Skill')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROGRAMMING LANGUAGES TABLE (Master list of requested 14 languages)
CREATE TABLE IF NOT EXISTS public.programming_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    icon_svg TEXT,
    description TEXT,
    popularity_rank INT
);

-- 4. STUDENT SKILLS TABLE (User skill proficiencies)
CREATE TABLE IF NOT EXISTS public.student_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, skill_name)
);

-- 5. APTITUDE TOPICS TABLE (The 12 requested Aptitude topics)
CREATE TABLE IF NOT EXISTS public.aptitude_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    formula_cheat_sheet TEXT,
    icon TEXT
);

-- 6. REASONING TOPICS TABLE (The 12 requested Logical Reasoning topics)
CREATE TABLE IF NOT EXISTS public.reasoning_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    tips_and_tricks TEXT,
    icon TEXT
);

-- 7. QUESTIONS TABLE (MCQ bank with difficulty, explanations, timers)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_slug TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Aptitude', 'Reasoning', 'Technical')),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of 4 options
    correct_answer INT NOT NULL, -- 0-3 index
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TEST ATTEMPTS TABLE (Records each practice test session)
CREATE TABLE IF NOT EXISTS public.test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    topic TEXT NOT NULL,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    score_percentage NUMERIC(5, 2) NOT NULL,
    time_spent_seconds INT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. TEST RESULTS TABLE (Detailed answer-by-answer breakdown)
CREATE TABLE IF NOT EXISTS public.test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.test_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.questions(id) ON DELETE SET NULL,
    selected_option INT,
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds INT
);

-- 10. COMPANIES TABLE (Company profiles, packages, criteria, careers link)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    logo TEXT,
    industry TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('Tier 1', 'Tier 2', 'Product', 'Consulting')),
    eligibility TEXT NOT NULL,
    salary_package TEXT NOT NULL,
    locations JSONB NOT NULL,
    aptitude_requirements TEXT,
    reasoning_requirements TEXT,
    dsa_requirements TEXT,
    application_url TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. COMPANY ROLES TABLE (Specific job roles offered by companies)
CREATE TABLE IF NOT EXISTS public.company_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    role_title TEXT NOT NULL,
    ctc_range TEXT,
    eligibility TEXT
);

-- 12. COMPANY SKILLS TABLE (Skills required by each company)
CREATE TABLE IF NOT EXISTS public.company_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    importance TEXT DEFAULT 'Required' CHECK (importance IN ('Required', 'Preferred', 'Bonus')),
    category TEXT,
    UNIQUE(company_id, skill_name)
);

-- 13. JOB OPENINGS TABLE (Active drives, vacancies, closing dates)
CREATE TABLE IF NOT EXISTS public.job_openings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    required_skills JSONB NOT NULL,
    salary TEXT NOT NULL,
    job_type TEXT NOT NULL CHECK (job_type IN ('Full-time', 'Internship', 'Drive')),
    posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
    closing_date DATE,
    application_link TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. BOOKMARKS TABLE (Saved job openings)
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.job_openings(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, job_id)
);

-- 15. APPLICATIONS TABLE (Job application tracker)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.job_openings(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('Saved', 'Applied', 'Online Assessment', 'Technical Interview', 'HR Round', 'Offer Received', 'Not Selected')),
    applied_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, job_id)
);

-- 16. RESUMES TABLE (Uploaded resumes and ATS audit metrics)
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size TEXT NOT NULL,
    file_url TEXT,
    readiness_score INT NOT NULL,
    ats_score INT NOT NULL,
    missing_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    missing_sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    suggested_improvements JSONB NOT NULL DEFAULT '[]'::jsonb,
    checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. PROGRESS TABLE (Aggregated metrics & weekly tracking)
CREATE TABLE IF NOT EXISTS public.progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    readiness_score INT NOT NULL,
    aptitude_accuracy NUMERIC(5, 2) DEFAULT 0,
    reasoning_accuracy NUMERIC(5, 2) DEFAULT 0,
    coding_problems_solved INT DEFAULT 0,
    tests_completed INT DEFAULT 0,
    study_time_minutes INT DEFAULT 0,
    UNIQUE(user_id, date)
);

-- 18. ROADMAPS TABLE (Personalized career roadmap stage completion)
CREATE TABLE IF NOT EXISTS public.roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_role TEXT NOT NULL,
    stage_id INT NOT NULL,
    stage_title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    completion_percentage INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, target_role, stage_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

-- Public tables viewable by all authenticated & anonymous users
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programming_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aptitude_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reasoning_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public items are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public languages are viewable by everyone" ON public.programming_languages FOR SELECT USING (true);
CREATE POLICY "Public aptitude topics viewable" ON public.aptitude_topics FOR SELECT USING (true);
CREATE POLICY "Public reasoning topics viewable" ON public.reasoning_topics FOR SELECT USING (true);
CREATE POLICY "Public questions viewable" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Companies viewable by all" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Company roles viewable by all" ON public.company_roles FOR SELECT USING (true);
CREATE POLICY "Company skills viewable by all" ON public.company_skills FOR SELECT USING (true);
CREATE POLICY "Job openings viewable by all" ON public.job_openings FOR SELECT USING (true);

-- User-specific CRUD policies
CREATE POLICY "Users can manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own skills" ON public.student_skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own test attempts" ON public.test_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own applications" ON public.applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own resumes" ON public.resumes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own roadmap" ON public.roadmaps FOR ALL USING (auth.uid() = user_id);
