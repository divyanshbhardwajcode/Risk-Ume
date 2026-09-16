-- CAREER PROFILES TABLE
CREATE TABLE IF NOT EXISTS career_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    career_goal TEXT,
    career_situation TEXT,
    experience_level TEXT,
    primary_role TEXT,
    tech_stack TEXT[],
    target_companies TEXT[],
    work_preference TEXT,
    current_location TEXT,
    open_to_relocation BOOLEAN,
    visa_status TEXT,
    search_stage TEXT,
    primary_blocker TEXT,
    weekly_time_commitment TEXT,
    resume_url TEXT,
    resume_filename TEXT,
    resume_uploaded_at TIMESTAMPTZ,
    github_username TEXT,
    github_url TEXT,
    onboarding_step INTEGER DEFAULT 1,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE career_profiles ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR CAREER PROFILES
CREATE POLICY "Users can view own career profile" 
ON career_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career profile" 
ON career_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own career profile" 
ON career_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- STORAGE BUCKET FOR RESUMES
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Users can view their own resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

CREATE POLICY "Users can upload their own resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

CREATE POLICY "Users can update their own resumes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'resumes' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

CREATE POLICY "Users can delete their own resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'resumes' AND auth.uid()::text = (string_to_array(name, '/'))[1]);
