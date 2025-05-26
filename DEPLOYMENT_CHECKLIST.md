# Photo Gallery Deployment Checklist

## Phase 1: Repository Setup ✅

### Step 1: GitHub Repository
- [ ] Create new GitHub repository
- [ ] Push your code from Replit to GitHub
- [ ] Verify all files are uploaded correctly

## Phase 2: Database Setup (Neon)

### Step 2: Create Neon Database
- [ ] Sign up at neon.tech
- [ ] Create new project named "photo-gallery"
- [ ] Copy connection string
- [ ] Save connection string securely

### Step 3: Initialize Database Schema
- [ ] Open Neon SQL Editor
- [ ] Run schema creation commands
- [ ] Verify tables are created

## Phase 3: Backend Deployment (Render)

### Step 4: Deploy API to Render
- [ ] Sign up at render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`

### Step 5: Configure Environment Variables
- [ ] Add NODE_ENV: `production`
- [ ] Add DATABASE_URL: [your Neon connection string]
- [ ] Add SESSION_SECRET: [generate random 32-char string]

### Step 6: Note Render URL
- [ ] Copy your Render app URL (e.g., photo-gallery-api.onrender.com)
- [ ] Update netlify.toml with this URL
- [ ] Update server/index.ts CORS with Netlify URL (next step)

## Phase 4: Frontend Deployment (Netlify)

### Step 7: Deploy Frontend to Netlify
- [ ] Sign up at netlify.com
- [ ] Create new site from Git
- [ ] Connect same GitHub repository
- [ ] Set base directory: `client`
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `client/dist`

### Step 8: Update Configuration
- [ ] Note your Netlify site URL
- [ ] Update server/index.ts with Netlify URL
- [ ] Push changes to GitHub
- [ ] Verify auto-deployment works

## Phase 5: Final Testing

### Step 9: Upload Photos
- [ ] Use admin panel to add photos
- [ ] Test photo categories (trips, dates)
- [ ] Verify stats update correctly

### Step 10: Complete Testing
- [ ] Visit your live site
- [ ] Test all pages (Home, Gallery, Special Moments, Surprise)
- [ ] Test admin functionality
- [ ] Verify mobile responsiveness

## URLs to Replace:
1. In `netlify.toml`: Replace `REPLACE-WITH-YOUR-RENDER-APP-NAME`
2. In `server/index.ts`: Replace `REPLACE-WITH-YOUR-NETLIFY-SITE`

## Important Notes:
- Free tiers available for all services
- Auto-deployment enabled from GitHub
- HTTPS enabled by default
- Admin panel accessible at: your-site.netlify.app/admin.html