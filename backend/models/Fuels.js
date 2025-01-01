const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true },
    driverName: { type: String, required: true },
    date: { type: Date, required: true },
    from: { type: String, required: true },
      to: { type: String, required: true },
    oldReading: { type: Number, required: true },
    newReading: { type: Number, required: true },
    fuelInLiters: { type: Number, required: true },
    fuelCost: { type: String, required: true },
    avg: { type: Number, required: true }
}, { timestamps: true });

const Fuel = mongoose.model('Fuel', fuelSchema);
module.exports = Fuel;