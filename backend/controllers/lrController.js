const LorryReceipt = require('../models/LorryReceipt');

// POST endpoint to create a new lorry receipt
router.post('/api/lr', async (req, res) => {
  try {
    const newLorryReceipt = new LorryReceipt(req.body);
    const savedLorryReceipt = await newLorryReceipt.save();
    res.status(201).json(savedLorryReceipt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
