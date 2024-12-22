const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerControllers');

// Routes for customer operations
router.post('/',customerController.createCustomer); // Create a customer
router.get('/', customerController.getCustomers);   // Get all customers
router.put('/:id', customerController.updateCustomer); // Update customer
router.delete('//:id', customerController.deleteCustomer); // Delete customer

module.exports = router;
