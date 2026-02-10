"use client";

import {
  Github,
  User,
  Users,
  BarChart3,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const tools = [
    {
      id: "profile-analyzer",
      title: "Profile Analyzer",
      subtitle: "Analyze GitHub profiles",
      icon: User,
      href: "/profile-analyzer",
    },
    {
      id: "compare-profiles",
      title: "Compare Profiles",
      subtitle: "Compare two developers",
      icon: Users,
      href: "/compare-profiles",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-elevated sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Github className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">
                GitHub Toolkit
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            GitHub Toolkit
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A comprehensive suite of tools for analyzing GitHub profiles,
            comparing developers, and gaining insights.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const CardContent = (
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-lg bg-elevated text-primary border border-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400">{tool.subtitle}</p>
                </div>
              </div>
            );

            return (
              <Link key={tool.id} href={tool.href!}>
                <div className="card cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary hover:scale-105">
                  {CardContent}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-surface rounded-xl shadow-lg border border-elevated p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose GitHub Toolkit?
            </h2>
            <p className="text-gray-400">Built for developers, by developers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-elevated rounded-lg flex items-center justify-center mx-auto mb-4 border border-primary">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Analytics
              </h3>
              <p className="text-gray-400">
                Get detailed insights with beautiful visualizations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-elevated rounded-lg flex items-center justify-center mx-auto mb-4 border border-secondary">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Compare
              </h3>
              <p className="text-gray-400">
                Compare developers side-by-side easily.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-elevated rounded-lg flex items-center justify-center mx-auto mb-4 border border-tertiary">
                <TrendingUp className="h-8 w-8 text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-tertiary mb-2">
                Real-time
              </h3>
              <p className="text-gray-400">
                Access live data from GitHub API.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
