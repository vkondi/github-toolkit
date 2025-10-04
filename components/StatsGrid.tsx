'use client'

import { Metrics } from '@/types'
import { Star, GitFork, BarChart3, Code, TrendingUp, Award } from 'lucide-react'

interface StatsGridProps {
  metrics: Metrics
}

export default function StatsGrid({ metrics }: StatsGridProps) {
  const stats = [
    {
      title: 'Total Stars',
      value: metrics.total_stars.toLocaleString(),
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Forks',
      value: metrics.total_forks.toLocaleString(),
      icon: GitFork,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg Stars/Repo',
      value: metrics.avg_stars_per_repo.toFixed(1),
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Avg Forks/Repo',
      value: metrics.avg_forks_per_repo.toFixed(1),
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Repository Count',
      value: metrics.repository_count.toLocaleString(),
      icon: Code,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Top Language',
      value: metrics.top_language || 'N/A',
      icon: Award,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="card">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
