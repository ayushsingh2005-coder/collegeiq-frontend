'use client';
import { useCompare } from '@/context/CompareContext';
import Link from 'next/link';

const fields = [
  { label: 'Location', key: 'location' },
  { label: 'Annual Fees', key: 'fees', format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
  { label: 'Rating', key: 'rating', format: (v: number) => `${v}/5` },
  { label: 'Placement %', key: 'placement_percentage', format: (v: number) => `${v}%` },
  { label: 'Courses', key: 'courses', format: (v: string[]) => v.join(', ') },
];

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length < 2) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {compareList.length === 0 ? 'No colleges to compare' : 'Add one more college'}
        </h2>
        <p className="text-[#555] mb-6">You need at least 2 colleges to compare</p>
        <Link href="/" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
          Browse Colleges
        </Link>
      </div>
    </div>
  );

  const bestFees = Math.min(...compareList.map(c => c.fees));
  const bestRating = Math.max(...compareList.map(c => c.rating));
  const bestPlacement = Math.max(...compareList.map(c => c.placement_percentage));

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Compare Colleges</h1>
            <p className="text-[#555] text-sm mt-1">Side-by-side comparison</p>
          </div>
          <button onClick={clearCompare}
            className="text-sm text-[#555] hover:text-white border border-[#222] px-4 py-2 rounded-xl hover:bg-[#111] transition">
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-[#555] text-xs uppercase tracking-wide font-medium w-32">Feature</th>
                {compareList.map(college => (
                  <th key={college.id} className="p-4 text-center bg-[#111] border border-[#1a1a1a] rounded-t-xl">
                    <div className="font-bold text-white text-base">{college.name}</div>
                    <div className="text-[#555] text-xs mt-1">📍 {college.location}</div>
                    <button onClick={() => removeFromCompare(college.id)}
                      className="text-xs text-[#444] hover:text-red-400 mt-2 transition">
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, idx) => (
                <tr key={field.key}>
                  <td className="p-4 text-xs text-[#555] uppercase tracking-wide font-medium">{field.label}</td>
                  {compareList.map(college => {
                    const raw = college[field.key as keyof typeof college];
                    const display = field.format ? field.format(raw as never) : String(raw);
                    const isBest =
                      (field.key === 'fees' && college.fees === bestFees) ||
                      (field.key === 'rating' && college.rating === bestRating) ||
                      (field.key === 'placement_percentage' && college.placement_percentage === bestPlacement);
                    return (
                      <td key={college.id}
                        className={`p-4 text-center border border-[#1a1a1a] ${idx % 2 === 0 ? 'bg-[#111]' : 'bg-[#0d0d0d]'}`}>
                        <span className={`text-sm font-semibold ${isBest ? 'text-green-400' : 'text-white'}`}>
                          {display}
                        </span>
                        {isBest && <div className="text-xs text-green-500 mt-0.5">✓ Best</div>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}