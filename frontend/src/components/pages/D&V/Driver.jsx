import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const Driver = () => {
  const [showModal, setShowModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [driverData, setDriverData] = useState({
    vehicleNumber: '',
    driverName: '',
    driverNumber: '',
    vehicleDocs: [{ docName: '', docURL: '' }]
  });

  // Fetch drivers from the backend
  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/drivers'); // Replace with your API endpoint
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers(); // Fetch drivers on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'docName' || name === 'docURL') {
      const updatedDocs = [...driverData.vehicleDocs];
      updatedDocs[0][name] = value; // Assuming only one document for simplicity
      setDriverData({ ...driverData, vehicleDocs: updatedDocs });
    } else {
      setDriverData({
        ...driverData,
        [name]: value
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/drivers', driverData); // Post request to add driver
      fetchDrivers(); // Re-fetch drivers to update the table
      setDriverData({ vehicleNumber: '', driverName: '', driverNumber: '', vehicleDocs: [{ docName: '', docURL: '' }] });
      setShowModal(false); // Close modal after submission
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Driver
      </Button>

      {/* Modal to add a driver */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Vehicle Number</label>
              <input
                type="text"
                className="form-control"
                name="vehicleNumber"
                value={driverData.vehicleNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Driver Name</label>
              <input
                type="text"
                className="form-control"
                name="driverName"
                value={driverData.driverName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Driver Number</label>
              <input
                type="text"
                className="form-control"
                name="driverNumber"
                value={driverData.driverNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Document Name</label>
              <input
                type="text"
                className="form-control"
                name="docName"
                value={driverData.vehicleDocs[0].docName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Document URL</label>
              <input
                type="text"
                className="form-control"
                name="docURL"
                value={driverData.vehicleDocs[0].docURL}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" variant="success">
              Add Driver
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Table to display the drivers */}
      <h3 className="mt-4">Driver List</h3>
      {Array.isArray(drivers) && drivers.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Driver Name</th>
              <th>Driver Number</th>
              <th>Document Name</th>
              <th>Document URL</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver._id}>
                <td>{driver.vehicleNumber}</td>
                <td>{driver.driverName}</td>
                <td>{driver.driverNumber}</td>
                <td>{driver.vehicleDocs[0]?.docName}</td>
                <td>{driver.vehicleDocs[0]?.docURL}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No drivers found</p>
      )}
    </div>
  );
};

export default Driver;
