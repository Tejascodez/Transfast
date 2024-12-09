require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcrypt');
const cors = require('cors');
const lrRoutes = require('./routes/lrRoutes');

const app = express();
app.use(cors());

const { PORT, MONGO_URI } = process.env;
// app.post('/api/auth/signup', signup);

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connection successful'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Register routes
app.use('/api/auth', authRoutes);

app.use('/api/lorryReceipts', lrRoutes);

// Start the server
const port = PORT || 5000; // Fallback to port 5000 if PORT is not defined
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
