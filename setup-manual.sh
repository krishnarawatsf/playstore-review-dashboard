#!/bin/bash

# Manual Setup Instructions for GitHub and Vercel
# Copy and paste these commands into your terminal

echo "🎯 Play Store Review Analyzer Dashboard - Setup Instructions"
echo "==========================================================="
echo ""

# Color variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}STEP 1: Create Private GitHub Repository${NC}"
echo "=========================================="
echo ""
echo "1. Visit https://github.com/new"
echo "2. Enter repository name: leap-product-dashboard"
echo "3. Select Private visibility"
echo "4. Do NOT initialize with README"
echo "5. Click 'Create repository'"
echo ""
echo -e "${YELLOW}Copy your repository URL (you'll need it in STEP 2)${NC}"
echo "Example: https://github.com/YOUR-USERNAME/leap-product-dashboard.git"
echo ""
read -p "Press Enter when you've created the repository..."

echo ""
echo -e "${YELLOW}STEP 2: Connect Local Repository to GitHub${NC}"
echo "==========================================="
echo ""
echo "Run these commands in your terminal:"
echo ""
echo -e "${GREEN}# Navigate to project directory${NC}"
echo "cd \"/Users/krishnarawat/Desktop/Leap Product/Access N8N Cloud App\""
echo ""
echo -e "${GREEN}# Rename branch to main${NC}"
echo "git branch -M main"
echo ""
echo -e "${GREEN}# Add GitHub remote (REPLACE with your repository URL)${NC}"
echo "git remote add origin https://github.com/YOUR-USERNAME/leap-product-dashboard.git"
echo ""
echo -e "${GREEN}# Push to GitHub${NC}"
echo "git push -u origin main"
echo ""
read -p "Enter your GitHub repository URL: " GITHUB_REPO

if [ -z "$GITHUB_REPO" ]; then
    echo -e "${RED}Error: Repository URL cannot be empty${NC}"
    exit 1
fi

echo ""
echo "Connecting to GitHub..."
cd "/Users/krishnarawat/Desktop/Leap Product/Access N8N Cloud App"
git branch -M main
git remote add origin "$GITHUB_REPO" 2>/dev/null || git remote set-url origin "$GITHUB_REPO"
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    echo "Make sure you have the correct repository URL and permissions"
    exit 1
fi

echo ""
echo -e "${YELLOW}STEP 3: Deploy to Vercel${NC}"
echo "========================"
echo ""
echo "1. Visit https://vercel.com"
echo "2. Sign in with your GitHub account"
echo "3. Click 'Add New Project'"
echo "4. Select 'Import Git Repository'"
echo "5. Search for and select: leap-product-dashboard"
echo "6. Click 'Import'"
echo ""
read -p "Press Enter after selecting the repository..."

echo ""
echo "7. Review project settings:"
echo "   - Framework Preset: Vite"
echo "   - Root Directory: ./"
echo "   - Environment Variables: (add below)"
echo ""
echo -e "${YELLOW}STEP 4: Add Environment Variables in Vercel${NC}"
echo "=========================================="
echo ""
echo "Before clicking Deploy, add these environment variables:"
echo ""

read -p "Enter your N8N Base URL (e.g., https://n8n.example.com): " N8N_URL
read -p "Enter N8N Reviews webhook path (default: /webhook/reviews): " N8N_REVIEWS
N8N_REVIEWS=${N8N_REVIEWS:-/webhook/reviews}
read -p "Enter N8N Export webhook path (default: /webhook/export): " N8N_EXPORT
N8N_EXPORT=${N8N_EXPORT:-/webhook/export}

echo ""
echo "In Vercel, add these environment variables:"
echo ""
echo -e "${GREEN}VITE_API_BASE_URL${NC} = $N8N_URL"
echo -e "${GREEN}VITE_N8N_REVIEWS_WEBHOOK${NC} = $N8N_REVIEWS"
echo -e "${GREEN}VITE_N8N_EXPORT_WEBHOOK${NC} = $N8N_EXPORT"
echo -e "${GREEN}VITE_APP_ENV${NC} = production"
echo -e "${GREEN}VITE_DEBUG_MODE${NC} = false"
echo ""
read -p "Press Enter after adding environment variables..."

echo ""
echo "8. Click 'Deploy'"
echo "   Vercel will build and deploy your application"
echo "   This may take 2-3 minutes..."
echo ""
read -p "Press Enter after deployment completes..."

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Your dashboard is now:"
echo "  📱 Live on Vercel (check your project dashboard for URL)"
echo "  🔧 Connected to N8N webhooks"
echo "  📁 Version controlled on GitHub"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Visit your Vercel deployment URL (shown in dashboard)"
echo "2. Set up N8N webhooks (see N8N_INTEGRATION.md)"
echo "3. Test the dashboard with your data"
echo "4. Push any future changes to GitHub for automatic deployments"
echo ""
echo "Useful commands:"
echo "  ${GREEN}git push${NC}              - Push changes to GitHub"
echo "  ${GREEN}git pull${NC}              - Pull latest changes"
echo "  ${GREEN}git status${NC}            - Check git status"
echo "  ${GREEN}npm run dev${NC}           - Run locally"
echo "  ${GREEN}npm run build${NC}         - Build for production"
echo ""
echo -e "${YELLOW}Documentation:${NC}"
echo "  • README.md          - Project overview"
echo "  • QUICK_START.md     - Quick setup guide"
echo "  • N8N_INTEGRATION.md - N8N webhook setup"
echo "  • DEPLOYMENT.md      - Detailed deployment guide"
echo ""
echo "Happy building! 🚀"
echo ""
