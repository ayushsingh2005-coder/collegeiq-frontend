'use client';
import { useEffect, useState } from 'react';
import { api, College } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import SaveButton from '@/components/SaveButton';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CollegeDetailPage() {
  const { id } = useParams() as { id: string };
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  useEffect(() => {
    api.getCollege(id)
      .then(setCollege)
      .catch(() => setError('College not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="h-12 bg-[#111] rounded-xl animate-pulse w-1/2" />
        <div className="h-48 bg-[#111] rounded-xl animate-pulse" />
      </div>
    </div>
  );

  if (error || !college) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-3">😕</div>
        <p className="text-white mb-4">{error || 'Something went wrong'}</p>
        <Link href="/" className="bg-white text-black px-6 py-3 rounded-xl font-semibold">Go Back</Link>
      </div>
    </div>
  );

  const inCompare = isInCompare(college.id);

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#555] hover:text-white text-sm mb-6 transition">
          ← Back to Colleges
        </Link>

        {/* Header */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black text-white">{college.name}</h1>
              <p className="text-[#555] mt-2 text-sm">📍 {college.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2 rounded-xl">
                <span className="text-amber-400 text-lg">★</span>
                <span className="text-white font-bold text-lg ml-1">{college.rating}</span>
              </div>
              <SaveButton collegeId={college.id} />
              <button
                onClick={() => inCompare ? removeFromCompare(college.id) : addToCompare(college)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                  inCompare ? 'border-[#4f8ef7] text-[#4f8ef7] bg-[#1a1a1a]' : 'border-[#2a2a2a] text-[#888] bg-[#1a1a1a] hover:border-[#444]'
                }`}>
                {inCompare ? '✓ In Compare' : '⚖ Compare'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Annual Fees', value: `₹${(college.fees / 100000).toFixed(1)}L` },
            { label: 'Placement Rate', value: `${college.placement_percentage}%` },
            { label: 'Rating', value: `${college.rating}/5` },
          ].map(stat => (
            <div key={stat.label} className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 text-center">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-[#555] mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-3">About</h2>
          <p className="text-[#888] leading-relaxed text-sm">{college.overview}</p>
        </div>

        {/* Courses */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Courses Offered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {college.courses.map(c => (
              <div key={c} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-sm text-[#888] text-center">
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Placements */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Placements</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#1a1a1a] rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${college.placement_percentage}%` }} />
            </div>
            <span className="text-lg font-bold text-green-400">{college.placement_percentage}%</span>
          </div>
          <p className="text-xs text-[#555] mt-2">Students placed in top companies</p>
        </div>

      </div>
    </div>
  );
}