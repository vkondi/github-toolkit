'use client'

import { ComparisonData } from '@/types'
import { Users, Star, GitFork, TrendingUp, Award } from 'lucide-react'

interface ComparisonViewProps {
  comparisonData: ComparisonData
}

export default function ComparisonView({ comparisonData }: ComparisonViewProps) {
  const { user1, user2, comparison_metrics } = comparisonData

  const metrics = [
    {
      title: 'Followers',
      user1Value: comparison_metrics.followers.user1,
      user2Value: comparison_metrics.followers.user2,
      icon: Users,
      format: (value: number) => value.toLocaleString()
    },
    {
      title: 'Following',
      user1Value: comparison_metrics.following.user1,
      user2Value: comparison_metrics.following.user2,
      icon: Users,
      format: (value: number) => value.toLocaleString()
    },
    {
      title: 'Public Repositories',
      user1Value: comparison_metrics.public_repos.user1,
      user2Value: comparison_metrics.public_repos.user2,
      icon: Award,
      format: (value: number) => value.toLocaleString()
    },
    {
      title: 'Total Stars',
      user1Value: comparison_metrics.total_stars.user1,
      user2Value: comparison_metrics.total_stars.user2,
      icon: Star,
      format: (value: number) => value.toLocaleString()
    },
    {
      title: 'Total Forks',
      user1Value: comparison_metrics.total_forks.user1,
      user2Value: comparison_metrics.total_forks.user2,
      icon: GitFork,
      format: (value: number) => value.toLocaleString()
    },
    {
      title: 'Avg Stars/Repo',
      user1Value: comparison_metrics.avg_stars_per_repo.user1,
      user2Value: comparison_metrics.avg_stars_per_repo.user2,
      icon: TrendingUp,
      format: (value: number) => value.toFixed(1)
    }
  ]

  const getWinner = (user1Value: number, user2Value: number) => {
    if (user1Value > user2Value) return 'user1'
    if (user2Value > user1Value) return 'user2'
    return 'tie'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Profile Comparison
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User 1 */}
          <div className="text-center">
            <img
              src={user1.avatar_url}
              alt={`${user1.username}'s avatar`}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {user1.name || user1.username}
            </h3>
            <p className="text-gray-600">@{user1.username}</p>
            {user1.bio && (
              <p className="text-sm text-gray-500 mt-2">{user1.bio}</p>
            )}
          </div>
          
          {/* User 2 */}
          <div className="text-center">
            <img
              src={user2.avatar_url}
              alt={`${user2.username}'s avatar`}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {user2.name || user2.username}
            </h3>
            <p className="text-gray-600">@{user2.username}</p>
            {user2.bio && (
              <p className="text-sm text-gray-500 mt-2">{user2.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          const winner = getWinner(metric.user1Value, metric.user2Value)
          
          return (
            <div key={index} className="card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {/* User 1 Value */}
                <div className={`text-center p-4 rounded-lg ${
                  winner === 'user1' ? 'bg-green-50 border-2 border-green-200' : 
                  winner === 'tie' ? 'bg-gray-50 border-2 border-gray-200' : 
                  'bg-gray-50'
                }`}>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.format(metric.user1Value)}
                  </p>
                  <p className="text-sm text-gray-600">@{user1.username}</p>
                  {winner === 'user1' && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Winner
                      </span>
                    </div>
                  )}
                </div>
                
                {/* User 2 Value */}
                <div className={`text-center p-4 rounded-lg ${
                  winner === 'user2' ? 'bg-green-50 border-2 border-green-200' : 
                  winner === 'tie' ? 'bg-gray-50 border-2 border-gray-200' : 
                  'bg-gray-50'
                }`}>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.format(metric.user2Value)}
                  </p>
                  <p className="text-sm text-gray-600">@{user2.username}</p>
                  {winner === 'user2' && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Winner
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {winner === 'tie' && (
                <div className="text-center mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Tie
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
