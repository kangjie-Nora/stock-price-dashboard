# Deployment Guide

## Deploy to Vercel (Recommended)

Your code is now on GitHub: https://github.com/kangjie-Nora/stock-price-dashboard

### Steps:

1. **Go to Vercel**
   - Visit: https://vercel.com/
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub" (use GitHub account)

2. **Import Project**
   - After login, click "Add New..." → "Project"
   - Find your repository: `kangjie-Nora/stock-price-dashboard`
   - Click "Import" next to it

3. **Configure Project** (usually auto-detected)
   - Framework Preset: Vite (should be auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (should be filled)
   - Output Directory: `dist` (should be filled)

4. **Deploy**
   - Click "Deploy" button
   - Wait 1-2 minutes

5. **Get Your URL**
   - After deployment, you'll get a URL like:
     - `https://stock-price-dashboard.vercel.app`
   - This is your public application URL! ✅

## Alternative: Deploy to Netlify

1. Visit: https://www.netlify.com/
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select GitHub, then your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## Done!

After deployment, you'll have a public URL that you can:
- ✅ Share with anyone
- ✅ Include in your assignment submission email
- ✅ Showcase your work

---

**Important**: Use the deployed URL in your assignment submission, not `localhost:5173`
