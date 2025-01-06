import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../assets/Logo1.png';
import './PrintLr.css';

const Receipt = () => {
    const [receipts, setReceipts] = useState([]);

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

    const saveReceipt = async (lrNumber) => {
        try {
            await axios.put(`http://localhost:8080/api/LorryReceipts/${lrNumber}`, editedReceipt);
            setReceipts(receipts.map(r => r.lrNumber === lrNumber ? editedReceipt : r));
            setEditRowIndex(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating receipt", error);
        }
    };

    const printReceipt = () => {
        window.print();  // This triggers the browser's print functionality
    };

    return (
        <>
            <div className="receipt">
                <i className="i">(Original For Consignee)</i>
      
                <div className="all">
                    <div className="header">
                        <div className="logo-container">
                            <img src={logo} alt="TFC LOGO" />
                        </div>
                        <div className="address">
                            <h1>TRANSFAST CORPORATION</h1>
                            <p>448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C., SHIROLI, KOLHAPUR, MAHARASHTRA. 416 122</p>
                            <p>CONTACT NUMBER: 9921296075 / 7385113939 / 9960909651</p>
                            <p>GST NUMBER: 27ANEPC0107H1Z0</p>
                            <p>Email ID: transfast.corporation@gmail.com</p>
                        </div>
                    </div>

                    <div className="section-content">
                        <table>
                            <thead>
                                <tr>
                                    <td rowSpan="2">Consignor:</td>
                                    <td rowSpan="2" colSpan="5"></td>
                                    <th colSpan="2">LORRY RECEIPT</th>
                                </tr>
                                <tr>
                                    <td>Number</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowSpan="2">Consignee:</td>
                                    <td rowSpan="2" colSpan="5"></td>
                                    <td>Date</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>From</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Freight Payable Company:</td>
                                    <td colSpan="5"></td>
                                    <td>To</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Invoice Value:</td>
                                    <td colSpan="2"></td>
                                    <td>Driver's Contact:</td>
                                    <td colSpan="2"></td>
                                    <td>Vehicle No.:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Pay Type:</td>
                                    <td></td>
                                    <td>Billing Branch:</td>
                                    <td></td>
                                    <td>Collection Type:</td>
                                    <td></td>
                                    <td>Delivery Type:</td>
                                    <td></td>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <table className='table-3'>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Description</th>
                                <th>Invoice No.</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Actual Weight</th>
                                <th>Chargeable Weight</th>
                                <th>Eway Bill No.</th>
                                <th>Expiry Date</th>
                                <th colSpan="2">Freight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    Freight:<br />
                                    Sur. Charges:<br />
                                    Statiscal Charges:<br />
                                    Hamali:<br />
                                    DC Charges:<br />
                                    DD Charges:<br />
                                    Holting:<br />
                                    Other:<br />
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="2">TOTAL AMOUNT IN WORDS:</th>
                                <td colSpan="7"></td>
                                <th>TOTAL</th>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="payment-details-rc">
                        <table>
                            <thead>
                                <tr>
                                    <td rowSpan={3}></td>
                                    <th colSpan="" rowSpan="">PAYMENT DETAILS:-</th>
                                    <td rowSpan={3}></td>
                                </tr>
                                <tr>
                                    <td>A/C NO :- 331308080180,ICICI BANK,MIDC SHIROLI,KOLHAPUR.</td>
                                </tr>
                                <tr>
                                    <td>PHONEPAY/GPAY :- 9921296075</td>
                                </tr>
                                <tr>
                                    <th colSpan="" rowSpan="">Consignee's Signature & Stamp</th>
                                    <td>IFSC CODE:- ASFSAF</td>
                                    <th colSpan="" rowSpan="">TRANSFAST CORPORATION</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Receipt;
