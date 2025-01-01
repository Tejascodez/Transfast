const Customer = require('../models/Customer');  // Import the Customer model

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    // Ensure that the body has all required fields
    const { name, address, gstin, contact, email, agentContact, agentEmail } = req.body;
    
    // Create new customer instance
    const newCustomer = new Customer({
      name,
      address,
      gstin,
      contact,
      email,
      agentContact,
      agentEmail
    });

    // Save customer data
    const savedCustomer = await newCustomer.save();

    // Return saved customer data
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ message: 'Error creating customer' });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();  // Fetch all customers from the database
    res.status(200).json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ message: 'Error fetching customers' });
  }
};

// Update an existing customer
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { name, address, gstin, contact, email, agentContact, agentEmail } = req.body;

    // Find the customer by ID and update their information
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, address, gstin, contact, email, agentContact, agentEmail },
      { new: true }  // Return the updated customer
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ message: 'Error updating customer' });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    // Find and delete the customer by ID
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ message: 'Error deleting customer' });
  }
};

const addPartsAndRates = async (req, res) => {
  try {
    const { customerName, partsAndRates } = req.body;

    // Find the customer by name (or you could use an ID if that's available)
    const customer = await Customer.findOne({ name: customerName });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Add the parts and rates to the customer's partsAndRates array
    customer.partsAndRates = [...customer.partsAndRates, ...partsAndRates];

    // Save the updated customer
    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error saving parts and rates:', err);
    res.status(500).json({ message: 'Error saving parts and rates' });
  }
};

// Update a part and rate for a customer
const updatePartAndRate = async (req, res) => {
  try {
    const customerId = req.params.id;
    const partId = req.params.partId; // Part ID to identify which part to update
    const { part, rate } = req.body;

    if (!part && !rate) {
      return res.status(400).json({ message: 'At least part or rate should be provided' });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const partIndex = customer.partsAndRates.findIndex(p => p._id.toString() === partId);

    if (partIndex === -1) {
      return res.status(404).json({ message: 'Part not found' });
    }

    // Update the part and/or rate
    if (part) customer.partsAndRates[partIndex].part = part;
    if (rate) customer.partsAndRates[partIndex].rate = rate;

    // Save the updated customer
    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error updating part and rate:', err);
    res.status(500).json({ message: 'Error updating part and rate' });
  }
};

// Remove a part from a customer
const removePart = async (req, res) => {
  try {
    const customerId = req.params.id;
    const partId = req.params.partId; // Part ID to identify which part to remove

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const partIndex = customer.partsAndRates.findIndex(p => p._id.toString() === partId);

    if (partIndex === -1) {
      return res.status(404).json({ message: 'Part not found' });
    }

    // Remove the part from the partsAndRates array
    customer.partsAndRates.splice(partIndex, 1);

    // Save the updated customer
    const updatedCustomer = await customer.save();

    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error removing part:', err);
    res.status(500).json({ message: 'Error removing part' });
  }
};

// Get all parts and rates for a specific customer
const getPartsAndRates = async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer.partsAndRates);
  } catch (err) {
    console.error('Error fetching parts and rates:', err);
    res.status(500).json({ message: 'Error fetching parts and rates' });
  }
};


module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  addPartsAndRates,
  updatePartAndRate,
  removePart,
  getPartsAndRates

};
