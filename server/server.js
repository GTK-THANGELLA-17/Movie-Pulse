
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Thangella:EBe32hlqLKlnxoku@moviepulse-prod.frahevk.mongodb.net/?retryWrites=true&w=majority&appName=MoviePulse-Prod';

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'https://moviepulse-nu.vercel.app',
    'https://4abe4449-e8c6-4a8d-b0b5-46e59bb73150.lovableproject.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Enhanced middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body preview:', JSON.stringify(req.body).substring(0, 200));
  }
  next();
});

// Connect to MongoDB with improved retry logic
const connectDB = async () => {
  let retries = 5;
  
  while (retries) {
    try {
      console.log(`MongoDB connection attempt ${6 - retries}/5...`);
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4,
        maxPoolSize: 10,
        minPoolSize: 1,
        maxIdleTimeMS: 30000,
        bufferMaxEntries: 0,
        bufferCommands: false,
      });
      
      console.log('MongoDB connected successfully');
      return;
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      retries -= 1;
      
      if (retries === 0) {
        console.error('Failed to connect to MongoDB after multiple attempts');
      } else {
        console.log(`Retrying connection in ${(6 - retries) * 2} seconds...`);
        await new Promise(resolve => setTimeout(resolve, (6 - retries) * 2000));
      }
    }
  }
};

// Enhanced connection monitoring
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established successfully');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected! Attempting to reconnect...');
  setTimeout(() => {
    connectDB();
  }, 5000);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  setTimeout(() => {
    connectDB();
  }, 5000);
});

// Ping MongoDB periodically to keep connection alive
setInterval(async () => {
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping();
      console.log("MongoDB connection pinged successfully");
    } catch (error) {
      console.error("Error pinging MongoDB:", error);
    }
  }
}, 300000); // Every 5 minutes

// Initialize DB connection
connectDB();

// Routes
const opinionsRoutes = require('./routes/opinions');
app.use('/api/opinions', opinionsRoutes);

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorDetails = {
    message: err.message || 'An unexpected error occurred',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    status: statusCode,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress
  };
  
  console.error('=== ERROR DETAILS ===');
  console.error(JSON.stringify(errorDetails, null, 2));
  console.error('Stack trace:', err.stack);
  console.error('===================');
  
  res.status(statusCode).json({
    error: true,
    message: errorDetails.message,
    timestamp: errorDetails.timestamp,
    details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
  });
});

// Enhanced health check route
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };
  
  const status = {
    status: mongoStatus === 1 ? 'OK' : 'DEGRADED',
    message: 'MoviePulse API is running',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    server: {
      uptime: Math.floor(process.uptime()),
      memoryUsage: process.memoryUsage(),
      version: process.version
    },
    mongoDb: {
      status: mongoStatusMap[mongoStatus] || 'unknown',
      statusCode: mongoStatus,
      host: MONGODB_URI.split('@')[1]?.split('/')[0] || 'unknown'
    }
  };
  
  const statusCode = mongoStatus === 1 ? 200 : 503;
  res.status(statusCode).json(status);
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'MoviePulse API is running successfully',
    docs: 'API documentation available at /api-docs',
    version: '1.0.0',
    endpoints: [
      'GET /health - Health check',
      'GET /api - API info',
      'POST /api/opinions - Submit opinion',
      'GET /api/opinions - Get opinions'
    ]
  });
});

// API info route
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'MoviePulse API is working correctly',
    timestamp: new Date().toISOString(),
    endpoints: [
      { path: '/api/opinions', methods: ['GET', 'POST'] },
      { path: '/api/opinions/category/:category', methods: ['GET'] },
      { path: '/api/opinions/analytics', methods: ['GET'] },
      { path: '/api/opinions/trending', methods: ['GET'] },
      { path: '/api/opinions/stats/television', methods: ['GET'] }
    ]
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    message: 'Resource not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Server startup with enhanced error handling
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🔗 MongoDB URI: ${MONGODB_URI.replace(/\/\/(.+?):.+?@/, '//***:***@')}`);
  console.log(`⏰ Server started at: ${new Date().toISOString()}`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully`);
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Enhanced error handling for uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  console.error('=== UNCAUGHT EXCEPTION ===');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  console.error('========================');
  
  // Don't exit immediately to allow for cleanup
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('=== UNHANDLED REJECTION ===');
  console.error('Promise:', promise);
  console.error('Reason:', reason);
  console.error('==========================');
  
  // Don't exit for unhandled rejections, just log them
});

module.exports = app;
