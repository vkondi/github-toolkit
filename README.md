# GitHub Toolkit

A comprehensive GitHub toolkit built with Next.js frontend and Flask API. Analyze GitHub profiles, view detailed metrics, visualize data with charts, and compare profiles side-by-side.

## 📚 Table of Contents

- **[Getting Started](./docs/GETTING_STARTED.md)** - Installation, setup, and troubleshooting guide
- **[Features](./docs/FEATURES.md)** - Detailed feature descriptions and capabilities
- **[Code Quality](./docs/CODE_QUALITY.md)** - Code quality tools, linting, formatting, and type safety
- **[Technical Details](./docs/TECHNICAL_DETAILS.md)** - Tech stack, architecture, and deployment
- **[GitHub API Integration](./docs/GITHUB_API_INTEGRATION.md)** - API endpoints and integration details

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and yarn
- Python 3.8+
- Git
- GitHub Personal Access Token (recommended)

### Setup

**1. Clone the repository:**

```bash
git clone <repository-url>
cd github-toolkit
```

**2. Backend setup:**

```bash
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GitHub token
# GITHUB_TOKEN=your_token_here
python -m flask --app api/index run -p 5328
```

**3. Frontend setup (new terminal):**

```bash
yarn
yarn next-dev
```

**4. Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5328

## 🎯 Available Tools

- **Profile Analyzer** (`/profile-analyzer`) - Analyze individual GitHub profiles with detailed metrics
- **Compare Profiles** (`/compare-profiles`) - Compare two GitHub users side-by-side

## 💻 Development

**Run both frontend and backend concurrently:**

```bash
yarn dev
```

Or run them separately:

```bash
# Terminal 1
python -m flask --app api/index run -p 5328

# Terminal 2
yarn next-dev
```

**Build for production:**

```bash
yarn build
yarn start
```

## 📖 Learn More

- For detailed setup and troubleshooting, see [Getting Started](./docs/GETTING_STARTED.md)
- For feature descriptions, see [Features](./docs/FEATURES.md)
- For code quality standards, see [Code Quality](./docs/CODE_QUALITY.md)
- For technical architecture, see [Technical Details](./docs/TECHNICAL_DETAILS.md)
- For API integration details, see [GitHub API Integration](./docs/GITHUB_API_INTEGRATION.md)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and commit (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Use TypeScript for frontend code
- Maintain clean, readable code with proper comments
- Test your changes thoroughly before submitting
- Follow the existing code style and conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by Vishwajeet Kondi**
