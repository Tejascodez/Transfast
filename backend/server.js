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
const multer = require('multer')
const nodemailer = require('nodemailer'); // Nodemailer for email sending

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
app.use(bodyParser.urlencoded({ extended: true }));

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

// Socket.io CORS configuration
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

const EMAIL_USER = 'tejastp@834@gmail.com';
const EMAIL_PASS = 'naen erca ylwo gaoh';
const upload = multer({ dest: 'uploads/' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // Ensure you are using an app-specific password if 2FA is enabled
  },
});
app.post('/send-email', upload.single('attachment'), async (req, res) => {
  try {
    const { from, to, subject, message } = req.body;

    // Check if "to" field is valid
    if (!to || !Array.isArray(to) || to.length === 0) {
      return res.status(400).json({ message: 'Recipients are required and must be an array' });
    }

    // Validate emails format
    const invalidEmails = to.filter(email => !/\S+@\S+\.\S+/.test(email));
    if (invalidEmails.length > 0) {
      return res.status(400).json({ message: `Invalid email addresses: ${invalidEmails.join(', ')}` });
    }

    // Prepare mail options
    const mailOptions = {
      from: from || EMAIL_USER,
      to: to.join(', '), // Join the array of emails into a string
      subject: subject || 'No Subject',
      text: message || '',
      ...(req.file && {  // Attach file if it exists
        attachments: [
          {
            filename: req.file.originalname,
            path: path.join(__dirname, req.file.path), // File path on the server
            contentType: req.file.mimetype, // Attach file MIME type
          },
        ],
      }),
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

// Start the server
const port = PORT || 8080; // Fallback to port 8080 if PORT is not defined
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
