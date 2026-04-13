# Flowboard V2 - Deployment Guide

## Quick Start Deployment (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free - https://vercel.com)
- Render account (free - https://render.com)
- Google Cloud Console account (free project)
- MongoDB Atlas account (free cluster)

---

## Step 1: Push to GitHub

```bash
cd FLOWBOARD

# If not already committed
git add .
git commit -m "Flowboard V2: Ready for deployment"

# Create new repository on GitHub
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/flowboard.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Frontend to Vercel (2 minutes)

1. Go to https://vercel.com/dashboard
2. Click **"New Project"** → Select your GitHub repository
3. Configure:
   - **Framework Preset:** React
   - **Root Directory:** `./client`
   - **Build Command:** `npm run build --legacy-peer-deps`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install --legacy-peer-deps`

4. Click **"Deploy"**
5. Wait for build to complete (usually 2-3 minutes)
6. Your frontend will be live at `https://your-project.vercel.app`

### Add Environment Variable:
1. Go to **Settings** → **Environment Variables**
2. Add:
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `VITE_API_URL`: https://your-render-backend.onrender.com (from Step 3)

---

## Step 3: Deploy Backend to Render (2 minutes)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Select your GitHub repository (authorize if needed)
4. Configure:
   - **Name:** flowboard-api (or your choice)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `server`

5. Click **"Advanced"** and add Environment Variables:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<generate-random-string-32-chars>
   JWT_EXPIRY=7d
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   CLIENT_ORIGIN=https://your-vercel-app.vercel.app
   NODE_ENV=production
   ```

6. Click **"Create Web Service"**
7. Wait for deploy to complete (~2 minutes)
8. Your backend will be at `https://your-render-backend.onrender.com`

---

## Step 4: Set Up Google OAuth

### In Google Cloud Console:

1. Go to https://console.cloud.google.com/
2. Create new project: "Flowboard"
3. Go to **APIs & Services** → **OAuth consent screen**
4. Choose **External** user type
5. Fill app information:
   - App name: Flowboard
   - User support email: your-email@example.com
6. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
7. Choose **Web application**
8. Add Authorized JavaScript origins:
   ```
   http://localhost:5173
   https://your-vercel-app.vercel.app
   ```
9. Add Authorized redirect URIs:
   ```
   http://localhost:5173/login
   https://your-vercel-app.vercel.app/login
   ```
10. Copy **Client ID** and **Client Secret**

### Add to Vercel & Render:
- Vercel: **Settings** → **Environment Variables**
  - `VITE_GOOGLE_CLIENT_ID`: <your-client-id>
- Render: **Environment** → Add variable
  - `GOOGLE_CLIENT_ID`: <your-client-id>
  - `GOOGLE_CLIENT_SECRET`: <your-client-secret>

---

## Step 5: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. **Database** → **Browse Collections** → Create database:
   - Database name: `flowboard`
   - Collection name: `workflows`
4. Go to **Deployments** → **Database Access**
5. Create database user with strong password
6. Go to **Deployments** → **Network Access**
7. Add IP address `0.0.0.0/0` (or your Render IP for security)
8. Click **Connect** → **Connect your application**
9. Copy connection string (replace password and database name):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/flowboard?retryWrites=true&w=majority
   ```
10. Add to Render environment as `MONGO_URI`

---

## Testing the Deployment

1. **Visit your frontend:** https://your-vercel-app.vercel.app
2. Click **"Get Started"** → **"Sign Up"**
3. Test with email/password or Google OAuth
4. Create a new workflow
5. Build a workflow and run it
6. Test that workflows are saved and loadable

---

## Deployment Complete! 🎉

Your application is now live and ready for users!

---

## Important: Add to .env (for local development)

```bash
# client/.env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-actual-google-client-id

# server/.env
PORT=5000
MONGO_URI=your-mongodb-connection-string
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=your-strong-secret-key-min-32-chars
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=another-strong-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=development
```

---

## Monitoring & Debugging

**Vercel:** 
- Go to dashboard, select project
- Click **"Deployments"** to see build logs
- Click **"Analytics"** to monitor usage

**Render:**
- Go to dashboard, select service
- Click **"Logs"** to see server output
- Click **"Metrics"** to monitor performance

**MongoDB Atlas:**
- Monitor and optimize in MongoDB Atlas dashboard
- Check connection logs if users report database issues

---

## Next Steps (Optional Enhancements)

- [ ] Add email verification
- [ ] Implement workflow sharing
- [ ] Add advanced analytics
- [ ] Set up CI/CD with GitHub Actions
- [ ] Add custom domain
- [ ] Enable SSL/TLS
- [ ] Set up error logging (Sentry)
- [ ] Add API rate limiting
- [ ] Implement workflow templates

---

**Questions? Check the main README.md or see the troubleshooting section.**
