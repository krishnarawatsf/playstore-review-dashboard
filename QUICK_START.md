# Quick Start Guide

Get your dashboard up and running in 5 minutes!

## 1. Local Development (2 minutes)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173` - Dashboard loads with mock data!

## 2. Connect to N8N (5 minutes)

### Option A: Local N8N (for development)

```bash
# In a separate terminal
npx n8n

# Your N8N instance runs on http://localhost:5678
```

### Option B: N8N Cloud (for production)

1. Sign up at [N8N Cloud](https://n8n.cloud)
2. Create an account and get your instance URL
3. Create webhooks for `/webhook/reviews` and `/webhook/export`

### Update Environment File

Edit `.env.local`:
```
VITE_API_BASE_URL=http://localhost:5678
# (or your N8N Cloud URL)
VITE_N8N_REVIEWS_WEBHOOK=/webhook/reviews
VITE_N8N_EXPORT_WEBHOOK=/webhook/export
```

Save and refresh browser - Dashboard now uses real data!

## 3. Deploy to Vercel (3 minutes)

### Step 1: Create GitHub Private Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/leap-product-dashboard.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Select your GitHub repository
4. Add environment variables (same as `.env.production`)
5. Click Deploy

**Done!** Your dashboard is live on Vercel 🚀

### Get Your Live URL

After deployment, Vercel provides you with:
```
https://leap-product-dashboard.vercel.app
```

## 4. Verify Everything Works

- ✅ Local: `npm run dev` → http://localhost:5173
- ✅ GitHub: Private repo with all code
- ✅ Vercel: Live dashboard deployed
- ✅ N8N: Webhooks connected and working

## 5. Next Steps

See the [README](./README.md) for complete documentation:
- Advanced N8N setup: [N8N_INTEGRATION.md](./N8N_INTEGRATION.md)
- Deployment details: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Architecture and structure details in README

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Git
git status              # See changes
git log                 # See history
git push                # Push to GitHub

# Vercel
vercel                  # Deploy to preview
vercel --prod           # Deploy to production
vercel env ls           # List env variables
```

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Dashboard loads but no data | Check N8N URL in `.env.local` |
| Build fails | Run `npm install` again |
| Vercel deployment fails | Check environment variables in Vercel Settings |
| GitHub connection issue | Verify personal access token on Vercel |

## Need Help?

1. **Local issues**: Check terminal output for errors
2. **N8N issues**: Verify webhooks exist and are active
3. **Vercel issues**: Check Vercel deployment logs
4. **GitHub issues**: Verify repository is private and connected to Vercel

Happy building! 🎉
