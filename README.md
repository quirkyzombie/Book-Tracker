# Reading Tracker App

A Progressive Web App (PWA) for tracking your book reading progress with chapter status management.

## Features

- 📚 Add and organize books in a visual bookshelf
- 📖 Track chapters with different status indicators
- ✅ Mark chapters as completed (strikethrough)
- 🔴 Mark difficult chapters (red background)
- 🔵 Mark chapters for re-reading (blue background)
- 📱 Install as mobile app (PWA)
- 🔄 Works offline after installation

## Quick Start

### Option 1: Deploy to Replit (Easiest)
1. Open this project in Replit
2. Click the "Deploy" button in the top right
3. Your app will be available at `https://your-app-name.replit.app`

### Option 2: Deploy to Vercel (Free)
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Option 3: Deploy to Netlify (Free)
1. Build the app: `npm run build`
2. Upload the `dist` folder to Netlify
3. Or connect your GitHub repo to Netlify for auto-deploy

### Option 4: Run Locally
1. Install dependencies: `npm install`
2. Set up environment variables (see below)
3. Start development server: `npm run dev`
4. Open `http://localhost:5000`

## Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```

### Database Setup
- **Development**: Uses in-memory storage (no database needed)
- **Production**: Requires PostgreSQL database

#### Free Database Options:
- **Neon**: Free PostgreSQL (recommended)
- **Railway**: Free PostgreSQL tier
- **Supabase**: Free PostgreSQL tier

## Installation as Mobile App

### On Android:
1. Open the app in Chrome
2. Look for "Install Reading Tracker" banner
3. Or tap menu → "Add to Home Screen"

### On iPhone:
1. Open the app in Safari
2. Tap the share button
3. Select "Add to Home Screen"

### On Desktop:
1. Open in Chrome/Edge
2. Click the install icon in the address bar
3. Or go to Settings → Install app

## File Structure

```
├── client/          # React frontend
│   ├── src/
│   ├── public/      # PWA files (manifest, icons, service worker)
│   └── index.html
├── server/          # Express backend
├── shared/          # Shared types and schemas
└── dist/           # Built files (after npm run build)
```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server (after build)

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **PWA**: Service Worker, Web App Manifest

## Support

If you encounter issues:
1. Check that all dependencies are installed: `npm install`
2. Verify environment variables are set correctly
3. For database issues, check your DATABASE_URL connection string
4. For PWA features, ensure you're using HTTPS in production

## License

MIT License - feel free to use and modify as needed!