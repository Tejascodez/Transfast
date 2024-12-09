const LorryReceipt = require('../models/LorryReceipt');

// Create a new lorry receipt
const createLorryReceipt = async (req, res) => {
    try {
        const newLorryReceipt = new LorryReceipt(req.body);
        await newLorryReceipt.save();
        res.status(201).json(newLorryReceipt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all lorry receipts
const getAllLorryReceipts = async (req, res) => {
    try {
        const lorryReceipts = await LorryReceipt.find();
        res.status(200).json(lorryReceipts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single lorry receipt by ID
const getLorryReceipt = async (req, res) => {
    try {
        const lorryReceipt = await LorryReceipt.findById(req.params.id);
        if (!lorryReceipt) return res.status(404).json({ message: 'Lorry Receipt not found' });
        res.status(200).json(lorryReceipt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing lorry receipt
const updateLorryReceipt = async (req, res) => {
    try {
        const lorryReceipt = await LorryReceipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lorryReceipt) return res.status(404).json({ message: 'Lorry Receipt not found' });
        res.status(200).json(lorryReceipt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a lorry receipt
const deleteLorryReceipt = async (req, res) => {
    try{
        const receipt = await LorryReceipt.findByIdAndDelete(req.params.id);
        if(!receipt){
            return res.status(404).send('receipt not found');
        }
        res.status(200).send('receipt deleted');

    }catch (error){
        res.status(500).send('Error deleting receipt');
    }
}



module.exports = { 
    createLorryReceipt, 
    getAllLorryReceipts, 
    getLorryReceipt, 
    updateLorryReceipt, 
    deleteLorryReceipt 
};
