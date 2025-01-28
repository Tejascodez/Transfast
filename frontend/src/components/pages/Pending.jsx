import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import debounce from 'lodash/debounce';
import logo from '../../assets/Logo1.png';
import search_icon from '../../assets/search.png';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
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

    const formData = new FormData();
    formData.append('proof', proofFile);

    try {
      // Upload the proof file
      await axios.post(`http://localhost:8080/api/uploadProof/${currentLRNumber}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the status to "Received"
      await axios.put(`http://localhost:8080/api/LorryReceipts/${currentLRNumber}`, { status: 'Received' });

      // Update the status locally (client-side) to reflect the change
      setReceipts(receipts.map(r => r.lrNumber === currentLRNumber ? { ...r, status: 'Received' } : r));

      // Hide the modal after successful upload
      setShowFileInput(false);

    } catch (error) {
      console.error("Error updating receipt status or uploading proof", error);
    }
  };

  const openFileInputModal = (lrNumber) => {
    setCurrentLRNumber(lrNumber);
    setShowFileInput(true);
  };

  const closeModal = () => {
    setShowFileInput(false);
    setCurrentLRNumber(null);
  };

  // DataGrid columns configuration
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'lrNumber', headerName: 'LR No.', width: 130 },
    { field: 'lrDate', headerName: 'Date', width: 130 },
    { field: 'freightPayableCompany', headerName: 'Freight Payable Company', width: 200 },
    { field: 'consignor', headerName: 'Consigner', width: 150 },
    { field: 'consignee', headerName: 'Consignee', width: 150 },
    { field: 'vehicleNumber', headerName: 'Vehicle No.', width: 130 },
    { field: 'driversName', headerName: 'Driver Name', width: 130 },
    { field: 'driversContact', headerName: 'Driver No.', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        params.value === 'Received' ? (
          <button onClick={() => alert('Received & Unbilled')}>Received & Unbilled</button> // Placeholder action for 'Received & Unbilled'
        ) : (
          <button onClick={() => openFileInputModal(params.row.lrNumber)}>
            {showFileInput[params.row.lrNumber] ? 'Hide Proof Input' : 'Received'}
          </button>
        )
      ),
    }
  ];

  // Prepare rows for DataGrid
  const rows = filteredReceipts.map((receipt, index) => ({
    id: index + 1,
    lrNumber: receipt.lrNumber,
    lrDate: new Date(receipt.lrDate).toLocaleDateString(),
    freightPayableCompany: receipt.freightPayableCompany,
    consignor: receipt.consignor,
    consignee: receipt.consignee,
    vehicleNumber: receipt.vehicleNumber,
    driversName: receipt.driversName,
    driversContact: receipt.driversContact,
    status: receipt.status,

  }));

  return (
    <div className="lorry-receipt-pending">
      <header>
        {/* <img className='logo' src={logo} alt="Logo" /> */}
        <section className="company-info">
        <h2>Pendinglrs</h2>
          {/* <h2>TRANSFAST CORPORATION</h2>
          <address>
            448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C. SHIROLI, KOLHAPUR, MAHARASHTRA, 416 122
          </address> */}
          {/* <p>Contact Numbers: 9921296075 / 7385119339 / 9960909651</p>
          <p>GST NUMBER: 27ANEPC0107H1ZO</p>
          <p>Email: transfast.corporation@gmail.com</p> */}
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

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
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