const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  customerName: { type: String,  },
  customerAddress: { type: String, required: true },
  customerEmail: { type: String, required: true },
  gstin: { type: String, required: true },
  items: [
    {
      lrNumber: { type: String, required: true },
      lrDate: { type: Date, required: true },
      consignor: { type: String, required: true },
      consignee: { type: String, required: true },
      vehicleNumber: { type: String, required: true },
      totalAmount: { type: String, required: true },
    }
  ],
  finalAmount: { type: String,},
  totalAmountInWords: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', BillSchema);
