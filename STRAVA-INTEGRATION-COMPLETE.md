# Strava Integration Complete! ✅

## What's Been Added

Your dashboard now has full Strava integration:

1. **Strava Connect Button** - Clients can connect their Strava account
2. **Automatic Activity Sync** - Runs are automatically fetched from Strava
3. **Activity Display** - Shows distance, time, pace, elevation, heart rate
4. **Token Management** - Automatically refreshes expired tokens
5. **API Routes** - Vercel serverless functions for Strava API calls

## How It Works

1. **Client clicks "Connect with Strava"**
   - Redirects to Strava OAuth
   - Client authorizes access
   - Strava redirects back to your dashboard

2. **Token Storage**
   - Access token stored in localStorage per client
   - Refresh token saved for automatic renewal
   - Tokens expire after 6 hours (Strava default)

3. **Activity Fetching**
   - Dashboard automatically fetches activities when loaded
   - Shows only running activities
   - Displays latest 30 activities

4. **Auto-Refresh**
   - Expired tokens are automatically refreshed
   - No action needed from client

## Setup Required

### 1. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
STRAVA_CLIENT_ID=191041
STRAVA_CLIENT_SECRET=687d19ec3c8800010c1e31a6b44c7df13b64d2d7
```

4. Click "Save"
5. **Redeploy** your project (Vercel will automatically redeploy)

### 2. Update Strava App Settings

1. Go to https://www.strava.com/settings/api
2. Find your app (Client ID: 191041)
3. Update **Authorization Callback Domain** to:
   ```
   tw-client-dashbaord.vercel.app
   ```
4. Save changes

## Testing

1. **Deploy to Vercel** (if not already done)
2. **Add environment variables** (see above)
3. **Redeploy** after adding env vars
4. **Visit dashboard** and click "Connect with Strava"
5. **Authorize** the app
6. **Activities should appear** automatically!

## Features

✅ **Connect/Disconnect** - Easy Strava connection management
✅ **Auto-Sync** - Activities load automatically
✅ **Manual Refresh** - Refresh button to get latest activities
✅ **Activity Details** - Distance, time, pace, elevation, heart rate
✅ **Strava Links** - Click to view activity on Strava
✅ **Token Refresh** - Automatic token renewal

## What Clients See

1. **Not Connected:**
   - "Connect with Strava" button
   - Instructions to sync runs

2. **Connected:**
   - List of running activities
   - Activity details (distance, pace, time, etc.)
   - Link to view on Strava
   - Refresh button
   - Disconnect button

## API Endpoints Created

- `GET /api/strava/token` - Exchange OAuth code for token
- `GET /api/strava/activities` - Fetch activities from Strava
- `POST /api/strava/refresh` - Refresh expired tokens
- `/api/strava/callback` - OAuth callback page

## Next Steps

1. ✅ Add environment variables to Vercel
2. ✅ Update Strava callback domain
3. ✅ Redeploy
4. ✅ Test the integration

Your Strava integration is ready! 🎉

