const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerNumber: { type: String, required: true },
    driverName: { type: String, required: true },
    driverNumber: { type: String, required: true },
    rc: { type: String },
    mutax: { type: String },
    roadTax: { type: String },
    insurance: { type: String },
    puc: { type: String },
    rcExpiry: { type: Date },
    mutaxExpiry: { type: Date },
    roadTaxExpiry: { type: Date },
    insuranceExpiry: { type: Date },
    pucExpiry: { type: Date },
    from: { type: String, required: true }, // Added "from"
    to: { type: String, required: true }, // Added "to"
    oldReading: { type: Number, required: true }, // Added "oldReading"
    newReading: { type: Number, required: true }, // Added "newReading"
    litres: { type: Number, required: true }, // Added "litres"
    fuel: { type: String, required: true }, // Added "fuel"
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
