import React, { useState } from "react";
import Modal from "react-modal";
import "../accounts/DailyEntries.css";

const DailyEntries = () => {
  const [transactions, setTransactions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const currentBalance = 1000; // Placeholder balance, adjust as needed

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setCurrentTransaction(null);
    setDate("");
    setDescription("");
    setAmount("");
    setType("");
    setModalIsOpen(false);
  };

  const handleTransaction = (transaction) => {
    if (currentTransaction) {
      // Update existing transaction logic
      setTransactions(transactions.map((t) =>
        t === currentTransaction ? transaction : t
      ));
    } else {
      // Add new transaction logic
      setTransactions([...transactions, transaction]);
    }
    closeModal();
  };

  const handleSubmit = () => {
    const transaction = {
      date,
      description,
      amount: parseFloat(amount),
      type,
      balance: calculateBalance(parseFloat(amount), type),
    };
    handleTransaction(transaction);
  };

  const calculateBalance = (amount, type) => {
    return type === "Credit"
      ? currentBalance + amount
      : currentBalance - amount;
  };

  const editTransaction = (index) => {
    const transaction = transactions[index];
    setCurrentTransaction(transaction);
    setDate(transaction.date);
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setType(transaction.type);
    openModal();
  };

  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div>
     <div className="hed">   
    <div className="form-row">
        <h2>Daily Entries</h2>
      <button onClick={openModal}>Add Transaction</button>
    </div>
    </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Transaction Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="form-row">
          <h2>{currentTransaction ? "Edit Transaction" : "Add Transaction"}</h2>
          <button onClick={closeModal}>Close</button>
        </div>
        <div className="form-row">
          <label htmlFor="date">Voucher No.:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSubmit}>
          {currentTransaction ? "Update Transaction" : "Add Transaction"}
        </button>
      </Modal>
      <table className="accountancy-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.balance}</td>
              <td>
                <button onClick={() => editTransaction(index)}>Edit</button>
                <button onClick={() => deleteTransaction(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyEntries;
