#!/bin/bash

# GitHub Private Repository Setup Script
# This script helps you set up the GitHub private repository for the Leap Product Dashboard

set -e

echo "🚀 Leap Product Dashboard - GitHub Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Get repository name from user
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: leap-product-dashboard): " REPO_NAME
REPO_NAME=${REPO_NAME:-leap-product-dashboard}

echo ""
echo "📋 Summary:"
echo "  Username: $GITHUB_USERNAME"
echo "  Repository: $GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "⚠️  Make sure you have:"
echo "  1. Created a private repository on GitHub"
echo "  2. Have push access to the repository"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "🔄 Setting up Git repository..."

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "📦 Adding files..."
git add .

# Create initial commit
if ! git diff --cached --quiet; then
    echo "✅ Creating initial commit..."
    git commit -m "Initial commit: Play Store Review Analyzer Dashboard"
else
    echo "⚠️  No changes to commit"
fi

# Set main as default branch
if ! git show-ref --quiet refs/heads/main; then
    echo "🔄 Renaming branch to main..."
    git branch -M main
fi

# Add remote
REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
if git remote | grep -q "^origin$"; then
    echo "🔄 Updating remote origin..."
    git remote set-url origin "$REMOTE_URL"
else
    echo "🔗 Adding remote origin..."
    git remote add origin "$REMOTE_URL"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
echo "   Note: You may be prompted to enter your GitHub credentials or SSH key"
git push -u origin main

echo ""
echo "✅ GitHub Setup Complete!"
echo ""
echo "📍 Repository URL: $REMOTE_URL"
echo ""
echo "Next steps:"
echo "1. Go to your repository on GitHub"
echo "2. Under Settings → General, enable:"
echo "   - Required reviewers for pull requests"
echo "   - Dismiss stale pull request approvals"
echo "3. Create a personal access token for Vercel:"
echo "   - Go to Settings → Developer settings → Personal access tokens"
echo "   - Create new token with 'repo' scope"
echo "4. Connect repository to Vercel (see DEPLOYMENT.md)"
echo ""
echo "💡 Tip: Use 'git push' to push future changes"
echo ""
