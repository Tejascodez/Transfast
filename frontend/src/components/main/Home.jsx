import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './Home.css';

const Home = () => {
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

      {/* Navbar */}
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
        <div className="grid-container">
          {/* Create LR */}
          <div className="grid-item" onClick={() => alert('Opening modal to create LR...')}>
            <i className="fas fa-file"></i> Create LR
          </div>

          {/* Create Challan */}
          <Link to="/createchallan" className="grid-item">
            <i className="fas fa-clipboard-list"></i> Create Challan
          </Link>

          {/* Expiring Lorry Bills */}
          <Link to="/expiring" className="grid-item">
            <i className="fas fa-list-alt"></i> Expiring Lorry Bills
          </Link>

          {/* Pending LR */}
          <Link to="/pendinglrs" className="grid-item">
            <i className="fas fa-list-alt"></i> Pending LR
          </Link>

          {/* Total LR */}
          <Link to="/totallrs" className="grid-item">
            <i className="fas fa-file"></i> Total LR
          </Link>

          {/* Rahul Transport */}
          <Link to="/rt" className="grid-item">
            <i className="fas fa-truck"></i> Rahul Transport
          </Link>

          {/* Pallate */}
          <Link to="/pallate" className="grid-item">
            <i className="fas fa-box"></i> Pallate
          </Link>

          {/* Vehicle Docs */}
          <Link to="/vehicle" className="grid-item">
            <i className="fas fa-car"></i> Vehicles Docs
          </Link>
        </div>
      </div>

      {/* Ionicons Scripts */}
    </div>
  );
};

export default Home;
