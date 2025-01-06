  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import ReactSearchBox from "react-search-box";
  import debounce from 'lodash/debounce';
  import logo from '../../assets/Logo1.png';
  import search_icon from '../../assets/search.png';
  import './css/Pending.css';

  const Pending = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [proofFiles, setProofFiles] = useState({}); // Store proof files for each LR number
    const [showFileInput, setShowFileInput] = useState(false); // Track modal visibility
    const [currentLRNumber, setCurrentLRNumber] = useState(null); // Track the current LR number for the modal


    useEffect(() => {
      const fetchReceipts = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/LorryReceipts');
          setReceipts(response.data);
        } catch (error) {
          console.error("Error fetching receipts", error);
        }
      };
      fetchReceipts();
    }, []);

    const handleSearch = debounce((value) => {
      setSearchQuery(value);
    }, 300);

    const filteredReceipts = receipts.filter(receipt =>
      Object.values(receipt).some(value =>
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    const handleProofChange = (event) => {
      const file = event.target.files[0];
      setProofFiles(prev => ({
        ...prev,
        [currentLRNumber]: file,
      }));
    };

  const handleFileUploadAndUpdateStatus = async () => {
  const proofFile = proofFiles[currentLRNumber];
  if (!proofFile) {
    alert('Please upload a proof file first.');
    return;
  }

  const currentReceipt = receipts.find(r => r.lrNumber === currentLRNumber);
  const { holting, holtingDays } = currentReceipt;

  if (!holting || !holtingDays) {
    alert('Please fill in both Holting Days and Holting Amount.');
    return;
  }

  const formData = new FormData();
  formData.append('proof', proofFile);

  try {
    // Upload the proof file
    await axios.post(`http://localhost:8080/api/uploadProof/${currentLRNumber}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Update the holting field (PUT request)
    await axios.put(`http://localhost:8080/api/LorryReceipts/${currentLRNumber}`, {
      holting,
    });

    // Post the holtingDays field (POST request)
    await axios.post(`http://localhost:8080/api/LorryReceipts/${currentLRNumber}`, {
      holtingDays,
    });

    // Update the status locally (client-side)
    setReceipts(receipts.map(r => 
      r.lrNumber === currentLRNumber 
        ? { ...r, status: 'Received' } 
        : r
    ));

    // Hide the modal after successful upload
    setShowFileInput(false);
  } catch (error) {
    console.error("Error updating receipt status or uploading proof", error);
  }
};

    

    const handleInputChange = (lrNumber, field, value) => {
      setReceipts(prevReceipts =>
        prevReceipts.map(receipt =>
          receipt.lrNumber === lrNumber
            ? { ...receipt, [field]: value }
            : receipt
        )
      );
    };
    
    const openFileInputModal = (lrNumber) => {
      setCurrentLRNumber(lrNumber);
      setShowFileInput(true);
    };

    const closeModal = () => {
      setShowFileInput(false);
      setCurrentLRNumber(null);
    };

    const unbilledReceipts = receipts.filter(receipt => receipt.status === 'Unbilled');

    return (
      <div className="lorry-receipt-pending">
        <header>
          <img className='logo' src={logo} alt="Logo" />
          <section className="company-info">
            <h2>TRANSFAST CORPORATION</h2>
            <address>
              448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C. SHIROLI, KOLHAPUR, MAHARASHTRA, 416 122
            </address>
            <p>Contact Numbers: 9921296075 / 7385119339 / 9960909651</p>
            <p>GST NUMBER: 27ANEPC0107H1ZO</p>
            <p>Email: transfast.corporation@gmail.com</p>
          </section>
        </header>
        <div className="pending-container">
          <div className="search-box-container">
            <img src={search_icon} className="search-icon" alt="Search" />
            <ReactSearchBox
              placeholder="Search by any field"
              value={searchQuery}
              onChange={handleSearch}
              data={receipts.map(receipt => ({
                key: receipt.lrNumber,
                value: receipt.consignor
              }))}
            />
          </div>
          <table className="lorry-receipt-table-pending">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>LR No.</th>
                <th>Date</th>
                <th>Freight Payable Company</th>
                <th>Consigner</th>
                <th>Consignee</th>
                <th>Vehicle No.</th>
                <th>Driver No.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.map((receipt, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{receipt.lrNumber}</td>
                  <td>{new Date(receipt.lrDate).toLocaleDateString()}</td>
                  <td>{receipt.freightPayableCompany}</td>
                  <td>{receipt.consignor}</td>
                  <td>{receipt.consignee}</td>
                  <td>{receipt.vehicleNumber}</td>
                  <td>{receipt.driversContact}</td>
                  <td className="Status">
                    {receipt.status === 'Received' ? (
                      <button onClick={() => alert('Received & Unbilled')}>Received & Unbilled</button> // Placeholder action for 'Received & Unbilled'
                    ) : (
                      <button onClick={() => openFileInputModal(receipt.lrNumber)}>
                        {showFileInput[receipt.lrNumber] ? 'Hide Proof Input' : 'Received'}
                      </button>
                    
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showFileInput && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Upload the proof with Scanned Copy of LR NO: {currentLRNumber}</h2>
        <input
          type="file"
          onChange={handleProofChange}
        />
        <div>
        <label>
    Holding Days:
    <input
      type="number"
      placeholder="Enter days"
      value={
        receipts.find(r => r.lrNumber === currentLRNumber)?.holtingDays || ''
      }
      onChange={(e) =>
        handleInputChange(currentLRNumber, 'holtingDays', e.target.value)
      }
    />
  </label>

          <label>
            Holting Amount:
            <input
              type="number"
              placeholder="Enter the amount"
              value={
                receipts.find(r => r.lrNumber === currentLRNumber)?.holting || ''
              }
              onChange={(e) =>
                handleInputChange(currentLRNumber, 'holting', e.target.value)
              }
            />
          </label>
        </div>
        <button onClick={handleFileUploadAndUpdateStatus}>
          Upload Proof and Mark as Received
        </button>
      </div>
    </div>
  )}

      </div>
    );
  };

  export default Pending;
