const { LorryReceipt, Item } = require('../models/LorryReceipt');

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

// Controller to handle fetching all lorry receipts
const getLorryReceipts = async (req, res) => {
  try {
    const lorryReceipts = await LorryReceipt.find();
    res.status(200).json(lorryReceipts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lorry receipts', error });
  }
};

const getLorryReceiptsById = async(req,res)=>{
  try{
    const {id} = req.params;
    const lorryReceipt = await LorryReceipt.findById(id);

    if(!lorryReceipt) {
      return res.status(404).json({message: 'Lorry receipt not found'});
    }
    res.status(200).json(lorryReceipt);
  } catch (error){
    res.status(500).json({message: 'failed to fetch lorry receipt', error});
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

const deleteReceipt =  async (req, res) => {
  try {
      const { id } = req.params; // Extract the ID from the URL params
      const receipt = await LorryReceipt.findByIdAndDelete(id); // Correct model reference
      if (!receipt) {
          return res.status(404).json({ message: "Receipt not found" });
      }
      res.status(200).json({ message: "Receipt deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting receipt", error });
  }
};


const addMultipleItems = async(req,res)=>{
    try{
        const items = req.body.items;
        const itemDocs = items.map(item=> new Item(item));
        await Item.insertMany(itemDocs);
        res.status(201).json({message: 'Items added sucessfully', items: itemDocs});



    } catch (error){
        res.status(500).json({message: 'failed to add items', error});
    }
};

module.exports = {
  addLorryReceipt,
  getLorryReceipts,
  getLorryReceiptsById,
  addItem,
  getItems,
  deleteReceipt,
  addMultipleItems,
};
