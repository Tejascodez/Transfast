import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  FaClipboardList, 
  FaFile,
  FaListAlt,
  FaBox,
  FaUserAstronaut,
  FaCar,
  FaMoneyBill,
  FaPlusSquare,
  FaClipboardCheck,
  FaTruckMoving
} from 'react-icons/fa';
import './LR.css';

const GridItem = ({ to, icon: Icon, label, onClick }) => {
  const ariaLabel = `${label} navigation`;
  const content = (
    <div className="grid-content">
      <div className="icon-container" aria-hidden="true">
        <Icon className="grid-icon" />
      </div>
      <span className="grid-label">{label}</span>
    </div>
  );

  return to ? (
    <Link
      to={to}
      className="grid-item"
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
    >
      {content}
    </Link>
  ) : (
    <div
      className="grid-item"
      onClick={onClick}
      role="button"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick?.()}
    >
      {content}
    </div>
  );
};

GridItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const LR = () => {
  const gridItems = [
    { id: 1, to: '/CreateLR', icon: FaPlusSquare, label: 'Create New LR' },
    { id: 2, to: '/totallrs', icon: FaClipboardCheck, label: 'All LR' },
    { id: 3, to: '/pendinglrs', icon: FaClipboardList, label: 'Pending LR' },
    { id: 4, to: '/totallrs', icon: FaFile, label: 'Total LR' },
    { id: 5, to: '/billdedlrs', icon: FaTruckMoving, label: 'Rahul Transport' },
    { id: 6, to: '/unbilledlrs', icon: FaBox, label: 'Unbilled LR' },
    { id: 7, to: '/pos', icon: FaListAlt, label: 'POS' },
    { id: 8, to: '/customers', icon: FaUserAstronaut, label: 'Customers' },
    { id: 9, to: '/vehicle', icon: FaCar, label: 'Vehicles and Drivers' },
    { id: 10, to: '/eway', icon: FaMoneyBill, label: 'Eway Bills' },
  ];

  return (
    <div className="lr-container">
      <div className="content">
        <div className="grid-container">
          {gridItems.map((item) => (
            <GridItem
              key={item.id}
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

export default LR;