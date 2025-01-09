import React, { useEffect, useState } from 'react';
import logo from '.././../assets/Logo1.png';
import axios from 'axios';
import Creatable from 'react-select/creatable'; // Correct import
import './CreateChallan.css';

const CreateChallan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customerNames, setCustomerNames] = useState([]); // Store customer names here
  const [customerAddress, setCustomerAddress] = useState(''); // Store customer address here
  const [customerGstin, setCustomerGstin] = useState(''); // Store customer GST here
  const [customerEmail, setCustomerEmail] = useState(''); // Store customer Email here
  const [formData, setFormData] = useState({
    date: '',
    customerName: '',
    particulars: '',
    quantity: '',
    setwiseQuantity: '',
    amount: '',
    vehicleNumber: '', // Store vehicle number
    lrNumber: '' // Store LR number
  });
  const [entries, setEntries] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customers');
        const companyNames = [...new Set(response.data.map(item => item.name))]; // Extract unique customer names
        setCustomerNames(companyNames); // Set the customer names in state
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomerNameChange = (selectedOption) => {
    const selectedCustomerName = selectedOption ? selectedOption.label : '';
    setFormData({
      ...formData,
      customerName: selectedCustomerName, // Update customer name in formData
    });

    // Find the customer details based on selected name
    const selectedCustomer = customerNames.find(customer => customer.name === selectedCustomerName);
    if (selectedCustomer) {
      setCustomerAddress(selectedCustomer.address);  // Update customer address
      setCustomerGstin(selectedCustomer.gstin);  // Update customer GSTIN
      setCustomerEmail(selectedCustomer.email);  // Update customer email
    }
  };

  const addEntry = () => {
    // Push only relevant details into entries
    const { particulars, quantity, setwiseQuantity, amount } = formData;
    setEntries([
      ...entries,
      { particulars, quantity, setwiseQuantity, amount },
    ]);
    setFormData({
      date: formData.date, // Keep the date intact
      customerName: formData.customerName, // Keep the customerName intact
      particulars: '',
      quantity: '',
      setwiseQuantity: '',
      amount: '',
      vehicleNumber: '', // Clear vehicle number
      lrNumber: '' // Clear LR number
    });
  };

  const handlePrint = () => {
    window.print(); // Trigger the browser's print function
  };

  return (
    <>
      <button className="create-button" onClick={toggleModal}>Create</button>
      <button className="print-button" onClick={handlePrint}>Print</button> {/* Print Button */}

      <div className="invoice-container">
        {/* Header Section */}
        <header className="invoice-header">
          <div className="company-logo">
            <img src={logo} alt="Company Logo" />
          </div>
          <div className="company-logo">
            <h1>TRANSFAST CORPORATION</h1>
            <p>
              448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C., SHIROLI, KOLHAPUR, MAHARASHTRA. 416 122
            </p>
            <p>CONTACT NUMBER: 9923826075 / 7385119339 / 9960909651</p>
            <p>Email ID: transfast.corporation@gmail.com</p>
            <h5>GST NUMBER: 27ANEPC0107H1Z0</h5>
          </div>
        </header>

        {/* Billing Info Section */}
        <section className="billing-info">
          <div className="bill-to">
            <h3>To</h3>
            <strong>{formData.customerName}</strong>
            <p>{customerAddress}</p> {/* Display customer address */}
            <p>{customerEmail}</p> {/* Display customer email */}
            <p>GSTIN: {customerGstin}</p> {/* Display customer GSTIN */}
          </div>
          <div className="invoice-details">
  <h2>Delivery Challan</h2>
  <table>
    <tbody>
      <tr>
        <td>Invoice</td>
        <td>:</td>
        <td>12345</td>
      </tr>
      <tr>
        <td>Issued</td>
        <td>:</td>
        <td>{formData.date}</td>
      </tr>
      <tr>
        <td>Vehicle Number</td>
        <td>:</td>
        <td>{formData.vehicleNumber}</td> {/* This is where vehicle number is displayed */}
      </tr>
      <tr>
        <td>LR Number</td>
        <td>:</td>
        <td>{formData.lrNumber}</td> {/* This is where LR number is displayed */}
      </tr>
    </tbody>
  </table>
</div>

        </section>

        <br />

        {/* Invoice Items Section */}
        <section className="invoice-items">
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Particulars</th>
                <th>Quantity</th>
                <th>Setwise Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.particulars}</td>
                  <td>{entry.quantity}</td>
                  <td>{entry.setwiseQuantity}</td>
                  <td>{entry.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>TOTAL</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </section>

        <br />

        {/* Footer Section */}
        <footer className="invoice-footer">
          <div className="notes">
            <br />
            <br />
            <br />
            <p>________________</p>
            <h3>RECEIVER'S SIGNATURE</h3>
            <br />
            <br />
          </div>
          <div className="total">
            <br />
            <br />
            <br />
            <p>__________________</p>
            <h3>TRANSFAST CORPORATION</h3>
            <br />
            <br />
          </div>
        </footer>

        {/* Modal */}
        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add Entry</h2>
              <div className="form-row">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>LR Number</label>
                <input
                  type="text"
                  name="lrNumber"
                  value={formData.lrNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Customer Name</label>
                <Creatable
                  name="customerName"
                  value={{ label: formData.customerName, value: formData.customerName }} // Handle value properly for Creatable
                  onChange={handleCustomerNameChange}
                  options={customerNames.map(name => ({ label: name, value: name }))} // Use customerNames fetched from API
                  placeholder="Select Customer"
                />
              </div>
              <div className="form-row">
                <label>Particulars</label>
                <input
                  type="text"
                  name="particulars"
                  value={formData.particulars}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Setwise Quantity</label>
                <input
                  type="number"
                  name="setwiseQuantity"
                  value={formData.setwiseQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <button className="add-button" onClick={addEntry}>Add</button>
              <button className="close-button" onClick={toggleModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateChallan;