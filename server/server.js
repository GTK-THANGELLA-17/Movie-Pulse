
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced middleware for production-ready global deployment
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000', 
    'https://Audience-Pulse-api-snfl.onrender.com',
    /\.lovable\.app$/,
    /\.vercel\.app$/,
    /\.netlify\.app$/,
    /\.herokuapp\.com$/,
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id', 'Cache-Control', 'X-Voting-Period']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers for production
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/audiencepulse')
  .then(() => console.log('Connected to MongoDB with enhanced tracking'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/opinions', require('./routes/opinions'));
app.use('/api/exclusive', require('./routes/exclusiveContent'));
app.use('/api/insights', require('./routes/insights'));
app.use('/api/voting-period', require('./routes/votingPeriod'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/statistics', require('./routes/statistics'));

// Production-ready health check endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running with enhanced features', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    features: {
      duplicatePrevention: true,
      rateLimiting: true,
      enhancedTracking: true,
      localRemoteSync: true,
      cors: true,
      mongodb: mongoose.connection.readyState === 1
    },
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'unknown'
    }
  });
});

// Basic health check for load balancers
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Audience-Pulse API Server',
    version: '2.0',
    timestamp: new Date(),
    endpoints: [
      '/api/health',
      '/api/opinions',
      '/api/opinions/v2',
      '/api/exclusive',
      '/api/insights'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Enhanced server running on port ${PORT}`);
  console.log('✅ Features: Duplicate Prevention | Rate Limiting | Enhanced Tracking');
});
