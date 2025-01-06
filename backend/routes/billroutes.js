const express = require('express');
const CreateBill = require('../controllers/billController');

const router = express.Router();

// Create a bill
router.post('/', CreateBill.createBill);
router.get('/' , CreateBill.getbills);


module.exports = router;
