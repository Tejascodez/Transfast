const mongoose = require('mongoose');

const VehicleLocationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('VehicleLocation', VehicleLocationSchema);
