import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PrintLr from './components/pages/Reciepts/PrintLr';
import CreateLR from './components/pages/LR/CreateLR';

// Create the context
export const LrContext = createContext();

// Create a provider component
export const LrProvider = ({ children }) => {
 const [lrData, setLrData] = useState({
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
  expdate: '',
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

  // Function to fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await axios.get('http://localhost:5000/api/lorryReceipts/latest');
        
        // Assuming the response data structure matches the lrData shape
        setLrData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <LrContext.Provider value={{ lrData, setLrData }}>
      {<CreateLR />}
    </LrContext.Provider>
  );
};
