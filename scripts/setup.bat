@echo off
REM GitHub Toolkit Setup Script for Windows

echo 🚀 Setting up GitHub Toolkit...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
npm install

REM Install api dependencies
echo 🐍 Installing Python dependencies...
cd api
pip install -r requirements.txt

REM Create environment files
echo ⚙️ Creating environment files...
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > ..\.env.local
echo GITHUB_TOKEN=your_github_token_here > .env

cd ..

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Add your GitHub token to api\.env
echo 2. Start the api: start_backend.bat
echo 3. Start the frontend: start_frontend.bat
echo 4. Open http://localhost:3000 in your browser
echo.
echo 🎉 Happy analyzing!
pause
