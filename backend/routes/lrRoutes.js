    const express = require('express');
    const router = express.Router();
    const lorryReceiptController = require('../controllers/lrController');
    const upload = require('../middleware/multerConfig');
    const {uploadProof}  = require('../controllers/lrController');
    // Routes for lorry receipts
    router.post('/lorryReceipts', lorryReceiptController.addLorryReceipt);
    router.get('/lorryReceipts', lorryReceiptController.getLorryReceipts ,);
    router.get('/lorryReceipts/lastLrNumber', lorryReceiptController.getLastLrNumber);
    router.delete('/lorryReceipts/:id', lorryReceiptController.deleteReceipt);
    router.get('/LorryReceipts/:id', lorryReceiptController.getLorryReceiptsById);
    router.put('/lorryReceipts/:lrNumber', lorryReceiptController.updateRecietStatus);
    router.post('/uploadProof/:lrNumber', upload.single('proof'), uploadProof);
    router.get('/lorryReceipts/authentication', lorryReceiptController.getAuthentication);

    // Routes for items
    router.post('/items', lorryReceiptController.addItem);
    router.get('/items', lorryReceiptController.getItems);

    // Route to handle adding multiple items
    router.post('/items/multiple', lorryReceiptController.addMultipleItems);


    module.exports = router;
