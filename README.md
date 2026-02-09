# GitHub Toolkit

A comprehensive GitHub toolkit built with Next.js frontend and Flask api. Analyze GitHub profiles, view detailed metrics, visualize data with charts, and compare profiles side-by-side.

## Features

### 🎯 **Dashboard Interface**
- **Tool Dashboard**: Clean landing page with feature cards for all available tools
- **Easy Navigation**: Intuitive interface to access different GitHub analysis tools
- **Scalable Design**: Ready for future tool additions with consistent card layout

### 🔍 **Available Tools**
- **Profile Analyzer**: Get detailed insights into any GitHub user's profile, repositories, and activity metrics
- **Compare Profiles**: Compare two GitHub profiles side-by-side for hiring decisions and team analysis
- **Repository Insights**: Deep dive into repository statistics, contributors, and project health metrics (Coming Soon)
- **Team Analytics**: Analyze team performance, collaboration patterns, and productivity metrics (Coming Soon)

### 🚀 **Core Capabilities**
- **Repository Statistics**: View stars, forks, languages, and repository metrics
- **Data Visualization**: Interactive charts showing language distribution and other metrics
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Real-time Data**: Live data from GitHub API
- **Lean Architecture**: Clean, efficient codebase with minimal dependencies

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Lucide React** - Beautiful icons

### Backend
- **Flask** - Lightweight Python web framework
- **requests** - HTTP client for GitHub API
- **Flask-CORS** - Cross-origin resource sharing
- **python-dotenv** - Environment variable management
- **GitHub REST API v2022-11-28** - Official GitHub REST API with recommended headers

## Setup Instructions

### Prerequisites

- Node.js 18+ and yarn
- Python 3.8+
- Git
- GitHub Personal Access Token (recommended)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd github-toolkit
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
# Create .env file in the root directory
cp .env.example .env

# Edit .env and add your GitHub token
# GITHUB_TOKEN=your_github_token_here

# Run the Flask API server
python -m flask --app api/index run -p 5328
```

**Important**: The backend now properly loads environment variables from the `.env` file using `python-dotenv`. Make sure to create your `.env` file based on `.env.example` before running the backend.

### 3. Frontend Setup

```bash
# Install dependencies
yarn

# Run the development server
yarn next-dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5328

## GitHub API Token Setup

To use the GitHub API effectively, you'll need a personal access token:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with the following scopes:
   - `public_repo` (for public repository access)
   - `user` (for user profile information)
3. Add the token to your `.env` file in the root directory:
   ```bash
   GITHUB_TOKEN=your_token_here
   ```

**Note**: Without a token, you'll be limited to 60 requests per hour. With a token, you get 5,000 requests per hour.

### API Best Practices
This project follows GitHub's recommended API best practices:
- Uses `Accept: application/vnd.github+json` header
- Includes `X-GitHub-Api-Version: 2022-11-28` header
- Properly authenticates using personal access tokens via environment variables
- Reference: [GitHub REST API Documentation](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28)

## Project Architecture

### Backend Structure
The backend is organized using a service-oriented architecture that promotes code reuse and maintainability:

```
api/
├── services/
│   └── github.py          # Centralized GitHub API service with unified interface
├── utils/
│   ├── headers.py         # Shared GitHub API headers configuration
│   └── metrics.py         # Reusable metric calculation functions
├── routes/
│   └── common_routes.py   # Route handlers that delegate to services
├── app.py                 # Flask application factory
├── index.py               # Application entry point
└── config.py              # Configuration and environment setup
```

**Architecture Benefits:**
- **Service Layer**: `GitHubService` class provides a unified interface for all GitHub API interactions
- **Reusable Utilities**: Common patterns like headers and metric calculations are centralized
- **Clean Routes**: Route handlers focus on HTTP concerns and delegate business logic to services
- **Single Source of Truth**: GitHub API configuration and error handling are defined once
- **Easy Extension**: New GitHub API features are added to the service, not scattered across routes

### Frontend Structure
```
app/
├── page.tsx                    # Landing page with tool dashboard
├── profile-analyzer/
│   └── page.tsx               # Profile analysis page at /profile-analyzer
├── compare-profiles/
│   └── page.tsx               # Profile comparison page at /compare-profiles
├── layout.tsx                 # Root layout
└── globals.css                # Global styles

components/
├── ProfileAnalyzer.tsx        # Profile analysis component
├── CompareProfiles.tsx        # Profile comparison component
├── ProfileCard.tsx            # Reusable profile display component
├── RepositoryList.tsx         # Repository listing component
├── LanguageChart.tsx          # Data visualization component
└── ...                        # Other reusable components
```

**Frontend Design:**
- **Dedicated Routes**: Each tool has its own URL route for direct access
- **Shareable URLs**: Users can bookmark and share tool links directly
- **SEO-Friendly**: Proper page routing with Next.js App Router
- **Intuitive Navigation**: Clear URL structure with back navigation to dashboard

