  import  { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Modal, Button } from 'react-bootstrap';
  import Creatable from 'react-select/creatable';
  import { toWords } from 'number-to-words';
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
    const [gstin, setGstin] = useState(''); // Store selected freight company GSTIN
    
    const [displayedItems, setDisplayedItems] = useState(Array(7).fill({
      lrNumber: '',
      lrDate: '',
      consignor: '',
      consignee: '',
      vehicleNumber: '',
      totalAmount: ''
    }));

    // Fetch the receipts and customers from the API when the component mounts
    useEffect(() => {
      const fetchReceipts = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/LorryReceipts');
          const info = await axios.get('http://localhost:8080/api/customers');

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
        const info = await axios.get('http://localhost:8080/api/customers');
        const selectedCustomer = info.data.find(customer => customer.name === selectedOption.value);
        setName(selectedCustomer ? selectedCustomer.name : '');
        setAddress(selectedCustomer ? selectedCustomer.address : '');
        setEmail(selectedCustomer ? selectedCustomer.email : '');
        setGstin(selectedCustomer ? selectedCustomer.gstin : '');
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

    // Handle the "GO" button click
    const handleGoClick = () => {
      // Add selected items to displayed items (to be shown in the bill)
      setDisplayedItems((prevItems) => {
        const updatedItems = [...prevItems];
    
        // Fill the empty rows in displayedItems with selected items
        selectedItems.forEach((receipt, index) => {
          const emptyRowIndex = updatedItems.findIndex(item => item.lrNumber === '');
          if (emptyRowIndex !== -1) {
            updatedItems[emptyRowIndex] = {
              lrNumber: receipt.lrNumber || '',
              lrDate: receipt.lrDate || '',
              consignor: receipt.consignor || '',
              consignee: receipt.consignee || '',
              vehicleNumber: receipt.vehicleNumber || '',
              totalAmount: receipt.totalAmount || ''
            };
          }
        });
    
        return updatedItems;
      });
    
      // Remove selected items from the list of receipts (uncheck the checkboxes)
      setReceipts((prevReceipts) => prevReceipts.filter((receipt) => !selectedItems.includes(receipt)));
    
      // Reset selected items (uncheck all checkboxes)
      setSelectedItems([]);
      setShowModal(false);// Close modal after selecting items
    };
    

    if (loading) {
      return <p>Loading...</p>; // Show loading state while fetching data
    }

    
    const formatDate = (dateString) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options); // en-GB formats as dd-mm-yyyy
    };
  
    const calculateTotalAmount = () => {
      const total = displayedItems.reduce((total, item) => {
        const amount = parseFloat(item.totalAmount.replace(/,/g, ''));
        console.log(`Item total amount: ${item.totalAmount}, Parsed amount: ${amount}`); // Debug log
        return total + (isNaN(amount) ? 0 : amount);
      }, 0);
      console.log(`Total: ${total}`); // Debug log
      return total.toFixed(2);
    };
    
    const formatAmountWithCommas = (amount) => {
      return parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    const convertTotalAmountToWords = (amount) => {
      const amountInWords = toWords(parseInt(amount, 10));
      return `${amountInWords.toUpperCase()} RUPEES ONLY`;
    };
    const handleSubmit = async () => {
      try {
        // Filter out empty items from displayedItems
        const validItems = displayedItems.filter(item => 
          item.lrNumber && item.lrNumber.trim() !== '' &&
          item.lrDate && item.lrDate.trim() !== '' &&
          item.consignor && item.consignor.trim() !== '' &&
          item.consignee && item.consignee.trim() !== '' &&
          item.vehicleNumber && item.vehicleNumber.trim() !== '' &&
          item.totalAmount && item.totalAmount.trim() !== ''
        );
    
        // If no valid items, display a message and return
        if (validItems.length === 0) {
          alert('No valid items to create the bill');
          return;
        }
    
        // Calculate total amount and ensure it's a number
        const totalAmount = parseFloat(calculateTotalAmount());
        if (isNaN(totalAmount)) {
          throw new Error("Total amount calculation returned a non-numeric value");
        }
    
        const totalAmountInWords = convertTotalAmountToWords(totalAmount);
    
        const billData = {
          name: name,
          address: address,
          email: email,
          gstin: gstin,
          items: validItems.map(item => ({
            lrNumber: item.lrNumber,
            lrDate: item.lrDate,
            consignor: item.consignor,
            consignee: item.consignee,
            vehicleNumber: item.vehicleNumber,
            totalAmount: item.totalAmount,
          })),
          finalAmount: totalAmount.toFixed(2),
          totalAmountInWords,
        };
    
        // Send the data to the server
        const response = await axios.post('http://localhost:8080/api/bills', billData);
    
        // Handle the response
        if (response.status === 201) {
          // If the response is successful, show a success message
          alert('Bill created successfully!');
          
          // Trigger print functionality
          window.print();
    
          // Clear displayed items and receipts after printing
          setDisplayedItems(Array(7).fill({ lrNumber: '', lrDate: '', consignor: '', consignee: '', vehicleNumber: '', totalAmount: '' }));
          setReceipts([]);
        } else {
          alert('Failed to create the bill. Please try again.');
        }
      } catch (error) {
        console.error('Error creating the bill:', error);
        alert('An error occurred while creating the bill. Please try again.');
      }
    };
     
    
    
    
    
    return (
      <>
        <button onClick={handleShow} className="btn btn-primary">
          Create Bill
        </button>
        <button onClick={handleSubmit} className='btn btn-primary'>Print</button>

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
                  id={`item-${receipt.lrNumber}`} // Corrected the dynamic ID
                  checked={selectedItems.includes(receipt)}
                  onChange={() => handleCheckboxChange(receipt)}
                />
                <label className="form-check-label" htmlFor={`item-${receipt.lrNumber}`}> {/* Corrected the label `htmlFor` */}
                  {receipt.lrNumber}
                </label>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleGoClick}>
              GO
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="invoice-container">
          <header className="invoice-header">
            <div className="company-logo">
              <img src={logo} alt="Company Logo" />
            </div>
            <div className="company-logo1">
              <h1>TRANSFAST CORPORATION</h1>
              <p>448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C., SHIROLI, KOLHAPUR, MAHARASHTRA. 416 122</p>
              <p>CONTACT NUMBER: 9923826075 / 7385119339 / 9960909651</p>
              <p>Email ID: transfast.corporation@gmail.com</p>
              <h4>GST NUMBER: 27ANEPC0107H1Z0</h4>
            </div>
          </header>

          <section className="billing-info">
            <div className="bill-to">
              <h3>Bill To</h3>

              <p><strong>{name}</strong></p>
              <p><strong>{address}</strong></p>
              <p><strong>{gstin}</strong></p>
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
                    <td>{new Date().toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    {/* <td>Due Date</td>
                    <td>:</td>
                    <td>2025-01-05</td> */}
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
                  <th>LR Number</th>
                  <th>Consignor</th>
                  <th>Consignee</th>
                  <th>Vehicle Number</th>
                  {/* <th>Invoice Number</th> */}
                  <th>Amount</th>
                </tr>
              </thead>  
              <tbody>
              {displayedItems.map((item, index) => (
      <tr key={index}>
        <td>{index +1}</td>
        <td>{item.lrDate ? formatDate(item.lrDate) : ''}</td>
        <td>{item.lrNumber || ''}</td>
        <td>{item.consignor || ''}</td>
        <td>{item.consignee || ''}</td>
        <td>{item.vehicleNumber || ''}</td>
        <td>{item.totalAmount || ''}</td>
      </tr>
    ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"> AMOUNT IN FIGURES:</th>
                  <td colSpan="3">{convertTotalAmountToWords(calculateTotalAmount())}</td>
                  <th>TOTAL:</th>
                  <td>{formatAmountWithCommas(calculateTotalAmount())}</td>
                </tr>
              </tfoot>
            </table>
          </section>

          <footer className="invoice-footer">
            <div className="payment">
              <h3>PAYMENT DETAILS</h3>
              <p>BANK NAME:- ICICI BANK</p>
              <p>BRANCH NAME:- MIDC SHIROLI</p> 
              <p>A/C NO :- 331308080180</p>
              <p>IFSC CODE:- ICIC0003313</p>
              <p>MICR CODE:- 416229011</p>
              <p>PHONEPAY/GPAY :- 9921296075</p>
            </div>

            <div className="total">
              <br />
              <br />
              {/* <br /> */}
              <p>________________________</p>
              <h3>TRANSFAST CORPORATION</h3>
            </div>

            <div className="notes">
              <br />
              <br />
              {/* <br /> */}
              <p>_____________________</p>
              <h3>RECEIVERS SIGNATURE</h3>
            </div>
          </footer>
        </div>
      </>
    );
  };
    
  export default CreateBill;
