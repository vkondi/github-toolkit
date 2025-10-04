'use client'

import { Repository } from '@/types'
import { Star, GitFork, Calendar, ExternalLink, Code } from 'lucide-react'

interface RepositoryListProps {
  repositories: Repository[]
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB} KB`
    } else if (sizeInKB < 1024 * 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} MB`
    } else {
      return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`
    }
  }

  return (
    <div className="space-y-4">
      {repositories.slice(0, 10).map((repo) => (
        <div key={repo.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {repo.name}
                </h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              {repo.description && (
                <p className="text-gray-600 mb-3 line-clamp-2">{repo.description}</p>
              )}
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                {repo.language && (
                  <div className="flex items-center space-x-1">
                    <Code className="h-4 w-4" />
                    <span>{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{repo.stars.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repo.forks.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {formatSize(repo.size)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {repositories.length > 10 && (
        <div className="text-center py-4">
          <p className="text-gray-500">
            Showing 10 of {repositories.length} repositories
          </p>
        </div>
      )}
    </div>
  )
}
