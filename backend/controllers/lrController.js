const { LorryReceipt, Item } = require('../models/LorryReceipt');
const fs = require('fs'); // Ensure fs module is imported

// Controller to handle adding a new lorry receipt
const addLorryReceipt = async (req, res) => {
  try {
    const newLorryReceipt = new LorryReceipt(req.body);
    await newLorryReceipt.save();
    res.status(201).json(newLorryReceipt);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add lorry receipt', error });
  }
};
const getLastLrNumber = async (req, res) => {
  try {
    const lastReceipt = await LorryReceipt.findOne().sort({ lrNumber: -1 });
    const lastLrNumber = lastReceipt ? lastReceipt.lrNumber : null;
    res.status(200).json({ lastLrNumber });
  } catch (error) {
    console.error('Error fetching last lrNumber:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to handle fetching all lorry receipts
const getLorryReceipts = async (req, res) => {
  try {
    const lorryReceipts = await LorryReceipt.find();
    res.status(200).json(lorryReceipts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lorry receipts', error });
  }
};

// Controller to handle updating receipt status
const updateRecietStatus = async (req, res) => {
  const { lrNumber } = req.params;
  const { status } = req.body;

  try {
    const receipt = await LorryReceipt.findOneAndUpdate(
      { lrNumber },
      { status },
      { new: true }
    );

    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    return res.status(200).json(receipt);
  } catch (error) {
    console.error('Error updating receipt status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to handle uploading proof and updating receipt status
const uploadProof = async (req, res) => {
  const { lrNumber } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const receipt = await LorryReceipt.findOneAndUpdate(
      { lrNumber },
      {
        status: 'Received',
        proofFilePath: req.file.path
      },
      { new: true }
    );

    if (!receipt) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Receipt not found' });
    }

    res.status(200).json(receipt);
  } catch (error) {
    console.error('Error uploading proof or updating receipt status:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to handle getting authentication (incomplete function, need clarification)
const getAuthentication = async (req, res) => {
  const { lrNumber } = req.query;
  if (!lrNumber) {
    return res.status(400).send('Lorry receipt number is required');
  }

  try {
    const receipt = await LorryReceipt.findOne({ lrNumber });
    if (!receipt || !receipt.proofFilePath) {
      return res.status(404).send('Proof file not found');
    }

    // Serve the image file
    const imagePath = path.join(__dirname, '..', 'uploads', receipt.proofFilePath);
    res.sendFile(imagePath);
  } catch (error) {
    console.error('Error fetching proof file:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to handle fetching a lorry receipt by ID
const getLorryReceiptsById = async (req, res) => {
  try {
    const { id } = req.params;
    const lorryReceipt = await LorryReceipt.findById(id);

    if (!lorryReceipt) {
      return res.status(404).json({ message: 'Lorry receipt not found' });
    }
    res.status(200).json(lorryReceipt);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lorry receipt', error });
  }
};

// Controller to handle adding a new item
const addItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item', error });
  }
};

// Controller to handle fetching all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error });
  }
};

// Controller to handle deleting a receipt
const deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const receipt = await LorryReceipt.findByIdAndDelete(id);
    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }
    res.status(200).json({ message: "Receipt deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting receipt", error });
  }
};

// Controller to handle adding multiple items
const addMultipleItems = async (req, res) => {
  try {
    const items = req.body.items;
    const itemDocs = items.map(item => new Item(item));
    await Item.insertMany(itemDocs);
    res.status(201).json({ message: 'Items added successfully', items: itemDocs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add items', error });
  }
};

module.exports = {
  addLorryReceipt,
  uploadProof,
  getLorryReceipts,
  getLorryReceiptsById,
  updateRecietStatus,
  addItem,
  getItems,
  deleteReceipt,
  addMultipleItems,
  getAuthentication,
  getLastLrNumber// Ensure this function is completed and used as needed
};
