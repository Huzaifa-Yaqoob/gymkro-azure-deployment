const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function api(path: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || error.error || 'Request failed');
  }

  return res.json();
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!getToken();
}
