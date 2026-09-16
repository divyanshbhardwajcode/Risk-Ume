-- LINKEDIN IMPORTS TABLE
CREATE TABLE IF NOT EXISTS linkedin_imports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    status TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    file_name TEXT,
    file_size INTEGER,
    file_url TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LINKEDIN PROFILES TABLE
CREATE TABLE IF NOT EXISTS linkedin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    import_id UUID REFERENCES linkedin_imports(id) ON DELETE SET NULL,
    name TEXT,
    headline TEXT,
    location TEXT,
    about TEXT,
    current_company TEXT,
    current_title TEXT,
    experiences JSONB DEFAULT '[]'::jsonb,
    education JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    certifications JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    volunteer_experience JSONB DEFAULT '[]'::jsonb,
    links JSONB DEFAULT '[]'::jsonb,
    raw_text TEXT,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LINKEDIN AUDITS TABLE
CREATE TABLE IF NOT EXISTS linkedin_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES linkedin_profiles(id) ON DELETE CASCADE,
    overall_score INTEGER,
    categories JSONB,
    issues JSONB,
    recommendations JSONB,
    rewrites JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE linkedin_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE linkedin_audits ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Users can view own linkedin imports" ON linkedin_imports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own linkedin imports" ON linkedin_imports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own linkedin imports" ON linkedin_imports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own linkedin imports" ON linkedin_imports FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own linkedin profiles" ON linkedin_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own linkedin profiles" ON linkedin_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own linkedin profiles" ON linkedin_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own linkedin profiles" ON linkedin_profiles FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own linkedin audits" ON linkedin_audits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own linkedin audits" ON linkedin_audits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own linkedin audits" ON linkedin_audits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own linkedin audits" ON linkedin_audits FOR DELETE USING (auth.uid() = user_id);

-- STORAGE BUCKET FOR LINKEDIN
INSERT INTO storage.buckets (id, name, public) 
VALUES ('linkedin-imports', 'linkedin-imports', false)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Users can view their own linkedin imports storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'linkedin-imports' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

CREATE POLICY "Users can upload their own linkedin imports storage"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'linkedin-imports' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

CREATE POLICY "Users can update their own linkedin imports storage"
ON storage.objects FOR UPDATE
USING (bucket_id = 'linkedin-imports' AND auth.uid()::text = (string_to_array(name, '/'))[1]);

CREATE POLICY "Users can delete their own linkedin imports storage"
ON storage.objects FOR DELETE
USING (bucket_id = 'linkedin-imports' AND auth.uid()::text = (string_to_array(name, '/'))[1]);
