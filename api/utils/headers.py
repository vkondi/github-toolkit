"""
GitHub API Headers Utility Module

Provides reusable header construction and configuration for GitHub API requests.
"""

import os
from typing import Dict, Optional

# GitHub API configuration
GITHUB_API_BASE = "https://api.github.com"
GITHUB_API_VERSION = "2022-11-28"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")


def get_github_headers(authorization: bool = True, custom_headers: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    """
    Build standard GitHub API headers.
    
    Args:
        authorization (bool): Include authorization token if available
        custom_headers (Optional[Dict[str, str]]): Additional headers to merge
    
    Returns:
        Dict[str, str]: GitHub API headers
    """
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
    }
    
    if authorization and GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    
    if custom_headers:
        headers.update(custom_headers)
    
    return headers


def get_github_api_base() -> str:
    """Get the GitHub API base URL."""
    return GITHUB_API_BASE


def get_github_token() -> str:
    """Get the GitHub token from environment."""
    return GITHUB_TOKEN
