'use client';
import { useState } from 'react';
import Link from 'next/link';
import { College } from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const EXAMS = [
  { value: 'jee_main', label: 'JEE Main' },
  { value: 'jee_advanced', label: 'JEE Advanced' },
  { value: 'cuet', label: 'CUET' },
  { value: 'other', label: 'Other' },
];

interface PredictResult {
  exam: string;
  rank: number;
  tier: string;
  colleges: College[];
  total: number;
}

export default function PredictorPage() {
  const [exam, setExam] = useState('jee_main');
  const [rank, setRank] = useState('');
  const [course, setCourse] = useState('');
  const [result, setResult] = useState<PredictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    if (!rank) { setError('Please enter your rank'); return; }
    setError(''); setLoading(true);
    try {
      const params = new URLSearchParams({ exam, rank });
      if (course) params.append('course', course);
      const res = await fetch(`${BASE}/api/predictor?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] text-[#888] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            AI-Powered College Predictor
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Find Your <span className="text-[#4f8ef7]">Best Fit</span>
          </h1>
          <p className="text-[#555] text-base">
            Enter your exam and rank — we'll show colleges you can get into
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Exam</label>
              <select value={exam} onChange={e => setExam(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#4f8ef7] transition">
                {EXAMS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Your Rank</label>
              <input
                type="number" value={rank} onChange={e => setRank(e.target.value)}
                placeholder="e.g. 5000" min="1"
                className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#4f8ef7] transition placeholder-[#333]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Preferred Course</label>
              <select value={course} onChange={e => setCourse(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#4f8ef7] transition">
                <option value="">Any Course</option>
                {['B.Tech', 'M.Tech', 'MBA', 'MCA', 'MSc', 'PhD'].map(c =>
                  <option key={c} value={c}>{c}</option>
                )}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <button onClick={handlePredict} disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-60 text-sm">
            {loading ? 'Predicting...' : '🎯 Predict My Colleges'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {result.total > 0 ? `${result.total} colleges found` : 'No colleges found'}
                </h2>
                <p className="text-xs text-[#555] mt-0.5">
                  Rank {result.rank.toLocaleString()} → <span className="text-[#4f8ef7]">{result.tier}</span>
                </p>
              </div>
            </div>

            {result.total === 0 ? (
              <div className="text-center py-16 bg-[#111] border border-[#1a1a1a] rounded-2xl">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-white font-semibold mb-1">No matches found</p>
                <p className="text-[#555] text-sm">Try a different exam or remove the course filter</p>
              </div>
            ) : (
              <div className="space-y-3">
                {result.colleges.map((college, idx) => (
                  <div key={college.id}
                    className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 hover:border-[#2a2a2a] transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-[#555]">#{idx + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">{college.name}</h3>
                          <p className="text-[#555] text-xs mt-0.5">📍 {college.location}</p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {college.courses.slice(0, 3).map(c => (
                              <span key={c} className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs px-2 py-0.5 rounded-md">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="text-white text-sm font-bold">{college.rating}</span>
                        </div>
                        <div className="text-xs text-green-400 font-semibold">{college.placement_percentage}% placed</div>
                        <div className="text-xs text-[#555] mt-1">₹{(college.fees / 100000).toFixed(1)}L/yr</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#1a1a1a] flex gap-2">
                      <Link href={`/college/${college.id}`}
                        className="flex-1 text-center bg-white text-black py-2 rounded-xl text-xs font-semibold hover:bg-gray-100 transition">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}