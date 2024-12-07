import React from 'react';
import './CreateChallan.css';

const CreateChallan = () => {
  return (
    <div className="container">
      <div className="section load-details">
        <label>Load Details</label>
        <input type="text" placeholder="Item type..." />
      </div>
      <div className="section company-details">
        <label>Company Details</label>
        <input type="text" placeholder="Consignor..." />
        <input type="text" placeholder="Consignee..." />
        <input type="text" placeholder="Freight Payable..." />
        <input type="text" placeholder="Company..." />
      </div>
      <div className="section vehicle-details">
        <label>Vehicle Details</label>
        <input type="text" placeholder="Vehicle No..." />
        <input type="text" placeholder="Driver Name..." />
        <input type="text" placeholder="Driver Mobile..." />
      </div>
      <div className="section freight-details">
        <label>Freight Details</label>
        <input type="text" placeholder="Invoice No..." />
        <input type="text" placeholder="Payment Mode..." />
      </div>
      <div className="section lr-details">
        <label>LR Details</label>
        <input type="text" placeholder="LR No..." />
        <input type="text" placeholder="LR Date..." />
        <input type="text" placeholder="From..." />
        <input type="text" placeholder="To..." />
      </div>
    </div>
  );
}

export default CreateChallan;