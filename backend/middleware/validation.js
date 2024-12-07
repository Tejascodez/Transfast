const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Middleware to validate signup data
exports.validateSignup = [
  // Check if fields are not empty
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('mobile').isMobilePhone().withMessage('Please provide a valid mobile number'),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
