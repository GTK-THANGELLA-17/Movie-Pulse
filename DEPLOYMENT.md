
# MoviePulse Deployment Guide

## Platform Requirements

### Frontend (Vercel)
- **Node.js Version**: 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `API_URL`: https://moviepulse-api.onrender.com/api

### Backend (Render.com)
- **Node.js Version**: 20.x
- **Build Command**: None (Using Node.js runtime)
- **Start Command**: `node server.js`
- **Environment Variables**:
  - `MONGODB_URI`: MongoDB connection string
  - `NODE_ENV`: production
  - `PORT`: 5000 (or the port assigned by the platform)
  - `LOG_LEVEL`: info

## Deployment Steps

### Frontend Deployment on Vercel
1. Connect your GitHub repository to Vercel
2. Set up a new project and import the repository
3. Configure the build settings as mentioned above
4. Add the required environment variables
5. Deploy the project

### Backend Deployment on Render.com
1. Connect your GitHub repository to Render.com
2. Create a new Web Service
3. Select the Node.js environment
4. Configure the start command as `node server.js`
5. Add the required environment variables
6. Deploy the service

## Troubleshooting

If the frontend cannot connect to the backend, ensure:
1. CORS is properly configured in the backend
2. The API_URL environment variable is correctly set
3. The backend service is running and accessible

If votes are not being stored in MongoDB:
1. Check MongoDB connection string is correct
2. Verify MongoDB Atlas network access settings to allow connections from your deployment platforms
3. Check server logs for any connection errors
4. Ensure the API endpoints are correctly configured

## Monitoring
- Use the `/health` endpoint to check if the API is running correctly
- MongoDB connection status can be checked via `/health` endpoint response
