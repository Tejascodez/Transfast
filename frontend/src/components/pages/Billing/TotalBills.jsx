import React, { useState, useEffect } from 'react';
import logo from '../../../assets/Logo1.png';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { FaSearch, FaFilePdf, FaFileExcel, FaEye, FaEdit } from 'react-icons/fa';
import './TotalBills.css'; // Import the CSS file for styling

const TotalBills = () => {
    const [bills, setBills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bills');
                setBills(response.data);
            } catch (error) {
                console.error("Error fetching bills", error);
            }
        };
        fetchBills();
    }, []);

    const handleView = (billId) => {
        console.log(`View details for bill ID: ${billId}`);
        // Add your view logic here
    };

    const handleEdit = (billId) => {
        console.log(`Edit details for bill ID: ${billId}`);
        // Add your edit logic here
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBills = bills.filter(bill =>
        bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customerAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.gstin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToPDF = () => {
        // Add your logic to export data to PDF
        console.log("Export to PDF");
    };

    const exportToExcel = () => {
        // Add your logic to export data to Excel
        console.log("Export to Excel");
    };

    return (
        <div className="total-bills-container">
            <header className="header">
                <img className="logo" src={logo} alt="Logo" />
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

            <div className="search-export-container">
                <div className="search-bar">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="export-buttons">
                    <button onClick={exportToPDF}><FaFilePdf /> Export to PDF</button>
                    <button onClick={exportToExcel}><FaFileExcel /> Export to Excel</button>
                </div>
            </div>

            <div className="table-container">
                <table className="total-bills-table">
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Customer Email</th>
                            <th>GSTIN</th>
                            <th>LR Number</th>
                            <th>LR Date</th>
                            <th>Consignor</th>
                            <th>Consignee</th>
                            <th>Vehicle Number</th>
                            <th>Total Amount</th>
                            <th>Final Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBills.map((bill, index) => (
                            <React.Fragment key={bill._id}>
                                {bill.items.map((item, itemIndex) => (
                                    <tr key={item._id}>
                                        {itemIndex === 0 && (
                                            <>
                                                <td rowSpan={bill.items.length}>{index + 1}</td>
                                                <td rowSpan={bill.items.length}>{bill.customerName}</td>
                                                <td rowSpan={bill.items.length}>{bill.customerAddress}</td>
                                                <td rowSpan={bill.items.length}>{bill.customerEmail}</td>
                                                <td rowSpan={bill.items.length}>{bill.gstin}</td>
                                            </>
                                        )}
                                        <td>{item.lrNumber}</td>
                                        <td>{new Date(item.lrDate).toLocaleDateString()}</td>
                                        <td>{item.consignor}</td>
                                        <td>{item.consignee}</td>
                                        <td>{item.vehicleNumber}</td>
                                        <td>{item.totalAmount}</td>
                                        {itemIndex === 0 && (
                                            <>
                                                <td rowSpan={bill.items.length}>{bill.totalAmount}</td>
                                                <td rowSpan={bill.items.length}>{bill.status}</td>
                                                <td rowSpan={bill.items.length}>
                                                    <button onClick={() => handleView(bill._id)}><FaEye /></button>
                                                    <button onClick={() => handleEdit(bill._id)}><FaEdit /></button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalBills;
