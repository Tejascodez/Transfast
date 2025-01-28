import React, { useState } from 'react';
import Sign from '../../../../assets/moms_sign.png';
import { Link } from 'react-router-dom';
import './PrintCheque.css';

// Converts numbers to words
const toWords = (num) => {
  const a = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');

  const hundred = Math.floor(num / 100);
  const rest = num % 100;
  return a[hundred] + ' hundred' + (rest ? ' and ' + toWords(rest) : '');
};

// Capitalizes the first letter of each word
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Main function to format the number in Indian currency format
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

  return ' ₹ ' + parts.join(' ') + ' Only/-';
};

// Format date to dd/mm/yyyy
// Format date to individual characters with spaces
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const formattedDate = `${day}/ ${month} /${year}`;
  
  // Split the formatted date into characters and join with spaces
  return formattedDate.split('').join(' ');
};

// Component to display cheque details
const PrintChequeReceipt = ({ date, payeeName, amountWords, amountNumbers, isAcPayee, hasSignature }) => {
  // Add prefix and suffix here for display purposes
  const formattedAmountNumbers = amountNumbers ? `₹ ${amountNumbers} /-` : '';

  return (
    <div className="icici-cheque">
      <div className="date">{formatDate(date)}</div>
      <div className="payee-name">{payeeName}</div>
      <div className="amount-words">{amountWords}</div>
      <div className="amount-numbers">{formattedAmountNumbers}</div>
      {isAcPayee && <div className="a-c-payee">A/C Payee Only</div>}
      {hasSignature && <div className="signature"><img src={Sign} alt="Signature" /></div>}
    </div>
  );
};


const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('no');
  const [signatureOption, setSignatureOption] = useState('no'); // Manage digital signature selection
  const [chequeDetails, setChequeDetails] = useState({
    date: '',
    payeeName: '',
    amountWords: '',
    amountNumbers: '',
    purpose: '',
    agreement: 'no',
    signature: 'no',
  });

  const [chequeDetailsList, setChequeDetailsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amountNumbers') {
      const numericValue = parseInt(value.replace(/,/g, ''), 10); // Remove commas before parsing
      if (!isNaN(numericValue)) {
        setChequeDetails((prevDetails) => ({
          ...prevDetails,
          amountNumbers: new Intl.NumberFormat('en-IN').format(numericValue), // Add thousand separators
          amountWords: formatIndianCurrency(numericValue),
        }));
      }
    } else {
      setChequeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      if (name === 'agreement') {
        setSelectedOption(value);
      }
      if (name === 'signature') {
        setSignatureOption(value);
      }
    }
  };

  const handleSubmitAndPrint = () => {
    if (!chequeDetails.date || !chequeDetails.payeeName || !chequeDetails.amountNumbers) {
      alert("Please fill in all the fields.");
      return;
    }
  
    // Update the cheque details list
    setChequeDetailsList((prevList) => [
      ...prevList,
      { ...chequeDetails, date: formatDate(chequeDetails.date) }
    ]);
  
    // Close the modal
    setIsOpen(false);
  
    // Delay to ensure the component re-renders with updated data
    setTimeout(() => {
      window.print();
  
      // Reset the form fields after printing
      setChequeDetails({
        date: '',
        payeeName: '',
        amountWords: '',
        amountNumbers: '',
        purpose: '',
        agreement: 'no',
        signature: 'no',
      });
    }, 100); // Adjust the delay as needed
  };
  
  const clearChequeDetails = () => {
    setChequeDetails({
      date: '',
      payeeName: '',
      amountWords: '',
      amountNumbers: '',
      purpose: '',
      agreement: 'no',
      signature: 'no',
    });
  };
  
  

  return (
    <div>
      <button className='btn2' onClick={() => setIsOpen(true)}>Enter Cheque Details</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-row">
            <h2>Enter Cheque Details</h2>
            <button type="button" onClick={() => setIsOpen(false)}>X</button>
            </div>
            <form>
              <label>A/C Payee:</label>
              <div className="form-column">
                <input
                  type="radio"
                  name="agreement"
                  value="yes"
                  checked={selectedOption === 'yes'}
                  onChange={handleChange}
                />
                <label>Yes</label>
                <input
                  type="radio"
                  name="agreement"
                  value="no"
                  checked={selectedOption === 'no'}
                  onChange={handleChange}
                />
                <label>No</label>
              </div>
           
              <div className="form-row">
                <label>Date:</label>
                <input type="date" name="date" value={chequeDetails.date} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Purpose:</label>
                <input type="text" name="purpose" value={chequeDetails.purpose} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Payee Name:</label>
                <input type="text" name="payeeName" value={chequeDetails.payeeName} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Amount in Numbers:</label>
                <input type="text" name="amountNumbers" value={chequeDetails.amountNumbers} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Amount in Figures:</label>
                <input type="text" name="amountWords" value={chequeDetails.amountWords} readOnly />
              </div>
              <div className="form-row">
                <label>Digital Signature:</label>                
              </div>

              <div className="form-column">
                <input
                  type="radio"
                  name="signature"
                  value="yes"
                  checked={signatureOption === 'yes'}
                  onChange={handleChange}
                />
                <label>Yes</label>
                <input
                  type="radio"
                  name="signature"
                  value="no"
                  checked={signatureOption === 'no'}
                  onChange={handleChange}
                />
                <label>No</label>
              </div>
              <div className="form-row">
              <button type="button" onClick={handleSubmitAndPrint}>Submit & Print</button>
              <button type="button" onClick={() => clearChequeDetails()}>Clear</button>
              </div>
              
            </form>
          </div>
        </div>
      )}

      <PrintChequeReceipt
        date={chequeDetails.date}
        payeeName={chequeDetails.payeeName}
        amountWords={chequeDetails.amountWords}
        amountNumbers={chequeDetails.amountNumbers}
        isAcPayee={selectedOption === 'yes'}
        hasSignature={signatureOption === 'yes'}
      />
<br />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>A/C Payee</th>
              <th>Digital Signature</th>
              <th>Purpose</th>
              <th>Payee</th>
              <th>Amount In Numbers</th>
              <th>Amount In Figures</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chequeDetailsList.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.agreement}</td>
                <td>{item.signature}</td>
                <td>{item.purpose}</td>
                <td>{item.payeeName}</td>
                <td>{item.amountNumbers}</td>
                <td>{item.amountWords}</td>
                <td>
                  {/* You can add edit or delete functionality here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
