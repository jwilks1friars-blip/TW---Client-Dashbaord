# Complete Setup Guide: Update Squarespace with New Dashboard

## Overview

This guide will help you:
1. Deploy your new Next.js dashboard to Vercel
2. Update your Squarespace page (https://www.tylerwilksrunning.com/new-page) to use the new dashboard

## Prerequisites

- ✅ Next.js dashboard is ready (already done!)
- ✅ Vercel account (free account works)

## Step 1: Deploy to Vercel

### Quick Deploy (Recommended)

```bash
cd "Client dashboard"
vercel
```

**Follow the prompts:**
1. Login to Vercel (will open browser)
2. Press Enter to use current directory
3. Press Enter to confirm settings
4. Wait for deployment

**You'll get a URL like:** `https://client-dashboard-xxxxx.vercel.app`

**⚠️ IMPORTANT:** Copy this URL - you'll need it in Step 2!

### Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Either:
   - Connect GitHub repo and import
   - Or drag & drop the `Client dashboard` folder
4. Click "Deploy"
5. Wait for deployment
6. Copy your deployment URL

## Step 2: Update Squarespace Page

### 2.1 Get the Embed Code

1. Open `SQUARESPACE-EMBED.html` in this folder
2. Find `YOUR-DEPLOYMENT-URL`
3. Replace it with your Vercel URL from Step 1
4. Copy the entire code block

**Example:**
```html
<div style="width: 100%; height: 100vh; min-height: 800px;">
  <iframe 
    src="https://client-dashboard-xxxxx.vercel.app" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border: none; display: block;"
    title="Client Dashboard - Tyler Wilks Running">
  </iframe>
</div>
```

### 2.2 Update Squarespace

1. **Go to Squarespace Admin**
   - Visit: https://www.tylerwilksrunning.com/admin
   - Login

2. **Navigate to Your Page**
   - Click "Pages" in the left menu
   - Find "new-page" (or wherever your client portal is)
   - Click the page to edit it

3. **Replace Old Code**
   - Find the Code Block with the old client portal
   - Click to edit it
   - Select all and delete the old code
   - Paste your new embed code (from Step 2.1)
   - Click "Apply" or "Save"

4. **Save and Publish**
   - Click "Save" on the page
   - Click "Publish" to make it live

## Step 3: Test

Visit https://www.tylerwilksrunning.com/new-page to see your new dashboard!

## What's New

Your new dashboard includes:
- ✅ Modern, responsive design
- ✅ Sidebar navigation
- ✅ Stats cards (Miles, Time, Workouts, Progress)
- ✅ Weekly schedule calendar
- ✅ Upcoming workouts section
- ✅ Recent activity feed
- ✅ Built with shadcn/ui components

## Troubleshooting

### Dashboard doesn't appear
- ✅ Check Vercel deployment is live
- ✅ Verify URL in embed code is correct
- ✅ Make sure you replaced `YOUR-DEPLOYMENT-URL`
- ✅ Check browser console for errors

### Dashboard looks cut off
- ✅ Adjust `min-height` in embed code (currently 800px)
- ✅ Try `height: 100vh` for full viewport height

### Styling conflicts
- ✅ The dashboard has its own styles
- ✅ If conflicts occur, you may need to adjust iframe styling

## Need Help?

- Check `DEPLOY.md` for detailed deployment instructions
- Check `UPDATE-SQUARESPACE.md` for Squarespace-specific help
- Check `QUICK-START.md` for development info

## Next Steps

After deployment, you can:
- Customize the dashboard design
- Add authentication
- Connect to your backend API
- Add more features

Enjoy your new dashboard! 🎉

