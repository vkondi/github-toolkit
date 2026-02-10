# Getting Started

Get up and running with GitHub Toolkit in just a few steps.

## Prerequisites

- Node.js 18+ and yarn
- Python 3.8+
- Git
- GitHub Personal Access Token (recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd github-toolkit
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Create .env file in the root directory
# Add your GitHub token: GITHUB_TOKEN=your_token_here

# Run the Flask API server
python -m flask --app api/index run -p 5328
```

**Important**: The backend loads environment variables from the `.env` file using `python-dotenv`. Create a `.env` file in the root directory before running the backend.

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

For GitHub API authentication and rate limit details, see [GitHub API Integration](./GITHUB_API_INTEGRATION.md#authentication).

Quick setup:
```bash
# Add to your .env file in the root directory
GITHUB_TOKEN=your_token_here
```

**Note**: Without a token, you're limited to 60 requests/hour. With a token, you get 5,000 requests/hour.

## Running the Application

### Option 1: Concurrent Development (Recommended)

```bash
# Run both frontend and backend simultaneously
yarn dev
```

### Option 2: Manual Commands

```bash
# Terminal 1 - Backend
python -m flask --app api/index run -p 5328

# Terminal 2 - Frontend
yarn next-dev
```

### Option 3: Individual Services

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

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure API runs on port 5328 and frontend on port 3000
- Flask-CORS is configured in `api/app.py`

**API Rate Limits**
- Add GitHub token to `.env` to increase from 60 to 5,000 requests/hour

**User Not Found**
- Verify username exists and is public
- Check for leading/trailing spaces

**Build Errors**
```bash
yarn install  # Reinstall dependencies
yarn cache clean  # Clear cache
yarn build  # Rebuild
```

**Environment Variables Not Loading**
- Ensure `.env` is in root directory
- Verify `python-dotenv` is installed
- Restart Flask server after changing `.env`

**Python Dependencies Missing**
```bash
pip install -r requirements.txt --force-reinstall
```

**Port Already in Use**
```bash
yarn next-dev -p 3001  # Frontend on different port
python -m flask --app api/index run -p 5329  # Backend on different port
```

### Getting Help

- Check project README for general information
- Review GitHub API documentation for API issues
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors

## Next Steps

- Read the [Features](./FEATURES.md) documentation to understand available tools
- Check [Technical Details](./TECHNICAL_DETAILS.md) for architecture and tech stack information
- Review [GitHub API Integration](./GITHUB_API_INTEGRATION.md) for API endpoints and integration details
