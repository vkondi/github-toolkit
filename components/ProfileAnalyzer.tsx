'use client'

import { useState } from 'react'
import { Search, ArrowLeft, Github } from 'lucide-react'
import ProfileCard from '@/components/ProfileCard'
import RepositoryList from '@/components/RepositoryList'
import LanguageChart from '@/components/LanguageChart'
import StatsGrid from '@/components/StatsGrid'
import { ProfileData } from '@/types'

interface ProfileAnalyzerProps {
  onBack: () => void
}

export default function ProfileAnalyzer({ onBack }: ProfileAnalyzerProps) {
  const [username, setUsername] = useState('')
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchProfile = async (username: string) => {
    if (!username.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/profile/${username}`)
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await response.json()
      setProfileData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProfile(username)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-3">
              <Github className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Profile Analyzer</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Analyzing...' : 'Analyze Profile'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Language Distribution</h2>
                <LanguageChart data={profileData.language_stats} />
              </div>
            )}
            
            {/* Repositories */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Repositories</h2>
              <RepositoryList repositories={profileData.repositories} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
