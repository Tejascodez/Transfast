import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Unbilled.css';

const UnbilledLR = () => {
  const [receipts, setReceipts] = useState([]); // Store fetched receipts
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const [proofFiles, setProofFiles] = useState({}); // Store proof files for each LR number
  const [showFileInput, setShowFileInput] = useState(false); // Track modal visibility
  const [currentLRNumber, setCurrentLRNumber] = useState(null); // Track the current LR number for the modal

  // Fetch the receipts from the API when the component mounts
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/LorryReceipts');
        // Filter the receipts by 'Pending' status
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



  const openFileInputModal = (lrNumber) => {
    setCurrentLRNumber(lrNumber);
    setShowFileInput(true);
  };


  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  if (receipts.length === 0) {
    return <p>No Received or Unbilled receipts found.</p>; // Show message if no receipts are found
  }

  return (
    <div className="unbilled-lr-container">
      <h2>Received & Unbilled Lorry Receipts</h2>
      <table className="lorry-receipt-table-unbilled">
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
          {receipts.map((receipt, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{receipt.lrNumber}</td>
              <td>{new Date(receipt.lrDate).toLocaleDateString()}</td>
              <td>{receipt.freightPayableCompany}</td>
              <td>{receipt.consignor}</td>
              <td>{receipt.consignee}</td>
              <td>{receipt.vehicleNumber}</td>
              <td>{receipt.driversContact}</td>
              <td>
                <button
                  className={`status-button ${receipt.status === 'Pending' ? 'status-pending' : ''}`}
                  onClick={() => openFileInputModal(receipt.lrNumber)}
                >
                  {receipt.status === 'Received' ? 'Unbilled' : receipt.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnbilledLR;
