import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Creatable from 'react-select/creatable';
import logo from '../../../assets/Logo1.png';
import './CreateBill.css';

const CreateBill = () => {
  const [showModal, setShowModal] = useState(false);
  const [receipts, setReceipts] = useState([]); // Store fetched receipts
  const [selectedItems, setSelectedItems] = useState([]); // Store selected items
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const [searchQuery, setSearchQuery] = useState(''); // Store search input
  const [freightCompanies, setFreightCompanies] = useState([]); // Store freight companies
  const [selectedFreightCompany, setSelectedFreightCompany] = useState(null); // Store selected freight company
  const [name, setName] = useState(''); // Store selected freight company name
  const [address, setAddress] = useState(''); // Store selected freight company address
  const [email, setEmail] = useState(''); // Store selected freight company email


  // Fetch the receipts and customers from the API when the component mounts
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/LorryReceipts');
        const info = await axios.get('http://localhost:5000/api/customers');

        const uniqueFreightCompanies = [...new Set(info.data.map(item => item.name))].map(name => ({ label: name, value: name }));
        setFreightCompanies(uniqueFreightCompanies);

        // Filter the receipts by 'Unbilled' or 'Received' status
        const filteredReceipts = response.data.filter(receipt =>
          receipt.status === 'Unbilled' || receipt.status === 'Received'
        );
        setReceipts(filteredReceipts); // Set the filtered receipts into state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching receipts:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchReceipts();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false); // Set modal to false to close it

  const handleCheckboxChange = (receipt) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(receipt)
        ? prevSelectedItems.filter(item => item !== receipt)
        : [...prevSelectedItems, receipt]
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query when input changes
  };

  const handleFreightCompanyChange = async (selectedOption) => {
    setSelectedFreightCompany(selectedOption); // Update selected freight company

    // Fetch the customer data again to update the address and email based on the selected company
    try {
      const info = await axios.get('http://localhost:5000/api/customers');
      const selectedCustomer = info.data.find(customer => customer.name === selectedOption.value);
      setName(selectedCustomer ? selectedCustomer.name : '');
      setAddress(selectedCustomer ? selectedCustomer.address : '');
      setEmail(selectedCustomer ? selectedCustomer.email : '');
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  // Filter receipts based on the search query and selected freight company
  const filteredReceipts = receipts.filter(receipt =>
    ((receipt.lrNumber && receipt.lrNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (receipt.consignor && receipt.consignor.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (receipt.consignee && receipt.consignee.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedFreightCompany ? receipt.freightPayableCompany === selectedFreightCompany.value : true) // Add condition for freight company
  );

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  if (receipts.length === 0) {
    return <p>No Received or Unbilled receipts found.</p>; // Show message if no receipts are found
  }

  return (
    <div>
      <button onClick={handleShow} className="btn btn-primary">
        Create Bill
      </button>

      {/* Modal for selecting receipts */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><h1>Create Bill</h1></Modal.Title>
          <div className="search-box">
            <Creatable
              id="fcp"
              options={freightCompanies}
              onChange={handleFreightCompanyChange}
              placeholder="Select or create a freight company..."
            />
          </div>
          <button className="custom-close-button" onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body>
          {filteredReceipts.map((receipt) => (
            <div key={receipt.lrNumber} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`item-${receipt.lrNumber}`}
                checked={selectedItems.includes(receipt)}
                onChange={() => handleCheckboxChange(receipt)}
              />
              <label className="form-check-label" htmlFor={`item-${receipt.lrNumber}`}>
                {receipt.lrNumber}
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => console.log('Selected Items:', selectedItems, 'Selected Freight Company:', selectedFreightCompany)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display selected items below the modal */}
      <div className="invoice-container">
        <header className="invoice-header">
          <div className="company-logo">
            <img src={logo} alt="Company Logo" />
          </div>
          <div className="company-info">
            <h1>TRANSFAST CORPORATION</h1>
            <p>448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C., SHIROLI, KOLHAPUR, MAHARASHTRA. 416 122</p>
            <p>CONTACT NUMBER: 9923826075 / 7385119339 / 9960909651</p>
            <p>Email ID: transfast.corporation@gmail.com</p>
            <h5>GST NUMBER: 27ANEPC0107H1Z0</h5>
          </div>
        </header>

        <section className="billing-info">
          <div className="bill-to">
            <h3>Bill To</h3>
            <p><strong>{name}</strong></p>

            <p><strong>{address}</strong></p>
            <p><strong>{email}</strong></p>
          </div>
          <div className="invoice-details">
            <h2>Transportation Bill</h2>
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
                  <td>2024-12-21</td>
                </tr>
                <tr>
                  <td>Due Date</td>
                  <td>:</td>
                  <td>2025-01-05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="invoice-items">
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Date</th>
                <th>Lr.No.</th>
                <th>Consignor</th>
                <th>Consignee</th>
                <th>Vehicle No.</th>
                <th>Weight</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={item.lrNumber}>
                  <td>{index + 1}</td>
                  <td>{item.lrDate}</td>
                  <td>{item.lrNumber}</td>
                  <td>{item.consignor}</td>
                  <td>{item.consignee}</td>
                  <td>{item.vehicleNumber}</td>
                  <td>{item.actualWeight}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="6">TOTAL AMOUNT IN FIGURES:</th>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </section>

        <footer className="invoice-footer">
          <div className="notes">
            <p>________</p>
            <h3>RECEIVERS SIGNATURE</h3>
          </div>
          <div className="payment">
            <h3>PAYMENT DETAILS</h3>
            <p>A/C NO: 331305000180, ICICI BANK, MIDC SHIROLI, KOLHAPUR.</p>
            <p>PHONEPAY/GPAY: 9921296075</p>
            <p>IFSC CODE: ASFSAF</p>
          </div>
          <div className="total">
            <p>_________</p>
            <h3>TRANSFAST CORPORATION</h3>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CreateBill;
