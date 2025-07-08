# Deploy Reading Tracker to Vercel

## Step 1: Download Your Project
1. In your Replit workspace, click the three dots menu (⋮) in the file explorer
2. Select "Download as ZIP"
3. Extract the ZIP file to a folder on your computer

## Step 2: Set Up Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" and create a free account
3. You can sign up with GitHub, GitLab, or email

## Step 3: Deploy Your App

### Option A: Drag & Drop (Easiest)
1. Go to your Vercel dashboard
2. Click "Add New" → "Project"
3. Drag and drop your extracted project folder onto the upload area
4. Vercel will automatically detect it's a Node.js project
5. Click "Deploy"

### Option B: Connect GitHub Repository
1. Upload your project to GitHub first
2. In Vercel dashboard, click "Add New" → "Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Click "Deploy"

## Step 4: Configure Environment Variables
1. After deployment, go to your project settings
2. Click "Environment Variables"
3. Add these variables:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (leave empty for now - app will use memory storage)

## Step 5: Get Your Live URL
- Your app will be available at: `https://your-project-name.vercel.app`
- Vercel gives you a unique URL automatically
- You can also add a custom domain later if you want

## Step 6: Install as Mobile App
1. Open your new URL on your phone
2. Look for "Install Reading Tracker" banner
3. Or use browser's "Add to Home Screen" option

## Optional: Database Setup (For Production)
If you want persistent data that survives app restarts:

1. Get a free PostgreSQL database from:
   - Neon: https://neon.tech (recommended)
   - Railway: https://railway.app
   - Supabase: https://supabase.com

2. Copy the connection string they provide
3. Add it as `DATABASE_URL` in your Vercel environment variables
4. Redeploy your app

## Troubleshooting
- If deployment fails, check the build logs in Vercel
- Make sure all files were uploaded correctly
- Environment variables are case-sensitive
- Contact me if you need help with any step

## Benefits of Vercel
- Free hosting with generous limits
- Automatic HTTPS and global CDN
- Easy custom domains
- Automatic deployments from Git
- Built-in analytics