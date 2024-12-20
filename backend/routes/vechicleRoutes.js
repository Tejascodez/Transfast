const upload = require('../middleware/upload');
const VehicleController = require('../controllers/vechicleController'); 
const express = require('express') // Corrected typo
const router = express.Router();



router.get('/',    VehicleController.getVehicles);
router.post('/', upload, VehicleController.createVehicle);


module.exports = router;
