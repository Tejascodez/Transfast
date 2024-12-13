const Vehicle = require('../models/VechileSchema'); // Corrected 'vechicle' to 'vehicle'

exports.createVehicle = async (req, res) => {
    try {
        const { mutax, roadTax, insurance } = req.body;
        const rc = req.file ? req.file.path : ''; // Assuming file upload middleware
        const vehicle = new Vehicle({ mutax, roadTax, insurance, rc });
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating vehicle', error });
    }
};


// Get all vehicles
exports.getVehicles = async (req, res) => { // Corrected 'getVechiles' to 'getVehicles'
    try {
        const vehicles = await Vehicle.find(); // Corrected 'vechicles' to 'vehicles'
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single vehicle by id 
exports.getVehicleById = async (req, res) => { // Corrected 'getVechileById' to 'getVehicleById'
    try {
        const vehicle = await Vehicle.findById(req.params.id); // Corrected 'Vechile' to 'Vehicle'
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' }); // Corrected 'Vechile' to 'Vehicle'
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
exports.updateVehicle = async (req, res) => { // Corrected 'updatevehicle' to 'updateVehicle'
    try {
        const { rc, mutax, roadTax, insurance } = req.body;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, { // Corrected 'findByIdUpdate' to 'findByIdAndUpdate'
            rc: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
            mutax, // Added mutax to the updatedVehicle object
            roadTax, // Added roadTax to the updatedVehicle object
            insurance // Added insurance to the updatedVehicle object
        }, { new: true });
        
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' }); // Corrected 'Vehicles' to 'Vehicle'
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: error.message }); // Corrected 'error.messsage' to 'error.message'
    }
};

// Delete
exports.deleteVehicle = async (req, res) => { // Corrected 'deleteVehcile' to 'deleteVehicle'
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id); 
        if (!deletedVehicle) {
            return res.status(400).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle deleted successfully' }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};