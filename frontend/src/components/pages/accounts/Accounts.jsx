import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFile, 
  FaClipboardList, 
  FaPenSquare, 
  FaBookReader, 
  FaLifeRing,
  FaBox,
  FaFileAlt 
} from 'react-icons/fa';
import './Accounts.css';

const Accounts = () => {
  // Reusable GridItem Component
  const GridItem = ({ to, icon: Icon, label, onClick }) => {
    const content = (
      <div className="grid-content">
        <Icon className="grid-icon" aria-hidden="true" />
        <span className="grid-label">{label}</span>
      </div>
    );

    return to ? (
      <Link to={to} className="grid-item">
        {content}
      </Link>
    ) : (
      <div className="grid-item" onClick={onClick}>
        {content}
      </div>
    );
  };

  // Grid Items Data
  const gridItems = [
    { to: '/createbill', icon: FaFile, label: 'Create Bill' },
    { to: '/totalbills', icon: FaClipboardList, label: 'View ALL BILLS' },
    { to: '/expiring', icon: FaPenSquare, label: 'Pending LR' },
    { to: '/totallrs', icon: FaFileAlt, label: 'Total LR' },
    { to: '/billdedlrs', icon: FaLifeRing, label: 'Rahul Transport' },
    { to: '/unbilledlrs', icon: FaBox, label: 'Unbilled LR' },
    { to: '/dailyentries', icon: FaBookReader, label: 'Daily Entries' },
  ];

  return (
    <div className="accounts-container">
      <div className="content">
        <div className="grid-container">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
