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

## API Best Practices

This project follows GitHub's recommended API best practices:
- Uses `Accept: application/vnd.github+json` header
- Includes `X-GitHub-Api-Version: 2022-11-28` header
- Properly authenticates using personal access tokens via environment variables
- Reference: [GitHub REST API Documentation](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28)

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

#### 1. CORS Errors
- Make sure the API is running on port 5328 and frontend on port 3000
- Check that Flask-CORS is properly configured

#### 2. API Rate Limits
- Add a GitHub token to your `.env` file to increase rate limits from 60 to 5,000 requests/hour
- Without a token, you may encounter rate limit errors when analyzing multiple profiles

#### 3. User Not Found
- Verify the GitHub username exists and is public
- Check that the username doesn't have leading/trailing spaces

#### 4. Build Errors
- Ensure all dependencies are installed correctly: `yarn install`
- Clear Node cache: `yarn cache clean`
- Rebuild: `yarn build`

#### 5. Environment Variables Not Loading
- Ensure `.env` file is in the root directory (not in any subdirectory)
- Verify `python-dotenv` is installed: `pip install python-dotenv`
- For Flask, restart the server after changing `.env` file
- Use `export` command on Linux/Mac or `set` command on Windows for temporary testing

#### 6. Python Dependencies Missing
```bash
# Reinstall all Python dependencies
pip install -r requirements.txt --force-reinstall
```

#### 7. Port Already in Use
If port 3000 or 5328 is already in use:
```bash
# Frontend on different port
yarn next-dev -p 3001

# Backend on different port
python -m flask --app api/index run -p 5329
```

### Getting Help

1. Check the project README for general information
2. Review the GitHub API documentation for API-related questions
3. Check browser console (F12) for frontend errors
4. Check terminal output for backend errors

## Next Steps

- Read the [Features](./FEATURES.md) documentation to understand available tools
- Check [Technical Details](./TECHNICAL_DETAILS.md) for architecture and tech stack information
- Review [GitHub API Integration](./GITHUB_API_INTEGRATION.md) for API endpoints and integration details
