const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    rc: {
        data: Buffer,
        type: String,
       
    },
    mutax: {
        type: String,
        required: true
    },
    roadTax: {
        type: String,
        required: true
    },
    insurance: {
        type: String,
        required: true
    },
   
    

}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