## API Endpoints

### Base URL
All API endpoints are prefixed with `/api`

### Profile Analysis
- `GET /api/profile/{username}` - Get complete profile analysis
- `GET /api/repositories/{username}` - Get user repositories

### Profile Comparison
- `GET /api/compare/{username1}/{username2}` - Compare two profiles

### Root Endpoint
- `GET /api/` - API health check

## Usage

### Navigation
The application provides two main tools accessible from the landing page:

**Landing Page (`/`)** - Browse all available tools with feature descriptions
**Profile Analyzer (`/profile-analyzer`)** - Analyze individual GitHub profiles
**Compare Profiles (`/compare-profiles`)** - Compare two GitHub users side-by-side

### Profile Analysis
From the Profile Analyzer page, enter a GitHub username to view:
- **Profile Information**: Avatar, bio, location, company, and social links
- **Statistics**: Follower count, repository count, total stars and forks
- **Language Distribution**: Pie chart visualization of programming languages used
- **Repository List**: Recent repositories with metrics (stars, forks, language, size)
- **Key Metrics**: Average stats per repository, most-used language, repository count

### Profile Comparison
From the Compare Profiles page, enter two GitHub usernames to see:
- **Side-by-side Profile Information**: For both users
- **Metrics Comparison**: Followers, repositories, stars, forks side-by-side
- **Winner Indicators**: Visual markers showing which user leads in each metric category
- **Quick Comparison**: Easily identify strengths for hiring or research purposes

## Features in Detail

### 🎯 **Dashboard Interface**
- **Tool Cards**: Beautiful feature cards with icons, descriptions, and feature lists
- **Navigation**: Easy access to all tools with back button navigation
- **Scalability**: Ready for future tool additions with consistent design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Optimized Images**: Uses Next.js Image component for automatic optimization and performance

### 🔍 **Profile Analysis**
- **Profile Information**: Avatar, bio, location, company, social links
- **Statistics**: Followers, following, stars, forks, repository count
- **Language Distribution**: Pie chart showing programming languages used
- **Repository List**: Recent repositories with details
- **Metrics**: Average stars/forks per repo, top language, etc.

### 👥 **Profile Comparison**
- **Side-by-side Metrics**: Compare followers, repositories, stars, forks
- **Winner Indicators**: Visual indicators showing which user leads in each metric
- **Comprehensive Analysis**: All key metrics compared in one view

### 🚀 **Future Tools** (Planned)
- **Repository Insights**: Deep dive into individual repository statistics
- **Team Analytics**: Team performance and collaboration analysis
- **Advanced Metrics**: More sophisticated GitHub data analysis tools

## Development

### Running in Development Mode

**Option 1: Concurrent Development (Recommended)**
```bash
# Run both frontend and backend simultaneously
yarn dev
```

**Option 2: Manual Commands**
```bash
# Terminal 1 - Backend
python -m flask --app api/index run -p 5328

# Terminal 2 - Frontend
yarn next-dev
```

**Option 3: Individual Services**
```bash
# Backend only
yarn flask-dev

# Frontend only
yarn next-dev
```

### Building for Production

```bash
# Build frontend
yarn build

# Start production server
yarn start
```

## Customization

### Backend Enhancements

#### Adding New GitHub API Features
To add new GitHub API functionality:

1. Extend the `GitHubService` class in `api/services/github.py` with a new method
2. Use the `get_github_headers()` utility from `api/utils/headers.py` for API headers
3. Use the `_make_request()` method for consistent error handling
4. Create a new route in `api/routes/common_routes.py` that leverages the service method

#### Reusing Metric Calculations
For metrics used across multiple endpoints:

1. Add the calculation function to `api/utils/metrics.py`
2. Import it in the route handlers that need it
3. This centralizes logic and ensures consistency across endpoints

**Example: Adding a new GitHub metric**
```python
# In api/utils/metrics.py
def calculate_contribution_streak(repositories: List[Dict[str, Any]]) -> int:
    """Calculate days since last contribution"""
    # Implementation
    return streak_days

# In api/routes/common_routes.py
from utils.metrics import calculate_contribution_streak
metrics = calculate_contribution_streak(repositories)
```

### Frontend Enhancements
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Component-specific styles can be added using Tailwind classes

## Git Configuration

### Python Cache Files
The repository's `.gitignore` is configured to exclude all Python cache files at any directory level:
```
**/__pycache__/  # All __pycache__ directories
**/*.pyc         # All compiled Python files
```

This keeps the repository clean by automatically ignoring Python compiled artifacts.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the api is running on port 5328 and frontend on port 3000
2. **API Rate Limits**: Add a GitHub token to your `.env` file to increase rate limits from 60 to 5,000 requests/hour
3. **User Not Found**: Verify the GitHub username exists and is public
4. **Build Errors**: Ensure all dependencies are installed correctly
5. **Environment Variables Not Loading**: Ensure `.env` file is in the root directory and `python-dotenv` is installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.