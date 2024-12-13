const express = require('express');
const router = express.Router();
const driversController = require('../controllers/DriverController');

// Create a new driver
router.post('/drivers', driversController.createDriver);

// Get all drivers
router.get('/drivers', driversController.getAllDrivers);


module.exports = router;
