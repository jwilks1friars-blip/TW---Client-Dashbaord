# Your Dashboard URLs

## Vercel Domain
**Domain:** `tw-client-dashbaord.vercel.app`

## Test These URLs

### 1. Login Page (Use This for Squarespace!)
```
https://tw-client-dashbaord.vercel.app/login
```

### 2. Dashboard (Protected - requires login)
```
https://tw-client-dashbaord.vercel.app/
```

### 3. Main Domain
```
https://tw-client-dashbaord.vercel.app
```

## For Squarespace Embed

Use this code in your Squarespace page:

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

## Test Credentials

- **Email:** `client1@example.com`
- **Password:** `password123`

Or

- **Email:** `client2@example.com`
- **Password:** `password123`

## Testing Steps

1. **Test Login Page:**
   - Visit: https://tw-client-dashbaord.vercel.app/login
   - You should see the login form

2. **Test Login:**
   - Enter test credentials
   - Should redirect to dashboard

3. **Test Dashboard:**
   - After login, you should see the dashboard
   - Try logging out from sidebar

4. **Test Protection:**
   - Log out
   - Try visiting: https://tw-client-dashbaord.vercel.app/
   - Should redirect back to login

## If You Still Get 404

1. Check Vercel dashboard - is deployment successful?
2. Wait 1-2 minutes after deployment
3. Try clearing browser cache
4. Check if deployment is still building

Your dashboard should be live! 🚀

