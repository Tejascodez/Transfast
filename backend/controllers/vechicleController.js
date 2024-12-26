// /controllers/vehicleController.js
const Vehicle = require('../models/VehicleSchema');

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Add or update vehicle
exports.addOrUpdateVehicle = async (req, res) => {
  try {
    const { vehicleNo, ownerName, ownerNumber, driverName, driverNumber, rcExpiry, mutaxExpiry, roadTaxExpiry, insuranceExpiry, pucExpiry } = req.body;
    
    const vehicleData = {
      vehicleNo,
      ownerName,
      ownerNumber,
      driverName,
      driverNumber,
      rc: req.files.rc ? req.files.rc[0].path : undefined,
      mutax: req.files.mutax ? req.files.mutax[0].path : undefined,
      roadTax: req.files.roadTax ? req.files.roadTax[0].path : undefined,
      insurance: req.files.insurance ? req.files.insurance[0].path : undefined,
      puc: req.files.puc ? req.files.puc[0].path : undefined,
      rcExpiry,
      mutaxExpiry,
      roadTaxExpiry,
      insuranceExpiry,
      pucExpiry,
    };

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { vehicleNo, ownerName, ownerNumber, driverName, driverNumber, rcExpiry, mutaxExpiry, roadTaxExpiry, insuranceExpiry, pucExpiry } = req.body;
    
    const updatedVehicleData = {
      vehicleNo,
      ownerName,
      ownerNumber,
      driverName,
      driverNumber,
      rc: req.files.rc ? req.files.rc[0].path : undefined,
      mutax: req.files.mutax ? req.files.mutax[0].path : undefined,
      roadTax: req.files.roadTax ? req.files.roadTax[0].path : undefined,
      insurance: req.files.insurance ? req.files.insurance[0].path : undefined,
      puc: req.files.puc ? req.files.puc[0].path : undefined,
      rcExpiry,
      mutaxExpiry,
      roadTaxExpiry,
      insuranceExpiry,
      pucExpiry,
    };

    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, updatedVehicleData, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
};
const Fuel = require('../models/VehicleSchema');
