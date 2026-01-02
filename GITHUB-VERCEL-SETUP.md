# Complete Guide: GitHub + Vercel Setup

## Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Visit https://github.com
   - Sign in (or create account if needed)

2. **Create New Repository**
   - Click the "+" icon in top right
   - Click "New repository"
   - **Repository name:** `client-dashboard` (or any name you like)
   - **Description:** "Client Dashboard for Tyler Wilks Running"
   - **Visibility:** Choose Private or Public
   - **DO NOT** check "Initialize with README" (we already have files)
   - Click "Create repository"

3. **Copy the Repository URL**
   - GitHub will show you a URL like: `https://github.com/jwilks1friars-6300/client-dashboard.git`
   - **Copy this URL** - you'll need it in Step 2

### Step 2: Initialize Git in Your Dashboard Folder

Open Terminal and run these commands:

```bash
# Navigate to the dashboard folder
cd "/Users/tyler.wilks/Cursor - TW running schedule/Client dashboard"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Client dashboard with Next.js and shadcn/ui"

# Add your GitHub repository
git remote add origin https://github.com/jwilks1friars-6300/client-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Using GitHub username: `jwilks1friars-6300`

### Step 3: Connect to Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in (or create account - you can use GitHub to sign in)

2. **Import Your Project**
   - Click "Add New..." button (top right)
   - Click "Project"
   - You'll see "Import Git Repository"
   - Click on your `client-dashboard` repository
   - (If you don't see it, click "Adjust GitHub App Permissions" and grant access)

3. **Configure Project**
   - **Framework Preset:** Should auto-detect "Next.js" ✅
   - **Root Directory:** Leave as `./` (or set to `Client dashboard` if needed)
   - **Build Command:** `npm run build` (should be auto-filled)
   - **Output Directory:** `.next` (should be auto-filled)
   - Click "Deploy"

4. **Wait for Deployment**
   - Vercel will install dependencies and build
   - This takes 1-2 minutes
   - You'll see build progress in real-time

5. **Get Your URL**
   - Once deployed, you'll see: "Congratulations! Your project has been deployed"
   - Your URL will be: `https://client-dashboard-xxxxx.vercel.app`
   - **Copy this URL!** You'll need it for Squarespace

## Alternative: Deploy Without GitHub (Easiest!)

If GitHub is giving you trouble, you can deploy directly:

### Option A: Vercel CLI (No GitHub Needed)

```bash
cd "/Users/tyler.wilks/Cursor - TW running schedule/Client dashboard"

# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel
```

Follow the prompts:
- Login to Vercel (opens browser)
- Press Enter to use current directory
- Press Enter for default settings
- Wait for deployment

### Option B: Drag & Drop to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Look for "Browse" or file upload option
4. Drag the entire `Client dashboard` folder
5. Vercel will upload and deploy it

## Troubleshooting

### "Repository not found"
- Make sure you've created the GitHub repo first
- Check the repository URL is correct
- Make sure you're logged into the right GitHub account

### "Permission denied"
- You may need to authenticate with GitHub
- Try: `git remote set-url origin https://jwilks1friars-6300@github.com/jwilks1friars-6300/client-dashboard.git`
- Or use SSH instead of HTTPS

### "Build failed on Vercel"
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify `package.json` has correct scripts

### Can't push to GitHub
- Make sure you've committed your files first: `git commit -m "Initial commit"`
- Check you're in the right directory
- Verify the remote URL is correct

## Quick Command Reference

```bash
# Navigate to dashboard
cd "/Users/tyler.wilks/Cursor - TW running schedule/Client dashboard"

# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "Your commit message"

# Add remote (first time only)
git remote add origin https://github.com/jwilks1friars-6300/client-dashboard.git

# Push to GitHub
git push -u origin main

# Or deploy directly with Vercel CLI
vercel
```

## Next Steps After Deployment

Once you have your Vercel URL:

1. Open `SQUARESPACE-EMBED.html`
2. Replace `YOUR-DEPLOYMENT-URL` with your Vercel URL
3. Copy the code
4. Paste into Squarespace (see `UPDATE-SQUARESPACE.md`)

## Need Help?

If you get stuck at any step, share:
- What step you're on
- The exact error message
- What you've tried

And I'll help you fix it! 🚀

