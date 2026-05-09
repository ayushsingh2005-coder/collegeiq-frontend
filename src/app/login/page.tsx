'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const data = await api.login(email, password);
      login(data.token, data.user);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-sm">CQ</span>
            </div>
            <span className="font-bold text-2xl text-white">College<span className="text-[#4f8ef7]">IQ</span></span>
          </Link>
        </div>

        <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-1">Welcome back</h2>
          <p className="text-[#555] text-sm mb-6">Sign in to your account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4f8ef7] transition placeholder-[#333]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#555] mb-2 uppercase tracking-wide">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full bg-[#0a0a0a] border border-[#222] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4f8ef7] transition placeholder-[#333]" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-60 text-sm">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#555] mt-6">
            No account?{' '}
            <Link href="/register" className="text-[#4f8ef7] hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}