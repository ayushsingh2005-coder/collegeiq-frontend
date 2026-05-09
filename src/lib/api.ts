const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  courses: string[];
  placement_percentage: number;
  overview: string;
}

export interface CollegesResponse {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
}

export const api = {
  getColleges: async (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE}/api/colleges?${qs}`);
    if (!res.ok) throw new Error('Failed to fetch colleges');
    return res.json() as Promise<CollegesResponse>;
  },

  getCollege: async (id: string) => {
    const res = await fetch(`${BASE}/api/colleges/${id}`);
    if (!res.ok) throw new Error('College not found');
    return res.json() as Promise<College>;
  },

  compareColleges: async (ids: number[]) => {
    const res = await fetch(`${BASE}/api/colleges/action/compare?ids=${ids.join(',')}`);
    if (!res.ok) throw new Error('Compare failed');
    return res.json() as Promise<College[]>;
  },

  register: async (name: string, email: string, password: string) => {
    const res = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  getSaved: async (token: string) => {
    const res = await fetch(`${BASE}/api/saved`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch saved');
    return res.json() as Promise<College[]>;
  },

  saveCollege: async (token: string, collegeId: number) => {
    const res = await fetch(`${BASE}/api/saved/${collegeId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  unsaveCollege: async (token: string, collegeId: number) => {
    const res = await fetch(`${BASE}/api/saved/${collegeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};