import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, ArrowRight, Target, History } from 'lucide-react';
import { useAuth } from '@/lib/auth';

interface Assessment {
  id: string;
  resume_text: string;
  job_description: string;
  overall_score: number;
  ats_score: number;
  created_at: string;
}

export function HistoryTab() {
  const { token } = useAuth();
  const [history, setHistory] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    fetch('/api/ats/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error('Expected array but got:', data);
          setHistory([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div className="flex justify-center py-20">Loading history...</div>;
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
        <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">No History Yet</h3>
        <p className="text-gray-500">Run your first ATS optimization to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Optimization History</h2>
      <div className="grid grid-cols-1 gap-4">
        {history.map((item) => (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 line-clamp-1 max-w-md">
                      ATS Optimized Resume
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Final ATS Score</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-emerald-600">{item.overall_score || item.ats_score || 0}</span>
                    </div>
                  </div>
                  <Target className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
