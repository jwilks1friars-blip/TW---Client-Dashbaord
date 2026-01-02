# Update Your Squarespace Site - Step by Step

## Step 1: Get Your Vercel URL

1. **Go to your Vercel Dashboard**
   - Visit https://vercel.com
   - Click on your project (should be `TW---Client-Dashbaord` or similar)
   - You'll see your deployment URL at the top
   - It will look like: `https://tw-client-dashbaord.vercel.app` or similar
   - **Copy this URL!**

## Step 2: Create the Embed Code

1. **Open the file** `SQUARESPACE-EMBED.html` in this folder
2. **Find** `YOUR-DEPLOYMENT-URL` in the code
3. **Replace it** with your actual Vercel URL
4. **Copy the entire code block**

**Example:**
If your Vercel URL is `https://tw-client-dashbaord.vercel.app`, the code should look like:

```html
<div style="width: 100%; height: 100vh; min-height: 800px; margin: 0; padding: 0;">
  <iframe 
    src="https://tw-client-dashbaord.vercel.app" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border: none; display: block;"
    title="Client Dashboard - Tyler Wilks Running"
    allow="fullscreen">
  </iframe>
</div>
```

## Step 3: Update Your Squarespace Page

1. **Go to Squarespace Admin**
   - Visit https://www.tylerwilksrunning.com/admin
   - Sign in to your account

2. **Navigate to Your Page**
   - Click "Pages" in the left sidebar
   - Find "new-page" (or wherever your client portal currently is)
   - Click on it to edit

3. **Find the Old Code Block**
   - Look for the Code Block that contains your old client portal
   - Click on it to edit

4. **Replace the Code**
   - Select ALL the old code
   - Delete it
   - Paste your NEW embed code (from Step 2)
   - Click "Apply" or "Save"

5. **Save and Publish**
   - Click "Save" on the page
   - Click "Publish" to make it live
   - Or click "Publish" in the top right corner

## Step 4: Test It!

1. Visit https://www.tylerwilksrunning.com/new-page
2. You should see your new dashboard!
3. Test the navigation, sidebar, and all features

## Troubleshooting

### Dashboard doesn't appear
- ✅ Check that your Vercel URL is correct in the embed code
- ✅ Make sure you replaced `YOUR-DEPLOYMENT-URL` with your actual URL
- ✅ Verify the Vercel deployment is still live

### Dashboard looks cut off
- ✅ The iframe height is set to 800px minimum
- ✅ You can increase `min-height: 800px` to a larger value if needed
- ✅ Try `min-height: 100vh` for full viewport height

### Styling conflicts
- ✅ The dashboard has its own styles, so it should work independently
- ✅ If there are issues, you may need to adjust the iframe styling

## Quick Reference

**Your Vercel URL:** (get this from Vercel dashboard)
**Your Squarespace Page:** https://www.tylerwilksrunning.com/new-page

That's it! Your dashboard should now be live on your site! 🎉

