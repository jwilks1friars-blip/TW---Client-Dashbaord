# Update Squarespace Page with New Dashboard

## Step-by-Step Instructions

### 1. Deploy Dashboard to Vercel

First, deploy your Next.js dashboard:

```bash
cd "Client dashboard"
vercel
```

Or use the Vercel dashboard at https://vercel.com

**Note your deployment URL** (e.g., `https://client-dashboard.vercel.app`)

### 2. Update Squarespace Page

1. **Go to Squarespace Admin**
   - Visit https://www.tylerwilksrunning.com/admin
   - Login to your account

2. **Navigate to the Page**
   - Go to Pages
   - Find "new-page" (or the page where your client portal is)
   - Click to edit

3. **Replace the Old Code**
   - Find the existing Code Block with the old client portal
   - Click to edit it
   - Delete all the old code

4. **Add New Embed Code**
   - Open the file `SQUARESPACE-EMBED.html` in this folder
   - Replace `YOUR-DEPLOYMENT-URL` with your actual Vercel URL
   - Copy the entire code block
   - Paste it into the Squarespace Code Block
   - Click "Apply" or "Save"

5. **Save and Publish**
   - Click "Save" on the page
   - Click "Publish" to make it live

### 3. Test the Page

Visit https://www.tylerwilksrunning.com/new-page to see your new dashboard!

## Troubleshooting

**Dashboard doesn't load:**
- Check that your Vercel deployment is live
- Verify the URL in the iframe code is correct
- Make sure you replaced `YOUR-DEPLOYMENT-URL` with your actual URL

**Dashboard looks cut off:**
- The iframe height is set to 800px minimum
- You can adjust the `min-height` value in the embed code if needed

**Styling issues:**
- The dashboard uses its own styles, so it should work independently
- If there are conflicts, you may need to adjust the iframe styling

## Quick Reference

**Embed Code Template:**
```html
<div style="width: 100%; height: 100vh; min-height: 800px;">
  <iframe 
    src="YOUR-VERCEL-URL" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border: none;"
    title="Client Dashboard">
  </iframe>
</div>
```

Replace `YOUR-VERCEL-URL` with your deployment URL.

