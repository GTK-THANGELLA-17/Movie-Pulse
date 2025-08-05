
# Audience-Pulse Deployment Guide

## Platform Requirements

### Frontend (Vercel)
- **Node.js Version**: 20.x
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `API_URL`: https://Audience-Pulse-api-snfl.onrender.com/api

### Backend (Render.com)
- **Node.js Version**: 20.x
- **Build Command**: None (Using Node.js runtime)
- **Start Command**: `node server.js`
- **Environment Variables**:
  - `MONGODB_URI`: mongodb+srv://Thangella:EBe32hlqLKlnxoku@Audience-Pulse-prod.frahevk.mongodb.net/?retryWrites=true&w=majority&appName=Audience-Pulse-Prod
  - `NODE_ENV`: production
  - `PORT`: 5000 (or the port assigned by the platform)

## Important URLs
- **Frontend URL**: https://Audience-Pulse-nu.vercel.app/
- **Backend URL**: https://Audience-Pulse-api-snfl.onrender.com/
- **API Base URL**: https://Audience-Pulse-api-snfl.onrender.com/api

## Deployment Steps

### Frontend Deployment on Vercel
1. Connect your GitHub repository to Vercel
2. Set up a new project and import the repository
3. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the required environment variables:
   - `API_URL`: https://Audience-Pulse-api-snfl.onrender.com/api
5. Deploy the project

### Backend Deployment on Render.com
1. Connect your GitHub repository to Render.com
2. Create a new Web Service
3. Select the Node.js environment
4. Configure the start command as `node server.js`
5. Add the required environment variables:
   - `MONGODB_URI`: mongodb+srv://Thangella:EBe32hlqLKlnxoku@Audience-Pulse-prod.frahevk.mongodb.net/?retryWrites=true&w=majority&appName=Audience-Pulse-Prod
   - `NODE_ENV`: production
   - `PORT`: 5000 (or the port assigned by the platform)
6. Deploy the service

## Troubleshooting

If the frontend cannot connect to the backend, ensure:
1. CORS is properly configured in the backend
2. The API_URL environment variable is correctly set
3. The backend service is running and accessible

To check if the backend API is working:
1. Visit https://Audience-Pulse-api-snfl.onrender.com/health
2. You should see a JSON response with status "OK" and mongoDbStatus "connected"

If votes are not being stored in MongoDB:
1. Check MongoDB connection status at https://Audience-Pulse-api-snfl.onrender.com/health
2. Check server logs on Render.com for any connection errors
3. Ensure the API endpoints are correctly configured

## Performance Optimization
- Free tier on Render.com may experience cold starts. Consider upgrading to a paid plan for better performance.
- Vercel's free tier already provides good performance for static sites.

## Monitoring
- Use the `/health` endpoint to check if the API is running correctly
- MongoDB connection status can be checked via `/health` endpoint response
- For more detailed monitoring, consider integrating a service like Sentry or LogRocket

