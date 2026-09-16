import { useState } from 'react';
import { LinkedInRewrite } from '@/types/linkedin';
import { Check, X, ArrowRightLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export function LinkedInRewrites({ rewrites }: { rewrites: LinkedInRewrite[] }) {
  const [decisions, setDecisions] = useState<Record<number, 'accept' | 'reject' | null>>({});
  const { token } = useAuth();

  const handleDecision = (index: number, decision: 'accept' | 'reject') => {
    setDecisions(prev => ({ ...prev, [index]: decision }));
  };

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">AI Rewrite Suggestions</h4>
      
      {rewrites.map((rewrite, i) => (
        <div key={i} className={`rounded-xl border overflow-hidden transition-all ${
          decisions[i] === 'accept' ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' :
          decisions[i] === 'reject' ? 'border-red-500/30 opacity-60' :
          'border-[#1E3A5F]'
        }`}>
          <div className="bg-[#07111F] px-4 py-2 border-b border-[#1E3A5F] flex justify-between items-center">
            <span className="text-xs font-bold text-[#60A5FA] uppercase">{rewrite.section}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDecision(i, 'accept')}
                className={`p-1 rounded flex items-center gap-1 text-xs font-medium transition-colors ${
                  decisions[i] === 'accept' ? 'bg-emerald-500/20 text-emerald-400' : 'text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F]'
                }`}
              >
                <Check className="w-3 h-3" /> Accept
              </button>
              <button 
                onClick={() => handleDecision(i, 'reject')}
                className={`p-1 rounded flex items-center gap-1 text-xs font-medium transition-colors ${
                  decisions[i] === 'reject' ? 'bg-red-500/20 text-red-400' : 'text-[#94A3B8] hover:text-white hover:bg-[#1E3A5F]'
                }`}
              >
                <X className="w-3 h-3" /> Reject
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E3A5F]">
            <div className="p-4 bg-[rgba(255,255,255,0.01)] relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider bg-[#07111F] px-2 py-0.5 rounded border border-[#1E3A5F]">Current</span>
              <p className="text-sm text-[#94A3B8] whitespace-pre-wrap mt-4">{rewrite.current}</p>
            </div>
            
            <div className="p-4 bg-[rgba(37,99,235,0.03)] relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Recommended</span>
              <p className="text-sm text-white whitespace-pre-wrap mt-4 font-medium">{rewrite.recommended}</p>
              
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1E3A5F] hidden lg:flex items-center justify-center border border-[#07111F] z-10 text-[#60A5FA]">
                <ArrowRightLeft className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {Object.values(decisions).includes('accept') && (
        <div className="flex justify-end mt-4">
          <button 
            onClick={async () => {
              const approvedData: any = {};
              rewrites.forEach((rewrite, i) => {
                if (decisions[i] === 'accept') {
                  const sec = rewrite.section.toLowerCase();
                  if (sec.includes('headline')) approvedData['personal'] = { headline: rewrite.recommended };
                  if (sec.includes('about') || sec.includes('summary')) approvedData['summary'] = rewrite.recommended;
                  // For simplicity, just updating summary/headline here. More complex merges require deeper merging logic.
                }
              });
              
              try {
                const res = await fetch('/api/linkedin/sync', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ approvedData })
                });
                if (res.ok) alert('Successfully synced changes to Career Profile!');
              } catch (e) {
                console.error(e);
              }
            }}
            className="px-6 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Sync Approved Changes
          </button>
        </div>
      )}
    </div>
  );
}
