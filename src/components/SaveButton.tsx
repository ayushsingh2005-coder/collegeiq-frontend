'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function SaveButton({ collegeId }: { collegeId: number }) {
  const { token, user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    api.getSaved(token).then(list => {
      setSaved(list.some(c => c.id === collegeId));
    }).catch(() => {});
  }, [token, collegeId]);

  const toggle = async () => {
    if (!user) { router.push('/login'); return; }
    setLoading(true);
    try {
      if (saved) {
        await api.unsaveCollege(token!, collegeId);
        setSaved(false);
      } else {
        await api.saveCollege(token!, collegeId);
        setSaved(true);
      }
    } finally { setLoading(false); }
  };

  return (
    <button onClick={toggle} disabled={loading}
      className={`px-3 py-2 rounded-xl text-sm transition border ${
        saved
          ? 'bg-[#1a1a1a] border-red-500 text-red-400'
          : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888] hover:border-[#444]'
      }`}>
      {saved ? '♥' : '♡'}
    </button>
  );
}