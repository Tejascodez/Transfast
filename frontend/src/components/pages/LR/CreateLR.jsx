import React, { useState, useEffect } from 'react';
import '../css/lrstyle.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
import ReactSearchBox from 'react-search-box';
import { useNavigate } from 'react-router-dom';
import CustomDropDown from './CustomDropDown';
import VehicleDetailsForm from './VehiclesDetailsForm';
import Select from 'react-select';

const CreateLR = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [increment, setIncrement] = useState('');
    const [rows, tableRows] = useState([]);
    const [consignors, setConsignors] = useState([]);
    const [consignees, setConsignees] = useState([]);
    const [freightCompanies, setFreightCompanies] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        lrNumber: '',
        lrDate: '',
        from: '',
        to: '',
        vehicleNumber: '',
        lorryNumber: '',
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
        EwayNum: '',
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
        total: ''
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch data from the lorryReceipts endpoint
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/lorryReceipts');
                const data = response.data;

                // Assuming your data structure, extract consignors, consignees, and freight companies
                const consignors = [...new Set(data.map(item => item.consignor))];
                const consignees = [...new Set(data.map(item => item.consignee))];
                const freightCompanies = [...new Set(data.map(item => item.freightPayableCompany))];

                setConsignors(consignors.map(consignor => ({ label: consignor, value: consignor })));
                setConsignees(consignees.map(consignee => ({ label: consignee, value: consignee })));
                setFreightCompanies(freightCompanies.map(company => ({ label: company, value: company })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddRow = () => {
        const newItem = {
            description: formData.description,
            invoiceNumber: formData.invoiceNumber,
            quantity: formData.quantity,
            unit: formData.unit,
            EwayNum: formData.EwayNum,
            expdate: formData.expdate,
            rate: formData.rate,
            actualWeight: formData.actualWeight,
            chargeableWeight: formData.chargeableWeight
        };

        setItems([...items, newItem]);

        // Optionally reset fields after adding the row
        setFormData({
            ...formData,
            description: '',
            invoiceNumber: '',
            quantity: '',
            unit: 'Nos',
            EwayNum: '',
            rate: '',
            actualWeight: '',
            chargeableWeight: ''
        });
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
                console.log('Lorry Receipt data stored successfully.', dataToSubmit);
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

    const handleClear = () => {
        setFormData({
            lrNumber: '',
            lrDate: '',
            from: '',
            to: '',
            vehicleNumber: '',
            lorryNumber: '',
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
            EwayNum: '',
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
            total: ''
        });
        setItems([]);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
    };

    const handleConsignorChange = (selectedOption) => {
        setFormData({
            ...formData,
            consignor: selectedOption ? selectedOption.value : ''
        });
    };

    const handleConsigneeChange = (selectedOption) => {
        setFormData({
            ...formData,
            consignee: selectedOption ? selectedOption.value : ''
        });
    };

    const handleFreightPayableCompanyChange = (selectedOption) => {
        setFormData({
            ...formData,
            freightPayableCompany: selectedOption ? selectedOption.value : ''
        });
    };

    const filteredReceipts = receipts.filter(receipt =>
        Object.values(receipt).some(value =>
            value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );



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
                  <VehicleDetailsForm/>
                </div>
                  <div className="customer-details">
        <label htmlFor="company-details">CUSTOMER DETAILS</label><br />
        <label htmlFor="consignor">CONSIGNOR :</label>
                    <Select
                        id="consignor"
                        name="consignor"
                        options={consignors.map(c => ({ value: c.id, label: c.name }))}
                        onChange={handleConsignorChange}
                        value={consignors.find(c => c.id === formData.consignor)}
                        placeholder="Enter Sender Company Name"
                        required
                    /><br />
                    <label htmlFor="consignee">CONSIGNEE :</label>
                    <Select
                        id="consignee"
                        name="consignee"
                        options={consignees.map(c => ({ value: c.id, label: c.name }))}
                        onChange={handleConsigneeChange}
                        value={consignees.find(c => c.id === formData.consignee)}
                        placeholder="Enter Receiving Company Name"
                        required
                    /><br />
                    <label htmlFor="freightPayableCompany">Freight Payable Company :</label>
                    <Select
                        id="freightPayableCompany"
                        name="freightPayableCompany"
                        options={freightCompanies.map(c => ({ value: c.id, label: c.name }))}
                        onChange={handleFreightPayableCompanyChange}
                        value={freightCompanies.find(c => c.id === formData.freightPayableCompany)}
                        placeholder="Enter Freight Payable Company Name"
                        required
                    /><br />

      
       
      
      </div>
      

                <div className="material-details">
                    <label htmlFor="load-details">MATERIAL DETAILS</label><br />
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
                    <label htmlFor="EwayNum">EWAYBILL NUMBER :</label>
                    <input type="text" id="EwayNum" name="EwayNum" value={formData.EwayNum} onChange={handleChange} />
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
          <label htmlFor="stasticalCharges">Statistical Charges:</label>
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
            name="total"
            value={formData.total}
            onChange={handleChange}
          /><br />
          <label htmlFor="totalAmount">TOTAL AMOUNT IN FIGURES:</label>
          <input
            type="text"
            id="totalAmount"
            name="totalAmount"
            placeholder="Enter Total Amount"
            value={formData.totalAmount}
            onChange={handleChange}
          />
        </div>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>DESCRIPTION</th>
                            <th>INVOICE NUMBER</th>
                            <th>QUANTITY</th>
                            <th>UNIT</th>
                            <th>EWAYBILL NUMBER</th>
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
                                <td>{item.EwayNum}</td>
                                <td>{item.rate}</td>
                                <td>{item.actualWeight}</td>
                                <td>{item.chargeableWeight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <div className="actions">
                    <input type="button" value="Clear" onClick={handleClear} />
                    <input type="button" value="Sumbit" onClick={handleSubmit} />
                    <input type="button" value="Exit" />
                </div>
            </form>

            <div className="receipt-list">
                <h2>Search Results</h2>
                {filteredReceipts.length > 0 ? (
                    <ul>
                        {filteredReceipts.map(receipt => (
                            <li key={receipt.lrNumber}>
                                <p>{receipt.consignor} - {receipt.consignee} - {receipt.lorryNumber}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No matching receipts found.</p>
                )}
            </div>
        </div>
    );
};

export default CreateLR;
