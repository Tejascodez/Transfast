// /routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../controllers/vechicleController');
const upload = require('../utils/multerConfig');

// Routes
router.get('/', Vehicle.getAllVehicles);
router.post('/', upload.fields([
  { name: 'rc', maxCount: 1 },
  { name: 'mutax', maxCount: 1 },
  { name: 'roadTax', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
  { name: 'puc', maxCount: 1 }
]), Vehicle.addOrUpdateVehicle);
router.delete('/:id', Vehicle.deleteVehicle);
router.put('/:id', upload.fields([
  { name: 'rc', maxCount: 1 },
  { name: 'mutax', maxCount: 1 },
  { name: 'roadTax', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
  { name: 'puc', maxCount: 1 }
]), Vehicle.updateVehicle);

module.exports = router;
