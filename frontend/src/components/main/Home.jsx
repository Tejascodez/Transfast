import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaFile, FaTruck, FaListAlt, FaCar, FaBox, FaClipboardList, FaToolbox } from 'react-icons/fa'; // Import specific icons
import Navbar from './Navbar'; // Import the Navbar component

import './Home.css'; // Optional: Create a CSS file for Home component styles

const Home = () => {
  
  return (
    <div className='container'>
      <Navbar />
      <div className="content">
        <h1>TransFast Corparation</h1>
        <div className="grid-container">
          <Link to='/createlr' className="grid-item">
            <FaFile /> Create LR
          </Link>
          <Link to='/createchallan' className="grid-item">
            <FaClipboardList /> Create Challan
          </Link>
          <Link to='/expiring' className="grid-item">
            <FaListAlt /> Expiring Lorry Bills
          </Link>
          <Link to='/pending' className="grid-item">
            <FaListAlt /> Pending LR
          </Link>
          <Link to='/total' className="grid-item">
            <FaFile /> Total LR
          </Link>
          <Link to='/rt' className="grid-item">
            <FaTruck /> Rahul Transport
          </Link>
          <Link to='/pallate' className="grid-item">
            <FaBox /> Pallate
          </Link>
          <Link to='/vechicle' className="grid-item">
            <FaCar /> Vehicles Docs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
