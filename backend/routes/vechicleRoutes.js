const express = require('express');
const multer = require('multer');
const VehicleController = require('../controllers/vechicleController');  // Corrected typo
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the destination directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // specify the filename
  }
});

const upload = multer({ storage });

// Define routes and associate them with controller functions
router.post('/vehicles', upload.single('rc'), VehicleController.createVehicle);  // Using VehicleController object
router.get('/vehicles', VehicleController.getVehicles);
router.get('/vehicles/:id', VehicleController.getVehicleById);
router.put('/vehicles/:id', upload.single('rc'), VehicleController.updateVehicle);
router.delete('/vehicles/:id', VehicleController.deleteVehicle);

module.exports = router;
