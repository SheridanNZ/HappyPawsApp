require('dotenv').config({ path: '.env.local' });  // Load .env.local

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./dbConnect');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS

// Connect to database
dbConnect();

// Routes
app.use('/api/users', userRoutes); // User authentication routes

module.exports = app;
