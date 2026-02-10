'use client';

import Image from 'next/image';
import { GitHubProfile } from '@/types';
import { MapPin, Building, Globe, Twitter, Calendar, Users, Star, GitFork } from 'lucide-react';

interface ProfileCardProps {
  profile: GitHubProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar */}
        <Image
          src={profile.avatar_url}
          alt={`${profile.username}'s avatar`}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full border-4 border-primary"
          priority
        />

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {profile.name || profile.username}
              </h1>
              <p className="text-lg text-gray-400">@{profile.username}</p>
              {profile.bio && <p className="text-gray-300 mt-2 max-w-2xl">{profile.bio}</p>}
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {profile.location && (
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.company && (
              <div className="flex items-center space-x-2 text-gray-400">
                <Building className="h-4 w-4" />
                <span>{profile.company}</span>
              </div>
            )}
            {profile.blog && (
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="h-4 w-4" />
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary"
                >
                  {profile.blog}
                </a>
              </div>
            )}
            {profile.twitter_username && (
              <div className="flex items-center space-x-2 text-gray-400">
                <Twitter className="h-4 w-4" />
                <a
                  href={`https://twitter.com/${profile.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary hover:text-primary"
                >
                  @{profile.twitter_username}
                </a>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">Followers</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {profile.followers.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">Following</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {profile.following.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                <Star className="h-4 w-4" />
                <span className="text-sm">Stars</span>
              </div>
              <p className="text-2xl font-bold text-secondary">
                {profile.total_stars.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                <GitFork className="h-4 w-4" />
                <span className="text-sm">Forks</span>
              </div>
              <p className="text-2xl font-bold text-tertiary">
                {profile.total_forks.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Join Date */}
          <div className="mt-4 pt-4 border-t border-elevated">
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Joined {formatDate(profile.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
