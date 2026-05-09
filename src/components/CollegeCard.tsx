'use client';
import Link from 'next/link';
import { College } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import SaveButton from './SaveButton';

export default function CollegeCard({ college }: { college: College }) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(college.id);

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl hover:border-[#333333] transition-all duration-200 overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base leading-tight truncate">{college.name}</h3>
            <p className="text-[#555] text-xs mt-1">📍 {college.location}</p>
          </div>
          <div className="ml-2 flex items-center gap-1 bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-1 rounded-lg shrink-0">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-white text-xs font-bold">{college.rating}</span>
          </div>
        </div>

        {/* Courses */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {college.courses.slice(0, 3).map(c => (
            <span key={c} className="bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs px-2 py-0.5 rounded-md">
              {c}
            </span>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[#444] text-xs px-1 py-0.5">+{college.courses.length - 3}</span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3 text-center">
            <div className="text-sm font-bold text-white">₹{(college.fees / 100000).toFixed(1)}L</div>
            <div className="text-xs text-[#555] mt-0.5">Annual Fees</div>
          </div>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3 text-center">
            <div className="text-sm font-bold text-white">{college.placement_percentage}%</div>
            <div className="text-xs text-[#555] mt-0.5">Placement</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/college/${college.id}`}
            className="flex-1 text-center bg-white text-black py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition">
            View Details
          </Link>
          <button
            onClick={() => inCompare ? removeFromCompare(college.id) : addToCompare(college)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition border ${inCompare ? 'bg-[#1a1a1a] border-[#4f8ef7] text-[#4f8ef7]' : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888] hover:border-[#444]'}`}>
            {inCompare ? '✓' : '⚖'}
          </button>
          <SaveButton collegeId={college.id} />
        </div>
      </div>
    </div>
  );
}