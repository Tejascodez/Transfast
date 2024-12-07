import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the bars icon
import logo from '../../assets/Logo1.png'
import './home.css';
const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <div className="toggle-bar" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className="navbar-options">
          <li>Home</li>
          <li>Email</li>
          <li>Daily Entries</li>
          <li>Modification</li>
          <li>Tracking</li>
          <li>Reports</li>
          <li>Requests</li>
          <li className="user-logo" aria-placeholder={logo}></li> {/* Placeholder for user logo */}
        </ul>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isToggled ? 'active' : ''}`}>
        <ul className="sidebar-options">
          {['Dashboard', 'Accounts', 'LR', 'Vehicles', 'Drivers', 'Settings'].map(item => (
            <li key={item}>{item}</li>
          ))}
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
