'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, removeToken, isAuthenticated } from '../../lib/api';

interface User {
  id: number;
  email: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    api('/auth/profile')
      .then((data) => setUser(data))
      .catch(() => {
        removeToken();
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="spinner" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <Link href="/" className="nav-logo">Iron<span>Forge</span></Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'white' }}>Welcome, {user?.name}</span>
            <button className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-card">
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
          </div>

          <div className="dashboard-card">
            <h2>Membership</h2>
            <p>You are on the <strong>Pro</strong> plan.</p>
            <p>Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>

          <div className="dashboard-card">
            <h2>Recent Activity</h2>
            <p>No recent activity to show. Start your workout today!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
