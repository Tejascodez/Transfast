
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFile, FaClipboardList, FaListAlt, FaProductHunt, FaMoneyBill, FaPenSquare, FaPagelines, FaBookReader } from 'react-icons/fa';
import Navbar from '../../main/Navbar'; 
import './Accounts.css'

const Accounts = ( ) => {
  return (
    <>
    <Navbar/>
     <br />
     <br />
    <div className="grid-container-Accounts">
      <div className="grid-item-Accounts">
        <Link to="/createbill">
        <FaFile />CREATE BILL
        </Link>
      </div>
      <Link to="/createchallan" className="grid-item-Accounts">
        <FaClipboardList />  View ALL BILLS
      </Link>
      <Link to="/expiring" className="grid-item-Accounts">
        <FaPenSquare />        PAYMENT ENTRIES
      </Link>
      <Link to="/pos" className="grid-item-Accounts">
        <FaListAlt /> P.O.S
      </Link>
    
      <Link to="/products" className="grid-item-Accounts">
        <FaBookReader /> DAILY ENTREIS
      </Link>
      {/* <Link to="/customers" className="grid-item-Accounts">
        <FaUserAstronaut /> Customers
      </Link>
      <Link to="/vechicle" className="grid-item-Accounts-v">
        <FaCar/> Vehicles&Drivers
      </Link> */}
      <Link to="/" className="grid-item-Accounts">
        <FaMoneyBill /> Eway Bills
      </Link>
    </div>
    </>
  );
};

export default Accounts;
