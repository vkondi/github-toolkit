from flask import Blueprint, request, jsonify
import os
import requests
from typing import Dict, List, Any

# Create a Blueprint for common routes
common_bp = Blueprint('common', __name__)

# GitHub API configuration
GITHUB_API_BASE = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")


def get_github_data(url: str, headers: Dict[str, str] = None) -> Dict[str, Any]:
    """Make authenticated request to GitHub API"""
    if not headers:
        headers = {}
    
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    
    headers["Accept"] = "application/vnd.github.v3+json"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            raise Exception("User not found")
        elif e.response.status_code == 403:
            raise Exception("Rate limit exceeded")
        else:
            raise Exception("GitHub API error")

def get_user_profile(username: str) -> Dict[str, Any]:
    """Fetch user profile data"""
    url = f"{GITHUB_API_BASE}/users/{username}"
    data = get_github_data(url)
    
    return {
        "username": data["login"],
        "name": data.get("name"),
        "bio": data.get("bio"),
        "avatar_url": data["avatar_url"],
        "followers": data["followers"],
        "following": data["following"],
        "public_repos": data["public_repos"],
        "total_stars": 0,  # Will be calculated from repos
        "total_forks": 0,  # Will be calculated from repos
        "created_at": data["created_at"],
        "updated_at": data["updated_at"],
        "location": data.get("location"),
        "company": data.get("company"),
        "blog": data.get("blog"),
        "twitter_username": data.get("twitter_username")
    }

def get_user_repositories(username: str, per_page: int = 100) -> List[Dict[str, Any]]:
    """Fetch user repositories"""
    url = f"{GITHUB_API_BASE}/users/{username}/repos"
    params = {"per_page": per_page, "sort": "updated", "direction": "desc"}
    
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    repos_data = response.json()
    
    repositories = []
    for repo in repos_data:
        repositories.append({
            "name": repo["name"],
            "full_name": repo["full_name"],
            "description": repo.get("description"),
            "language": repo.get("language"),
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"],
            "size": repo["size"],
            "created_at": repo["created_at"],
            "updated_at": repo["updated_at"],
            "pushed_at": repo["pushed_at"],
            "html_url": repo["html_url"]
        })
    
    return repositories

def calculate_language_stats(repositories: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Calculate language statistics from repositories"""
    language_counts = {}
    total_size = 0
    
    for repo in repositories:
        if repo["language"]:
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

@common_bp.route("/")
def root():
    return jsonify({"message": "GitHub Toolkit API"})

@common_bp.route("/profile/<username>")
def get_profile(username: str):
    """Get complete profile analysis for a user"""
    try:
        # Fetch profile and repositories
        profile = get_user_profile(username)
        repositories = get_user_repositories(username)
        
        # Calculate additional metrics
        total_stars = sum(repo["stars"] for repo in repositories)
        total_forks = sum(repo["forks"] for repo in repositories)
        
        # Update profile with calculated values
        profile["total_stars"] = total_stars
        profile["total_forks"] = total_forks
        
        # Calculate language statistics
        language_stats = calculate_language_stats(repositories)
        
        return jsonify({
            "profile": profile,
            "repositories": repositories,
            "language_stats": language_stats,
            "contribution_stats": {
                "total_contributions": 0,
                "contributions_this_year": 0,
                "longest_streak": 0,
                "current_streak": 0,
                "contributions_by_month": []
            },
            "metrics": {
                "total_stars": total_stars,
                "total_forks": total_forks,
                "avg_stars_per_repo": total_stars / len(repositories) if repositories else 0,
                "avg_forks_per_repo": total_forks / len(repositories) if repositories else 0,
                "top_language": language_stats[0]["language"] if language_stats else None,
                "repository_count": len(repositories)
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@common_bp.route("/compare/<username1>/<username2>")
def compare_profiles(username1: str, username2: str):
    """Compare two GitHub profiles"""
    try:
        # Fetch both profiles
        profile1 = get_user_profile(username1)
        profile2 = get_user_profile(username2)
        repos1 = get_user_repositories(username1)
        repos2 = get_user_repositories(username2)
        
        # Calculate metrics for both users
        stars1 = sum(repo["stars"] for repo in repos1)
        stars2 = sum(repo["stars"] for repo in repos2)
        forks1 = sum(repo["forks"] for repo in repos1)
        forks2 = sum(repo["forks"] for repo in repos2)
        
        profile1["total_stars"] = stars1
        profile1["total_forks"] = forks1
        profile2["total_stars"] = stars2
        profile2["total_forks"] = forks2
        
        # Comparison metrics
        comparison_metrics = {
            "followers": {"user1": profile1["followers"], "user2": profile2["followers"]},
            "following": {"user1": profile1["following"], "user2": profile2["following"]},
            "public_repos": {"user1": profile1["public_repos"], "user2": profile2["public_repos"]},
            "total_stars": {"user1": stars1, "user2": stars2},
            "total_forks": {"user1": forks1, "user2": forks2},
            "avg_stars_per_repo": {
                "user1": stars1 / len(repos1) if repos1 else 0,
                "user2": stars2 / len(repos2) if repos2 else 0
            }
        }
        
        return jsonify({
            "user1": profile1,
            "user2": profile2,
            "comparison_metrics": comparison_metrics
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@common_bp.route("/repositories/<username>")
def get_repositories(username: str):
    """Get user repositories"""
    try:
        per_page = request.args.get('per_page', 100, type=int)
        repositories = get_user_repositories(username, per_page)
        return jsonify({"repositories": repositories})
    except Exception as e:
        return jsonify({"error": str(e)}), 500