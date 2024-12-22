
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFile, FaClipboardList, FaListAlt, FaTruck, FaBox, FaCar, FaClock, FaListUl, FaLifeRing, FaProductHunt, FaUserAstronaut, FaMoneyBill } from 'react-icons/fa';
import './LR.css'

const LR = ( ) => {
  return (
    <>
    <Navbar/>
     <br />
     <br />
    <div className="grid-container-lr">
      <div className="grid-item-lr">
        <Link to="/CreateLR">
        <FaFile />Create NewLR
        </Link>
      </div>
      <Link to="/createchallan" className="grid-item-lr">
        <FaClipboardList /> All LR's
      </Link>
      <Link to="/expiring" className="grid-item-lr">
        <FaClock /> Pending LR's
      </Link>
      <Link to="/billdedlrs" className="grid-item-lr">
        <FaListAlt /> Billed LR's
      </Link>
      <Link to="/unbilled" className="grid-item-lr">
        <FaLifeRing /> Unbilled LR's
      </Link>
      <Link to="/products" className="grid-item-lr">
        <FaProductHunt /> Products
      </Link>
      <Link to="/customers" className="grid-item-lr">
        <FaUserAstronaut /> Customers
      </Link>
      <Link to="/vechicle" className="grid-item-lr-v">
        <FaCar/> Vehicles&Drivers
      </Link>
      <Link to="/" className="grid-item-lr">
        <FaMoneyBill /> Eway Bills
      </Link>
    </div>
    </>
  );
};

export default LR;
