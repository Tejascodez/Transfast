import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo1.png'
import { FaFile, FaClipboardList, FaClock, FaListAlt, FaLifeRing, FaListUl, FaUserAstronaut, FaCar, FaMoneyBill } from 'react-icons/fa';
import './LR.css';

const LR = () => {
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
            <a href="/home">
              {menuActive && (
                <div className="lg">
                  <img src={logo} alt="Logo" />
                </div>
              )}
              <div
                className={`menuToggle ${menuActive ? 'active' : ''}`}
                onClick={toggleSidebar}
              ></div>
            </a>
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
              <Link to={menuItem.link} onClick={toggleSidebar}>
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
 <nav>
        <div className="navbar">
          <ol>
            <Link to={'./email'}>
              <label htmlFor="tap1">EMAIL</label>
            </Link>
            <Link to={'./tracking'}>
              <label htmlFor="tap2">TRACKING</label>
            </Link>
            <label htmlFor="tap3">REPORTS</label>
            <label htmlFor="tap4">REQUESTS</label>
            <label htmlFor="tap5">MODIFICATIONS</label>
          </ol>
        </div>
      </nav>
      {/* Main Content */}
      <div className="content">
        <div className="grid-container-lr">
          <div className="grid-item-lr">
            <Link to="/CreateLR">
              <FaFile /> Create New LR
            </Link>
          </div>
          <Link to="/totallrs" className="grid-item-lr">
            <FaClipboardList /> All LR's
          </Link>
          <Link to="/pendinglrs" className="grid-item-lr">
            <FaClock /> Pending LR's
          </Link>
          <Link to="/billdedlrs" className="grid-item-lr">
            <FaListAlt /> Billed LR's
          </Link>
          <Link to="/unbilled" className="grid-item-lr">
            <FaLifeRing /> Unbilled LR's
          </Link>
          <Link to="/pos" className="grid-item-lr">
            <FaListAlt /> POS
          </Link>
          <Link to="/customers" className="grid-item-lr">
            <FaUserAstronaut /> Customers
          </Link>
          <Link to="/vehicle" className="grid-item-lr">
            <FaCar /> Vehicles & Drivers
          </Link>
          <Link to="/" className="grid-item-lr">
            <FaMoneyBill /> Eway Bills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LR;
