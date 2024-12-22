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

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};
