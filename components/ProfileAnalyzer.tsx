'use client';

import { useState } from 'react';
import { Search, Github } from 'lucide-react';
import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';
import RepositoryList from '@/components/RepositoryList';
import LanguageChart from '@/components/LanguageChart';
import StatsGrid from '@/components/StatsGrid';
import { ProfileData } from '@/types';

export default function ProfileAnalyzer() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async (username: string) => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/profile/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfile(username);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-elevated sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <Github className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">GitHub Toolkit</h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Username
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username..."
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  {loading ? 'Analyzing...' : 'Analyze Profile'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Results */}
        {profileData && (
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileCard profile={profileData.profile} />

            {/* Stats Grid */}
            <StatsGrid metrics={profileData.metrics} />

            {/* Language Chart */}
            {profileData.language_stats && profileData.language_stats.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold text-primary mb-6">Language Distribution</h2>
                <LanguageChart data={profileData.language_stats} />
              </div>
            )}

            {/* Repositories */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary mb-6">Recent Repositories</h2>
              <RepositoryList repositories={profileData.repositories} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
