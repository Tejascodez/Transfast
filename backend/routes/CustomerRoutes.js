const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  addPartsAndRates,
  updatePartAndRate,
  removePart,
  getPartsAndRates
} = require('../controllers/CustomerControllers');

// Routes for customers
router.post('/', createCustomer); // Create new customer
router.get('/', getCustomers); // Get all customers
router.put('/:id', updateCustomer); // Update customer
router.delete('/:id', deleteCustomer); // Delete customer

// Routes for parts and rates
router.post('/parts', addPartsAndRates); // Add a new part and rate
router.put('/parts/:partId', updatePartAndRate); // Update a part and rate
router.delete('/parts/:partId', removePart); // Remove a part
router.get('/parts', getPartsAndRates); // Get all parts and rates for a customer

module.exports = router;
