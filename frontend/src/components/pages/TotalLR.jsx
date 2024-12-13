import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/Logo1.png';
import './css/TotalLR.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilePdf, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const TotalLR = () => {
    const [receipts, setReceipts] = useState([]);

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

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(receipts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LorryReceipts");
        XLSX.writeFile(workbook, "LorryReceipts.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lorry Receipts", 20, 10);
        doc.autoTable({
            head: [['Sr. No.', 'LR No.', 'Date', 'From', 'To', 'Freight Payable Company', 'Consigner', 'Consignee', 'Description', 'Invoice', 'Quantity', 'Weight', 'Vehicle No.', 'Driver No.']],
            body: receipts.map((receipt, index) => [
                index + 1,
                receipt.lrNumber,
                receipt.lrDate,
                receipt.from,
                receipt.to,
                receipt.freightPayableCompany,
                receipt.consignor,
                receipt.consignee,
                receipt.description,
                receipt.invoice,
                receipt.quantity,
                receipt.weight,
                receipt.vehicleNo,
                receipt.driverNo
            ]),
        });
        doc.save("LorryReceipts.pdf");
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
            <div className="container">
                <button className='export' onClick={exportToExcel}>Export to Excel</button>
                <button className='export' onClick={exportToPDF}>Export to PDF</button>
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
                            <th>Actions </th>

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
                                <td>{receipt.weight}</td>
                                <td>{receipt.vehicleNo}</td>
                                <td>{receipt.driverNo}</td>
                                <td className="actions">
                                    <button className='edit' onClick={() => editReceipt(receipt.lrNumber)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className='download' onClick={() => downloadPDF(receipt.lrNumber)}>
                                         <FontAwesomeIcon icon={faFilePdf} />
                                    </button>
                                    <button className='share' onClick={() => shareReceipt(receipt.lrNumber)}>
                                          <FontAwesomeIcon icon={faShareAlt} />
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
