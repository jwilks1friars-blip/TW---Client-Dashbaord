# Push Dashboard to GitHub - Quick Commands

Your repository is ready at: https://github.com/jwilks1friars-blip/TW---Client-Dashbaord.git

## Run These Commands

Open Terminal and run these commands one by one:

```bash
# 1. Navigate to the dashboard folder
cd "/Users/tyler.wilks/Cursor - TW running schedule/Client dashboard"

# 2. Initialize git (if not already done)
git init

# 3. Add all files
git add .

# 4. Create first commit
git commit -m "Initial commit: Client dashboard with Next.js and shadcn/ui"

# 5. Add your GitHub repository
git remote add origin https://github.com/jwilks1friars-blip/TW---Client-Dashbaord.git

# 6. Set main branch
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

## If You Get Errors

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/jwilks1friars-blip/TW---Client-Dashbaord.git
```

### "Permission denied" or authentication required
You may need to authenticate. Try:
```bash
# Use your GitHub username when prompted
git push -u origin main
```

Or set up SSH keys, or use GitHub CLI.

### "Nothing to commit"
If you see this, your files are already committed. Just push:
```bash
git push -u origin main
```

## After Pushing

Once your code is on GitHub:

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Click "Import Git Repository"
4. Find and select `TW---Client-Dashbaord`
5. Click "Deploy"

Your dashboard will be live in 1-2 minutes! 🚀

