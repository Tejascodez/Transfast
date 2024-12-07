const express = require('express');
const { signup } = require('../controllers/authControllers');
const {login} = require('../controllers/authControllers');
const {validateSignup}  =  require('../middleware/validation');
const bcrypt = require('bcrypt');


const router = express.Router();

router.post('/login', login);


// // Route for getting all Lorry Receipts
// router.get('/', lrrController.getLorryReceipts);

// // Route for getting a Lorry Receipt by ID
// router.get('/:id', lrrController.getLorryReceiptById);

// // Route for updating a Lorry Receipt
// router.put('/:id', lrrController.updateLorryReceipt);

// // Route for deleting a Lorry Receipt
// router.delete('/:id', lrrController.deleteLorryReceipt);



// POST route for signup
router.post('/signup', validateSignup, signup);

module.exports = router;
