# Features

GitHub Toolkit provides a comprehensive suite of tools for analyzing GitHub profiles and comparing developers.

## 🎯 Dashboard Interface

The landing page showcases all available tools with a clean, modern dark theme:

- **Tool Cards**: Clean, minimal cards showing title, subtitle, and icon for each tool
- **Easy Navigation**: Logo and title in header are clickable and navigate to home page
- **Dark Theme**: Modern dark background with vibrant neon accent colors
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Optimized Performance**: Uses Next.js Image component for automatic optimization

## 🔍 Profile Analyzer

Get detailed insights into any GitHub user's profile:

### Profile Information

- **Avatar**: User's profile picture with circular border
- **Name & Username**: Display name and @username
- **Bio**: User's GitHub bio if available
- **Location**: Geographic location if provided
- **Company**: Company affiliation if available
- **Social Links**: Links to personal website, blog, and Twitter if available

### Statistics

- **Followers**: Number of GitHub followers
- **Following**: Number of users being followed
- **Total Stars**: Cumulative stars across all repositories
- **Total Forks**: Cumulative forks across all repositories
- **Repository Count**: Total number of repositories
- **Join Date**: When the user joined GitHub

### Language Distribution

- **Interactive Chart**: Doughnut chart showing programming language distribution
- **Color-coded**: Uses neon color palette for visual appeal
- **Percentage Display**: Shows exact percentage for each language
- **Top Languages**: Easily identify primary programming languages used

### Repository List

- **Recent Repositories**: Shows up to 10 most recent repositories
- **Detailed Metrics**: For each repository:
  - Repository name with link to GitHub
  - Description (limited to 2 lines)
  - Primary programming language
  - Star count
  - Fork count
  - Last updated date
  - Repository size (KB/MB/GB format)
- **Mobile-Responsive**: Information properly wraps and organizes on mobile devices

### Key Metrics

- **Comprehensive Stats**: Color-coded statistics grid showing:
  - Total stars across all repos
  - Total forks across all repos
  - Average stars per repository
  - Average forks per repository
  - Repository count
  - Top programming language

## 👥 Profile Comparison

Compare two GitHub profiles side-by-side for hiring decisions and team analysis:

### Profile Cards

- **Side-by-side Avatars**: Shows profile pictures for both users
- **Summary Info**: Name, username, and bio for each user
- **Visual Organization**: Clear separation between two users being compared

### Metrics Comparison

Compare across multiple dimensions:

- **Followers**: Total follower count for each user
- **Following**: People each user is following
- **Public Repositories**: Number of public repositories
- **Total Stars**: Cumulative stars across all repos
- **Total Forks**: Cumulative forks across all repos
- **Avg Stars/Repo**: Average stars per repository
- **Winner Indicators**: Visual markers showing which user leads in each metric
  - Green highlight for the winner
  - Equal score indicator for ties
  - Context-aware coloring

### Decision Support

- **Quick Insights**: Identify strengths and weaknesses at a glance
- **Hiring Focus**: Perfect for comparing candidates
- **Research Focus**: Useful for understanding developer profiles
- **Fair Comparison**: Normalized metrics for equal comparison

## 🎨 User Experience Enhancements

### Dark Theme with Neon Accents

- **Radioactive Lime** (#CCFF00): Primary color for main CTAs, headers, and key text
- **Electric Magenta** (#FF00FF): Secondary accents for alternative emphasis
- **Cyan Glitch** (#00F0FF): Tertiary color for data visualization and borders
- **Dark Background** (#050505): Main page background with infinite depth effect
- **Elevated Surfaces** (#1A1A1A, #121212): Cards and input fields

### Navigation Features

- **Sticky Header**: Header remains visible while scrolling
- **Clickable Logo**: Logo and title navigate back to home page from any page
- **No Back Buttons**: Clean navigation without visible back buttons
- **Smart Routing**: All pages have direct URLs for bookmarking

### Mobile Optimization

- **Responsive Layouts**: Adaptive grid layouts for all screen sizes
- **Touch-Friendly**: Large touch targets and comfortable spacing
- **Optimized Typography**: Responsive font sizes for readability
- **Flexible Metadata**: Repository details organize efficiently on mobile

### Accessibility & Performance

- **Smooth Scrolling**: HTML smooth scroll behavior throughout
- **Scroll-to-Top Button**:
  - Appears after scrolling 300px
  - Smooth animated transitions
  - Accessible with keyboard navigation
- **Image Optimization**: Automatic optimization via Next.js Image component
- **Fast Loading**: Minimal dependencies and efficient code structure

## 🌟 Core Capabilities

- **Real-time Data**: Live data from GitHub API
- **Detailed Analytics**: Comprehensive metrics and statistics
- **Beautiful Visualizations**: Interactive charts and data displays
- **Reliable Integration**: Proper GitHub API authentication and error handling
- **Responsive Interface**: Works on all devices and screen sizes
