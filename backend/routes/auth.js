const express = require('express');
const User =  require('../models/User');
const  {signup , login} = require('../controllers/authControllers');
const passport  = require('passport')


const router = express.Router();

router.post('/signup', signup);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login', error: err });
      }
  
      if (!user) {
        return res.status(400).json({ message: info.message || 'Invalid credentials' });
      }
  
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error during login' });
        }
  
        return res.status(200).json({ message: 'Login successful' });
      });
    })(req, res, next);
  });
  


module.exports =  router;