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
- **GitHub API** - Official GitHub REST API

## Project Structure

```
github-toolkit/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ProfileCard.tsx   # Profile display component
│   ├── StatsGrid.tsx     # Statistics grid
│   ├── LanguageChart.tsx # Language distribution chart
│   ├── RepositoryList.tsx # Repository list
│   ├── ComparisonView.tsx # Profile comparison
│   ├── ProfileAnalyzer.tsx # Profile analyzer tool page
│   └── CompareProfiles.tsx # Compare profiles tool page
├── types/                 # TypeScript type definitions
│   └── index.ts
├── api/              # Flask api
│   ├── flask_main.py    # Flask application (main api)
│   └── requirements.txt # Python dependencies
├── scripts/              # Setup scripts
│   ├── setup.sh         # Linux/Mac setup script
│   └── setup.bat        # Windows setup script
├── start_backend.bat    # Backend startup script
├── start_frontend.bat   # Frontend startup script
├── package.json         # Node.js dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
├── postcss.config.js    # PostCSS configuration
├── .gitignore           # Git ignore rules
└── README.md           # This file
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd github-toolkit
```

### 2. Backend Setup

```bash
# Navigate to api directory
cd api

# Install dependencies (no virtual environment needed for simplicity)
pip install -r requirements.txt

# Set up environment variables
# Create .env file in api directory
echo "GITHUB_TOKEN=your_github_token_here" > .env

# Run the api server
python flask_main.py
```

**Or use the setup script:**
```bash
# Windows
scripts\setup.bat

# Linux/Mac
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 3. Frontend Setup

```bash
# Navigate back to root directory
cd ..

# Install dependencies
npm install

# Set up environment variables
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run the development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## GitHub API Token Setup

To use the GitHub API effectively, you'll need a personal access token:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with the following scopes:
   - `public_repo` (for public repository access)
   - `user` (for user profile information)
3. Add the token to your api `.env` file:
   ```
   GITHUB_TOKEN=your_token_here
   ```

**Note**: Without a token, you'll be limited to 60 requests per hour. With a token, you get 5,000 requests per hour.

## API Endpoints

### Profile Analysis
- `GET /profile/{username}` - Get complete profile analysis
- `GET /repositories/{username}` - Get user repositories

### Profile Comparison
- `GET /compare/{username1}/{username2}` - Compare two profiles

## Usage

### 🏠 **Dashboard Navigation**
1. **Landing Page**: Access the main dashboard with all available tools
2. **Tool Selection**: Click on any feature card to access specific tools
3. **Navigation**: Use back buttons to return to the dashboard
4. **Future Tools**: "Coming Soon" tools are displayed but not yet accessible

### 🔍 **Profile Analysis**
1. Click on "Profile Analyzer" from the dashboard
2. Enter a GitHub username in the search field
3. Click "Analyze Profile" to get detailed insights
4. View profile information, statistics, language distribution, and repositories

### 👥 **Profile Comparison**
1. Click on "Compare Profiles" from the dashboard
2. Enter two GitHub usernames in the respective fields
3. Click "Compare Profiles" to see side-by-side comparison
4. View metrics comparison with winner indicators

### 🚀 **Future Tools** (Coming Soon)
- **Repository Insights**: Deep analysis of individual repositories
- **Team Analytics**: Team performance and collaboration metrics

## Features in Detail

### 🎯 **Dashboard Interface**
- **Tool Cards**: Beautiful feature cards with icons, descriptions, and feature lists
- **Navigation**: Easy access to all tools with back button navigation
- **Scalability**: Ready for future tool additions with consistent design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

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

**Option 1: Manual Commands**
```bash
# Terminal 1 - Backend
cd api
python flask_main.py

# Terminal 2 - Frontend
npm run dev
```

**Option 2: Batch Files (Windows)**
```bash
# Start api
start_backend.bat

# Start frontend (in another terminal)
start_frontend.bat
```

**Option 3: Setup Scripts**
```bash
# Windows
scripts\setup.bat

# Linux/Mac
./scripts/setup.sh
```

### Building for Production

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## Customization

### Adding New Metrics
1. Update the api API in `api/main.py`
2. Add new fields to the TypeScript types in `types/index.ts`
3. Update the frontend components to display the new metrics

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles
- Component-specific styles can be added using Tailwind classes

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the api is running on port 8000 and frontend on port 3000
2. **API Rate Limits**: Add a GitHub token to increase rate limits
3. **User Not Found**: Verify the GitHub username exists and is public
4. **Build Errors**: Ensure all dependencies are installed correctly

### Debug Mode

Enable debug logging by setting environment variables:
```bash
# Backend
export DEBUG=1

# Frontend
export NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation at http://localhost:8000/docs
3. Open an issue on GitHub

## UI/UX Design

### 🎨 **Dashboard Design**
- **Modern Interface**: Clean, professional dashboard with feature cards
- **Color-coded Tools**: Each tool has its own color scheme for easy identification
- **Responsive Layout**: Optimized for all screen sizes and devices
- **Intuitive Navigation**: Clear back buttons and tool selection
- **Future-ready**: Scalable design for easy addition of new tools

### 🚀 **User Experience**
- **One-click Access**: Direct navigation to specific tools from dashboard
- **Consistent Design**: Uniform card layout across all tools
- **Visual Feedback**: Hover effects and loading states
- **Error Handling**: Clear error messages and user guidance

## Roadmap

### ✅ **Completed**
- [x] Dashboard interface with feature cards
- [x] Profile Analyzer tool
- [x] Compare Profiles tool
- [x] Responsive design
- [x] Navigation system

### 🚧 **In Progress**
- [ ] Repository Insights tool
- [ ] Team Analytics tool

### 📋 **Planned**
- [ ] Contribution graph visualization
- [ ] Repository activity timeline
- [ ] Advanced filtering and sorting
- [ ] Export functionality (PDF, CSV)
- [ ] Historical data tracking
- [ ] User authentication
- [ ] Saved analyses
- [ ] Custom dashboards