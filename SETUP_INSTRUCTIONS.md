# Complete Setup & Deployment Guide

This guide walks you through setting up your GitHub private repository and deploying to Vercel.

## Prerequisites

- GitHub account (free or paid)
- Vercel account (free tier available)
- Node.js 20.x installed
- N8N instance (local or cloud)

## Part 1: Push to GitHub Private Repository

### Step 1.1: Create Private Repository on GitHub

1. Go to **https://github.com/new**
2. Enter **Repository name**: `leap-product-dashboard`
3. Add **Description** (optional): "Play Store Review Analyzer Dashboard"
4. Select **Private** visibility
5. Do **NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 1.2: Push Code to GitHub

Copy and paste these commands in your terminal:

```bash
# Navigate to project directory
cd "/Users/krishnarawat/Desktop/Leap Product/Access N8N Cloud App"

# Rename branch to main
git branch -M main

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/leap-product-dashboard.git

# Push to GitHub
git push -u origin main
```

**Important:** Replace `YOUR-USERNAME` with your actual GitHub username!

You can find your full repository URL on GitHub:
- Go to your repository
- Click the green **Code** button
- Copy the HTTPS URL
- It looks like: `https://github.com/your-username/leap-product-dashboard.git`

### Step 1.3: Verify Push

1. Visit your repository on GitHub
2. You should see all your files uploaded
3. Check the commit message: "Initial commit: Play Store Review Analyzer Dashboard"

## Part 2: Deploy to Vercel

### Step 2.1: Connect GitHub to Vercel

1. Visit **https://vercel.com**
2. Sign in with your GitHub account (or create one)
3. Click **Add New Project**
4. Click **Import Git Repository**
5. Search for: `leap-product-dashboard`
6. Click the repository to select it
7. Click **Import**

### Step 2.2: Configure Project

1. **Project Name**: `leap-dashboard` (or your preferred name)
2. **Framework Preset**: Select **Vite**
3. **Root Directory**: `./` (default)
4. **Environment Variables**: (configure in next step)

**Do NOT click Deploy yet** - we need to add environment variables first!

### Step 2.3: Add Environment Variables

In the Vercel dashboard, you should see an "Environment Variables" section.

Add these variables:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-n8n-instance.com` | Your N8N production URL |
| `VITE_N8N_REVIEWS_WEBHOOK` | `/webhook/reviews` | Path to reviews webhook |
| `VITE_N8N_EXPORT_WEBHOOK` | `/webhook/export` | Path to export webhook |
| `VITE_APP_ENV` | `production` | Environment indicator |
| `VITE_DEBUG_MODE` | `false` | Debug mode off for production |

**Example:**
```
VITE_API_BASE_URL = https://n8n.example.com
VITE_N8N_REVIEWS_WEBHOOK = /webhook/reviews
VITE_N8N_EXPORT_WEBHOOK = /webhook/export
VITE_APP_ENV = production
VITE_DEBUG_MODE = false
```

### Step 2.4: Deploy

1. Click **Deploy** button
2. Vercel will:
   - Build your application
   - Optimize assets
   - Deploy to CDN
   - Provide you a live URL

This takes 2-3 minutes. You can watch the deployment in real-time.

### Step 2.5: Access Your Dashboard

After deployment succeeds:

1. Vercel shows your live URL (example: `https://leap-dashboard.vercel.app`)
2. Click the URL to visit your live dashboard
3. You should see the dashboard loading with mock data (if N8N not configured yet)

## Part 3: Verify Everything Works

### 3.1: Test Local Development

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Edit .env.local with your N8N configuration
nano .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173` - Dashboard should load!

### 3.2: Test Production Deployment

1. Visit your Vercel URL
2. Check if data loads (use mock data if N8N not configured)
3. Try the filter buttons (All, Positive, Neutral, Negative)
4. Test the Export button

### 3.3: Check Deployment Status

In Vercel:
1. Go to your project
2. Click **Deployments** tab
3. You should see your deployment marked as **Production**
4. View logs if you encounter issues

## Part 4: Set Up N8N Integration

Once deployed, configure N8N webhooks:

1. Follow the guide in **[N8N_INTEGRATION.md](./N8N_INTEGRATION.md)**
2. Create two webhooks:
   - `/webhook/reviews` (GET) - fetches review data
   - `/webhook/export` (POST) - exports reports

After setting up N8N:

1. Update `VITE_API_BASE_URL` in Vercel if needed
2. Go to **Deployments** → **Redeploy** on the latest deployment
3. Wait for redeployment to complete
4. Visit your Vercel URL again
5. Dashboard should now show real data from N8N!

## Part 5: GitHub Repository Settings (Optional)

For better code quality and safety:

1. Go to your GitHub repository
2. Click **Settings** → **General**
3. Under "Pull requests":
   - Enable **Require pull request reviews before merging**
   - Set required approvals: 1
4. Under "Branch protection":
   - Add rule for `main` branch
   - Require status checks before merging

## Common Issues & Solutions

### Issue: Deployment fails with "Build error"

**Solution:**
1. Check Vercel build logs for details
2. Verify Node.js version (should be 20.x)
3. Try building locally: `npm run build`
4. Fix any errors and push to GitHub again

### Issue: Dashboard shows blank or loading forever

**Solution:**
1. Check browser console (F12 → Console tab)
2. Verify environment variables in Vercel Settings
3. Check N8N webhooks are configured
4. Redeploy in Vercel (Deployments → Redeploy)

### Issue: "Cannot GET /"

**Solution:**
1. This means the app didn't build correctly
2. Check Vercel build logs
3. Verify `vercel.json` is present
4. Try a new deployment

### Issue: CORS errors in browser console

**Solution:**
1. N8N is on different domain than Vercel
2. Configure CORS in N8N settings
3. Or use an API proxy/middleware
4. See [DEPLOYMENT.md](./DEPLOYMENT.md) for details

## Useful Commands for Future Updates

```bash
# Make changes to code
echo "your changes" > src/app/App.tsx

# Stage changes
git add .

# Commit changes
git commit -m "Description of what changed"

# Push to GitHub (triggers Vercel redeploy)
git push

# Check git status
git status

# View commit history
git log --oneline
```

## Next Steps

1. ✅ Code pushed to GitHub private repository
2. ✅ Dashboard deployed on Vercel
3. 📋 Set up N8N webhooks (see [N8N_INTEGRATION.md](./N8N_INTEGRATION.md))
4. 🧪 Test with real data
5. 📊 Share dashboard URL with team
6. 🔄 Make updates and push to GitHub for automatic redeploy

## Support & Documentation

- **Quick Start**: See [QUICK_START.md](./QUICK_START.md)
- **N8N Setup**: See [N8N_INTEGRATION.md](./N8N_INTEGRATION.md)
- **Detailed Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Main README**: See [README.md](./README.md)

## Security Notes

- ✅ Repository is private (not public)
- ✅ Environment variables are stored securely in Vercel
- ✅ `.env.local` is never pushed to GitHub (in `.gitignore`)
- ✅ No API keys in code

Keep your N8N API keys and sensitive data only in:
- Local `.env.local` (development)
- Vercel Environment Variables (production)

Never commit these files to GitHub!

---

**You're all set! 🚀 Your dashboard is now live and connected!**
