"""
GitHub API Service Module

Provides a unified service for all GitHub API interactions.
Centralizes GitHub API calls and error handling.
"""

import requests
from typing import Dict, List, Any
from utils.headers import get_github_headers, get_github_api_base


class GitHubService:
    """Service class for GitHub API interactions."""
    
    def __init__(self):
        """Initialize GitHub service with API configuration."""
        self.api_base = get_github_api_base()
    
    def _make_request(self, url: str, headers: Dict[str, str] = None) -> Dict[str, Any]:
        """
        Make authenticated request to GitHub API.
        
        Args:
            url (str): API endpoint URL
            headers (Dict[str, str]): Optional custom headers
        
        Returns:
            Dict[str, Any]: JSON response data
            
        Raises:
            Exception: Various GitHub API errors
        """
        if not headers:
            headers = get_github_headers()
        
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
                raise Exception(f"GitHub API error: {e.response.status_code}")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request failed: {str(e)}")
    
    def get_user_profile(self, username: str) -> Dict[str, Any]:
        """
        Fetch user profile data.
        
        Args:
            username (str): GitHub username
        
        Returns:
            Dict[str, Any]: User profile data
        """
        url = f"{self.api_base}/users/{username}"
        data = self._make_request(url)
        
        return {
            "username": data["login"],
            "name": data.get("name"),
            "bio": data.get("bio"),
            "avatar_url": data["avatar_url"],
            "followers": data["followers"],
            "following": data["following"],
            "public_repos": data["public_repos"],
            "created_at": data["created_at"],
            "updated_at": data["updated_at"],
            "location": data.get("location"),
            "company": data.get("company"),
            "blog": data.get("blog"),
            "twitter_username": data.get("twitter_username")
        }
    
    def get_user_repositories(self, username: str, per_page: int = 100) -> List[Dict[str, Any]]:
        """
        Fetch user repositories.
        
        Args:
            username (str): GitHub username
            per_page (int): Number of repositories per page (default: 100)
        
        Returns:
            List[Dict[str, Any]]: List of repository data
        """
        url = f"{self.api_base}/users/{username}/repos"
        params = {"per_page": per_page, "sort": "updated", "direction": "desc"}
        
        headers = get_github_headers()
        
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            repos_data = response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                raise Exception("User not found")
            elif e.response.status_code == 403:
                raise Exception("Rate limit exceeded")
            else:
                raise Exception(f"GitHub API error: {e.response.status_code}")
        
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


# Singleton instance
_github_service = None


def get_github_service() -> GitHubService:
    """
    Get or create GitHub service singleton.
    
    Returns:
        GitHubService: GitHub service instance
    """
    global _github_service
    if _github_service is None:
        _github_service = GitHubService()
    return _github_service
