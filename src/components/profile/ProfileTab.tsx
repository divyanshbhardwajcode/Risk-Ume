import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/lib/auth';
import { Loader2, Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const supabase = createClient();

export function ProfileTab() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const { data } = await supabase.from('career_profiles').select('extracted_profile').eq('user_id', user.id).single();
      setProfileData(data?.extracted_profile);
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) {
    return <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  if (!profileData) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Profile Found</h2>
        <p className="text-gray-500">Upload your resume in onboarding to generate your profile.</p>
      </div>
    );
  }

  const { personal, summary, skills, experience, education, projects } = profileData;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header / Personal Info */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold uppercase shrink-0">
          {personal?.fullName?.[0] || '?'}
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{personal?.fullName || 'Anonymous'}</h1>
            {personal?.headline && <p className="text-lg text-gray-500 mt-1">{personal.headline}</p>}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personal?.location && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {personal.location}</div>}
            {personal?.email && <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {personal.email}</div>}
            {personal?.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {personal.phone}</div>}
            {personal?.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="w-4 h-4" /> {personal.linkedin}</div>}
            {personal?.portfolio && <div className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> {personal.portfolio}</div>}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          {/* Summary */}
          {summary && (
            <section className="bg-white p-8 rounded-3xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section className="bg-white p-8 rounded-3xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp: any, i: number) => (
                  <div key={i} className="relative pl-6 border-l-2 border-gray-100">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                    <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                    <div className="text-blue-600 font-medium mb-1">{exp.company} {exp.location && <span className="text-gray-400 font-normal ml-2">• {exp.location}</span>}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && <p className="text-gray-600 mb-3">{exp.description}</p>}
                    {exp.achievements?.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600">
                        {exp.achievements.map((ach: string, j: number) => (
                          <li key={j}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section className="bg-white p-8 rounded-3xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <div className="text-gray-600">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                    <div className="text-xs text-gray-400 mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
        
        <div className="space-y-8">
          
          {/* Skills */}
          {skills?.length > 0 && (
            <section className="bg-white p-6 rounded-3xl border shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, i: number) => (
                  <Badge key={i} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700">{skill}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section className="bg-white p-6 rounded-3xl border shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj: any, i: number) => (
                  <div key={i} className="border-b last:border-0 pb-4 last:pb-0 border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.name}</h3>
                    {proj.description && <p className="text-gray-500 text-sm mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

    </div>
  );
}
