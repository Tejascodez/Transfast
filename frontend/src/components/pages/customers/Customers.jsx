import React, { useState } from 'react';
import './customer.css';

const Customer = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    gstin: '',
    contact: '',
    email: '',
  });

  const [parts, setParts] = useState([]);
  const [partInput, setPartInput] = useState({
    customerName: '',
    partName: '',
    rate: '',
  });

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const handlePartInputChange = (e) => {
    const { name, value } = e.target;
    setPartInput({
      ...partInput,
      [name]: value,
    });
  };

  const addPart = () => {
    setParts([...parts, partInput]);
    setPartInput({
      customerName: '',
      partName: '',
      rate: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer Details:', customerDetails);
    console.log('Parts:', parts);
  };

  return (
    <div className="customer-box">
      <h1 className="customer">Customer Details</h1>
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="customer-info">
          <label>Customer Name:</label>
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleCustomerChange}
          />

          <label>Customer Address:</label>
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleCustomerChange}
          />

          <label>Customer GSTIN:</label>
          <input
            type="text"
            name="gstin"
            value={customerDetails.gstin}
            onChange={handleCustomerChange}
          />

          <label>Contact No:</label>
          <input
            type="text"
            name="contact"
            value={customerDetails.contact}
            onChange={handleCustomerChange}
          />
           <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleCustomerChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <h2 className="parts-header">Parts and Rates</h2>
      <div className="parts-container">
        <div className="form-group">
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={partInput.customerName}
            onChange={handlePartInputChange}
          />
          <label>Part Name:</label>
          <input
            type="text"
            name="partName"
            value={partInput.partName}
            onChange={handlePartInputChange}
          />
          <label>Rate:</label>
          <input
            type="text"
            name="rate"
            value={partInput.rate}
            onChange={handlePartInputChange}
          />

          <button onClick={addPart} className="add-part-button">Add Part</button>
        </div>

        <div className="added-parts">
          <h3>Added Parts</h3>
          <ul>
            {parts.map((part, index) => (
              <li key={index}>
                {part.customerName} - {part.partName}: {part.rate}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={handleSubmit} className="submit-button">Submit All</button>
    </div>
  );
};

export default Customer;
