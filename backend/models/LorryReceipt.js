const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toWords } = require('number-to-words');

// Define the Item schema
const ItemSchema = new Schema({
  description: { type: String },
  invoiceNumber: { type: String },
  quantity: { type: String },
  unit: { type: String, default: 'Nos' },
  EwayBillNo: { type: String },
  expiryDate: { type: Date },
  rate: { type: Number },
  actualWeight: { type: Number },
  chargeableWeight: { type: Number },
}, { _id: false });  // `_id: false` prevents Mongoose from generating an _id for each item.

// Define the LorryReceipt schema
const LorryReceiptSchema = new Schema({
  lrNumber: { type: String },
  lrDate: { type: Date },
  from: { type: String },
  to: { type: String },
  vehicleNumber: { type: String },
  invoiceValue: { type: String },
  driversName: { type: String },
  driversContact: { type: String },
  loadType: { type: String, default: 'Full' },
  consignor: { type: String },
  consignee: { type: String },
  freightPayableCompany: { type: String },
  paymentMode: { type: String, default: 'TBB' },
  billingBranch: { type: String, default: 'Kolhapur' },
  collectionType: { type: String, default: 'DC' },
  deliveryType: { type: String, default: 'DD' },
  itemType: { type: String, default: 'General' },
  totalAmount: { type: String },
  remarks: { type: String },
  freight: { type: Number },
  surCharges: { type: Number },
  stasticalCharges: { type: Number },
  hamali: { type: Number },
  dcCharges: { type: Number },
  ddCharges: { type: Number },
  holting: { type: Number },
  holtingDays: { type: Number },
  other: { type: Number },
  totalAmountInWords: { type: String },
  status: { type: String, default: 'Pending' },  // Add status field
  items: [ItemSchema], 
  proofFilePath: { type: String },  // Array of items for each lorry receipt
}, { timestamps: true });

LorryReceiptSchema.pre('save', function (next) {
  if (this.totalAmount) {
    this.totalAmountInWords = toWords(this.totalAmount); // Convert totalAmount to words
  }
  next();
});

// Create Mongoose models from the schemas
const LorryReceipt = mongoose.model('LorryReceipt', LorryReceiptSchema);
const Item = mongoose.model('Item', ItemSchema);  // Corrected the model name

// Export both models
module.exports = { LorryReceipt, Item };
