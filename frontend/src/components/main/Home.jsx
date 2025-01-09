import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo1.png';
import './Home.css';
import Sidebar from './Sidebar';

const Home = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const toggleSidebar = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
  <Sidebar/>
   
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
