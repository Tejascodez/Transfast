const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNo: { type: String, required: true },
    ownerName: { type: String, required: true },
    ownerNumber: { type: String, required: true },
    driverName: { type: String, required: true },
    driverNumber: { type: String, required: true },
    rcExpiryDate: { type: Date, required: false },  // make optional if necessary
    mutaxexpirydate: { type: Date, required: false },  // make optional
    roadTaxExpirydate: { type: Date, required: false },  // make optional
    pucExpiryDate: { type: Date, required: false },  // make optional
    insExpiryDate: { type: Date, required: false },  // make optional
    rc: { type: String, required: false },  // make optional
    mutax: { type: String, required: false },  // make optional
    puc: { type: String, required: false },  // make optional
    roadtax: { type: String, required: false },  // make optional
    insurance: { type: String, required: false }  // make optional
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
