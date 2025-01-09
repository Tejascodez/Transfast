import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './Sidebar.css';

const Sidebar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const toggleSidebar = () => {
    setMenuActive(!menuActive);
  };

  const menuItems = [
    { text: 'HOME', icon: 'fa-home', bg: '#f44336', link: '/home' },
    { text: 'LORRY RECEIPT', icon: 'fa-file-alt', bg: '#ffa117', link: '/lr' },
    { text: 'ACCOUNTS', icon: 'fa-newspaper', bg: '#0fc70f', link: '/accounts' },
    { text: 'CUSTOMERS', icon: 'fa-user-circle', bg: '#2196f3', link: '/customers' },
    { text: 'DOCUMENTS', icon: 'fa-lock', bg: '#b145e9', link: '/documents' },
    { text: 'VEHICLE', icon: 'fa-car', bg: '#e91e63', link: '/vehicle' },
    { text: 'EMPLOYEES', icon: 'fa-users', bg: '#0ec68c', link: '/employees' },
    { text: 'SETTINGS', icon: 'fa-cogs', bg: '#e6f704', link: '/settings' },
  ];

  return (
    <div className={`sidebar ${menuActive ? 'active' : ''}`}>
      <ul>
        <li className="logo">
          <Link to="/home">
            {menuActive && (
              <div className="lg">
                <img src={logo} alt="Logo" />
              </div>
            )}
            <div
              className={`menuToggle ${menuActive ? 'active' : ''}`}
              onClick={toggleSidebar}
            ></div>
          </Link>
        </li>
        {menuItems.map((menuItem, index) => (
          <li
            key={index}
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
          <li>
            <a href="#">
              <div className="icon">
                <div className="imgBx"></div>
              </div>
              <div className="text">Sanjeet</div>
            </a>
          </li>
          <li>
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
  );
};

export default Sidebar;
