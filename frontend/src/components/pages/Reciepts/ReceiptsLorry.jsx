import { useEffect, useState } from 'react';
import axios from 'axios';
 // Import the CSS file for styling

const LorryReceipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredReceipt, setFilteredReceipt] = useState(null);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/lorryReceipts/${receipts.id}`);
                setReceipts(response.data);
            } catch (error) {
                console.error("Error fetching receipts", error);
            }
        };
        fetchReceipts();
    }, []);

    // const handleSearch = () => {
    //     const receipt = receipts.find(r => r.lrNumber === searchTerm || r.id === searchTerm);
    //     setFilteredReceipt(receipt);
    // };

    return (
        <div className="lorry-receipt">
    <header>
        <h1>LORRY RECEIPT</h1>
        <p>Date: 14-04-2024</p>
    </header>
    <section className="company-info">
        <h2>TRANSFAST CORPORATION</h2>
        <address>
            448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C. SHIROLI, KOLHAPUR, MAHARASHTRA, 416 122
        </address>
        <p>Contact Numbers: 9921296075 / 7385119339 / 9960909651</p>
        <p>GST NUMBER: 27ANEPC0107H1ZO</p>
        <p>Email: transfast.corporation@gmail.com</p>
    </section>

    {filteredReceipt ? (
        <div className="receipt-details">
            <div className="company-details">
                <label htmlFor="consignor">CONSIGNOR :</label>
                <input type="text" id="consignor" name="consignor" value={filteredReceipt.consignor} readOnly />

                <label htmlFor="consignee">CONSIGNEE :</label>
                <input type="text" id="consignee" name="consignee" value={filteredReceipt.consignee} readOnly /><br />

                <label htmlFor="freightPayableCompany">Freight Payable Company :</label>
                <input type="text" id="freightPayableCompany" name="freightPayableCompany" value={filteredReceipt.freightPayableCompany} readOnly /><br />
            </div>

            <div className="payment-details">
                <label htmlFor="paytype">PAY TYPE :</label>
                <input type="text" id="paytype" name="paytype" value={filteredReceipt.paytype} readOnly />

                <label htmlFor="billing">BILLING BR :</label>
                <input type="text" id="billing" name="billing" value={filteredReceipt.billing} readOnly />

                <label htmlFor="collection">COLLECTION TYPE :</label>
                <input type="text" id="collection" name="collection" value={filteredReceipt.collectionType} readOnly />

                <label htmlFor="delivery">DELIVERY TYPE :</label>
                <input type="text" id="delivery" name="delivery" value={filteredReceipt.deliveryType} readOnly />
            </div>

            <section className="receipt-info">
                <p>Number: {filteredReceipt.number}</p>
                <p>From: {filteredReceipt.from}</p>
                <p>To: {filteredReceipt.to}</p>
                <p>Driver's Contact: {filteredReceipt.driverContact}</p>
                <p>Vehicle No.: {filteredReceipt.vehicleNo}</p>
                <p>Pay Type: {filteredReceipt.payType}</p>
                <p>Billing Branch: {filteredReceipt.billingBranch}</p>
                <p>Collection Type: {filteredReceipt.collectionType}</p>
                <p>Delivery Type: {filteredReceipt.deliveryType}</p>
            </section>

            <div className="container">
                <table className="charges-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Description</th>
                            <th>Invoice No.</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Actual Weight</th>
                            <th>Chargeable Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredReceipt.items) && filteredReceipt.items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                                <td>{itemIndex + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.invoiceNumber}</td>
                                <td>{item.quantity}</td>
                                <td>{item.rate}</td>
                                <td>{item.actualWeight}</td>
                                <td>{item.chargeableWeight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <section className='freight-details'>
                <label htmlFor="freight">Freight :</label>
                <input type="text" id="freight" name="freight" value={filteredReceipt.freight} readOnly />

                <label htmlFor="sur">Sur Charges :</label>
                <input type="text" id="sur" name="sur" value={filteredReceipt.surCharges} readOnly />

                <label htmlFor="statisticalCharges">Statistical Charges :</label>
                <input type="text" id="statisticalCharges" name="statisticalCharges" value={filteredReceipt.statisticalCharges} readOnly />

                <label htmlFor="hamali">Hamali :</label>
                <input type="text" id="hamali" name="hamali" value={filteredReceipt.hamali} readOnly />

                <label htmlFor="dc">DC Charges :</label>
                <input type="text" id="dc" name="dc" value={filteredReceipt.dcCharges} readOnly />

                <label htmlFor="dd">DD Charges :</label>
                <input type="text" id="dd" name="dd" value={filteredReceipt.ddCharges} readOnly />

                <label htmlFor="holding">Holding :</label>
                <input type="text" id="holding" name="holding" value={filteredReceipt.holding} readOnly />

                <label htmlFor="other">Other :</label>
                <input type="text" id="other" name="other" value={filteredReceipt.otherCharges} readOnly />

                <label htmlFor="total">Total :</label>
                <input type="text" id="total" name="total" value={filteredReceipt.total} readOnly />
            </section>

            <section className="footer-info">
                <p>Freight Payable Company: {filteredReceipt.freightPayableCompany}</p>
                <p>Invoice Value: {filteredReceipt.invoiceValue}</p>
                <p>Total Amount in Words: {filteredReceipt.totalAmountInWords}</p>
            </section>

            <section className="signatures">
                <p>Consignee's Signature & Stamp</p>
                <p>Transfast Corporation</p>
            </section>
        </div>
    ) : (
        <p>No receipts available or no receipt found for the given ID or LR number.</p>
    )}
</div>

    );
};

export default LorryReceipts;
