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
const jwt = require('jsonwebtoken')
const session = require('express-session')
const nodemailer = require('nodemailer'); // Nodemailer for email sending
const passport = require('passport');
const flash = require('connect-flash'); 
const User = require('./models/User');


const app = express();
app.use(flash());
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials (cookies)
};
app.use(cors(corsOptions)); 


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


// Session setup
app.use(session({
  secret: 'your_secret_key',  // Use a strong secret key for production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },  // Should be true in production with HTTPS
}));



// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy setup
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      // If user not found, return with a message
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Ensure password and user.password exist before calling bcrypt.compare
      if (!password || !user.password) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      console.error('Error during authentication', error);
      return done(error);
    }
  })
);
;
passport.serializeUser((user, done) => {
  done(null, user._id);  // Store user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);  // Attach user object to the session
  } catch (error) {
    done(error);
  }
});

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a transporter using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // Example using Gmail. Change this to your SMTP provider if different.
  auth: {
      user: 'tejastp834@gmail.com',  
      pass: 'naen erca ylwo gaoh',  
  },
});

const router = express.Router();

router.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { from, to, subject, message } = req.body;
    const attachment = req.file;

    if (!from || !to || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message,
        attachments: attachment
            ? [
                  {
                      path: attachment.path,
                      filename: attachment.originalname,
                  },
              ]
            : [],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});


app.use('/api/auth', authRoutes);
app.use('/api', lrRoutes);
app.use('/api/vehicles', vechicleRoutes);
app.use('/api/fuels', fuelRoutes);
app.use('/api', DriverRoutes);
app.use('/api/customers', CustomerRoutes);
app.use('/api', locationRoute);
app.use('/api/', router);




// Start the server
const port = PORT || 8080; // Fallback to port 8080 if PORT is not defined
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
