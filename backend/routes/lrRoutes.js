// routes/lrRoutes.js
const express = require('express');
const router = express.Router();
const { createLR, getLRs, getLR, updateLR, deleteLR } = require('../controllers/lrController');

router.post('/', createLR);
router.get('/', getLRs);
router.get('/:id', getLR);
router.put('/:id', updateLR);
router.delete('/:id', deleteLR);

module.exports = router;
