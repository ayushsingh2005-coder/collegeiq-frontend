'use client';

interface FilterPanelProps {
  location: string;
  setLocation: (v: string) => void;
  course: string;
  setCourse: (v: string) => void;
  maxFees: string;
  setMaxFees: (v: string) => void;
  onReset: () => void;
}

const LOCATIONS = ['Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Bangalore', 'Kolkata', 'Coimbatore', 'Vellore', 'Pilani', 'Patiala', 'Manipal', 'Warangal'];
const COURSES = ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'MSc', 'PhD'];

export default function FilterPanel({ location, setLocation, course, setCourse, maxFees, setMaxFees, onReset }: FilterPanelProps) {
  return (
    <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 space-y-5 sticky top-20">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-white">Filters</h3>
        <button onClick={onReset} className="text-xs text-[#4f8ef7] hover:underline">Reset</button>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Location</label>
        <select value={location} onChange={e => setLocation(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#4f8ef7] transition">
          <option value="">All Locations</option>
          {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Course</label>
        <select value={course} onChange={e => setCourse(e.target.value)}
          className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#4f8ef7] transition">
          <option value="">All Courses</option>
          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">
          Max Fees: {maxFees ? `₹${(parseInt(maxFees) / 100000).toFixed(1)}L` : 'Any'}
        </label>
        <input type="range" min="50000" max="600000" step="50000"
          value={maxFees || 600000}
          onChange={e => setMaxFees(e.target.value)}
          className="w-full accent-[#4f8ef7]" />
        <div className="flex justify-between text-xs text-[#444] mt-1">
          <span>₹50K</span><span>₹6L</span>
        </div>
      </div>
    </div>
  );
}