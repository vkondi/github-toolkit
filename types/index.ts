export interface ProfileData {
  profile: GitHubProfile
  repositories: Repository[]
  language_stats: LanguageStats[]
  contribution_stats: ContributionStats
  metrics: Metrics
}

export interface GitHubProfile {
  username: string
  name?: string
  bio?: string
  avatar_url: string
  followers: number
  following: number
  public_repos: number
  total_stars: number
  total_forks: number
  created_at: string
  updated_at: string
  location?: string
  company?: string
  blog?: string
  twitter_username?: string
}

export interface Repository {
  name: string
  full_name: string
  description?: string
  language?: string
  stars: number
  forks: number
  size: number
  created_at: string
  updated_at: string
  pushed_at: string
  html_url: string
}

export interface LanguageStats {
  language: string
  count: number
  percentage: number
}

export interface ContributionStats {
  total_contributions: number
  contributions_this_year: number
  longest_streak: int
  current_streak: int
  contributions_by_month: Array<{ month: string; contributions: number }>
}

export interface Metrics {
  total_stars: number
  total_forks: number
  avg_stars_per_repo: number
  avg_forks_per_repo: number
  top_language?: string
  repository_count: number
}

export interface ComparisonData {
  user1: GitHubProfile
  user2: GitHubProfile
  comparison_metrics: {
    followers: { user1: number; user2: number }
    following: { user1: number; user2: number }
    public_repos: { user1: number; user2: number }
    total_stars: { user1: number; user2: number }
    total_forks: { user1: number; user2: number }
    avg_stars_per_repo: { user1: number; user2: number }
  }
}
