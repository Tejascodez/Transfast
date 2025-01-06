import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFile, FaClipboardList, FaPenSquare, FaListAlt, FaBookReader, FaMoneyBill } from 'react-icons/fa';
import logo from '../../../assets/Logo1.png';
import './Accounts.css';

const Accounts = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const toggleSidebar = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${menuActive ? 'active' : ''}`}>
        <ul className="menulist">
          <li className="logo">
            {/* Conditionally hide logo when sidebar is toggled off */}
            {menuActive && (
              <div className="lg">
                <img src={logo} alt="Logo" />
              </div>
            )}
            <div
              className={`menuToggle ${menuActive ? 'active' : ''}`}
              onClick={toggleSidebar}
            ></div>
          </li>

          {/* Menu Items */}
          {[
            { text: 'HOME', icon: 'fa-home', bg: '#f44336', link: '/home' },
            { text: 'LORRY RECEIPT', icon: 'fa-file-alt', bg: '#ffa117', link: '/lr' },
            { text: 'ACCOUNTS', icon: 'fa-newspaper', bg: '#0fc70f', link: '/accounts' },
            { text: 'CUSTOMERS', icon: 'fa-user-circle', bg: '#2196f3', link: '/customers' },
            { text: 'DOCUMENTS', icon: 'fa-lock', bg: '#b145e9', link: '/documents' },
            { text: 'VEHICLE', icon: 'fa-car', bg: '#e91e63', link: '/vehicle' },
            { text: 'EMPLOYEES', icon: 'fa-users', bg: '#0ec68c', link: '/employees' },
            { text: 'SETTINGS', icon: 'fa-cogs', bg: '#e6f704', link: '/settings' }
          ].map((menuItem, index) => (
            <li
              key={index}
              style={{ '--bg': menuItem.bg }}
              className={activeMenuIndex === index ? 'active' : ''}
              onClick={() => setActiveMenuIndex(index)}
            >
              <Link to={menuItem.link}>
                <div className="icon">
                  <i className={`fas ${menuItem.icon}`}></i>
                </div>
                <div className="text">{menuItem.text}</div>
              </Link>
            </li>
          ))}

          <div className="bottom">
            <li style={{ '--bg': '#333' }}>
              <a href="#">
                <div className="icon">
                  <div className="imgBx"></div>
                </div>
                <div className="text">Sanjeet</div>
              </a>
            </li>
            <li style={{ '--bg': '#333' }}>
              <a href="#">
                <div className="icon">
                  <ion-icon name="log-out-sharp"></ion-icon>
                </div>
                <div className="text">LOGOUT</div>
              </a>
            </li>
          </div>
        </ul>
      </div>

      {/* Navbar */}
      <nav>
        <div className="navbar">
          <ol>
            <Link to={'./email'}>
              <label htmlFor="tap1">EMAIL</label>
            </Link>
            <label htmlFor="tap2">TRACKING</label>
            <label htmlFor="tap3">REPORTS</label>
            <label htmlFor="tap4">REQUESTS</label>
            <label htmlFor="tap5">MODIFICATIONS</label>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="grid-container">
          {/* Create Bill */}
          <div className="grid-item-lr">
            <Link to="/createbill">
              <FaFile /> CREATE BILL
            </Link>
          </div>
          {/* View All Bills */}
          <Link to="/totalbills" className="grid-item-lr">
            <FaClipboardList /> View ALL BILLS
          </Link>
          {/* Payment Entries */}
          <Link to="/expiring" className="grid-item-lr">
            <FaPenSquare /> PAYMENT ENTRIES
          </Link>
          {/* POS */}
          <Link to="/pos" className="grid-item-lr">
            <FaListAlt /> P.O.S
          </Link>
          {/* Daily Entries */}
          <Link to="/products" className="grid-item-lr">
            <FaBookReader /> DAILY ENTRIES
          </Link>
          {/* Eway Bills */}
          <Link to="/" className="grid-item-lr">
            <FaMoneyBill /> Eway Bills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
