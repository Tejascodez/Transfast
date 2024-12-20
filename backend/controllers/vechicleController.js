const vehicleModel = require('../models/VechileSchema');

const getVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleModel.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createVehicle = async (req, res) => {
    // Log the uploaded files to check their structure (remove in production)
    console.log(req.files);

    const { 
        vehicleNo, 
        ownerName, 
        ownerNumber, 
        driverName, 
        driverNumber, 
        rcExpiryDate, 
        mutaxexpirydate, 
        roadTaxExpirydate, 
        pucExpiryDate, 
        insExpiryDate 
    } = req.body;

    // Ensure that the required text fields are provided
    if (!vehicleNo || !ownerName || !ownerNumber || !driverName || !driverNumber) {
        return res.status(400).json({ message: 'Missing required fields: vehicleNo, ownerName, ownerNumber, driverName, driverNumber' });
    }

    // Handle file fields and check if the files are uploaded or not
    const rc = req.files && req.files['rc'] ? req.files['rc'][0].path : null;
    const puc = req.files && req.files['puc'] ? req.files['puc'][0].path : null;
    const mutax = req.files && req.files['mutax'] ? req.files['mutax'][0].path : null;
    const roadtax = req.files && req.files['roadtax'] ? req.files['roadtax'][0].path : null;
    const insurance = req.files && req.files['insurance'] ? req.files['insurance'][0].path : null;

    // Check if the required files are provided (adjust based on optional requirements)
    if (!rc || !mutax || !roadtax || !insurance) {
        return res.status(400).json({ message: 'Missing required files: rc, mutax, roadtax, insurance' });
    }

    // Create a new vehicle object
    const newVehicle = new vehicleModel({
        vehicleNo,
        ownerName,
        ownerNumber,
        driverName,
        driverNumber,
        rcExpiryDate,
        mutaxexpirydate,
        roadTaxExpirydate,
        rc,
        mutax,
        puc,
        pucExpiryDate,
        insurance,
        insExpiryDate
    });

    try {
        // Save the new vehicle to the database
        const createdVehicle = await newVehicle.save();
        res.status(201).json(createdVehicle);
    } catch (error) {
        // Handle any errors during the save operation
        console.error(error);  // More detailed logging of the error
        res.status(500).json({ message: 'Error creating vehicle', error: error.message });
    }
};

module.exports = { getVehicles, createVehicle };
