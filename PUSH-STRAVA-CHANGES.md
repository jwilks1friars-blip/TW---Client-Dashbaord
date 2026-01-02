# Push Strava Integration Changes

## ✅ Good News!

Your Strava integration changes have been **committed** successfully! 

**Commit:** `Add Strava integration: connect account, sync activities, display runs`
**Files Changed:** 13 files, 1079 insertions

## Push to GitHub

Open Terminal and run:

```bash
cd "/Users/tyler.wilks/Cursor - TW running schedule/Client dashboard"
git push origin main
```

If you get SSL certificate errors, try:

```bash
git config --global http.sslVerify false
git push origin main
```

Or use SSH:

```bash
git remote set-url origin git@github.com:jwilks1friars-blip/TW---Client-Dashbaord.git
git push origin main
```

## After Pushing

1. **Vercel will automatically detect the push** and start deploying
2. **Check Vercel dashboard** - you'll see a new deployment
3. **Wait 1-2 minutes** for deployment
4. **Add environment variables** (see below)

## Required: Add Environment Variables

After deployment, add these to Vercel:

1. Go to Vercel project → Settings → Environment Variables
2. Add:
   - `STRAVA_CLIENT_ID` = `191041`
   - `STRAVA_CLIENT_SECRET` = `687d19ec3c8800010c1e31a6b44c7df13b64d2d7`
3. **Redeploy** after adding variables

## Update Strava Settings

1. Go to https://www.strava.com/settings/api
2. Update **Authorization Callback Domain** to:
   ```
   tw-client-dashbaord.vercel.app
   ```

## What Was Committed

✅ Strava API routes (token, activities, refresh)
✅ Strava activities component
✅ Strava utilities library
✅ OAuth callback page
✅ Integration documentation

Your Strava integration is ready to deploy! 🚀

