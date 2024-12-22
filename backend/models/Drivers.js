const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
  
  },
  driverName: {
    type: String,
    required: true
  },
  driverNumber: {
    type: String,
    required: true
  },
  vehicleDocs: [
    {
      docName: {
        type: String,
        required: true
      },
      docURL: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
