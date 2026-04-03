# Deployment Guide

This guide covers deploying the dashboard to Vercel and managing the GitHub private repository.

## Table of Contents

1. [GitHub Setup](#github-setup)
2. [Vercel Deployment](#vercel-deployment)
3. [Environment Variables](#environment-variables)
4. [Continuous Deployment](#continuous-deployment)
5. [Troubleshooting](#troubleshooting)

## GitHub Setup

### Step 1: Create a Private Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Repository name: `leap-product-dashboard` (or your preferred name)
4. Select **Private** visibility
5. Do NOT initialize with README (we'll use our local files)
6. Click **Create repository**

### Step 2: Push Code to GitHub

In your terminal, navigate to the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Play Store Review Analyzer Dashboard"

# Add remote repository (replace USERNAME and REPO-NAME)
git remote add origin https://github.com/USERNAME/leap-product-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Configure GitHub Settings

1. Go to your repository on GitHub
2. Go to **Settings** → **General**
3. Under **Push & Pull Request Protection**, enable:
   - Require pull request reviews before merging
   - Require status checks to pass before merging (when we add CI/CD)

## Vercel Deployment

### Option A: Deploy from GitHub (Recommended)

#### Step 1: Connect Git Repository

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **Add New Project**
4. Select **Import Git Repository**
5. Search for and select `leap-product-dashboard`
6. Click **Import**

#### Step 2: Configure Project

- **Project Name**: `leap-dashboard` (or your preferred name)
- **Framework Preset**: Vite
- **Root Directory**: ./
- Click **Deploy** (it will build and deploy)

#### Step 3: Add Environment Variables

1. After successful deployment, go to project **Settings** tab
2. Click **Environment Variables**
3. Add the following variables:

```
VITE_API_BASE_URL = https://your-n8n-instance.com
VITE_N8N_REVIEWS_WEBHOOK = /webhook/reviews
VITE_N8N_EXPORT_WEBHOOK = /webhook/export
VITE_APP_ENV = production
```

4. Click **Save**
5. Go to **Deployments** and click **Redeploy** on the latest deployment

### Option B: Deploy via CLI

If you prefer command-line deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# For environment variables, use Vercel CLI:
vercel env add VITE_API_BASE_URL
vercel env add VITE_N8N_REVIEWS_WEBHOOK
vercel env add VITE_N8N_EXPORT_WEBHOOK
vercel env add VITE_APP_ENV
```

## Environment Variables

### Local Development (`.env.local`)

```
VITE_API_BASE_URL=http://localhost:5678
VITE_N8N_REVIEWS_WEBHOOK=/webhook/reviews
VITE_N8N_EXPORT_WEBHOOK=/webhook/export
VITE_DEBUG_MODE=true
VITE_APP_ENV=development
```

### Production (Vercel Environment Variables)

Set these in Vercel dashboard:

```
VITE_API_BASE_URL=https://your-production-n8n.com
VITE_N8N_REVIEWS_WEBHOOK=/webhook/reviews
VITE_N8N_EXPORT_WEBHOOK=/webhook/export
VITE_DEBUG_MODE=false
VITE_APP_ENV=production
```

## Continuous Deployment

### Automatic Deployments from GitHub

Vercel automatically deploys on:
- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment

### Configuring Branch Deployments

1. Go to Vercel Project **Settings**
2. Click **Git**
3. Under **Deploy on push**, select branches to auto-deploy
4. Configure preview branch deployments if needed
5. Click **Save**

### Manual Redeployment

If you need to redeploy without code changes:

1. Go to Vercel **Deployments** tab
2. Find the deployment you want to redeploy
3. Click the three dots → **Redeploy**
4. Or click **Redeploy** on git branch

## Rollback to Previous Version

If a deployment breaks production:

1. Go to Vercel **Deployments** tab
2. Find the previous working deployment
3. Click the three dots → **Promote to Production**

## Custom Domain Setup

1. Go to Vercel Project **Settings**
2. Click **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS to propagate (can take 24-48 hours)

## Monitoring Deployments

### View Deployment Logs

1. Go to **Deployments** in Vercel
2. Click on a deployment
3. View build logs and runtime logs
4. Check for errors or warnings

### Enable Analytics

1. Go to Project **Settings**
2. Click **Analytics**
3. Enable analytics to track:
   - Page load times
   - Core Web Vitals
   - Traffic metrics

## Troubleshooting

### Issue: Deployment fails with "Build error"

**Solutions:**
1. Check build logs in Vercel
2. Verify all dependencies are in `package.json`
3. Run `npm run build` locally to reproduce
4. Check Node.js version compatibility

```bash
# Show Node version required
cat .nvmrc  # or check Vercel default (20.x)
```

### Issue: Dashboard shows "Error Loading Data" in production

**Solutions:**
1. Verify `VITE_API_BASE_URL` in Vercel environment variables
2. Check N8N webhooks are accessible from Vercel's servers
3. Verify CORS is configured if N8N is on different domain
4. Check browser console for specific errors

### Issue: Environment variables not applied

**Solutions:**
1. Check variables are set in Vercel Settings → Environment Variables
2. Verify variable names match exactly (case-sensitive)
3. **Redeploy** after adding/changing variables
4. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Issue: GitHub commits not triggering deployments

**Solutions:**
1. Verify repository is connected in Vercel Settings → Git
2. Check branch settings - only configured branches auto-deploy
3. Manually redeploy via Vercel dashboard
4. Try disconnecting and reconnecting repository

## Quick References

### Useful Commands

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Deploy to staging
vercel --prod

# Check environment variables
vercel env ls
```

### Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Private Repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)
- [Vercel Git Integration](https://vercel.com/docs/concepts/git)

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify GitHub repository connection
3. Review environment variables
4. Check N8N webhook accessibility
5. Contact Vercel support or check GitHub Issues
