# Technical Details

Learn about the tech stack, architecture, and API endpoints used in GitHub Toolkit.

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router for modern, server-side rendering capabilities
- **TypeScript** - Type-safe development with full IDE support
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Chart.js** - Powerful data visualization library for charts and graphs
- **Lucide React** - Beautiful, customizable SVG icon library
- **React 18.2** - Latest React with concurrent features

### Backend
- **Flask** - Lightweight Python web framework for building REST APIs
- **requests** - HTTP client library for making GitHub API calls
- **Flask-CORS** - Cross-origin resource sharing for frontend-backend communication
- **python-dotenv** - Environment variable management for configuration
- **Python 3.8+** - Modern Python with async support

### External APIs
- **GitHub REST API v2022-11-28** - Official GitHub API for accessing user and repository data

### Design Principles

- **Dedicated Routes**: Each tool has its own URL route for direct access and bookmarkability
- **Reusable Components**: Components are modular and can be combined for different views
- **Server-Side Rendering**: Next.js App Router enables server-side rendering for better performance
- **Type Safety**: Full TypeScript implementation prevents runtime errors
- **Responsive Design**: Mobile-first approach using Tailwind CSS utilities
- **Accessibility**: Semantic HTML and ARIA labels for accessibility features

### Service-Oriented Architecture

- **Service Layer**: `GitHubService` class provides a unified interface for all GitHub API interactions
- **Reusable Utilities**: Common patterns like headers and metric calculations are centralized
- **Clean Routes**: Route handlers focus on HTTP concerns and delegate business logic to services
- **Single Source of Truth**: GitHub API configuration and error handling are defined once
- **Easy Extension**: New GitHub API features are added to the service, not scattered across routes

### Architecture Benefits

- **Maintainability**: Clear separation of concerns makes code easy to understand and modify
- **Reusability**: Metrics and utilities can be shared across multiple endpoints
- **Testability**: Services can be tested independently
- **Scalability**: New features can be added without modifying existing code
- **Error Handling**: Centralized error handling ensures consistent responses

## API Endpoints

### Base URL
All API endpoints are prefixed with `/api`

### Profile Analysis
- `GET /api/profile/{username}` - Get complete profile analysis including user info, repositories, and statistics
- `GET /api/repositories/{username}` - Get comprehensive list of user repositories with metrics

### Profile Comparison
- `GET /api/compare/{username1}/{username2}` - Compare two profiles side-by-side with metrics comparison

### Health Check
- `GET /api/` - Check API server health and connectivity

## Data Flow

### Profile Analysis Flow

1. User enters GitHub username in search form
2. Frontend sends request to `/api/profile/{username}`
3. Backend service authenticates with GitHub API
4. Service fetches user profile, repositories, and calculates metrics
5. Backend returns comprehensive data object
6. Frontend displays profile card, stats grid, and visualizations

### Comparison Flow

1. User enters two GitHub usernames
2. Frontend sends request to `/api/compare/{username1}/{username2}`
3. Backend fetches both profiles and calculates comparison metrics
4. Service identifies winners for each metric category
5. Backend returns side-by-side comparison data
6. Frontend renders comparison view with visual indicators

## Performance Considerations

### Frontend
- **Image Optimization**: Next.js Image component for automatic optimization
- **Code Splitting**: Next.js App Router enables route-based code splitting
- **Caching**: Browser and server-side caching for repeated requests
- **Responsive Images**: Automatic srcset generation for different screen sizes

### Backend
- **Request Caching**: Minimizes repeated GitHub API calls
- **Efficient Metrics**: Precomputed metrics reduce calculation time
- **Error Handling**: Graceful error handling prevents server crashes
- **Rate Limiting**: Respects GitHub API rate limits

### Environment Variables
- `GITHUB_TOKEN`: Personal access token with `public_repo` and `user` scopes


