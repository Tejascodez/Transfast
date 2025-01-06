const express = require('express');
const router = express.Router();
const { saveLocation } = require('../controllers/vehicleLocationController');

router.post('/vehicle-location', saveLocation);

module.exports = router;
