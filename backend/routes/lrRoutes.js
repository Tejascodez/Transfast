const express = require('express');
const router = express.Router();
const {
    createLorryReceipt,
    getAllLorryReceipts,
    getLorryReceipt,
    updateLorryReceipt,
    deleteLorryReceipt
} = require('../controllers/lrController');

router.post('/', createLorryReceipt);
router.get('/', getAllLorryReceipts);
router.get('/:id', getLorryReceipt);
router.put('/:id', updateLorryReceipt);
router.delete('/:id', (req, res, next) => {
    console.log('ID to delete:', req.params.id); // Log the ID to see if it's coming in correctly
    next();
}, deleteLorryReceipt);


module.exports = router;
