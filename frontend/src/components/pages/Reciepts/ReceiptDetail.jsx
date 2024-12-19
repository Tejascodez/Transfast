import { useParams } from 'react-router-dom';
import logo from '../../../assets/Logo1.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReceiptDetail = () => {
    const { id } = useParams();
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/LorryReceipts/${id}`);
                if (response.data) {
                    console.log('Fetched Receipt Data:', response.data); 
                    setReceipt(response.data);
                } else {
                    setError('Receipt not found');
                }
            } catch (error) {
                console.error("Error fetching receipt details", error);
                setError('Failed to fetch receipt details');
            } finally {
                setLoading(false);
            }
        };

        fetchReceipt();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!receipt) {
        return <div>No receipt data available</div>;
    }

    return (
        <div className="receipt-detail">
            <h3>Lorry Receipt Details</h3>
            <div>
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
                                        <td rowSpan="2" colSpan="5">{receipt.consignor}</td>
                                        <th colSpan="2">LORRY RECEIPT</th>
                                    </tr>
                                    <tr>
                                        <td>Number</td>
                                        <td>{receipt.lrNumber}</td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">Consignee:</td>
                                        <td rowSpan="2" colSpan="5">{receipt.consignee}</td>
                                        <td>Date</td>
                                        <td>{receipt.lrDate}</td>
                                    </tr>
                                    <tr>
                                        <td>From</td>
                                        <td>{receipt.from}</td>
                                    </tr>
                                    <tr>
                                        <td>Freight Payable Company:</td>
                                        <td colSpan="5">{receipt.freightPayableCompany}</td>
                                        <td>To</td>
                                        <td>{receipt.to}</td>
                                    </tr>
                                    <tr>
                                        <td>Invoice Value:</td>
                                        <td colSpan="2">{receipt.invoice}</td>
                                        <td>Driver's Contact:</td>
                                        <td colSpan="2">{receipt.driversContact}</td>
                                        <td>Vehicle No.:</td>
                                        <td>{receipt.vehicleNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Pay Type:</td>
                                        <td>{receipt.payType}</td>
                                        <td>Billing Branch:</td>
                                        <td>{receipt.billingBranch}</td>
                                        <td>Collection Type:</td>
                                        <td>{receipt.collectionType}</td>
                                        <td>Delivery Type:</td>
                                        <td>{receipt.deliveryType}</td>
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
                                {/* If the items exist, map them */}
                                {receipt.items && receipt.items.length > 0 ? (
                                    receipt.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.description}</td>
                                            <td>{item.invoiceNumber}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.rate}</td>
                                            <td>{item.actualWeight}</td>
                                            <td>{item.chargeableWeight}</td>
                                            <td>{item.EwayNum}</td>
                                            <td>{item.expiryDate}</td>
                                            <td>{item.freight}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="10">No items available</td></tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="2">TOTAL AMOUNT IN WORDS:</th>
                                    <td colSpan="7">{receipt.totalAmountWords}</td>
                                    <th>TOTAL</th>
                                    <td>{receipt.totalAmount}</td>
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
                                        <td>A/C NO :- 331305000180, ICICI BANK, MIDC SHIROLI, KOLHAPUR.</td>
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
            </div>
        </div>
    );
};

export default ReceiptDetail;
