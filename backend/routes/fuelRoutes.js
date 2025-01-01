const express = require('express');
const router = express.Router();
const Fuel = require('../controllers/FuelControllers');


router.get('/', Fuel.getAllFuels);
router.post('/', Fuel.createFuel);
// router.get('/:id', Fuel.getFuelById);
router.put('/:id', Fuel.updateFuel);
router.delete('/:id', Fuel.deleteFuel);


module.exports = router;