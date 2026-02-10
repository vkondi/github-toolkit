# GitHub API Integration

GitHub Toolkit leverages the GitHub REST API to fetch user and repository data. This document explains how the integration works and the best practices used.

## API Versions & Standards

- **API Version**: 2022-11-28
- **Authentication**: Personal Access Token
- **Rate Limits**: 60 requests/hour (unauthenticated), 5,000 requests/hour (authenticated)
- **Docs**: [GitHub REST API Documentation](https://docs.github.com/en/rest)

## Authentication

### Setting Up Your GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Configure token settings:
   - **Token name**: GitHub Toolkit (or your preference)
   - **Expiration**: Choose an appropriate expiration period
   - **Scopes**: Select the following:
     - `public_repo` - Access to public repositories
     - `user` - Access to user profile information

4. Copy the generated token
5. Add to `.env` file:
   ```bash
   GITHUB_TOKEN=your_token_here
   ```

### Token Safety

- **Never commit tokens** to version control
- **Use `.env` files** for local development
- **Use environment variables** in production
- **Rotate tokens** periodically for security
- **Revoke old tokens** when no longer needed

## API Headers

All requests include proper GitHub API headers:

```python
{
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Authorization": "Bearer {token}",
    "User-Agent": "GitHub-Toolkit"
}
```

These headers ensure compatibility with the latest GitHub API features and proper authentication.

## API Endpoints Used

### User Endpoint

```
GET /users/{username}
```

Returns: Basic user profile information

- username
- name
- bio
- avatar_url
- location
- company
- blog
- twitter_username
- followers
- following
- public_repos
- created_at

### User Repositories Endpoint

```
GET /users/{username}/repos?per_page=100&sort=updated
```

Returns: List of user repositories with:

- name
- description
- html_url
- language
- stargazers_count (stars)
- forks_count (forks)
- updated_at
- size

### User Repositories with Search Endpoint

```
GET /search/repositories?q=user:{username}
```

Alternative endpoint for repository search and analysis

## Response Handling

### Successful Response (200 OK)

```json
{
  "login": "octocat",
  "id": 1,
  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  "followers": 20,
  "public_repos": 2,
  ...
}
```

### Error Handling

| Status | Error                | Meaning                                         |
| ------ | -------------------- | ----------------------------------------------- |
| 404    | Not Found            | User or repository doesn't exist                |
| 403    | Forbidden            | Rate limit exceeded or insufficient permissions |
| 401    | Unauthorized         | Invalid or expired token                        |
| 422    | Unprocessable Entity | Invalid parameters                              |
| 500    | Server Error         | GitHub API server error                         |

## Rate Limiting

### Understanding Rate Limits

- **Authenticated Requests**: 5,000 per hour
- **Unauthenticated Requests**: 60 per hour
- **Reset Time**: Hourly (check `X-RateLimit-Reset` header)

### Rate Limit Headers

All responses include rate limit information:

```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1234567890
```

### Rate Limit Best Practices

1. **Use Authentication**: Always provide a GitHub token
2. **Cache Results**: Store results to avoid repeated API calls
3. **Monitor Usage**: Track API calls to prevent hitting limits
4. **Batch Requests**: Group related requests efficiently
5. **Handle 403 Response**: Implement exponential backoff for retry logic

## Data Fetching Flow

### Profile Analysis Flow

```
User Input (GitHub username)
    ↓
GET /users/{username}
    ↓
GET /users/{username}/repos?per_page=100
    ↓
Calculate Metrics
    ├── Total Stars (sum of stargazers_count)
    ├── Total Forks (sum of forks_count)
    ├── Language Distribution (aggregate languages)
    ├── Average Stars per Repo
    └── Average Forks per Repo
    ↓
Format Response
    ↓
Frontend Displays Results
```

### Comparison Flow

```
User Input (Two GitHub usernames)
    ↓
GET /users/{username1} + Repos
    GET /users/{username2} + Repos
    ↓
Calculate Metrics for Both Users
    ├── Followers comparison
    ├── Following comparison
    ├── Public repos comparison
    ├── Stars comparison
    ├── Forks comparison
    └── Determine winners
    ↓
Format Comparison Response
    ↓
Frontend Displays Side-by-Side Comparison
```

## API Integration Code Examples

### Basic Request (Python)

```python
import requests

headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Authorization": f"Bearer {token}",
    "User-Agent": "GitHub-Toolkit"
}

response = requests.get(
    f"https://api.github.com/users/{username}",
    headers=headers
)

if response.status_code == 200:
    user_data = response.json()
else:
    # Handle error
    print(f"Error: {response.status_code}")
```

### Fetching Repositories

```python
repos_response = requests.get(
    f"https://api.github.com/users/{username}/repos",
    params={"per_page": 100, "sort": "updated"},
    headers=headers
)

repositories = repos_response.json()
```

## Troubleshooting API Issues

**Rate Limit Exceeded (403)**
- Wait until rate limit reset time or add GitHub token

**User Not Found (404)**
- Verify username exists and is spelled correctly

**Invalid Token (401)**
- Check token validity, regenerate if needed

**Network Timeout**
- Check network connection, GitHub may be experiencing issues

**Incomplete Data**
- Verify repository visibility settings, some repos may be private

## API Documentation References

- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [Getting Started with REST API](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api)
- [Users API](https://docs.github.com/en/rest/users)
- [Repositories API](https://docs.github.com/en/rest/repos)
- [Authentication](https://docs.github.com/en/rest/authentication)
- [Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
