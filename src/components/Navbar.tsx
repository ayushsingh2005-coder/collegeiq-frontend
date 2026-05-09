'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <nav className="bg-[#111111] border-b border-[#222222] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5">
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#grad)"/>
    <path d="M8 20L16 8L24 20H8Z" fill="white" fillOpacity="0.15"/>
    <path d="M10 20L16 11L22 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="22" r="2" fill="white"/>
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4f8ef7"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
    </defs>
  </svg>
  
</Link>
            <span className="font-bold text-xl text-white tracking-tight">
              College<span className="text-[#4f8ef7]">IQ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="text-[#888] hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition">
              Colleges
            </Link>
            <Link href="/compare" className="text-[#888] hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition">
              Compare
            </Link>
            {user && (
              <Link href="/saved" className="text-[#888] hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition">
                Saved
              </Link>
            )}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
                  <div className="w-6 h-6 bg-[#4f8ef7] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name[0].toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-white font-medium">{user.name.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout}
                  className="text-sm text-[#888] hover:text-white border border-[#2a2a2a] px-3 py-1.5 rounded-lg hover:bg-[#1a1a1a] transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-[#888] hover:text-white font-medium transition px-3 py-1.5">
                  Login
                </Link>
                <Link href="/register"
                  className="text-sm bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-[#1a1a1a] text-white">
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-[#222] space-y-1">
            <Link href="/" className="block px-3 py-2 text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-lg text-sm">Colleges</Link>
            <Link href="/compare" className="block px-3 py-2 text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-lg text-sm">Compare</Link>
            {user && <Link href="/saved" className="block px-3 py-2 text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-lg text-sm">Saved</Link>}
            {user ? (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-lg text-sm">Logout</button>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-lg text-sm">Login</Link>
                <Link href="/register" className="block px-3 py-2 bg-white text-black rounded-lg text-sm font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}