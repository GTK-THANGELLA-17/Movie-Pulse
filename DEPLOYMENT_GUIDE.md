
# MoviePulse Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render.com)](#backend-deployment)
3. [Frontend Deployment (Vercel)](#frontend-deployment)
4. [MongoDB Configuration](#mongodb-configuration)
5. [Environment Variables](#environment-variables)
6. [Testing the Deployment](#testing-the-deployment)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Render.com account
- Vercel account
- Node.js 18+ (for local testing)

## Backend Deployment (Render.com)

### 1. Prepare Your Repository

1. Push your code to GitHub
2. Ensure your `server/` directory contains:
   - `server.js`
   - `package.json`
   - `routes/opinions.js`
   - `models/Opinion.js`

### 2. Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/moviepulse?retryWrites=true&w=majority
   ```

### 3. Deploy to Render.com

1. Go to [Render.com](https://render.com/) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `moviepulse-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### 4. Set Environment Variables on Render

In your Render service dashboard, go to "Environment" and add:

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/moviepulse?retryWrites=true&w=majority
ADMIN_KEY=your-secure-admin-key-here
```

### 5. Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your API URL: `https://your-service-name.onrender.com`

## Frontend Deployment (Vercel)

### 1. Update API URLs

Before deploying, update the API URLs in your frontend code:

In `src/components/VotingForm.tsx`, replace:
```javascript
const response = await fetch('https://moviepulse-api-snfl.onrender.com/api/opinions', {
```

With your actual Render API URL:
```javascript
const response = await fetch('https://your-service-name.onrender.com/api/opinions', {
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Environment Variables (if needed)

If you have any frontend environment variables, add them in Vercel's project settings under "Environment Variables".

### 4. Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your app will be available at: `https://your-project-name.vercel.app`

## MongoDB Configuration

### Required Collections

Your MongoDB database should automatically create these collections when data is inserted:

1. **opinions** - Stores user opinions/votes
   - Indexes are created automatically by the backend
   - Schema defined in `server/models/Opinion.js`

### Sample Data Structure

```json
{
  "_id": "ObjectId",
  "category": "film",
  "projectType": "HighBudgetFilm",
  "question": "What's your preference for High Budget Film?",
  "answer": "Country: India, Film Industry: Bollywood, Genre: Action",
  "userId": "user_1234567890_abcdef",
  "filmIndustry": "Bollywood",
  "genre": "Action",
  "country": "India",
  "demographics": {
    "gender": "male",
    "age": 25,
    "region": "India"
  },
  "sentiment": "positive",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Environment Variables

### Backend (.env for Render)

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/moviepulse?retryWrites=true&w=majority
ADMIN_KEY=your-secure-admin-key-here
```

### Frontend (No env vars needed)

The frontend uses the hardcoded API URL. Update it in the code before deployment.

## Testing the Deployment

### 1. Test Backend API

Test your API endpoints:

```bash
# Health check
curl https://your-service-name.onrender.com/

# Get opinions
curl https://your-service-name.onrender.com/api/opinions

# Test CORS
curl -H "Origin: https://your-project-name.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-service-name.onrender.com/api/opinions
```

### 2. Test Frontend

1. Visit your Vercel URL
2. Try submitting an opinion
3. Check if data appears in MongoDB Atlas
4. Verify the Statistics page shows data

### 3. Monitor Logs

- **Render**: Check service logs in dashboard
- **Vercel**: Check function logs in dashboard
- **MongoDB**: Monitor operations in Atlas

## Troubleshooting

### Common Issues

#### 1. CORS Errors
- Ensure your frontend URL is in the CORS configuration
- Check that the API URL is correct in frontend code

#### 2. MongoDB Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow all: 0.0.0.0/0)
- Ensure database user has correct permissions

#### 3. API Timeout
- Render free tier may have cold starts
- Consider upgrading to paid tier for better performance

#### 4. Build Failures
- Check build logs in Vercel/Render
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Performance Optimization

1. **Enable caching** in your API responses
2. **Use CDN** for static assets (Vercel does this automatically)
3. **Optimize images** and assets
4. **Enable compression** on your API server
5. **Monitor performance** with tools like Lighthouse

### Security Considerations

1. **Never expose** MongoDB URI in frontend code
2. **Use HTTPS** for all communications
3. **Validate input** on both frontend and backend
4. **Rate limiting** on API endpoints
5. **Monitor** for unusual activity

## Support

If you encounter issues:

1. Check the logs in Render/Vercel dashboards
2. Verify environment variables are set correctly
3. Test API endpoints with tools like Postman
4. Check MongoDB Atlas monitoring for connection issues

## Updating the Application

### Backend Updates
1. Push changes to GitHub
2. Render will automatically redeploy

### Frontend Updates
1. Update API URLs if changed
2. Push changes to GitHub
3. Vercel will automatically redeploy

### Database Schema Changes
1. Update the Opinion model if needed
2. Consider migration scripts for existing data
3. Test changes in development first

---

**Important**: Always test your deployment thoroughly before announcing it to users. Monitor the application for the first few hours after deployment to catch any issues early.
