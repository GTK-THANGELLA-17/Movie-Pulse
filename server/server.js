
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://moviepulse-nu.vercel.app/', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Retry connection after delay
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Routes
const opinionsRoutes = require('./routes/opinions');
app.use('/api/opinions', opinionsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'An unexpected error occurred',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'MoviePulse API is running',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date(),
    mongoDbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root route to prevent 404 on base path
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'MoviePulse API is running. For health check, use /health endpoint.',
    docs: 'API documentation available at /api-docs',
    version: '1.0.0'
  });
});

// API route
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'MoviePulse API is working correctly',
    endpoints: [
      { path: '/api/opinions', methods: ['GET', 'POST'] }
    ]
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Graceful shutdown
  process.exit(1);
});
