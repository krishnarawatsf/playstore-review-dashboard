
# Play Store Review Analyzer Dashboard

A modern, fully-featured dashboard for analyzing Play Store reviews with AI-powered sentiment analysis. Built with React, Vite, and Tailwind CSS, with N8N integration for workflow automation.

**[Design on Figma](https://www.figma.com/design/ZOyLTdOtJKVZuZddhs7WHv/Access-N8N-Cloud-App)**

## Features

- 📊 **Interactive Analytics**: Real-time sentiment analysis visualizations
- 🔄 **N8N Integration**: Automated workflows for data fetching and report export
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Built with Radix UI components and Tailwind CSS
- ⚡ **Fast Performance**: Vite for lightning-fast builds and development
- ☁️ **Cloud Ready**: Deployed on Vercel, connected to N8N Cloud
- 🔐 **Private Repository**: Secure GitHub private repository setup

## Tech Stack

- **Frontend**: React 18.3 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 4.0.11 + CSS Modules
- **UI Components**: Radix UI
- **Icons**: Lucide React, MUI Icons
- **Automation**: N8N workflows
- **Deployment**: Vercel
- **Version Control**: GitHub (private)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager
- N8N instance (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/leap-product-dashboard.git
cd leap-product-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy example env file
cp .env.example .env.local

# Edit with your N8N configuration
nano .env.local
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check
```

### Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main App component
│   ├── components/             # Reusable UI components
│   │   ├── ExecutiveSummary.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── StatsCharts.tsx
│   │   ├── ReportPreview.tsx
│   │   └── ui/                 # Base UI components (Radix UI)
│   └── data/
│       └── mockData.ts         # Mock data for development
├── hooks/
│   └── useReviews.ts           # Custom React hooks for API calls
├── services/
│   └── api.ts                  # API service for N8N integration
└── styles/
    ├── index.css
    ├── theme.css
    ├── tailwind.css
    └── fonts.css
```

## N8N Integration

The dashboard integrates with N8N for:
- **Data Fetching**: Retrieve reviews from Play Store or custom sources
- **Report Export**: Generate and email reports in PDF/CSV/JSON
- **Notifications**: Send alerts and updates

### Setup N8N Webhooks

See [N8N_INTEGRATION.md](./N8N_INTEGRATION.md) for detailed setup instructions.

**Quick Start N8N Webhooks:**

1. **Reviews Webhook** (`/webhook/reviews`)
   - Method: GET
   - Returns: Review data with sentiment analysis

2. **Export Webhook** (`/webhook/export`)
   - Method: POST
   - Generates and emails reports

## Environment Variables

### Local Development (`.env.local`)

```
VITE_API_BASE_URL=http://localhost:5678
VITE_N8N_REVIEWS_WEBHOOK=/webhook/reviews
VITE_N8N_EXPORT_WEBHOOK=/webhook/export
VITE_DEBUG_MODE=true
VITE_APP_ENV=development
```

### Production (Vercel)

Set these in Vercel Settings → Environment Variables:

```
VITE_API_BASE_URL=https://your-n8n-instance.com
VITE_N8N_REVIEWS_WEBHOOK=/webhook/reviews
VITE_N8N_EXPORT_WEBHOOK=/webhook/export
VITE_DEBUG_MODE=false
VITE_APP_ENV=production
```

## Deployment

### Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

**Quick Deploy:**

1. Push code to GitHub (private repository)
2. Connect repository to Vercel
3. Add environment variables in Vercel Settings
4. Vercel auto-deploys on every push to main

```bash
# Or use Vercel CLI
npm install -g vercel
vercel --prod
```

### Deploy to Custom Server

```bash
# Build production bundle
npm run build

# Output is in dist/ directory
# Serve with nginx, Apache, or Node.js server
```

## GitHub Setup

### Create Private Repository

```bash
git init
git add .
git commit -m "Initial commit: Play Store Review Analyzer"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/leap-product-dashboard.git
git push -u origin main
```

### GitHub Settings

1. Go to Repository Settings → General
2. Enable branch protection for main branch
3. Require pull request reviews before merging
4. Create `.github/workflows` for CI/CD (optional)

## Features in Detail

### 📊 Analytics Dashboard

- **Sentiment Analysis**: Visualize positive, neutral, and negative reviews
- **Reason Charts**: See top issues and features mentioned
- **Review Cards**: Browse individual reviews with sentiment scores
- **Executive Summary**: Key metrics and daily insights

### 🎨 User Interface

- **Responsive Grid**: Adapts to all screen sizes
- **Interactive Filters**: Filter by sentiment (All, Positive, Neutral, Negative)
- **Modern Design**: Purple gradient theme with smooth animations
- **Accessible**: WCAG compliant components

### ⚙️ Data Management

- **Mock Data Fallback**: Works offline with built-in mock data
- **Error Handling**: Graceful error messages and recovery
- **Loading States**: Clear loading indicators during data fetch
- **Real-time Updates**: Refresh data on demand

## Troubleshooting

### Dashboard shows "Error Loading Data"

1. Verify N8N is running and accessible
2. Check `VITE_API_BASE_URL` in environment variables
3. Check browser console for specific errors
4. Verify CORS is configured on N8N

### Build fails

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Deployment fails on Vercel

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure environment variables are set correctly
4. Check Node.js version compatibility (20.x)

## Performance Optimization

- ✅ Code splitting with Vite
- ✅ CSS optimization with Tailwind
- ✅ Image optimization on Vercel
- ✅ Gzip compression by default
- ✅ Lazy loading components

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security

- ✅ Private GitHub repository
- ✅ Environment variables for sensitive data
- ✅ No hardcoded API keys or secrets
- ✅ HTTPS-only for production
- ✅ Content Security Policy (CSP) ready

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Commit: `git commit -am 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Create a Pull Request

## License

This project is part of the Leap Product ecosystem.

## Support

For issues, questions, or suggestions:

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
2. Check [N8N_INTEGRATION.md](./N8N_INTEGRATION.md) for integration issues
3. Review browser console for errors
4. Check Vercel deployment logs
5. Create an issue in GitHub repository

## Related Documentation

- [N8N Integration Guide](./N8N_INTEGRATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Vercel Documentation](https://vercel.com/docs)
- [N8N Documentation](https://docs.n8n.io/)
- [Figma Design](https://www.figma.com/design/ZOyLTdOtJKVZuZddhs7WHv/Access-N8N-Cloud-App)
  