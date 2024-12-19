import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFile, FaTruck, FaListAlt, FaCar, FaBox, FaClipboardList } from 'react-icons/fa';
import Navbar from './Navbar';
import CreateLR from '../pages/LR/CreateLR';
import Modal from 'react-modal';
import './Home.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <div className="grid-container">
          <div className="grid-item" onClick={handleOpenModal}>
            <FaFile /> Create LR
          </div>
          <Link to="/createchallan" className="grid-item">
            <FaClipboardList /> Create Challan
          </Link>
          <Link to="/expiring" className="grid-item">
            <FaListAlt /> Expiring Lorry Bills
          </Link>
          <Link to="/pendinglrs" className="grid-item">
            <FaListAlt /> Pending LR
          </Link>
          <Link to="/totallrs" className="grid-item">
            <FaFile /> Total LR
          </Link>
          <Link to="/rt" className="grid-item">
            <FaTruck /> Rahul Transport
          </Link>
          <Link to="/pallate" className="grid-item">
            <FaBox /> Pallate
          </Link>
          <Link to="/vehicle" className="grid-item">
            <FaCar /> Vehicles Docs
          </Link>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            width: '80%',
            borderRadius: '20px',
            height: '80%',
            margin: 'auto',
            padding: '20px',
            overflow: 'auto' // Ensures that the content is scrollable
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <div className="modal-header-lr">
          <h2>Create LR</h2>
          <button className="close-button" onClick={handleCloseModal}>X</button>
        </div>
        <div className="modal-content-lr">
          <CreateLR />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
