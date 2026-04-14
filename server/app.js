require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const workflowRoutes = require('./routes/workflows');
const authRoutes = require('./routes/auth');

const app = express();

// CORS
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());

// Body parsing
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', workflowRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Server is running' }));

// MongoDB connection (optional - using file-based auth for now)
try {
  const mongoose = require('mongoose');
  if (process.env.MONGO_URI && process.env.MONGO_URI !== 'mongodb://localhost:27017/flowboard') {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('✅ MongoDB connected'))
      .catch(err => console.log('⚠️  MongoDB connection skipped (using file-based storage)'));
  } else {
    console.log('ℹ️  Using file-based user storage (no MongoDB)');
  }
} catch (err) {
  console.log('ℹ️  MongoDB optional - using file-based storage');
}

module.exports = app;

