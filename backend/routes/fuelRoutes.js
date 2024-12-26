const express = require('express');
const router = express.Router();
const Fuel = require('../controllers/FuelControllers');


router.get('/', Fuel.getAllFuels);
router.post('/', Fuel.createFuel);



module.exports = router;