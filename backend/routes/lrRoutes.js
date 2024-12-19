const express = require('express');
const router = express.Router();
const lorryReceiptController = require('../controllers/lrController');

// Routes for lorry receipts
router.post('/lorryReceipts', lorryReceiptController.addLorryReceipt);
router.get('/lorryReceipts', lorryReceiptController.getLorryReceipts);
router.get('/LorryReceipts/:id', lorryReceiptController.getLorryReceiptsById);

// Routes for items
router.post('/items', lorryReceiptController.addItem);
router.get('/items', lorryReceiptController.getItems);

// Route to handle adding multiple items
router.post('/items/multiple', lorryReceiptController.addMultipleItems);


module.exports = router;
