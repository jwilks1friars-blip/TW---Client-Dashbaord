# Update Squarespace Code - Quick Guide

## ✅ Yes, You Need to Update!

Since we added authentication, you need to update your Squarespace embed code to point to the **login page** instead of directly to the dashboard.

## The Updated Code

Copy and paste this into your Squarespace page:

```html
<div style="width: 100%; height: 100vh; min-height: 800px; margin: 0; padding: 0;">
  <iframe 
    src="https://tw-client-dashbaord.vercel.app/login" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border: none; display: block;"
    title="Client Portal Login - Tyler Wilks Running"
    allow="fullscreen">
  </iframe>
</div>
```

## Steps to Update Squarespace

1. **Go to Squarespace Admin**
   - Visit: https://www.tylerwilksrunning.com/admin
   - Sign in

2. **Edit Your Page**
   - Click "Pages" → Find "new-page" (or wherever your client portal is)
   - Click to edit

3. **Find the Code Block**
   - Look for the Code Block with your old embed code
   - Click to edit it

4. **Replace the Code**
   - Select ALL the old code
   - Delete it
   - Paste the NEW code above (with `/login` in the URL)
   - Click "Apply" or "Save"

5. **Save and Publish**
   - Click "Save" on the page
   - Click "Publish" to make it live

## What Changed?

**Old code (if you had it):**
- Pointed directly to dashboard
- No login required

**New code:**
- Points to `/login` page
- Clients log in first
- Then see dashboard with Strava integration

## Why Update?

- ✅ Clients now need to log in (security)
- ✅ Shows login page first
- ✅ After login, they see the full dashboard
- ✅ Includes Strava integration

## Test It

After updating:
1. Visit your Squarespace page
2. You should see the login form
3. Log in with test credentials
4. You should see the dashboard with Strava section

That's it! Just update the embed code in Squarespace. 🚀

