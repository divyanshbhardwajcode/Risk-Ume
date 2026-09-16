-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RESUMES TABLE
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  resume_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RESUME ANALYSES TABLE
CREATE TABLE resume_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  overall_score INTEGER,
  ats_score INTEGER,
  keyword_score INTEGER,
  formatting_score INTEGER,
  experience_score INTEGER,
  risks JSONB,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PROFILES
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- POLICIES FOR RESUMES
CREATE POLICY "Users can view own resumes" 
ON resumes FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" 
ON resumes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" 
ON resumes FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" 
ON resumes FOR DELETE 
USING (auth.uid() = user_id);

-- POLICIES FOR RESUME ANALYSES
CREATE POLICY "Users can view own analyses" 
ON resume_analyses FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" 
ON resume_analyses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" 
ON resume_analyses FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" 
ON resume_analyses FOR DELETE 
USING (auth.uid() = user_id);

-- FUNCTION TO HANDLE NEW USER CREATION (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGER FOR NEW USERS
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
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

ALTER TABLE career_profiles ADD COLUMN current_location_obj JSONB;
ALTER TABLE career_profiles ADD COLUMN IF NOT EXISTS extracted_profile JSONB;
