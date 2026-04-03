#!/bin/bash

# Vercel Deployment Setup Script
# This script helps you deploy the dashboard to Vercel

set -e

echo "🚀 Leap Product Dashboard - Vercel Deployment"
echo "=============================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔍 Prerequisites Check:"
echo "  ✅ npm is installed"
echo "  ✅ Vercel CLI is installed"
echo ""

# Get N8N configuration
read -p "Enter your N8N API Base URL (e.g., https://n8n.example.com): " N8N_BASE_URL
read -p "Enter N8N reviews webhook path (default: /webhook/reviews): " N8N_REVIEWS
N8N_REVIEWS=${N8N_REVIEWS:-/webhook/reviews}
read -p "Enter N8N export webhook path (default: /webhook/export): " N8N_EXPORT
N8N_EXPORT=${N8N_EXPORT:-/webhook/export}

echo ""
echo "📋 Summary:"
echo "  N8N Base URL: $N8N_BASE_URL"
echo "  Reviews Webhook: $N8N_REVIEWS"
echo "  Export Webhook: $N8N_EXPORT"
echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "🔨 Building application..."
npm run build

echo ""
echo "🔐 Logging in to Vercel..."
echo "   You will be prompted to login with your GitHub account"
vercel login

echo ""
echo "📤 Deploying to Vercel..."
echo "   This will link your GitHub repository to Vercel"
vercel --prod

echo ""
echo "🌍 Setting environment variables..."
echo "   Note: You can also set these manually in Vercel dashboard"
echo ""

# Prompt to set environment variables
read -p "Set environment variables now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Setting VITE_API_BASE_URL..."
    vercel env add VITE_API_BASE_URL
    
    echo "Setting VITE_N8N_REVIEWS_WEBHOOK..."
    vercel env add VITE_N8N_REVIEWS_WEBHOOK
    
    echo "Setting VITE_N8N_EXPORT_WEBHOOK..."
    vercel env add VITE_N8N_EXPORT_WEBHOOK
    
    echo "Setting VITE_APP_ENV..."
    vercel env add VITE_APP_ENV
    
    echo ""
    echo "🔄 Redeploying with environment variables..."
    vercel --prod
fi

echo ""
echo "✅ Vercel Deployment Complete!"
echo ""
echo "📍 Your dashboard is live! 🎉"
echo ""
echo "Next steps:"
echo "1. Go to your Vercel project dashboard"
echo "2. Verify environment variables are set correctly"
echo "3. Test your N8N webhook connections"
echo "4. Share your live URL with your team"
echo ""
echo "💡 Tips:"
echo "- Push code changes to GitHub for automatic deployments"
echo "- Use 'vercel' for preview deployments"
echo "- Use 'vercel --prod' for production deployments"
echo ""
