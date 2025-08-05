
# Audience-Pulse Backend Deployment Guide

## Overview
This guide covers the complete setup and deployment of the Audience-Pulse backend API using Node.js, Express, and MongoDB.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Render.com account (or similar hosting service)
- Git repository

## Backend Structure
```
server/
├── models/
│   └── Opinion.js          # MongoDB schema for opinions
├── routes/
│   └── opinions.js         # API routes for opinion management
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
└── README.md              # Backend-specific documentation
```

## Environment Variables
Create a `.env` file in the server directory with:

```env
# Database
MONGODB_URI=mongodb+srv://Thangella:EBe32hlqLKlnxoku@Audience-Pulse-prod.frahevk.mongodb.net/?retryWrites=true&w=majority&appName=Audience-Pulse-Prod

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
FRONTEND_URL=https://Audience-Pulse-nu.vercel.app
ALLOWED_ORIGINS=https://Audience-Pulse-nu.vercel.app,http://localhost:5173,http://localhost:3000

# Admin Configuration (optional)
ADMIN_KEY=your-secure-admin-key-here

# Security
JWT_SECRET=your-jwt-secret-here
API_KEY=your-api-key-here
```

## Dependencies (package.json)
```json
{
  "name": "Audience-Pulse-api",
  "version": "1.0.0",
  "description": "Audience-Pulse Opinion Collection API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^8.12.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.3",
    "dotenv": "^16.4.7",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "compression": "^1.7.4"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Database Schema (Opinion Model)
The Opinion model supports all content types with proper validation:

```javascript
const OpinionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['film', 'television', 'youtube', 'streaming']
  },
  projectType: {
    type: String,
    required: true,
    enum: ['HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 'YouTubeFilm', 'YouTubeContent', 'OTTPlatform', 'Television']
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  userId: { type: String, required: true },
  
  // Content-specific fields
  televisionChannel: String,
  televisionContentType: String,
  ottPlatform: String,
  youtubeContentCategory: String,
  filmIndustry: String,
  genre: String,
  country: String,
  notes: String,
  
  // Demographics
  demographics: {
    age: String,
    gender: String,
    region: String
  },
  
  // Analysis fields
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now }
});
```

## API Endpoints

### Core Opinion Management
- `POST /api/opinions` - Submit new opinion
- `GET /api/opinions` - Get all opinions (paginated)
- `GET /api/opinions/user-voted/:userId/:section` - Check if user voted in section
- `GET /api/opinions/category/:category` - Get opinions by category
- `GET /api/opinions/analytics` - Get comprehensive analytics

### Statistics Endpoints
- `GET /api/opinions/stats/television` - Television-specific statistics
- `GET /api/opinions/stats/youtube-content` - YouTube content statistics
- `GET /api/opinions/trending` - Trending topics

### Health Check
- `GET /health` - Server health status

## Deployment Steps

### 1. Prepare Your Repository
```bash
# Clone the repository
git clone your-repo-url
cd Audience-Pulse

# Navigate to server directory
cd server

# Install dependencies
npm install
```

### 2. Database Setup (MongoDB Atlas)
1. Create MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string and update MONGODB_URI in .env

### 3. Deploy to Render.com

#### Option A: Connect Repository
1. Sign up at https://render.com
2. Connect your GitHub repository
3. Create a new Web Service
4. Set the following:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or specify if different)

#### Option B: Manual Deployment
1. Create a new Web Service on Render
2. Upload your code or connect Git repository
3. Configure build and start commands as above

### 4. Environment Variables on Render
Add these environment variables in Render dashboard:
```
MONGODB_URI=your-mongodb-connection-string
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://Audience-Pulse-nu.vercel.app
ALLOWED_ORIGINS=https://Audience-Pulse-nu.vercel.app,http://localhost:5173
```

### 5. Update Frontend Configuration
Update the API URL in your frontend code:
```javascript
// In src/api/opinionsApi.ts
const API_URL = 'https://Audience-Pulse-api-snfl.onrender.com/api';
```

## Server Configuration (server.js)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/opinions', require('./routes/opinions'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}`);
});
```

## Testing the Deployment

### 1. Health Check
```bash
curl https://Audience-Pulse-api-snfl.onrender.com/health
```

### 2. Submit Test Opinion
```bash
curl -X POST https://Audience-Pulse-api-snfl.onrender.com/api/opinions \
  -H "Content-Type: application/json" \
  -d '{
    "category": "film",
    "projectType": "HighBudgetFilm",
    "question": "Test question",
    "answer": "Test answer",
    "userId": "test-user-123",
    "country": "USA",
    "filmIndustry": "Hollywood",
    "genre": "Action"
  }'
```

### 3. Get Analytics
```bash
curl https://Audience-Pulse-api-snfl.onrender.com/api/opinions/analytics
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure FRONTEND_URL and ALLOWED_ORIGINS are correctly set
   - Check that frontend URL matches exactly (no trailing slashes)

2. **MongoDB Connection Issues**
   - Verify MONGODB_URI is correct
   - Check MongoDB Atlas IP whitelist
   - Ensure database user has proper permissions

3. **Deployment Failures**
   - Check build logs on Render
   - Verify all environment variables are set
   - Ensure Node.js version compatibility

4. **High Response Times**
   - Render free tier may have cold start delays
   - Consider upgrading to paid tier for better performance

### Monitoring:
- Use Render's built-in logs and metrics
- Monitor MongoDB Atlas performance metrics
- Set up alerts for downtime or errors

## Security Considerations
- Always use environment variables for sensitive data
- Implement proper input validation
- Use HTTPS in production
- Regular security updates for dependencies
- Monitor for unusual traffic patterns

## Scaling Considerations
- Use MongoDB indexes for better query performance
- Implement caching for frequently accessed data
- Consider CDN for static assets
- Monitor database performance and upgrade as needed

## Backup Strategy
- MongoDB Atlas provides automatic backups
- Export critical data regularly
- Test restore procedures
- Document recovery processes

This comprehensive setup ensures a robust, scalable backend for the Audience-Pulse application with proper error handling, security measures, and monitoring capabilities.
