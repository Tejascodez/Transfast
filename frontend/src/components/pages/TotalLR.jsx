import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/Logo1.png';
import './css/TotalLR.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const TotalLR = () => {
    const [receipts, setReceipts] = useState([]);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editedReceipt, setEditedReceipt] = useState({});

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

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setEditedReceipt({
            ...editedReceipt,
            [field]: value
        });
    };

    const editReceipt = (index) => {
        setEditRowIndex(index);
        setEditedReceipt({ ...receipts[index] });
    };

    const saveReceipt = async (lrNumber) => {
        try {
            await axios.put(`http://localhost:5000/api/LorryReceipts/${lrNumber}`, editedReceipt);
            setReceipts(receipts.map(r => r.lrNumber === lrNumber ? editedReceipt : r));
            setEditRowIndex(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating receipt", error);
        }
    };

    const cancelEdit = () => {
        setEditRowIndex(null);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(receipts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LorryReceipts");
        XLSX.writeFile(workbook, "LorryReceipts.xlsx");
    };

    const exportToPDF = (receipt) => {
        const doc = new jsPDF();
        doc.text("Lorry Receipt", 20, 10);
        doc.autoTable({
            head: [['Field', 'Value']],
            body: Object.entries(receipt).map(([key, value]) => [key, value]),
        });
        doc.save(`LorryReceipt_${receipt.lrNumber}.pdf`);
    };

    const deleteReceipt = async (id) => {
        try {
            console.log("Deleting receipt with ID:", id);  // Log the ID to verify
            await axios.delete(`http://localhost:5000/api/LorryReceipts/${id}`);
            setReceipts(receipts.filter(r => r._id !== id));  // Remove the deleted receipt from state
        } catch (error) {
            console.error("Error deleting receipt", error);
        }
    };

    const openNewTab = (receipt) => {
        try {
            const newTab = window.open(`/receipt-detail/${receipt._id}`, "_blank");
            if (newTab) {
                newTab.location.assign(`/receipt-detail/${receipt._id}`);
            }
        } catch (error) {
            console.error("Error loading the receipt", error);
        }
    };

    return (
        <div className="lorry-receipt">
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
            <div className="container-tlr">
                <button className='export' onClick={exportToExcel}>Export to Excel</button>
                <table className="lorry-receipt-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>LR No.</th>
                            <th>Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Freight Payable Company</th>
                            <th>Consigner</th>
                            <th>Consignee</th>
                            <th>Description</th>
                            <th>Invoice</th>
                            <th>Quantity</th>
                            <th>Weight</th>
                            <th>Vehicle No.</th>
                            <th>Driver No.</th>
                            <th>Bill No.</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipt, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{receipt.lrNumber}</td>
                                <td>{receipt.lrDate}</td>
                                <td>{receipt.from}</td>
                                <td>{receipt.to}</td>
                                <td>{receipt.freightPayableCompany}</td>
                                <td>{receipt.consignor}</td>
                                <td>{receipt.consignee}</td>
                                <td>{receipt.description}</td>
                                <td>{receipt.invoice}</td>
                                <td>{receipt.quantity}</td>
                                <td>{receipt.actualWeight}</td>
                                <td>{receipt.vehicleNumber}</td>
                                <td>{receipt.driversContact}</td>
                                <td>Pending</td>
                                <td className="actions">
                                    <button className='edit' onClick={() => editReceipt(index)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className='view' onClick={() => openNewTab(receipt)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className='delete' onClick={() => deleteReceipt(receipt._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
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

export default TotalLR;
