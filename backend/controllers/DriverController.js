const Driver = require('../models/Drivers');
exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching drivers", error: error.message });
    }
};

// Controller to create a new driver
exports.createDriver = async (req, res) => {
    try {
        const { vehicleNumber, driverName, driverNumber, vehicleDocs } = req.body;
        const newDriver = new Driver({
            vehicleNumber,
            driverName,
            driverNumber,
            vehicleDocs
        });
        await newDriver.save();
        res.status(201).json({ message: "Driver created successfully", driver: newDriver });
    } catch (error) {
        res.status(500).json({ message: "Error creating driver", error: error.message });
    }
};

// Delete a driver
exports.deleteDriver = async (req, res) => {
  try {
    const { vehicleNumber, driverName } = req.params;
    const deletedDriver = await Driver.findOneAndDelete({ vehicleNumber, driverName });

    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error: error.message });
  }
};
