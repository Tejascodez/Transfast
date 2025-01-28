import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayoutBranding';
import './Home.css';

// Reusable Grid Item Component
const GridItem = ({ to, iconClass, label, onClick }) => {
  const content = (
    <>
      <i className={iconClass}></i> {label}
    </>
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

const Home = () => {
  const [open, setOpen] = useState(false); // Sidebar state

  // Handle Create LR click
  const handleCreateLR = () => {
    alert('Opening modal to create LR...');
  };

  // Grid items data
  const gridItems = [
    { to: null, iconClass: 'fas fa-file', label: 'Create LR', onClick: handleCreateLR },
    { to: '/createchallan', iconClass: 'fas fa-clipboard-list', label: 'Create Challan' },
    { to: '/expiring', iconClass: 'fas fa-list-alt', label: 'Expiring Lorry Bills' },
    { to: '/pendinglrs', iconClass: 'fas fa-list-alt', label: 'Pending LR' },
    { to: '/totallrs', iconClass: 'fas fa-file', label: 'Total LR' },
    { to: '/rt', iconClass: 'fas fa-truck', label: 'Rahul Transport' },
    { to: '/pallate', iconClass: 'fas fa-box', label: 'Pallate' },
    { to: '/vehicle', iconClass: 'fas fa-car', label: 'Vehicles Docs' },
  ];

  return (
    <div>
      <div className="content">
        <div className="grid-container">
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              to={item.to}
              iconClass={item.iconClass}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
