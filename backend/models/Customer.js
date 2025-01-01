const mongoose = require('mongoose');

// Define the schema for customer
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  gstin: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  agentContact: { type: String, required: true },
  agentEmail: { type: String, required: true },
  
  // Adding parts and rates array
  partsAndRates: [
    {
      part: { type: String, required: true }, // Part name or description
      rate: { type: Number, required: true }  // Rate for the part
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
