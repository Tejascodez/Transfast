require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcrypt');
const cors = require('cors');
const lrRoutes = require('./routes/lrRoutes');
const vechicleRoutes = require('./routes/vechicleRoutes');
const fuelRoutes = require('./routes/fuelRoutes');
const DriverRoutes = require('./routes/driver');
const path = require('path');
const CustomerRoutes = require('./routes/CustomerRoutes');
const locationRoute = require('./routes/vehiclelocationroutes');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

const { PORT, MONGO_URI } = process.env;

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
app.use('/api', lrRoutes);
app.use('/api/vehicles', vechicleRoutes);
app.use('/api/fuels', fuelRoutes);
app.use('/api', DriverRoutes);
app.use('/api/customers', CustomerRoutes);
app.use('/api', locationRoute);

// Create HTTP server and integrate socket.io
const server = http.createServer(app);

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:5173'], // Allow both frontend URLs
  methods: ["GET", "POST"],
};

// Apply the CORS middleware to the app
app.use(cors(corsOptions));

// Or, if you are using socket.io with custom CORS config:
const io = socketIO(server, {
  cors: {
    origin: ['http://localhost:3001', 'http://localhost:5173'], // Allow both frontend URLs
    methods: ["GET", "POST"],
  },
});

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example of listening for vehicle location updates
  socket.on('vehicleLocationUpdate', (data) => {
    console.log('Received vehicle location:', data);
    // Optionally broadcast to other clients
    socket.broadcast.emit('vehicleLocation', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = PORT || 8080; // Fallback to port 8080 if PORT is not defined
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
