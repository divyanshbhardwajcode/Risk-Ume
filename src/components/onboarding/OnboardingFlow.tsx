import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth';
import { Loader2, ArrowLeft, ArrowRight, Upload, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LocationAutocomplete, LocationResult } from '@/components/ui/LocationAutocomplete';

const supabase = createClient();

type OnboardingStep = 
  | 'career_goal'
  | 'career_situation'
  | 'experience_level'
  | 'primary_role'
  | 'tech_stack'
  | 'insight'
  | 'target_companies'
  | 'location'
  | 'visa_status'
  | 'search_stage'
  | 'primary_blocker'
  | 'weekly_time_commitment'
  | 'resume'
  | 'github';

const STEPS: OnboardingStep[] = [
  'career_goal',
  'career_situation',
  'experience_level',
  'primary_role',
  'tech_stack',
  'insight',
  'target_companies',
  'location',
  'visa_status',
  'search_stage',
  'primary_blocker',
  'weekly_time_commitment',
  'resume',
  'github'
];

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const { user } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('career_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (profile) {
        setData(profile);
        if (profile.onboarding_completed) {
          onComplete();
          return;
        }
        if (profile.onboarding_step) {
          setCurrentStepIndex(Math.min(profile.onboarding_step - 1, STEPS.length - 1));
        }
      } else {
        await supabase.from('career_profiles').insert({ user_id: user?.id, onboarding_step: 1 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveStepData = async (updates: any, nextStepDelta: number = 1) => {
    setSaving(true);
    const newIndex = currentStepIndex + nextStepDelta;
    const isCompleted = newIndex >= STEPS.length;
    
    const finalUpdates = {
      ...updates,
      onboarding_step: newIndex + 1,
      ...(isCompleted && { 
        onboarding_completed: true, 
        onboarding_completed_at: new Date().toISOString() 
      })
    };

    setData((prev: any) => ({ ...prev, ...updates }));

    try {
      await supabase.from('career_profiles').update(finalUpdates).eq('user_id', user?.id);
      if (isCompleted) {
        onComplete();
      } else {
        setCurrentStepIndex(newIndex);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      supabase.from('career_profiles').update({ onboarding_step: currentStepIndex }).eq('user_id', user?.id);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const currentStep = STEPS[currentStepIndex];
  const progress = ((currentStepIndex) / STEPS.length) * 100;
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-mono selection:bg-blue-600/30">
      <div className="h-1 bg-gray-100 w-full fixed top-0 left-0 z-50">
        <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-6 pt-20 pb-12">
        <div className="mb-12 h-8">
          {currentStepIndex > 0 && currentStep !== 'insight' && (
            <button 
              onClick={goBack}
              className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-sans"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepRenderer step={currentStep} data={data} save={saveStepData} firstName={firstName} saving={saving} />
        </div>
      </div>
    </div>
  );
}

function StepRenderer({ step, data, save, firstName, saving }: any) {
  switch (step) {
    case 'career_goal':
      return <OptionsStep 
        label="YOUR GOAL"
        question={`${firstName}, what are you here to do?`}
        options={[
          { value: 'first_job', label: 'Land my first job' },
          { value: 'company_switch', label: 'Switch to a better company' },
          { value: 'senior_to_staff', label: 'Level up, senior to staff' },
          { value: 'big_tech', label: 'Break into big tech' },
          { value: 'exploring', label: 'Just exploring for now' }
        ]}
        value={data.career_goal}
        onSelect={(val) => save({ career_goal: val })}
      />;
    case 'career_situation':
      return <OptionsStep 
        label="YOUR SITUATION"
        question={`Where are you right now, ${firstName}?`}
        options={[
          { value: 'actively_interviewing', label: 'Employed, actively interviewing' },
          { value: 'casually_looking', label: 'Employed, casually looking' },
          { value: 'searching_full_time', label: 'Searching full-time' },
          { value: 'student', label: 'Student or new grad' },
          { value: 'bootcamp', label: 'Bootcamp or self-taught' },
          { value: 'switching', label: 'Switching into tech' }
        ]}
        value={data.career_situation}
        onSelect={(val) => save({ career_situation: val })}
      />;
    case 'experience_level':
      return <OptionsStep 
        label="EXPERIENCE"
        question="How much experience do you have?"
        options={[
          { value: 'intern', label: 'Intern' },
          { value: 'new_grad', label: 'New grad' },
          { value: '1_2_yrs', label: '1 to 2 yrs' },
          { value: '3_5_yrs', label: '3 to 5 yrs' },
          { value: '6_9_yrs', label: '6 to 9 yrs' },
          { value: '10_plus_yrs', label: '10+ yrs' }
        ]}
        value={data.experience_level}
        onSelect={(val) => save({ experience_level: val })}
      />;
    case 'primary_role':
      return <OptionsStep 
        label="YOUR CRAFT"
        question="What do you build?"
        options={[
          { value: 'Frontend', label: 'Frontend' },
          { value: 'Backend', label: 'Backend' },
          { value: 'Full-stack', label: 'Full-stack' },
          { value: 'Mobile', label: 'Mobile' },
          { value: 'ML / AI', label: 'ML / AI' },
          { value: 'Data', label: 'Data' },
          { value: 'DevOps', label: 'DevOps / Platform' },
          { value: 'Security', label: 'Security' },
          { value: 'Embedded', label: 'Embedded' },
          { value: 'QA', label: 'QA / SDET' },
          { value: 'Engineering Manager', label: 'Engineering Manager' }
        ]}
        value={data.primary_role}
        onSelect={(val) => save({ primary_role: val })}
      />;
    case 'tech_stack':
      return <MultiSelectStep
        label="YOUR STACK"
        question="Pick your main tools."
        description="Choose a few, you can refine later."
        options={['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#', 'Ruby', 'Swift', 'Kotlin', 'SQL', 'React', 'Node.js', 'Next.js', 'Vue', 'Django', 'Spring', 'Kubernetes', 'AWS', 'PostgreSQL', 'GraphQL']}
        values={data.tech_stack || []}
        onSave={(vals) => save({ tech_stack: vals })}
        saving={saving}
      />;
    case 'insight':
      return (
        <div className="space-y-8 w-full max-w-2xl mx-auto text-center font-sans py-12">
          <div className="text-blue-600 text-sm font-bold tracking-widest uppercase mb-12">DID YOU KNOW</div>
          <h1 className="text-7xl sm:text-8xl font-light text-gray-900 tracking-tighter mb-8">7 seconds</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            is about how long a recruiter spends on a resume. <br/><br/>
            We will make those seconds count.
          </p>
          <div className="pt-12">
            <Button onClick={() => save({})} className="bg-blue-600 text-white hover:bg-blue-700 h-12 px-8 text-lg rounded-full">
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      );
    case 'target_companies':
      return <TagInputStep
        label="TARGET COMPANIES"
        question="Any companies you are aiming for?"
        description="Optional, but it sharpens your matches and interview prep."
        suggestions={['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix', 'Nvidia', 'OpenAI', 'Stripe', 'Airbnb', 'Databricks', 'Anthropic']}
        values={data.target_companies || []}
        onSave={(vals) => save({ target_companies: vals })}
        saving={saving}
      />;
    case 'location':
      return <LocationStep data={data} save={save} saving={saving} />;
    case 'visa_status':
      return <OptionsStep 
        label="WORK AUTHORIZATION"
        question="Will you need visa sponsorship?"
        options={[
          { value: 'no_sponsorship', label: 'No, citizen or permanent resident' },
          { value: 'needs_now', label: 'Yes, I need sponsorship now' },
          { value: 'needs_later', label: 'I will need it later' }
        ]}
        value={data.visa_status}
        onSelect={(val) => save({ visa_status: val })}
      />;
    case 'search_stage':
      return <OptionsStep 
        label="YOUR SEARCH"
        question="Where are you in the search?"
        options={[
          { value: 'not_started', label: 'Not started applying yet' },
          { value: 'applying', label: 'Applying, not hearing back' },
          { value: 'interviewing', label: 'Interviewing, no offers yet' },
          { value: 'offer', label: 'I have an offer' }
        ]}
        value={data.search_stage}
        onSelect={(val) => save({ search_stage: val })}
      />;
    case 'primary_blocker':
      return <OptionsStep 
        label="THE BLOCKER"
        question={`${firstName}, what is slowing you down most?`}
        options={[
          { value: 'resume', label: 'My resume is not getting responses' },
          { value: 'roles', label: 'I cannot find good roles' },
          { value: 'interviews', label: 'I freeze or underperform in interviews' },
          { value: 'underqualified', label: 'I feel underqualified' },
          { value: 'time', label: 'I do not have time to apply' }
        ]}
        value={data.primary_blocker}
        onSelect={(val) => save({ primary_blocker: val })}
      />;
    case 'weekly_time_commitment':
      return <OptionsStep 
        label="YOUR TIME"
        question={`${firstName}, how much time can you give this each week?`}
        options={[
          { value: 'few_hours', label: 'A few hours' },
          { value: '5_15_hours', label: '5 to 15 hours' },
          { value: '15_plus_hours', label: '15+ hours' }
        ]}
        value={data.weekly_time_commitment}
        onSelect={(val) => save({ weekly_time_commitment: val })}
      />;
    case 'resume':
      return <ResumeStep data={data} save={save} firstName={firstName} />;
    case 'github':
      return <GithubStep data={data} save={save} saving={saving} />;
    default:
      return <div>Unknown step</div>;
  }
}

function OptionsStep({ label, question, description, options, value, onSelect }: any) {
  return (
    <div className="space-y-8 w-full max-w-xl mx-auto">
      <div className="space-y-4 text-center mb-12">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">{label}</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">{question}</h1>
        {description && <p className="text-gray-600 text-lg font-sans">{description}</p>}
      </div>
      <div className="grid gap-3">
        {options.map((opt: any) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`
              w-full text-left px-6 py-4 rounded-xl border transition-all duration-200 font-sans text-base
              ${value === opt.value 
                ? 'bg-blue-50 border-blue-600/50 text-blue-900 shadow-sm' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-gray-200 hover:text-blue-700'}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiSelectStep({ label, question, description, options, values, onSave, saving }: any) {
  const [selected, setSelected] = useState<string[]>(values || []);

  const toggle = (opt: string) => {
    setSelected(prev => prev.includes(opt) ? prev.filter(p => p !== opt) : [...prev, opt]);
  };

  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto flex flex-col h-full">
      <div className="space-y-4 text-center mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">{label}</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">{question}</h1>
        {description && <p className="text-gray-600 font-sans">{description}</p>}
      </div>
      
      <div className="flex-1 flex flex-wrap content-start justify-center gap-3">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`
              px-4 py-2 rounded-full border text-sm font-sans transition-all duration-200
              ${selected.includes(opt) 
                ? 'bg-blue-600/10 border-blue-600/50 text-blue-900' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-blue-700'}
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="pt-8 flex flex-col items-center gap-4">
        <div className="text-xs text-gray-500">{selected.length} selected</div>
        <Button 
          onClick={() => onSave(selected)} 
          disabled={saving || selected.length === 0}
          className="bg-blue-600 text-white hover:bg-blue-700 rounded-full h-12 px-8 w-full max-w-xs"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

function TagInputStep({ label, question, description, suggestions, values, onSave, saving }: any) {
  const [selected, setSelected] = useState<string[]>(values || []);
  const [input, setInput] = useState('');

  const toggle = (opt: string) => {
    setSelected(prev => prev.includes(opt) ? prev.filter(p => p !== opt) : [...prev, opt]);
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (input.trim() && !selected.includes(input.trim())) {
      setSelected([...selected, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto flex flex-col">
      <div className="space-y-4 text-center mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">{label}</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">{question}</h1>
        {description && <p className="text-gray-600 font-sans">{description}</p>}
      </div>

      <form onSubmit={handleAdd} className="relative max-w-md mx-auto w-full mb-8">
        <Input 
          className="bg-white border-gray-200 h-14 rounded-xl text-lg px-4 font-sans text-gray-900 placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-blue-600"
          placeholder="+ Add a company, press Enter"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </form>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
        {selected.map(s => (
          <Badge key={s} label={s} onRemove={() => toggle(s)} selected={true} />
        ))}
        {suggestions.filter((s: string) => !selected.includes(s)).map((opt: string) => (
          <Badge key={opt} label={opt} onClick={() => toggle(opt)} selected={false} />
        ))}
      </div>

      <div className="pt-12 flex justify-center gap-4">
        <Button variant="ghost" onClick={() => onSave(selected)} className="text-gray-600 hover:text-blue-600 rounded-full">Skip</Button>
        <Button onClick={() => onSave(selected)} disabled={saving} className="bg-blue-600 text-white hover:bg-blue-700 rounded-full h-12 px-8 w-48">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

function Badge({ label, onClick, onRemove, selected }: any) {
  return (
    <div 
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full border text-sm font-sans flex items-center gap-2 transition-colors
        ${selected ? 'bg-gray-100 border-blue-200 text-gray-900' : 'bg-white border-gray-200 text-gray-600 cursor-pointer hover:border-gray-300'}
      `}
    >
      {label}
      {selected && onRemove && <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="hover:text-blue-500"><X className="w-3 h-3" /></button>}
    </div>
  );
}

function LocationStep({ data, save, saving }: any) {
  const [pref, setPref] = useState(data.work_preference || '');
  const [loc, setLoc] = useState<LocationResult | null>(data.current_location_obj || (data.current_location ? { id: 'legacy', city: data.current_location, country: '', formattedAddress: data.current_location } : null));
  const [open, setOpen] = useState(data.open_to_relocation || false);

  const canContinue = pref && loc;

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto">
      <div className="space-y-4 text-center mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">LOCATION</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">Where do you want to work?</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-12">
        {['Remote', 'Hybrid', 'Onsite'].map(p => (
          <button
            key={p} onClick={() => setPref(p)}
            className={`py-3 rounded-xl border text-sm font-sans transition-all ${pref === p ? 'bg-blue-50 border-blue-600/50 text-gray-900' : 'bg-white border-gray-200 text-gray-600 hover:bg-blue-50'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-xs uppercase tracking-widest text-gray-500 mb-3 block">WHERE ARE YOU BASED?</Label>
          <LocationAutocomplete value={loc} onSelect={setLoc} placeholder="Start typing a city or country" />
        </div>

        <label className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-blue-600 font-sans text-sm">
          <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} className="rounded bg-white border-gray-200 text-blue-600 focus:ring-blue-600/20 w-5 h-5" />
          Open to relocating
        </label>
      </div>

      <div className="pt-8 flex justify-center">
        <Button 
          disabled={!canContinue || saving} 
          onClick={() => save({ work_preference: pref, current_location: loc?.formattedAddress || '', current_location_obj: loc, open_to_relocation: open })}
          className="bg-blue-600 text-white hover:bg-blue-700 rounded-full h-12 px-8 w-full"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

function GithubStep({ data, save, saving }: any) {
  const [handle, setHandle] = useState(data.github_username || '');

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto text-center">
      <div className="space-y-4 mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">GITHUB</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">Want to add your GitHub?</h1>
        <p className="text-gray-600 font-sans">Optional. Great for showing real work, especially early-career.</p>
      </div>

      <div className="relative max-w-sm mx-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-sans">github.com/</span>
        <Input 
          value={handle} onChange={e => setHandle(e.target.value)}
          className="bg-white border-gray-200 h-14 rounded-xl text-lg pl-28 font-sans text-gray-900 focus-visible:ring-blue-600"
          placeholder="your-handle"
        />
      </div>

      <div className="pt-8 flex justify-center gap-4">
        <Button variant="ghost" onClick={() => save({})} className="text-gray-600 hover:text-blue-600 rounded-full">Skip</Button>
        <Button 
          disabled={saving} 
          onClick={() => save({ github_username: handle, github_url: handle ? `https://github.com/${handle}` : null })}
          className="bg-blue-600 text-white hover:bg-blue-700 rounded-full h-12 px-8 w-48"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Finish Setup'}
        </Button>
      </div>
    </div>
  );
}

function ResumeStep({ data, save, firstName }: any) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: { user } } = await supabase.auth.getUser();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${user?.id}/${fileName}`, file);

      if (uploadError) throw uploadError;

      await save({
        resume_url: uploadData.path,
        resume_filename: file.name,
        resume_uploaded_at: new Date().toISOString()
      });
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume.');
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto text-center">
      <div className="space-y-4 mb-8">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">YOUR RESUME</div>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-gray-900 tracking-tight">{firstName}, upload your resume so we can tailor everything to you.</h1>
        <p className="text-gray-600 font-sans">Stays private. We read it, we never share it.</p>
      </div>

      <div className="border-2 border-dashed border-gray-200 hover:border-blue-600/50 transition-colors rounded-2xl p-12 bg-white flex flex-col items-center justify-center relative cursor-pointer group">
        <input type="file" onChange={handleUpload} disabled={uploading} accept=".pdf,.docx,.txt" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
        
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <span className="text-gray-900 font-sans">Uploading and analyzing...</span>
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
      
      {error && <div className="text-red-400 text-sm font-sans">{error}</div>}

      <div className="pt-8">
        <Button variant="ghost" onClick={() => save({})} disabled={uploading} className="text-gray-500 hover:text-blue-600 rounded-full text-sm font-sans">
          I do not have one yet
        </Button>
      </div>
    </div>
  );
}
