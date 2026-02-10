'use client';

import { useState } from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';
import ComparisonView from '@/components/ComparisonView';

export default function CompareProfiles() {
  const [compareUsernames, setCompareUsernames] = useState({ user1: '', user2: '' });
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComparison = async (user1: string, user2: string) => {
    if (!user1.trim() || !user2.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/compare/${user1}/${user2}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }
      const data = await response.json();
      setComparisonData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComparison(compareUsernames.user1, compareUsernames.user2);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="user1" className="block text-sm font-medium text-gray-300 mb-2">
                  First Username
                </label>
                <input
                  type="text"
                  id="user1"
                  value={compareUsernames.user1}
                  onChange={(e) =>
                    setCompareUsernames((prev) => ({ ...prev, user1: e.target.value }))
                  }
                  placeholder="Enter first username..."
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="user2" className="block text-sm font-medium text-gray-300 mb-2">
                  Second Username
                </label>
                <input
                  type="text"
                  id="user2"
                  value={compareUsernames.user2}
                  onChange={(e) =>
                    setCompareUsernames((prev) => ({ ...prev, user2: e.target.value }))
                  }
                  placeholder="Enter second username..."
                  className="input-field"
                  required
                />
              </div>
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Comparing...' : 'Compare Profiles'}
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
        {comparisonData && <ComparisonView comparisonData={comparisonData} />}
      </main>
    </div>
  );
}
