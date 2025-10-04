#!/bin/bash

# GitHub Toolkit Setup Script

echo "🚀 Setting up GitHub Toolkit..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "🐍 Installing Python dependencies..."
cd backend
pip3 install -r requirements.txt

# Create environment files
echo "⚙️ Creating environment files..."
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > ../.env.local
echo "GITHUB_TOKEN=your_github_token_here" > .env

cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add your GitHub token to backend/.env"
echo "2. Start the backend: cd backend && python flask_main.py"
echo "3. Start the frontend: npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "🎉 Happy analyzing!"
