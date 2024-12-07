const mongoose = require('mongoose');

const lorryReceiptSchema = new mongoose.Schema({
    lrDate: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    lorryNumber: { type: String },
    driversContact: { type: String },
    loadType: { type: String, default: 'Full' },
    consignor: { type: String },
    consignee: { type: String },
    freightPayableCompany: { type: String },
    invoiceValue: { type: String, default: 'inv' },
    paymentMode: { type: String, default: 'TBB' },
    billingBranch: { type: String, default: 'Kolhapur' },
    collectionType: { type: String, default: 'DC' },
    deliveryType: { type: String, default: 'DD' },
    itemType: { type: String, default: 'General' },
    description: { type: String },
    invoiceNumber: { type: String },
    quantity: { type: Number },
    unit: { type: String, default: 'Nos' },
    rate: { type: Number },
    actualWeight: { type: Number },
    chargeableWeight: { type: Number },
    totalAmount: { type: Number },
    remarks: { type: String },
    freight: { type: Number },
    surCharges: { type: Number },
    stasticalCharges: { type: Number },
    hamali: { type: Number },
    dcCharges: { type: Number },
    ddCharges: { type: Number },
    holting: { type: Number },
    other: { type: Number },
    total: { type: Number }
});

module.exports = mongoose.model('LorryReceipt', lorryReceiptSchema);
