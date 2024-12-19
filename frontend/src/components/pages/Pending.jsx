import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilePdf, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/Logo1.png';
import ReactSearchBox from "react-search-box";
import search_icon from '../../assets/search.png';
import './css/Pending.css';

const Pending = () => {
  const [receipts, setReceipts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/LorryReceipts');
        setReceipts(response.data);
      } catch (error) {
        console.error("Error fetching receipts", error);
      }
    };
    fetchReceipts();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredReceipts = receipts.filter(receipt =>
    Object.values(receipt).some(value =>
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const editReceipt = (lrNumber) => {
    console.log(`Editing receipt with LR Number: ${lrNumber}`);
    // Implement the edit functionality here
  };

  const downloadPDF = (lrNumber) => {
    console.log(`Downloading PDF for receipt with LR Number: ${lrNumber}`);
    // Implement the PDF download functionality here
  };

  const shareReceipt = (lrNumber) => {
    console.log(`Sharing receipt with LR Number: ${lrNumber}`);
    // Implement the share functionality here
  };

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
                <td>{receipt.lrDate}</td>
                <td>{receipt.freightPayableCompany}</td>
                <td>{receipt.consignor}</td>
                <td>{receipt.consignee}</td>
                <td>{receipt.vehicleNo}</td>
                <td>{receipt.driverNo}</td>
                <td className="Status">
                  <button>
                    recived
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pending;
