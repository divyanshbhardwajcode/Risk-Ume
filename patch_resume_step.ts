import fs from 'fs';

let content = fs.readFileSync('src/components/onboarding/OnboardingFlow.tsx', 'utf-8');

const resumeStepNew = `function ResumeStep({ data, save, firstName }: any) {
  const [uploading, setUploading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be less than 5MB");
      return;
    }
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'txt'].includes(ext || '')) {
      setError("Only PDF, DOCX, and TXT files are accepted.");
      return;
    }

    setUploading(true);
    setError(null);
    setStatusText("Uploading resume...");
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");
      
      const fileExt = file.name.split('.').pop();
      const fileName = \`\${Math.random()}.\${fileExt}\`;
      const user = session.user;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(\`\${user.id}/\${fileName}\`, file);

      if (uploadError) throw uploadError;

      setStatusText("Reading your resume...");
      
      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${session.access_token}\`
        },
        body: JSON.stringify({
          path: uploadData.path,
          filename: file.name
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to parse resume.");
      }
      
      setStatusText("Building your profile...");
      const result = await response.json();
      
      await save({
        resume_url: uploadData.path,
        resume_filename: file.name,
        resume_uploaded_at: new Date().toISOString()
      });
      
    } catch (err: any) {
      setError(err.message || 'Failed to upload and parse resume.');
      setUploading(false);
    }
  };

  const handleUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };
  
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };
  
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto text-center">
      <div className="space-y-4 mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">YOUR RESUME</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">{firstName}, upload your resume so we can tailor everything to you.</h1>
        <p className="text-gray-600 font-sans">Stays private. We read it, we never share it.</p>
      </div>

      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={\`border-2 border-dashed transition-colors rounded-2xl p-12 flex flex-col items-center justify-center relative cursor-pointer group bg-white \${uploading ? 'border-gray-200' : 'border-gray-300 hover:border-blue-600/50'}\`}
      >
        <input type="file" onChange={handleUpload} disabled={uploading} accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
        
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <span className="text-gray-900 font-sans">{statusText}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-gray-900 font-sans text-lg">Drop your resume here, or click to choose</span>
            <span className="text-gray-500 text-sm mt-2 font-sans">PDF, DOCX, TXT up to 5MB</span>
          </div>
        )}
      </div>
      
      {error && <div className="text-red-500 text-sm font-sans font-medium">{error}</div>}

      <div className="pt-8">
        <Button variant="ghost" onClick={() => save({})} disabled={uploading} className="text-gray-500 hover:text-blue-600 rounded-full text-sm font-sans">
          I do not have one yet
        </Button>
      </div>
    </div>
  );
}`;

content = content.replace(/function ResumeStep\(\{ data, save, firstName \}: any\) \{[\s\S]*?(?=export default)/, resumeStepNew + '\n\n');
fs.writeFileSync('src/components/onboarding/OnboardingFlow.tsx', content);
