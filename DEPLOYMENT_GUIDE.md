
# MoviePulse Deployment Guide

This comprehensive guide explains how to deploy the MoviePulse application using Vercel for the frontend and Render.com for the backend API, while storing data in MongoDB Atlas.

## Project Structure

```
moviepulse/
├── public/                 # Static assets
├── server/                 # Backend API
│   ├── models/             # MongoDB data models
│   ├── routes/             # API route handlers
│   └── server.js           # Main server file
├── src/                    # Frontend React app
│   ├── api/                # API client code
│   ├── components/         # React components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   └── styles/             # CSS styles
└── package.json            # Project dependencies
```

## Prerequisites

- [GitHub](https://github.com/) account
- [Vercel](https://vercel.com/) account (sign up for free)
- [Render.com](https://render.com/) account (sign up for free)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier available)
- [Node.js](https://nodejs.org/) (v14 or later) installed locally

## Step 1: GitHub Repository Setup

1. Create a new GitHub repository:
   - Go to [GitHub](https://github.com/) and sign in
   - Click the "+" icon in the top-right corner and select "New repository"
   - Name your repository (e.g., "moviepulse")
   - Select "Public" or "Private" visibility
   - Click "Create repository"

2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/moviepulse.git
   git push -u origin main
   ```

## Step 2: MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [cloud.mongodb.com](https://cloud.mongodb.com/) if you don't have one

2. Create a new project:
   - Click "New Project"
   - Name your project (e.g., "MoviePulse")
   - Click "Create Project"

3. Build a new database:
   - Click "Build a Database"
   - Select "FREE" tier
   - Choose a cloud provider and region closest to your target audience
   - Click "Create"

4. Create a database user:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and a strong password
   - Set privileges to "Read and write to any database"
   - Click "Add User"

5. Set up network access:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. Get your connection string:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `moviepulse`

## Step 3: Deploy Backend to Render.com

1. Sign up for Render.com if you haven't already

2. Create a new Web Service:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose the repository with your MoviePulse code

3. Configure your web service:
   - Name: `moviepulse-api`
   - Root Directory: `server` (important - point to the server folder)
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`

4. Add environment variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: `production`
     - `PORT`: `5000`
     - `JWT_SECRET`: A random string for JWT token encryption (e.g., generate one at [randomkeygen.com](https://randomkeygen.com/))
     - `CORS_ORIGIN`: This will be your Vercel frontend URL (you can update this later)

5. Set the plan type to "Free"

6. Click "Create Web Service"

7. Wait for the deployment to complete. Note your service URL (e.g., `https://moviepulse-api.onrender.com`)

## Step 4: Deploy Frontend to Vercel

1. Sign up for Vercel if you haven't already

2. Import your GitHub project:
   - Click "Add New" → "Project"
   - Connect your GitHub repository
   - Choose the repository with your MoviePulse code
   - Vercel should automatically detect it as a Vite project

3. Configure your project:
   - Project Name: `moviepulse`
   - Framework Preset: `Vite`
   - Root Directory: Leave empty (as we're deploying the whole repo)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Add environment variables:
   - Click "Environment Variables"
   - Add the following variable:
     - `VITE_API_URL`: Your Render.com API URL (e.g., `https://moviepulse-api.onrender.com/api`)

5. Click "Deploy"

6. After deployment is complete, go back to your Render.com service and update the `CORS_ORIGIN` environment variable with your Vercel URL (e.g., `https://moviepulse.vercel.app`)

## Step 5: Connect Frontend and Backend

Now that both your frontend and backend are deployed, you need to update the CORS configuration to allow proper communication between them.

1. Go to your Render.com dashboard and navigate to your `moviepulse-api` service

2. Click on "Environment" in the left sidebar

3. Find the `CORS_ORIGIN` variable and update its value to your Vercel deployment URL (e.g., `https://moviepulse.vercel.app`)

4. Click "Save Changes"

5. Your service will automatically redeploy with the updated environment variable

## Step 6: Testing the Deployed Application

1. Visit your Vercel deployment URL (e.g., `https://moviepulse.vercel.app`)

2. Navigate to the "Cast Opinion" page and submit some test data

3. Check if the data is properly stored in MongoDB Atlas:
   - Go to your MongoDB Atlas dashboard
   - Click on "Browse Collections"
   - You should see your data in the "opinions" collection

## Step 7: Setting Up Continuous Deployment

Both Vercel and Render.com support continuous deployment from GitHub by default:

1. Whenever you push changes to your GitHub repository, both platforms will automatically rebuild and redeploy your application

2. You can customize deployment settings in each platform:
   - In Vercel: Go to Project → Settings → Git
   - In Render.com: Go to your service → Settings → Deploy hooks

## Data Collection and Management

The MoviePulse application collects the following data:

1. **User Opinions**: Stored in MongoDB with the structure:
   - Category (film, television, youtube, streaming)
   - Question responses
   - Anonymous user ID (generated client-side with fingerprintjs)
   - Optional demographics
   - Sentiment analysis results
   - Timestamps

2. **Analytics Data**: Generated from aggregated user opinions:
   - Category breakdowns
   - Sentiment analysis
   - Regional distribution
   - Time-based trends

### Data Access and API Endpoints

Your deployed backend provides the following API endpoints:

- `GET /api/opinions` - Get all opinions with pagination
- `GET /api/opinions/category/:category` - Get opinions by category
- `GET /api/opinions/analytics` - Get comprehensive analytics data
- `GET /api/opinions/trending` - Get trending topics
- `POST /api/opinions` - Submit a new opinion

## Monitoring and Maintenance

### Backend Monitoring

1. **Render.com Logs**:
   - Go to your Render.com service dashboard
   - Click on "Logs" in the left sidebar
   - You can filter logs by severity (info, error, etc.)

2. **MongoDB Atlas Monitoring**:
   - Go to your MongoDB Atlas cluster
   - Click on "Metrics" to view database performance

### Database Backups

MongoDB Atlas provides automated backups on the paid tiers. For the free tier, you should set up manual backups:

1. Go to your MongoDB Atlas cluster
2. Click on "...More Actions" → "Download"
3. Choose your export format and options
4. Click "Export"

## Scaling Your Application

As your application grows, consider these scaling options:

### MongoDB Atlas

1. Upgrade from free tier to paid tier for:
   - More storage
   - Better performance
   - Automated backups
   - Advanced security features

### Render.com

1. Upgrade to paid plans for:
   - Improved performance
   - Custom domains
   - More compute resources
   - Zero downtime deployments

### Vercel

1. Upgrade to teams or pro plans for:
   - Password protection
   - Custom domains
   - Analytics
   - Preview deployments

## Troubleshooting Common Issues

### CORS Errors

If you see CORS errors in your browser console:

1. Check that the `CORS_ORIGIN` environment variable in your Render.com service is set correctly to your Vercel URL
2. Make sure your backend CORS configuration is properly set up in `server.js`

### Database Connection Failures

If your API cannot connect to MongoDB:

1. Verify your MongoDB Atlas connection string is correct in your Render.com environment variables
2. Check that your database user has the correct permissions
3. Ensure your IP whitelist in MongoDB Atlas includes all necessary addresses (or set to allow all)

### API Endpoint Errors

If API endpoints return errors:

1. Check your API URL in the frontend environment variables
2. Verify the endpoints are correctly implemented in your backend code
3. Look at the Render.com logs for specific error messages

## Security Considerations

1. **Environment Variables**: Never commit sensitive information like API keys or database credentials to your Git repository
2. **Rate Limiting**: Implement rate limiting for your API to prevent abuse
3. **Input Validation**: Always validate user input on both client and server side
4. **HTTPS**: Ensure all connections use HTTPS (Vercel and Render.com handle this by default)
5. **Regular Updates**: Keep your dependencies updated to patch security vulnerabilities

## Conclusion

Your MoviePulse application is now fully deployed with a continuous deployment pipeline. The frontend hosted on Vercel communicates with the backend API on Render.com, which stores data in MongoDB Atlas.

This architecture provides a scalable, maintainable solution that can grow with your user base and feature requirements.
