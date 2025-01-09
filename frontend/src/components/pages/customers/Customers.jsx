import React, { useEffect, useState } from 'react';
import './customer.css';
import Modal from 'react-modal';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component
import { Button } from '@mui/material'; // Import Material-UI Button component

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

  // Columns configuration for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Company Name', width: 180 },
    { field: 'address', headerName: 'Address', width: 230 },
    { field: 'gstin', headerName: 'GSTIN', width: 180 },
    { field: 'contact', headerName: 'Contact No.', width: 150 },
    { field: 'agentContact', headerName: 'Agent Contact No.', width: 180 },
    { field: 'email', headerName: 'Company Email', width: 220 },
    { field: 'agentEmail', headerName: 'Agent Email', width: 220 },
    {
      field: 'actions', headerName: 'Actions', width: 180, renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row)} variant="contained" color="primary" size="small" style={{ marginRight: '8px' }}>Edit</Button>
          <Button onClick={() => handleDelete(params.row._id)} variant="contained" color="secondary" size="small">Delete</Button>
        </div>
      ),
    },
  ];

  // Prepare rows for DataGrid
  const rows = customers.map((customer, index) => ({
    id: customer._id,
    name: customer.name,
    address: customer.address,
    gstin: customer.gstin,
    contact: customer.contact,
    agentContact: customer.agentContact,
    email: customer.email,
    agentEmail: customer.agentEmail,
  }));

  return (
    <div className="customer-box">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Customer Modal"
        className="modal-content"
        overlayClassName="overlay"
      >
      <div className="customerbox">  
        <h2>Add Customer Details</h2>
        <button onClick={closeModal} className="button close-button">x</button>
      </div>
        <form onSubmit={handleSubmit} className="customer-form">
  <div className="customer-info">
    <div className="form-row">
      <label>Customer Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter company name"
        value={customerDetails.name}
        onChange={handleCustomerChange}
      />
    </div>
    <div className="form-row">
      <label>Customer Address:</label>
      <input
        type="text"
        name="address"
        placeholder="Enter company address"
        value={customerDetails.address}
        onChange={handleCustomerChange}
      />
    </div>
    <div className="form-row">
      <label>Customer GSTIN:</label>
      <input
        type="text"
        name="gstin"
        placeholder="Enter GSTIN"
        value={customerDetails.gstin}
        onChange={handleCustomerChange}
      />
    </div>
    <div className="form-row">
      <label>Contact No:</label>
      <input
        type="text"
        name="contact"
        placeholder="Company Contact Number"
        value={customerDetails.contact}
        onChange={handleCustomerChange}
      />
    </div>
    <div className="form-row">
      <label>Contact of Agent:</label>
      <input
        type="text"
        name="agentContact"
        placeholder="Agent's Contact Number"
        value={customerDetails.agentContact}
        onChange={handleCustomerChange}
      />
    </div>
    <div className="form-row">
      <label>Email of Company:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter the customer's email"
        value={customerDetails.email}
        onChange={handleCustomerChange}
      />
    </div>
    <div className="form-row">
      <label>Email of Agent:</label>
      <input
        type="email"
        name="agentEmail"
        placeholder="Enter the contact person's email"
        value={customerDetails.agentEmail}
        onChange={handleCustomerChange}
      />
    </div>
    <Button type="submit" variant="contained" color="primary" className="submit-button">{isEdit ? 'Update' : 'Add'}</Button>
  </div>
</form>

      </Modal>

      <div className="data">
          <h2>Customer Details</h2>
          <Button onClick={openModal} variant="contained" color="primary" className="button">Add Customer</Button>
          <br />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;