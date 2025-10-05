"use client";

import { useState } from "react";
import {
  Github,
  User,
  Users,
  BarChart3,
  TrendingUp,
  Code,
  Star,
  GitFork,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ProfileAnalyzer from "@/components/ProfileAnalyzer";
import CompareProfiles from "@/components/CompareProfiles";

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: "profile-analyzer",
      title: "Profile Analyzer",
      description:
        "Get detailed insights into any GitHub user's profile, repositories, and activity metrics.",
      icon: User,
      color: "bg-blue-500",
      features: [
        "Profile Information",
        "Repository Statistics",
        "Language Distribution",
        "Activity Metrics",
      ],
    },
    {
      id: "compare-profiles",
      title: "Compare Profiles",
      description:
        "Compare two GitHub profiles side-by-side for hiring decisions and team analysis.",
      icon: Users,
      color: "bg-green-500",
      features: [
        "Side-by-side Comparison",
        "Metrics Analysis",
        "Winner Indicators",
        "Hiring Insights",
      ],
    },
    {
      id: 'repository-insights',
      title: 'Repository Insights',
      description: 'Deep dive into repository statistics, contributors, and project health metrics.',
      icon: Code,
      color: 'bg-purple-500',
      features: ['Repository Health', 'Contributor Analysis', 'Commit Patterns', 'Project Trends'],
      comingSoon: true
    },
    {
      id: 'team-analytics',
      title: 'Team Analytics',
      description: 'Analyze team performance, collaboration patterns, and productivity metrics.',
      icon: TrendingUp,
      color: 'bg-orange-500',
      features: ['Team Performance', 'Collaboration Metrics', 'Productivity Analysis', 'Growth Tracking'],
      comingSoon: true
    }
  ];

  const renderToolContent = () => {
    switch (activeTool) {
      case "profile-analyzer":
        return <ProfileAnalyzer onBack={() => setActiveTool(null)} />;
      case "compare-profiles":
        return <CompareProfiles onBack={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderToolContent();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Github className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                GitHub Toolkit
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4" />
              <span>Comprehensive GitHub Analytics</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to GitHub Toolkit
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive suite of tools for analyzing GitHub profiles,
            comparing developers, and gaining insights into repository
            statistics and team performance.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>Profile Analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-4 w-4" />
              <span>Repository Insights</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>Data Visualization</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => !tool.comingSoon && setActiveTool(tool.id)}
                className={`card cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                  tool.comingSoon
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:border-primary-300"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${tool.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {tool.title}
                      </h3>
                      {tool.comingSoon && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    {!tool.comingSoon && (
                      <div className="mt-4 flex items-center text-primary-600 font-medium">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why Choose GitHub Toolkit?
            </h2>
            <p className="text-gray-600">Built for developers, by developers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comprehensive Analytics
              </h3>
              <p className="text-gray-600">
                Get detailed insights into profiles, repositories, and team
                performance with beautiful visualizations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Easy Comparison
              </h3>
              <p className="text-gray-600">
                Compare developers side-by-side with clear metrics and winner
                indicators for hiring decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Data
              </h3>
              <p className="text-gray-600">
                Access live data from GitHub API with up-to-date information and
                comprehensive metrics.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
