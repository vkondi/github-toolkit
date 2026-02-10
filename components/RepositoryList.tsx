'use client';

import { Repository } from '@/types';
import { Star, GitFork, Calendar, ExternalLink, Code } from 'lucide-react';

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB} KB`;
    } else if (sizeInKB < 1024 * 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} MB`;
    } else {
      return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`;
    }
  };

  return (
    <div className="space-y-4">
      {repositories.slice(0, 10).map((repo) => (
        <div
          key={repo.name}
          className="border border-elevated rounded-lg p-4 hover:shadow-md transition-shadow bg-elevated"
        >
          <div className="flex flex-col space-y-3">
            {/* Repository Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-primary truncate">{repo.name}</h3>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-tertiary flex-shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Repository Description */}
            {repo.description && (
              <p className="text-gray-400 text-sm line-clamp-2 break-words">{repo.description}</p>
            )}

            {/* Metadata Grid - Responsive layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-sm text-gray-500">
              {/* Language */}
              {repo.language && (
                <div className="flex items-center space-x-1 min-w-0">
                  <Code className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{repo.language}</span>
                </div>
              )}

              {/* Stars */}
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 flex-shrink-0" />
                <span>{repo.stars.toLocaleString()}</span>
              </div>

              {/* Forks */}
              <div className="flex items-center space-x-1">
                <GitFork className="h-4 w-4 flex-shrink-0" />
                <span>{repo.forks.toLocaleString()}</span>
              </div>

              {/* Size */}
              <div className="text-xs bg-surface px-2 py-1 rounded text-gray-400 w-fit">
                {formatSize(repo.size)}
              </div>
            </div>

            {/* Updated Date - Full width on mobile */}
            <div className="flex items-center space-x-1 text-sm text-gray-500 pt-2 border-t border-surface">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Updated {formatDate(repo.updated_at)}</span>
            </div>
          </div>
        </div>
      ))}

      {repositories.length > 10 && (
        <div className="text-center py-4">
          <p className="text-gray-500">Showing 10 of {repositories.length} repositories</p>
        </div>
      )}
    </div>
  );
}
