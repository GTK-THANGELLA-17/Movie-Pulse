
# Deployment Guide for MoviePulse

This guide provides step-by-step instructions for deploying the MoviePulse application using GitHub, Vercel for the frontend, Render.com for the backend, and MongoDB Atlas for the database.

## Table of Contents
1. [Project Setup](#project-setup)
2. [MongoDB Atlas Setup](#mongodb-atlas-setup)
3. [Backend Deployment on Render.com](#backend-deployment-on-rendercom)
4. [Frontend Deployment on Vercel](#frontend-deployment-on-vercel)
5. [Connecting Services](#connecting-services)
6. [Post-Deployment Steps](#post-deployment-steps)
7. [Maintenance and Monitoring](#maintenance-and-monitoring)
8. [Troubleshooting](#troubleshooting)
9. [Security Considerations](#security-considerations)
10. [Scaling the Application](#scaling-the-application)

## Project Setup

### 1. Prepare Your GitHub Repository
1. Create a new GitHub repository for your project if you haven't already.
2. Push your codebase to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/moviepulse.git
   git push -u origin main
   ```

### 2. Organize Project Structure
Ensure your project is organized with clear separation between frontend and backend:
```
moviepulse/
├── server/           # Backend code
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Main server file
│   └── package.json  # Backend dependencies
└── src/              # Frontend code (React)
    ├── components/
    ├── contexts/
    ├── hooks/
    ├── lib/
    ├── pages/
    └── ...
```

## MongoDB Atlas Setup

### 1. Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in.
2. Create a new project for MoviePulse.

### 2. Create a Cluster
1. Create a new cluster (you can use the free tier for starting).
2. Choose your preferred cloud provider and region.
3. Click "Create Cluster".

### 3. Set Up Database Access
1. Go to "Database Access" under Security.
2. Add a new database user with appropriate permissions.
3. Set a secure password and save it securely.

### 4. Configure Network Access
1. Go to "Network Access" under Security.
2. Add IP addresses that should have access to your database.
3. For development, you can allow access from anywhere (0.0.0.0/0), but for production, restrict to specific IPs.

### 5. Get Connection String
1. Click "Connect" on your cluster.
2. Choose "Connect your application".
3. Copy the connection string, which will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
4. Replace `<username>`, `<password>`, and `<dbname>` with your credentials and database name.

## Backend Deployment on Render.com

### 1. Create a Render.com Account
1. Go to [Render.com](https://render.com/) and sign up or log in.
2. Connect your GitHub account to Render.

### 2. Create a New Web Service
1. Click "New" and select "Web Service".
2. Connect your GitHub repository.
3. Configure the service:
   - Name: `moviepulse-api`
   - Root Directory: `server`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Select appropriate instance type (Free tier for development)

### 3. Set Environment Variables
1. Under the "Environment" section, add these variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: `8080` (or your preferred port)
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: A secure random string for JWT authentication
   - `CORS_ORIGIN`: The URL of your frontend (e.g., `https://moviepulse.vercel.app`)

### 4. Deploy the Backend
1. Click "Create Web Service".
2. Render will automatically build and deploy your backend.
3. Wait for the deployment to complete.
4. Note the URL of your deployed backend (e.g., `https://moviepulse-api.onrender.com`).

## Frontend Deployment on Vercel

### 1. Create a Vercel Account
1. Go to [Vercel](https://vercel.com/) and sign up or log in.
2. Connect your GitHub account to Vercel.

### 2. Import Your Repository
1. Click "Import Project".
2. Select your repository.
3. Vercel will automatically detect that it's a React project.

### 3. Configure the Project
1. Project Name: `moviepulse`
2. Framework Preset: React (Vite)
3. Root Directory: Leave as default (the project root)
4. Build Command: Leave as default (`npm run build` or `vite build`)
5. Output Directory: Leave as default (`dist`)

### 4. Set Environment Variables
1. Under "Environment Variables", add:
   - `VITE_API_URL`: The URL of your Render.com backend (e.g., `https://moviepulse-api.onrender.com`)
   - Any other environment variables your frontend needs

### 5. Deploy the Frontend
1. Click "Deploy".
2. Vercel will build and deploy your frontend.
3. When deployment completes, you'll get a URL for your site (e.g., `https://moviepulse.vercel.app`).

## Connecting Services

### 1. Update Frontend API Calls
Make sure your frontend code uses the environment variable to connect to the backend:
```javascript
// Example in src/api/opinionsApi.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchOpinions = async () => {
  const response = await fetch(`${API_URL}/api/opinions`);
  // ...
};
```

### 2. Update CORS Settings in Backend
Ensure your backend allows requests from your frontend domain:
```javascript
// In server.js
const cors = require('cors');
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
```

## Post-Deployment Steps

### 1. Test the Deployed Application
1. Visit your frontend URL.
2. Test all features, especially those that interact with the backend.
3. Check that data is being properly stored in MongoDB Atlas.

### 2. Set Up Custom Domain (Optional)
1. Purchase a domain from a domain registrar.
2. Configure it in Vercel:
   - Go to your project settings.
   - Under "Domains", add your custom domain.
   - Follow Vercel's instructions to set up DNS records.

### 3. Set Up Monitoring
1. Set up monitoring tools like Sentry, LogRocket, or Google Analytics.
2. Configure alerts for any critical errors.

## Maintenance and Monitoring

### 1. Regular Database Backups
1. Set up automated backups in MongoDB Atlas.
2. Regularly test restoration procedures.

### 2. Monitoring Application Health
1. Set up health check endpoints in your backend.
2. Use monitoring tools like Render's built-in monitoring, UptimeRobot, or StatusCake.

### 3. Updating Dependencies
1. Regularly update dependencies to maintain security and performance.
2. Test thoroughly after updates before deploying to production.

## Troubleshooting

### Common Issues and Solutions

#### Backend Not Connecting to MongoDB
1. Check if MongoDB Atlas IP whitelist includes your Render.com IP.
2. Verify your connection string and credentials.
3. Check if your MongoDB user has the correct permissions.

#### CORS Issues
1. Ensure the CORS_ORIGIN environment variable in your backend matches your frontend URL exactly.
2. Check for any protocol mismatch (http vs https).

#### 502 Bad Gateway Errors
1. Check your server logs in Render.com dashboard.
2. Ensure your server is properly handling requests and not crashing.

## Security Considerations

### 1. Secure Environment Variables
1. Never commit sensitive information to your repository.
2. Use environment variables for all sensitive data.

### 2. Input Validation
1. Implement thorough server-side validation for all user inputs.
2. Use a library like Joi or Zod for validation.

### 3. Rate Limiting
1. Implement rate limiting to prevent abuse.
2. Use a library like express-rate-limit.

### 4. Regular Security Audits
1. Regularly audit your dependencies for vulnerabilities.
2. Use tools like npm audit or Snyk.

## Scaling the Application

### 1. Database Scaling
1. As your user base grows, consider upgrading your MongoDB Atlas tier.
2. Implement proper indexing for frequently queried fields.

### 2. Backend Scaling
1. Consider upgrading your Render.com plan as traffic increases.
2. Implement caching strategies for frequently accessed data.

### 3. Frontend Performance
1. Optimize asset loading and bundle size.
2. Implement code splitting and lazy loading.
3. Consider using a CDN for static assets.

---

This deployment guide provides a comprehensive approach to deploying your MoviePulse application. By following these steps, you'll have a fully functioning application with a secure database, scalable backend, and optimized frontend.

Remember to regularly monitor your application, update dependencies, and implement security best practices to ensure a smooth user experience and protect user data.
