"""
Metrics Calculation Utility Module

Provides reusable functions for calculating metrics from GitHub data.
"""

from typing import Dict, List, Any


def calculate_language_stats(repositories: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Calculate language statistics from repositories.
    
    Args:
        repositories (List[Dict[str, Any]]): List of repository data
    
    Returns:
        List[Dict[str, Any]]: Language statistics sorted by count descending
    """
    language_counts = {}
    total_size = 0
    
    for repo in repositories:
        if repo.get("language"):
            language_counts[repo["language"]] = language_counts.get(repo["language"], 0) + repo["size"]
            total_size += repo["size"]
    
    language_stats = []
    for language, count in language_counts.items():
        percentage = (count / total_size * 100) if total_size > 0 else 0
        language_stats.append({
            "language": language,
            "count": count,
            "percentage": percentage
        })
    
    return sorted(language_stats, key=lambda x: x["count"], reverse=True)


def calculate_profile_metrics(profile: Dict[str, Any], repositories: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Calculate aggregated metrics for a user profile.
    
    Args:
        profile (Dict[str, Any]): User profile data
        repositories (List[Dict[str, Any]]): List of repository data
    
    Returns:
        Dict[str, Any]: Aggregated metrics
    """
    total_stars = sum(repo["stars"] for repo in repositories)
    total_forks = sum(repo["forks"] for repo in repositories)
    language_stats = calculate_language_stats(repositories)
    
    return {
        "total_stars": total_stars,
        "total_forks": total_forks,
        "avg_stars_per_repo": total_stars / len(repositories) if repositories else 0,
        "avg_forks_per_repo": total_forks / len(repositories) if repositories else 0,
        "top_language": language_stats[0]["language"] if language_stats else None,
        "repository_count": len(repositories)
    }
