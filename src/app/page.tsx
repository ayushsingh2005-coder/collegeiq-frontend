'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { api, CollegesResponse } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import FilterPanel from '@/components/FilterPanel';

export default function HomePage() {
  const [data, setData] = useState<CollegesResponse | null>(null);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [course, setCourse] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Debounce Ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch Colleges
  const fetchColleges = useCallback(async () => {
    setLoading(true);

    const params: Record<string, string> = {
      page: String(page),
      limit: '9',
    };

    if (search) params.search = search;
    if (location) params.location = location;
    if (course) params.course = course;
    if (maxFees) params.maxFees = maxFees;

    try {
      const result = await api.getColleges(params);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, location, course, maxFees, page]);

  // Debounced Search
  const debouncedSearch = useCallback((value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 400);
  }, []);

  // Fetch on state change
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Reset Filters
  const handleReset = () => {
    setLocation('');
    setCourse('');
    setMaxFees('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <div className="border-b border-[#1a1a1a] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] text-[#888] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            India&apos;s Premier College Discovery Platform
          </div>

          <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Find Your <br />
            <span className="text-[#4f8ef7]">Dream College</span>
          </h1>

          <p className="text-[#555] text-lg mb-8">
            Compare fees, placements & ratings across top Indian colleges
          </p>

          {/* Search */}
          <div className="flex gap-2 bg-[#111] border border-[#222] rounded-2xl p-1.5">

            <input
              type="text"
              value={search}
              onChange={(e) => debouncedSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchColleges()}
              placeholder="Search colleges by name..."
              className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-[#444] focus:outline-none text-sm"
            />

            <button
              onClick={fetchColleges}
              className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition"
            >
              Search
            </button>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex gap-6">

          {/* Sidebar */}
          <div className="w-60 shrink-0 hidden md:block">
            <FilterPanel
              location={location}
              setLocation={setLocation}
              course={course}
              setCourse={setCourse}
              maxFees={maxFees}
              setMaxFees={setMaxFees}
              onReset={handleReset}
            />
          </div>

          {/* Results */}
          <div className="flex-1">

            {loading ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#111] rounded-2xl h-64 animate-pulse border border-[#1a1a1a]"
                    />
                  ))}
              </div>

            ) : data?.colleges.length === 0 ? (

              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>

                <h3 className="text-xl font-bold text-white mb-2">
                  No colleges found
                </h3>

                <p className="text-[#555]">
                  Try different search terms or filters
                </p>
              </div>

            ) : (

              <>
                <div className="flex justify-between items-center mb-5">
                  <p className="text-sm text-[#555]">
                    <span className="font-semibold text-white">
                      {data?.total}
                    </span>{' '}
                    colleges found
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data?.colleges.map((c) => (
                    <CollegeCard key={c.id} college={c} />
                  ))}
                </div>

                {data && data.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-8">

                    <button
                      onClick={() =>
                        setPage((p) => Math.max(1, p - 1))
                      }
                      disabled={page === 1}
                      className="px-4 py-2 rounded-xl border border-[#222] text-sm text-[#888] disabled:opacity-40 hover:bg-[#111] transition"
                    >
                      ← Prev
                    </button>

                    <span className="text-sm text-[#555]">
                      Page {page} of {data.totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setPage((p) =>
                          Math.min(data.totalPages, p + 1)
                        )
                      }
                      disabled={page === data.totalPages}
                      className="px-4 py-2 rounded-xl border border-[#222] text-sm text-[#888] disabled:opacity-40 hover:bg-[#111] transition"
                    >
                      Next →
                    </button>

                  </div>
                )}

              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}