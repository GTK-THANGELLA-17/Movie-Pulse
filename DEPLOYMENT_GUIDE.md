
# Audience-Pulse Deployment Guide

## Current Architecture Overview

Audience-Pulse uses a modern three-tier architecture:
- **Frontend**: Vercel (React/Vite application)
- **Backend**: Render.com (Node.js/Express API)
- **Database**: MongoDB Atlas (Opinion storage and analytics)

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment (Render.com)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Testing the Complete Flow](#testing-the-complete-flow)
7. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Prerequisites

- GitHub account with your Audience-Pulse repository
- MongoDB Atlas account (free tier available)
- Render.com account (free tier available)
- Vercel account (free tier available)
- Node.js 18+ (for local development)

## MongoDB Atlas Setup

### 1. Create MongoDB Cluster
1. Sign up at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (M0 free tier recommended for testing)
3. Choose your preferred cloud provider and region
4. Wait for cluster creation (2-3 minutes)

### 2. Configure Database Access
1. Go to "Database Access" under Security
2. Add new database user:
   - Username: Choose a secure username
   - Password: Generate a secure password (save it!)
   - Database User Privileges: Read and write to any database
3. Click "Add User"

### 3. Configure Network Access
1. Go to "Network Access" under Security
2. Add IP Address:
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP ranges for better security
3. Confirm the entry

### 4. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your credentials
5. Add database name: `Audience-Pulse` at the end before the query parameters

## Backend Deployment (Render.com)

### 1. Create Web Service
1. Sign up/login to [Render.com](https://render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure service settings:
   - **Name**: `Audience-Pulse-api`
   - **Environment**: Node
   - **Region**: Choose closest to your audience
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free (for testing)

### 2. Environment Variables
Add these in Render's Environment section:
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/Audience-Pulse?retryWrites=true&w=majority
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

### 3. Deploy Backend
1. Click "Create Web Service"
2. Wait for build and deployment (5-10 minutes)
3. Note your API URL: `https://Audience-Pulse-api-xxxx.onrender.com`

## Frontend Deployment (Vercel)

### 1. Update API Configuration
Before deploying, update the API URL in your frontend code. In your Vercel project, the API calls should point to your Render backend.

### 2. Deploy to Vercel
1. Sign up/login to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Environment Variables (Optional)
If needed, add environment variables in Vercel project settings:
```bash
VITE_API_URL=https://Audience-Pulse-api-xxxx.onrender.com
```

### 4. Deploy
1. Click "Deploy"
2. Wait for build completion (3-5 minutes)
3. Your app is live at: `https://your-project.vercel.app`

## Environment Configuration

### Backend Environment Variables
```bash
# Server Configuration
NODE_ENV=production
PORT=10000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/Audience-Pulse?retryWrites=true&w=majority

# CORS (Important!)
CORS_ORIGIN=https://your-vercel-app.vercel.app

# Optional Security
JWT_SECRET=your-secure-jwt-secret
API_KEY=your-api-key
```

### Update CORS in Backend
Ensure your backend allows requests from your Vercel domain:
```javascript
// In server.js
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
};
```

## Testing the Complete Flow

### 1. Test API Health
```bash
curl https://Audience-Pulse-api-xxxx.onrender.com/health
# Should return: {"status": "OK", "timestamp": "..."}
```

### 2. Test Opinion Submission
Visit your Vercel app and:
1. Go to the voting page
2. Submit an opinion for any category
3. Check if submission is successful
4. Verify data appears in MongoDB Atlas (Browse Collections)

### 3. Test Statistics
1. Go to the stats page on your Vercel app
2. Verify that submitted opinions appear in charts
3. Test different category filters
4. Check real-time updates

### 4. Test Database Connection
```bash
curl https://Audience-Pulse-api-xxxx.onrender.com/api/opinions/analytics
# Should return comprehensive analytics data
```

## Data Flow Verification

**Complete User Journey:**
1. **User visits** → `https://your-project.vercel.app`
2. **Submits opinion** → Frontend sends POST to Render backend
3. **Backend validates** → Saves to MongoDB Atlas
4. **Creates vote record** → Prevents duplicate submissions
5. **Views stats** → Frontend fetches from backend → Backend aggregates from MongoDB
6. **Real-time updates** → New opinions immediately reflect in statistics

**Database Collections Created:**
- `opinions`: Stores all user opinions with demographics
- `voterecords`: Tracks voting to prevent duplicates
- Automatic indexes for optimized queries

## Monitoring and Maintenance

### Health Monitoring
- **Backend Health**: `https://Audience-Pulse-api-xxxx.onrender.com/health`
- **Database Status**: Check MongoDB Atlas monitoring dashboard
- **Frontend Status**: Vercel automatically monitors deployments

### Performance Optimization
1. **Render.com Free Tier**: May experience cold starts (30-60 seconds)
2. **MongoDB Free Tier**: 512MB storage limit
3. **Vercel Free Tier**: Automatic global CDN and optimizations

### Scaling Considerations
- **Traffic Growth**: Upgrade Render.com to paid tier for faster response times
- **Data Growth**: Upgrade MongoDB Atlas tier when approaching storage limits
- **Global Users**: Render.com automatically handles geographic distribution

### Security Best Practices
1. **Environment Variables**: Never commit sensitive data to repository
2. **CORS Configuration**: Only allow your frontend domain
3. **Input Validation**: Backend validates all opinion submissions
4. **Rate Limiting**: Implemented to prevent spam submissions

### Backup and Recovery
- **MongoDB Atlas**: Automatic backups included in free tier
- **Code Repository**: GitHub serves as version control backup
- **Deployment**: Both Vercel and Render.com maintain deployment history

## Troubleshooting Common Issues

### CORS Errors
- Verify `CORS_ORIGIN` environment variable matches your Vercel URL exactly
- Check for trailing slashes in URLs

### Database Connection Issues
- Verify MongoDB connection string format
- Check Network Access whitelist in MongoDB Atlas
- Ensure database user has proper permissions

### Cold Start Delays
- Render.com free tier may take 30-60 seconds to wake up
- Consider upgrading to paid tier for production use

### Build Failures
- Check build logs in Render.com dashboard
- Verify all dependencies are listed in package.json
- Ensure Node.js version compatibility

This deployment setup provides a robust, scalable foundation for Audience-Pulse with proper separation of concerns and modern best practices.
