from flask import Blueprint, request, jsonify
from services.github import get_github_service
from utils.metrics import calculate_language_stats, calculate_profile_metrics

# Create a Blueprint for common routes
common_bp = Blueprint('common', __name__)

# Initialize GitHub service
github_service = get_github_service()

@common_bp.route("/")
def root():
    return jsonify({"message": "GitHub Toolkit API"})

@common_bp.route("/profile/<username>")
def get_profile(username: str):
    """Get complete profile analysis for a user"""
    try:
        # Fetch profile and repositories
        profile = github_service.get_user_profile(username)
        repositories = github_service.get_user_repositories(username)
        
        # Calculate language statistics
        language_stats = calculate_language_stats(repositories)
        
        # Calculate profile metrics
        metrics = calculate_profile_metrics(profile, repositories)
        
        # Update profile with calculated values
        profile.update({
            "total_stars": metrics["total_stars"],
            "total_forks": metrics["total_forks"]
        })
        
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
            "metrics": metrics
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@common_bp.route("/compare/<username1>/<username2>")
def compare_profiles(username1: str, username2: str):
    """Compare two GitHub profiles"""
    try:
        # Fetch both profiles
        profile1 = github_service.get_user_profile(username1)
        profile2 = github_service.get_user_profile(username2)
        repos1 = github_service.get_user_repositories(username1)
        repos2 = github_service.get_user_repositories(username2)
        
        # Calculate metrics for both users
        metrics1 = calculate_profile_metrics(profile1, repos1)
        metrics2 = calculate_profile_metrics(profile2, repos2)
        
        # Update profiles with metrics
        profile1.update({
            "total_stars": metrics1["total_stars"],
            "total_forks": metrics1["total_forks"]
        })
        profile2.update({
            "total_stars": metrics2["total_stars"],
            "total_forks": metrics2["total_forks"]
        })
        
        # Comparison metrics
        comparison_metrics = {
            "followers": {"user1": profile1["followers"], "user2": profile2["followers"]},
            "following": {"user1": profile1["following"], "user2": profile2["following"]},
            "public_repos": {"user1": profile1["public_repos"], "user2": profile2["public_repos"]},
            "total_stars": {"user1": metrics1["total_stars"], "user2": metrics2["total_stars"]},
            "total_forks": {"user1": metrics1["total_forks"], "user2": metrics2["total_forks"]},
            "avg_stars_per_repo": {
                "user1": metrics1["avg_stars_per_repo"],
                "user2": metrics2["avg_stars_per_repo"]
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
        repositories = github_service.get_user_repositories(username, per_page)
        return jsonify({"repositories": repositories})
    except Exception as e:
        return jsonify({"error": str(e)}), 500