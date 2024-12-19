const { body, validationResult } = require('express-validator');

const validateLR = [
  // Validate LR Number (it should be a non-empty string)
  body('lrNumber').isString().withMessage('LR Number must be a string').notEmpty().withMessage('LR Number is required'),
  
  // Validate LR Date (it should be a valid date)
  body('lrDate').isDate().withMessage('LR Date must be a valid date').notEmpty().withMessage('LR Date is required'),
  
  // Validate 'From' (non-empty string)
  body('from').notEmpty().withMessage('From location is required'),
  
  // Validate 'To' (non-empty string)
  body('to').notEmpty().withMessage('To location is required'),
  
  // Validate Vehicle Number (non-empty string)
  body('vehicleNumber').notEmpty().withMessage('Vehicle Number is required'),
  
  // Validate Driver's Contact (must be a valid phone number)
  body('driversContact').isMobilePhone().withMessage('Driver\'s Contact must be a valid phone number'),
  
  // Validate Load Type (should be one of the options)
  body('loadType').isIn(['Full', 'Part', 'Special Vehicle']).withMessage('Load Type must be one of Full, Part, or Special Vehicle'),
  
  // Validate Invoice Value (should be either 'inv' or 'Paid')
  body('invoiceValue').isIn(['inv', 'Paid']).withMessage('Invoice Value must be either "inv" or "Paid"'),
  
  // Validate Payment Mode (should be one of the options)
  body('paymentMode').isIn(['TBB', 'Paid', 'To Pay']).withMessage('Payment Mode must be one of TBB, Paid, or To Pay'),
  
  // Validate Billing Branch (should be one of the options)
  body('billingBranch').isIn(['Kolhapur', 'Pune', 'Dharwad']).withMessage('Billing Branch must be one of Kolhapur, Pune, or Dharwad'),
  
  // Validate Collection Type (should be one of the options)
  body('collectionType').isIn(['DC', 'VC']).withMessage('Collection Type must be one of DC or VC'),
  
  // Validate Delivery Type (should be one of the options)
  body('deliveryType').isIn(['DD', 'VD']).withMessage('Delivery Type must be one of DD or VD'),
  
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateLR;
