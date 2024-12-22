import React, { useState, useEffect } from 'react';
import '../css/lrstyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  Creatable from 'react-select/creatable';
import { toWords } from 'number-to-words';


const CreateLR = () => {
    const [increment, setIncrement] = useState('');
    const [items, setItems] = useState([]);
    const [consignors, setConsignors] = useState([]);
    const [consignees, setConsignees] = useState([]);
    const [freightCompanies, setFreightCompanies] = useState([]);
    const [vehicleNumbers, setVehicleNumbers] = useState([]);
    const [driversNames , setDriversNames ] = useState([]);
    const [driversContacts , setDriversContacts] = useState([]);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        lrNumber: '',
        lrDate: '',
        from: '',
        to: '',
        vehicleNumber: '',
        driversName: '',
        driversContact: '',
        loadType: 'Full',
        consignor: '',
        consignee: '',
        freightPayableCompany: '',
        invoiceValue: 'inv',
        paymentMode: 'TBB',
        billingBranch: 'Kolhapur',
        collectionType: 'DC',
        deliveryType: 'DD',
        itemType: 'General',
        description: '',
        invoiceNumber: '',
        quantity: '',
        unit: 'Nos',
        EwayBillNo: '',
        expiryDate:'',
        rate: '',
        actualWeight: '',
        chargeableWeight: '',
        totalAmount: '',
        remarks: '',
        freight: '',
        surCharges: '',
        stasticalCharges: '',
        hamali: '',
        dcCharges: '',
        ddCharges: '',
        holting: '',
        other: '',
        totalAmountInWords:''
    });
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/lorryReceipts');
                const data = response.data;

                // Extracting unique consignors, consignees, and freight companies
                const consignors = [...new Set(data.map(item => item.consignor))];
                const consignees = [...new Set(data.map(item => item.consignee))];
                const freightCompanies = [...new Set(data.map(item => item.freightPayableCompany))];
                const vehicleNumbers =  [...new Set(data.map(item => item.vehicleNumber))];
                const driversNames =  [...new Set(data.map(item => item.driversName))];
                const driversContacts = [...new Set(data.map(item=> item.driversContact))];

                setConsignors(consignors);
                setConsignees(consignees);
                setFreightCompanies(freightCompanies);
                setVehicleNumbers(vehicleNumbers);
                setDriversNames(driversNames);
                setDriversContacts(driversContacts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddRow = () => {
        const newItem = {
            description: formData.description,
            invoiceNumber: formData.invoiceNumber,
            quantity: formData.quantity,
            unit: formData.unit,
            EwayBillNo: formData.EwayBillNo,
            expiryDate: formData.expiryDate,
            rate: formData.rate,
            actualWeight: formData.actualWeight,
            chargeableWeight: formData.chargeableWeight
        };

        setItems(prevItems => [...prevItems, newItem]);

        // Optionally reset fields after adding the row
        setFormData(prevState => ({
            ...prevState,
            description: '',
            invoiceNumber: '',
            quantity: '',
            unit: 'Nos',
            EwayBillNo: '',
            expiryDate:'',
            rate: '',
            actualWeight: '',
            chargeableWeight: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            items: items, // Use the 'items' state instead of 'tableRows'
        };

        try {
            console.log("Data to Submit:", dataToSubmit);
            const postResponse = await axios.post('http://localhost:5000/api/lorryReceipts', dataToSubmit);
            if (postResponse.status === 201) {
                console.log('Lorry Receipt data stored successfully.');
                navigate('/printlr', { state: { formData, items } });
            } else {
                console.error('Failed to store Lorry Receipt data.');
                alert('Error: Could not submit the form.');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            alert('There was an error while submitting the form. Please try again.');
        }
    };

    const handleConsignorChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            consignor: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleConsigneeChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            consignee: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleVehicleNumbers = (selecetedOption) =>{
        setFormData(prevState =>({
            ...prevState,
            vehicleNumber : selecetedOption ? selecetedOption.value: ""
        }));
    }
    const handleDriverNames = (selecetedOption) =>{
        setFormData(prevState =>({
            ...prevState,
            driversName: selecetedOption ? selecetedOption.value: ""
        }));
    }

    const handleDriversContact = (selecetedOption) =>{
        setFormData(prevState =>({
            ...prevState,
            driversContact: selecetedOption ? selecetedOption.value: ""
        }));
    }


    const handleFreightPayableCompanyChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            freightPayableCompany: selectedOption ? selectedOption.value : ''
        }));
    };
    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    const formatIndianCurrency = (num) => {
        if (!num || isNaN(num)) return 'Zero Only/-';
    
        const crores = Math.floor(num / 10000000);
        num %= 10000000;
    
        const lakhs = Math.floor(num / 100000);
        num %= 100000;
    
        const thousands = Math.floor(num / 1000);
        num %= 1000;
    
        const hundreds = Math.floor(num / 100);
        num %= 100;
    
        const tensAndOnes = num;
    
        const parts = [];
        if (crores) parts.push(`${capitalizeWords(toWords(crores))} Crore`);
        if (lakhs) parts.push(`${capitalizeWords(toWords(lakhs))} Lakh`);
        if (thousands) parts.push(`${capitalizeWords(toWords(thousands))} Thousand`);
        if (hundreds) parts.push(`${capitalizeWords(toWords(hundreds))} Hundred`);
        if (tensAndOnes) parts.push(`${capitalizeWords(toWords(tensAndOnes))}`);
    
        return parts.join(' ') + ' Only/-';
    };


    // Calculate total whenever a field changes
    useEffect(() => {
        const totalAmount =
            Number(formData.freight || 0) +
            Number(formData.surCharges || 0) +
            Number(formData.stasticalCharges || 0) +
            Number(formData.hamali || 0) +
            Number(formData.dcCharges || 0) +
            Number(formData.ddCharges || 0) +
            Number(formData.holting || 0) +
            Number(formData.other || 0);

        setFormData((prev) => ({
            ...prev,
            totalAmount: Number(totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 }), 
            totalAmountInWords: formatIndianCurrency(Math.floor(totalAmount)), // Converts to Indian format with suffix
        }));
    }, [formData.freight, formData.surCharges, formData.stasticalCharges, formData.hamali, formData.dcCharges, formData.ddCharges, formData.holting, formData.other]);


    return (
        <div className="lorry-receipt-container">
            <h2 className='l'>Lorry Receipt</h2>
            <form className='receipt-items' onSubmit={handleSubmit}>
                <div className='box1'>
                    <div className='lr-detail'>
                        <label htmlFor="lrds">LR DETAILS</label><br />
                        <label htmlFor="lrNumber">LR NUMBER :</label>
                        <input type="text" id="lrNumber" name="lrNumber" placeholder="LR Number" value={formData.lrNumber} onChange={handleChange} required />
                        <label htmlFor="lrDate">LR DATE :</label>
                        <input type="date" id="lrDate" name="lrDate" value={formData.lrDate} onChange={handleChange} required />
                        <label htmlFor="from">FROM :</label>
                        <input type="text" id="from" name="from" placeholder="Enter Pick Up Point" value={formData.from} onChange={handleChange} required />
                        <label htmlFor="to">TO :</label>
                        <input type="text" id="to" name="to" placeholder="Enter Destination" value={formData.to} onChange={handleChange} required />
                    </div>
                    <div className="Vehicle-details">
    <label htmlFor="lorry-details"> VEHICLE DETAILS </label><br />
    <label htmlFor="vehicleNumber">VEHICLE NUMBER :</label>
    <Creatable 
        id="vehicleNumber"
        name='vehicleNumber'
        options={vehicleNumbers.map(c => ({value: c, label:c }))}
        onChange={handleVehicleNumbers}
        value={formData.vehicleNumber ? {value: formData.vehicleNumber, label: formData.vehicleNumber}:null}
        placeholder="Enter vehicle Number"
        isClearable
        required/>
        <br />
    {/* <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="Enter Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} required/><br /> */}
    <label htmlFor="driversName">DRIVER'S NAME :</label>
    <Creatable 
        id="driversName"
        name='driversName'
        options={driversNames.map(c => ({value: c, label:c }))}
        onChange={handleDriverNames}
        value={formData.driversName ? {value: formData.driversName, label: formData.driversName}:null}
        placeholder="Enter Driver Name"
        isClearable
        required/>
        <br />
    {/* <input type="text" id="driversName" name="driversName" placeholder="Enter Driver's Name" value={formData.driversName} onChange={handleChange} /><br /> */}
    <label htmlFor="driversContact">DRIVER'S CONTACT :</label>
    <Creatable 
        id="driversContact"
        name='driversContact'
        options={driversContacts.map(c => ({value: c, label:c }))}
        onChange={handleDriversContact}
        value={formData.driversContact ? {value: formData.driversContact, label: formData.driversContact}:null}
        placeholder="Enter Driver Name"
        isClearable
        required/>
        <br />
    {/* <input type="tel" id="driversContact" name="driversContact" placeholder="Enter Driver's Mobile No." value={formData.driversContact} onChange={handleChange} required/><br /> */}
    <label htmlFor="loadType">LOAD TYPE :</label>
    <select id="loadType" name="loadType" value={formData.loadType} onChange={handleChange}>
        <option value="Full">Full Load</option>
        <option value="Part">Part Load</option>
        <option value="Special Vehicle">Special Vehicle</option>
    </select><br />
</div>
<div className="freight-details">
                <label htmlFor="freight-details">FREIGHT DETAILS </label><br />
                <label htmlFor="invoiceValue">INVOICE VALUE :</label>
                <select id="invoiceValue" name="invoiceValue" value={formData.invoiceValue} onChange={handleChange}>
                    <option value="inv">As Per Invoice</option>
                    <option value="Paid">As Per Challan</option>
                </select>
                {/* <input type="text" id="value" name="value" value={formData.value} onChange={handleChange} placeholder="Enter Value" /><br /> */}
                <label htmlFor="paymentMode">PAYMENT MODE :</label>
                <select id="paymentMode" name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
                    <option value="TBB">TBB</option>
                    <option value="Paid">Paid</option>
                    <option value="To Pay">To Pay</option>
                </select><br />
                <label htmlFor="billingBranch">BILLING BRANCH :</label>
                <select id="billingBranch" name="billingBranch" value={formData.billingBranch} onChange={handleChange}>
                    <option value="Kolhapur">Kolhapur</option>
                    <option value="Pune">Pune</option>
                    <option value="Dharwad">Dharwad</option>
                </select><br />
                <label htmlFor="collectionType">COLLECTION TYPE :</label>
                <select id="collectionType" name="collectionType" value={formData.collectionType} onChange={handleChange}>
                    <option value="DC">Direct Collection</option>
                    <option value="VC">Vehicle Collection</option>
                </select><br />
                <label htmlFor="deliveryType">DELIVERY TYPE :</label>
                <select id="deliveryType" name="deliveryType" value={formData.deliveryType} onChange={handleChange}>
                    <option value="DD">Direct Delivery</option>
                    <option value="VD">Vehicle Delivery</option>
                </select><br />
            </div>
                </div>

                <div className="customer-details">
                    <label htmlFor="company-details">CUSTOMER DETAILS</label><br />
                    
                    {/* Creatable for Consignor */}
                    <label htmlFor="consignor">CONSIGNOR :</label>
                    <Creatable
                        id="consignor"
                        name="consignor"
                        options={consignors.map(c => ({ value: c, label: c }))}
                        onChange={handleConsignorChange}
                        value={formData.consignor ? { value: formData.consignor, label: formData.consignor } : null}
                        placeholder="Enter Sender Company Name"
                        isClearable
                        required
                    /><br />

                    {/* Creatable for Consignee */}
                    <label htmlFor="consignee">CONSIGNEE :</label>
                    <Creatable
                        id="consignee"
                        name="consignee"
                        options={consignees.map(c => ({ value: c, label: c }))}
                        onChange={handleConsigneeChange}
                        value={formData.consignee ? { value: formData.consignee, label: formData.consignee } : null}
                        placeholder="Enter Receiving Company Name"
                        isClearable
                        required
                    /><br />

                    {/* Creatable for Freight Payable Company */}
                    <label htmlFor="freightPayableCompany">Freight Payable Company :</label>
                    <Creatable
                        id="freightPayableCompany"
                        name="freightPayableCompany"
                        options={freightCompanies.map(c => ({ value: c, label: c }))}
                        onChange={handleFreightPayableCompanyChange}
                        value={formData.freightPayableCompany ? { value: formData.freightPayableCompany, label: formData.freightPayableCompany } : null}
                        placeholder="Enter Freight Payable Company Name"
                        isClearable
                        required
                    /><br />
                </div>

<div className='box3'>
                <div className="material-details">
                    <label htmlFor="load-details">MATERIAL DETAILS</label><br />
                   
                <label htmlFor="itemType">ITEM TYPE :</label>
                <select id="itemType" name="itemType" value={formData.itemType} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Box">Box</option>
                    <option value="Pallete">Pallete</option>
                </select><br />
                    <label htmlFor="description">DESCRIPTION :</label>
                    <input type="text" id="description" name="description" placeholder="Enter Material Name" value={formData.description} onChange={handleChange} />
                    <label htmlFor="invoiceNumber">INVOICE NUMBER :</label>
                    <input type="text" id="invoiceNumber" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} />
                    <label htmlFor="quantity">QUANTITY :</label>
                    <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                    <label htmlFor="unit">UNIT :</label>
                    <select id="unit" name="unit" value={formData.unit} onChange={handleChange}>
                        <option value="NOS">NOS</option>
                        <option value="UOM">UOM</option>
                        <option value="KGS">KGS</option>
                    </select>
                    <label htmlFor="EwayBillNo">EWAYBILL NUMBER :</label>
                    <input type="text" id="EwayBillNo" name="EwayBillNo" value={formData.EwayBillNo} onChange={handleChange} />
                    <label htmlFor="expiryDate">DATE OF EXPIRATION OF EWAYBILL :</label>
                    <input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} /><br />
                    <label htmlFor="rate">RATE :</label>
                    <input type="text" id="rate" name="rate" value={formData.rate} onChange={handleChange} />
                    <label htmlFor="actualWeight">ACTUAL WEIGHT :</label>
                    <input type="text" id="actualWeight" name="actualWeight" value={formData.actualWeight} onChange={handleChange} />
                    <label htmlFor="chargeableWeight">CHARGEBAL WEIGHT :</label>
                    <input type="text" id="chargeableWeight" name="chargeableWeight" value={formData.chargeableWeight} onChange={handleChange} />
                    <button type="button" onClick={handleAddRow}>Add</button>
                </div>

                <div className="freight-charges">
                    <label htmlFor="freight">FREIGHT CHARGES</label><br />
                    <label htmlFor="freight">Freight:</label>
                    <input
                        type="text"
                        id="freight"
                        name="freight"
                        value={formData.freight}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="surCharges">Sur. Charges:</label>
                    <input
                        type="text"
                        id="surCharges"
                        name="surCharges"
                        value={formData.surCharges}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="stasticalCharges">Stastical Charges:</label>
                    <input
                        type="text"
                        id="stasticalCharges"
                        name="stasticalCharges"
                        value={formData.stasticalCharges}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="hamali">Hamali:</label>
                    <input
                        type="text"
                        id="hamali"
                        name="hamali"
                        value={formData.hamali}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="dcCharges">DC Charges:</label>
                    <input
                        type="text"
                        id="dcCharges"
                        name="dcCharges"
                        value={formData.dcCharges}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="ddCharges">DD Charges:</label>
                    <input
                        type="text"
                        id="ddCharges"
                        name="ddCharges"
                        value={formData.ddCharges}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="holting">Holting:</label>
                    <input
                        type="text"
                        id="holting"
                        name="holting"
                        value={formData.holting}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="other">Other:</label>
                    <input
                        type="text"
                        id="other"
                        name="other"
                        value={formData.other}
                        onChange={handleChange}
                    /><br />
                    <label htmlFor="total">Total:</label>
                    <input
                        type="text"
                        name="totalAmount"
                        value={formData.totalAmount}
                        readOnly
                    /><br />
                    <label htmlFor="totalAmount">TOTAL AMOUNT IN FIGURES:</label>
                    <input
                         type="text"
                         id="totalAmount"
                         name="totalAmount"
                         value={formData.totalAmountInWords}
                         readOnly
                    />
                </div>
                </div>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>DESCRIPTION</th>
                            <th>INVOICE NUMBER</th>
                            <th>QUANTITY</th>
                            <th>UNIT</th>
                            <th>EWAYBILL NUMBER</th>
                            <th>EXP. DATE</th>
                            <th>RATE</th>
                            <th>ACTUAL WEIGHT</th>
                            <th>CHARGEBAL WEIGHT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.invoiceNumber}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit}</td>
                                <td>{item.EwayBillNo}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.rate}</td>
                                <td>{item.actualWeight}</td>
                                <td>{item.chargeableWeight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="actions">
                    <input type="button" value="Clear" onClick={() => setFormData({ ...formData, ...initialState })} />
                    <input type="button" value="Submit"  onClick={handleSubmit} />
                    <input type="button" value="Exit" />
                </div>
            </form>
        </div>
    );
};


export default CreateLR;
