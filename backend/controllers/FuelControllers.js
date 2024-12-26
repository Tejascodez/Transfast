const Fuel = require('../models/Fuels');



// Get all fuels
exports.getAllFuels = async (req, res) => {
    try {
      const fuels = await Fuel.find();
      res.status(200).json(fuels);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fuels', error });
    }
  };
  
  // Create fuel
  exports.createFuel = async (req, res) => {
    try {
      const fuel = new Fuel(req.body);
      await fuel.save();
      res.status(201).json(fuel);
    } catch (error) {
      res.status(400).json({ message: 'Error creating fuel', error });
    }
  };
  
  
  // Update fuel by ID
  exports.updateFuel = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFuel = await Fuel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedFuel) {
        return res.status(404).json({ message: 'Fuel not found' });
      }
      res.status(200).json(updatedFuel);
    } catch (error) {
      res.status(400).json({ message: 'Error updating fuel', error });
    }
  };
  
  // Delete fuel by ID
  exports.deleteFuel = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFuel = await Fuel.findByIdAndDelete(id);
      if (!deletedFuel) {
        return res.status(404).json({ message: 'Fuel not found' });
      }
      res.status(200).json({ message: 'Fuel deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting fuel', error });
    }
  };
  