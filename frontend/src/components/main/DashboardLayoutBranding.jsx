import React, { useState } from 'react';
import { FaHome, FaTruck, FaUsers, FaFileAlt, FaCar, FaCogs, FaPaperPlane, FaSearch } from 'react-icons/fa';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './Sidebar.css';
import Logo from '../../assets/tc.jpg';
import Accounts from '../pages/accounts/Accounts';
import LR from '../pages/LR/LR';
import Customer from '../pages/customers/Customers';
import Vehicles from '../pages/D&V/Vehicles';
import CreateLR from '../pages/LR/CreateLR';
import Pending from '../pages/Pending';
import TotalLR from '../pages/TotalLR';
import EmailSender from '../pages/customers/EmailSender';
import Tracking from '../fuels/Tracking';
import Fuels from '../fuels/Fuels';
import ReceiptDetail from '../pages/Reciepts/ReceiptDetail';



const NAVIGATION = [
  { text: 'HOME', icon: <FaHome />, link: '/home' },
  { text: 'LORRY RECEIPT', icon: <FaTruck />, link: '/lr' },
  { text: 'ACCOUNTS', icon: <FaUsers />, link: '/accounts' },
  { text: 'CUSTOMERS', icon: <FaUsers />, link: '/customers' },
  { text: 'DOCUMENTS', icon: <FaFileAlt />, link: '/documents' },
  { text: 'VEHICLE', icon: <FaCar />, link: '/vehicle' },
  { text: 'EMPLOYEES', icon: <FaUsers />, link: '/employees' },
  { text: 'SETTINGS', icon: <FaCogs />, link: '/settings' },
];

function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="dashboard-layout-lr">
      {/* Navbar Section */}
      <div className="home-navbar-lr">
        <button className="logo-button-lr" onClick={toggleDrawer}>
          <img src={Logo} alt="Logo" className="logo-lr" />
        </button>
        <div className="nav-links-lr">
          <Link to="/email" className="nav-link-lr">
            <FaPaperPlane /> Email
          </Link>
          <Link to="/tracking" className="nav-link-lr">
            <FaSearch /> Tracking
          </Link>
          <Link to="/reports" className="nav-link-lr">
            <FaFileAlt /> Reports
          </Link>
          <Link to="/requests" className="nav-link-lr">
            <FaSearch /> Requests
          </Link>
          <Link to="/settings" className="nav-link-lr">
            <FaCogs /> Settings
          </Link>
        </div>
      </div>

      {/* Sidebar Section */}
      <aside className={`sidebar-lr ${open ? 'open-lr' : ''}`}>
        <ul className="sidebar-list-lr">
          {NAVIGATION.map((item, index) => (
            <li key={index} className="sidebar-item-lr">
              <Link to={item.link} className="sidebar-link-lr">
                {item.icon}
                {open && <span className="sidebar-text-lr">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Section */}
      <main className={`main-content-lr ${open ? 'sidebar-open-lr' : ''}`}>
          <Routes>
          <Route path='/home' element={ <Home/>} />
          <Route path='/accounts' element={<Accounts/>}/>
          <Route path='/lr' element={<LR/>}/>
          <Route path='/customers' element={<Customer/>}/>
          <Route path='/vehicle' element={<Vehicles/>}/>
          <Route path='/createLR' element={<CreateLR/>}/>
          <Route path='/pendinglrs' element={<Pending/>}/>
          <Route path='/totallrs' element={<TotalLR/>}/>       
          <Route path='/email' element={<EmailSender/>} />
          <Route path = '/tracking' element={<Tracking/>}/>
          <Route path="/receipt-detail/:id" element={<ReceiptDetail />} />
          <Route path="/fuels" element={<Fuels />} />


          </Routes>
      </main>
    </div>
  );
}

export default DashboardLayout;