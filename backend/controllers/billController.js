const Bill = require('../models/Bill');

// Create a new Bill
exports.createBill = async (req, res) => {
  const { name, address, email, gstin, items, totalAmount, totalAmountInWords } = req.body;

  try {
    console.log("Received Bill Data:", req.body); // Log received data

    const newBill = new Bill({
      customerName: name,
      customerAddress: address,
      customerEmail: email,
      gstin,
      items,
      totalAmount,
      totalAmountInWords,
      date: new Date(),
    });

    await newBill.save();

    res.status(201).json({ message: 'Bill created successfully', bill: newBill });
  } catch (error) {
    console.error('Error creating bill:', error); // Log the full error for debugging
    res.status(500).json({ message: 'Error creating bill', error: error.message });
  }
};

exports.getbills = async (req,res)=>
{

  try{
      
  const Bills = await Bill.find();
  res.status(200).json(Bills);

  } catch(error){
    console.error("Error fetching bills", error);
    res.status(500).json({message: 'Error fecting bills', error: error.message});
  }
}