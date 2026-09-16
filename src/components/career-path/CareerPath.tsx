import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth';
import { Loader2, ArrowRight, CheckCircle2, Circle, FileText, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const supabase = createClient();

export function CareerPath({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('career_profiles').select('*').eq('user_id', user?.id).single();
      setProfile(data);
      setLoading(false);
    }
    if (user) load();
  }, [user]);

  if (loading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  if (!profile) return <div>No profile found.</div>;

  // Simple determinisic rule engine for recommended role
  let role = profile.primary_role || 'Software Engineer';
  let level = '';
  
  if (profile.experience_level === 'intern' || profile.experience_level === 'new_grad') level = 'Junior ';
  else if (profile.experience_level === '3_5_yrs' || profile.experience_level === '6_9_yrs') level = 'Senior ';
  else if (profile.experience_level === '10_plus_yrs') level = 'Staff ';

  if (profile.career_goal === 'senior_to_staff') {
    level = 'Staff ';
  }

  const recommendedRole = `${level}${role}`;
  
  // Search stage timeline highlight
  const stages = [
    { id: 'not_started', label: 'TODAY' },
    { id: 'applying', label: 'APPLY' },
    { id: 'interviewing', label: 'INTERVIEW' },
    { id: 'offer', label: 'OFFER' }
  ];
  
  const currentStageIndex = Math.max(0, stages.findIndex(s => s.id === profile.search_stage));

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <div className="text-blue-600 text-xs font-bold tracking-widest uppercase">YOUR PATH</div>
        <h1 className="text-5xl font-sans font-light text-gray-900 tracking-tight">● {recommendedRole}</h1>
        
        <div className="pt-12 pb-8 max-w-3xl mx-auto">
          <div className="relative flex justify-between items-center px-4">
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
            
            {stages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              
              return (
                <div key={stage.id} className="flex flex-col items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isCurrent ? 'ring-4 ring-blue-600/20 bg-blue-600' : isPast ? 'bg-gray-900' : 'bg-gray-200'}`} />
                  <span className={`text-xs font-bold tracking-widest uppercase ${isCurrent ? 'text-blue-600' : isPast ? 'text-gray-900' : 'text-gray-400'}`}>
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 inline-block shadow-sm">
          <div className="text-3xl font-light text-gray-900 mb-1">~4 to 7.5 months</div>
          <p className="text-sm text-gray-500 max-w-sm">
            Engineers like you who keep a steady, focused search typically land a role in about 4 to 7.5 months.
          </p>
          <div className="mt-4 pt-4 border-t text-xs text-gray-400">
            Estimated from job-search data. Results vary with market, effort, and targeting.
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 pt-12">
        <ActionCard 
          num="01"
          title="Sharpen your resume"
          desc="A recruiter-grade review, then tailoring, so it actually gets responses."
          icon={<FileText className="w-5 h-5" />}
          onClick={() => onNavigate?.('ats')}
        />
        <ActionCard 
          num="02"
          title="Apply to your matches"
          desc="Roles scored against your profile, so you spend time on the ones worth it."
          icon={<Target className="w-5 h-5" />}
          onClick={() => onNavigate?.('dashboard')}
        />
        <ActionCard 
          num="03"
          title="Prep for your interviews"
          desc="Coding, system design, and behavioral practice built around your targets."
          icon={<Users className="w-5 h-5" />}
          onClick={() => onNavigate?.('dashboard')}
        />
      </div>
    </div>
  );
}

function ActionCard({ num, title, desc, icon, onClick }: any) {
  return (
    <div className="bg-white border rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="text-blue-600 text-sm font-bold tracking-widest mb-6 font-mono">{num}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 text-sm flex-1">{desc}</p>
      
      <div className="mt-8 pt-6 border-t flex items-center justify-between cursor-pointer" onClick={onClick}>
        <span className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">Start with step {num}</span>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
