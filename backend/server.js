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
const nodemailer = require('nodemailer');
const CustomerRoutes = require('./routes/CustomerRoutes');
const upload = require('./utils/multerConfig');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));


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

app.use('/api', lrRoutes);
app.use('/api/vehicles', vechicleRoutes);
app.use('/api/fuels', fuelRoutes);
app.use('/api', DriverRoutes);
app.use('/api/customers', CustomerRoutes);



app.use('/uploads', express.static('uploads')); // Serve static files from "uploads" folder

// Send email route
app.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { from, to, subject, message } = req.body;
    const attachment = req.file;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tejastp834@gmail.com',
            pass: 'naen erca ylwo gaoh', // For security reasons, consider using environment variables
        },
    });

    const mailOptions = {
        from,
        to: JSON.parse(to), // Parse the recipients
        subject,
        text: message,
        attachments: attachment ? [
            {
                filename: attachment.originalname,
                path: attachment.path,
            },
        ] : [],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send('Emails sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});


// Start the server
const port = PORT || 5000; // Fallback to port 5000 if PORT is not defined
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
