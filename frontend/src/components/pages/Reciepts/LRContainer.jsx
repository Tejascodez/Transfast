// src/components/LrContainer.jsx
import React, { useState } from 'react';
import CreateLr from '../CreateLR';
import PrintLr from './PrintLr';

const LrContainer = () => {
  const [lrData, setLrData] = useState(null);

  const handleLrSubmit = (data) => {
    setLrData(data);
  };

  return (
    <div>
      <CreateLr onSubmit={handleLrSubmit} />
      {lrData && <PrintLr lrData={lrData} />}
    </div>
  );
};

export default LrContainer;
