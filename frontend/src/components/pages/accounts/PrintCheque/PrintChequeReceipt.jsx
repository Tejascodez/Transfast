import React, { useState } from 'react';
import './PrintCheque.css';

const PrintChequeReceipt = ({ date, payeeName, amountWords, amountNumbers }) => {
    return (
        <div className="icici-cheque">
            <div className="date">{date}</div>
            <div className="payee-name">{payeeName}</div>
            <div className="amount-words">{amountWords}</div>
            <div className="amount-numbers">{amountNumbers}</div>
        </div>
    );
};

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chequeDetails, setChequeDetails] = useState({
      date: '',
      payeeName: '',
      amountWords: '',
      amountNumbers: '',
    });

    return (
        <div>
            <PrintCheque
                date={chequeDetails.date}
                payeeName={chequeDetails.payeeName}
                amountWords={chequeDetails.amountWords}
                amountNumbers={chequeDetails.amountNumbers}
            />
        </div>
    );
};

export default PrintChequeReceipt;
