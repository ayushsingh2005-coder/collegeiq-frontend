'use client';
import { useCompare } from '@/context/CompareContext';
import { useRouter } from 'next/navigation';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const router = useRouter();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#222] z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 overflow-x-auto">
          <span className="text-xs font-medium text-[#555] whitespace-nowrap">
            Compare ({compareList.length}/3)
          </span>
          {compareList.map(c => (
            <div key={c.id} className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
              {c.name}
              <button onClick={() => removeFromCompare(c.id)} className="ml-1 text-[#555] hover:text-red-400 transition">×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={clearCompare}
            className="text-xs text-[#555] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#1a1a1a] transition border border-[#222]">
            Clear
          </button>
          {compareList.length >= 2 && (
            <button onClick={() => router.push('/compare')}
              className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-100 transition">
              Compare Now →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}