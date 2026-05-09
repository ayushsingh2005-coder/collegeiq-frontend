'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, College } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SavedPage() {
  const { token, user } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    api.getSaved(token!).then(setColleges).catch(console.error).finally(() => setLoading(false));
  }, [token, user, router]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-[#555] text-sm">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Saved Colleges</h1>
          <p className="text-[#555] text-sm mt-1">{colleges.length} colleges saved</p>
        </div>

        {colleges.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">♡</div>
            <h3 className="text-xl font-bold text-white mb-2">No saved colleges yet</h3>
            <p className="text-[#555] mb-6">Save colleges to compare them later</p>
            <Link href="/" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition text-sm">
              Browse Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map(c => <CollegeCard key={c.id} college={c} />)}
          </div>
        )}
      </div>
    </div>
  );
}