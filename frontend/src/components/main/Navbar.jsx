import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the bars icon
import logo from '../../assets/Logo1.png'
import './home.css';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
  };
const navigate = useNavigate(); 
  const handleClick = (path) =>{
    navigate(path);
    if(path === '/dashboard'){
      window.location.reload();
    }

  }
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
          {
          [{name:'Dashboard', path: '/dashboard'},
            {name:'LR', path: '/lr'},
            {name:'Accounts', path: '/accounts'},
            {name:'Customers', path: '/customers'},
            {name:'Vehicle', path: '/vehicle'},
            {name:'Drivers', path: '/drivers'},
            {name:'Cheque Printing', path: '/cp'},
            {name:'Company Docs', path: '/cd'},
            {name: 'Quotation', path: '/quatation'},
            {name:'Settings', path: '/settings'},
          ].map(item => (
            <li key={item.name} onClick={()=>handleClick(item.path)}>{item.name}</li>
          ))}
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
