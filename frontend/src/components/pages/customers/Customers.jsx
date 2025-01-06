import React, { useEffect, useState } from 'react';
import './customer.css';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const Customer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    gstin: '',
    contact: '',
    email: '',
    agentContact: '',
    agentEmail: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const submitCustomer = async (customerData) => {
    try {
      let response;
      if (isEdit) {
        response = await axios.put(`http://localhost:8080/api/customers/${editId}`, customerData);
        setCustomers(customers.map(customer => customer._id === editId ? response.data : customer));
      } else {
        response = await axios.post('http://localhost:8080/api/customers', customerData);
        setCustomers([...customers, response.data]);
      }
      console.log('Customer submitted:', response.data);
    } catch (err) {
      console.error('Error adding/updating customer:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${id}`);
      console.log("Deleted successfully");
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = (customer) => {
    setCustomerDetails({
      name: customer.name,
      address: customer.address,
      gstin: customer.gstin,
      contact: customer.contact,
      email: customer.email,
      agentContact: customer.agentContact,
      agentEmail: customer.agentEmail,
    });
    setEditId(customer._id);
    setIsEdit(true);
    setModalIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitCustomer(customerDetails);
    setModalIsOpen(false);
    setIsEdit(false);
    setCustomerDetails({
      name: '',
      address: '',
      gstin: '',
      contact: '',
      email: '',
      agentContact: '',
      agentEmail: '',
    });
    fetchCustomers(); // Fetch the updated list of customers
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEdit(false);
    setCustomerDetails({
      name: '',
      address: '',
      gstin: '',
      contact: '',
      email: '',
      agentContact: '',
      agentEmail: '',
    });
  };

  return (
    <div className="customer-box">
      <button onClick={openModal} className="button">Add Customer</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Customer Modal"
        className="modal-content"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="button close-button">x</button>
        <h1 className="customer">{isEdit ? 'Edit Customer Details' : 'Add Customer Details'}</h1>

        <form onSubmit={handleSubmit} className="customer-form">
          <div className="customer-info">
            <label>Customer Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter company name"
              value={customerDetails.name}
              onChange={handleCustomerChange}
            />
            <label>Customer Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter company address"
              value={customerDetails.address}
              onChange={handleCustomerChange}
            />
            <label>Customer GSTIN:</label>
            <input
              type="text"
              name="gstin"
              placeholder="Enter GSTIN"
              value={customerDetails.gstin}
              onChange={handleCustomerChange}
            />
            <label>Contact No:</label>
            <input
              type="text"
              name="contact"
              placeholder="Company Contact Number"
              value={customerDetails.contact}
              onChange={handleCustomerChange}
            />
            <label>Contact of Agent:</label>
            <input
              type="text"
              name="agentContact"
              placeholder="Agent's Contact Number"
              value={customerDetails.agentContact}
              onChange={handleCustomerChange}
            />
            <label>Email of Company:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter the customer's email"
              value={customerDetails.email}
              onChange={handleCustomerChange}
            />
            <label>Email of Agent:</label>
            <input
              type="email"
              name="agentEmail"
              placeholder="Enter the contact person's email"
              value={customerDetails.agentEmail}
              onChange={handleCustomerChange}
            />

            <button type="submit" className="button submit-button">{isEdit ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </Modal>

      <div className="data">
        <h2>Customer Details</h2>
        <table className="tabular-information">
          <thead>
            <tr>
              <th>Srno.</th>
              <th>Company Name</th>
              <th>Address</th>
              <th>GSTIN</th>
              <th>Agent Name and Number</th>
              <th>Agent's Email</th>
              <th>Company's Emails</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.gstin}</td>
                <td>{customer.agentContact}</td>
                <td>{customer.agentEmail}</td>
                <td>{customer.email}</td>
                <td>
                  <button onClick={() => handleEdit(customer)} className="button">Edit</button>
                  <button onClick={() => handleDelete(customer._id)} className="button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
