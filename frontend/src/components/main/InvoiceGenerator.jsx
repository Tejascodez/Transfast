import React, { useState, useEffect } from 'react';
// import { styled-components } from 'styled-components';

const InvoiceGenerator = () => {
  // State to store the invoice number
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // Function to calculate the financial year (April to March)
  const getFinancialYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed
    const currentYear = currentDate.getFullYear();
    let startYear, endYear;

    if (currentMonth >= 4) {
      startYear = currentYear;
      endYear = currentYear + 1;
    } else {
      startYear = currentYear - 1;
      endYear = currentYear;
    }

    return `${startYear}${String(endYear).slice(-2)}`; // Format 2024-25
  };

  // Function to generate the next invoice number
  const generateInvoiceNumber = () => {
    // Get financial year
    const financialYear = getFinancialYear();
    const prefix = `TC${financialYear}`;

    // Retrieve the last invoice number from localStorage (or initialize to 0)
    const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber') 
      ? parseInt(localStorage.getItem('lastInvoiceNumber').replace(prefix, '')) 
      : 0;

    // Increment the invoice number
    const newInvoiceNumber = lastInvoiceNumber + 1;

    // Format the invoice number (pad with zeros to 4 digits)
    const formattedInvoiceNumber = prefix + String(newInvoiceNumber).padStart(4, '0');

    // Store the new invoice number in localStorage
    localStorage.setItem('lastInvoiceNumber', formattedInvoiceNumber);

    // Update the component's state
    setInvoiceNumber(formattedInvoiceNumber);
  };


  return (
  <>
      <h1>Invoice Generator</h1>
   
        <h2>Invoice Number:</h2>
        <p>{invoiceNumber}</p>

      <button onClick={generateInvoiceNumber}>
        Generate New Invoice
      </button>
    </>
  );
};


export default InvoiceGenerator;
