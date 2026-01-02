# Deploy Client Dashboard to Vercel

## Quick Deploy

### Option 1: Vercel CLI (Recommended)

```bash
cd "Client dashboard"
npm install -g vercel
vercel
```

Follow the prompts:
- Login to Vercel (opens browser)
- Press Enter to deploy
- Use default settings

### Option 2: Vercel Dashboard

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Connect your GitHub repo OR drag & drop the `Client dashboard` folder
4. Vercel will auto-detect Next.js
5. Click "Deploy"

## After Deployment

You'll get a URL like: `https://client-dashboard.vercel.app`

## Embed in Squarespace

After deployment, add this code to your Squarespace page:

```html
<iframe 
  src="https://YOUR-DEPLOYMENT-URL.vercel.app" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; min-height: 800px;"
  title="Client Dashboard">
</iframe>
```

Replace `YOUR-DEPLOYMENT-URL` with your actual Vercel URL.

## Full-Width Embed (Recommended)

For a better experience, use this code that makes the iframe full-width:

```html
<div style="width: 100%; height: 100vh; min-height: 800px;">
  <iframe 
    src="https://YOUR-DEPLOYMENT-URL.vercel.app" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border: none;"
    title="Client Dashboard">
  </iframe>
</div>
```

## Update Your Squarespace Page

1. Go to https://www.tylerwilksrunning.com/admin
2. Navigate to the "new-page" page
3. Edit the page
4. Find the existing client portal code block
5. Replace it with the iframe code above
6. Save and publish

