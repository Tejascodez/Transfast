import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Vehicle.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleNo, setVehicleNo] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerNumber, setOwnerNumber] = useState('');
    const [driverName, setDriverName] = useState('');
    const [driverNumber, setDriverNumber] = useState('');
    const [mutax, setMutax] = useState(null);
    const [roadTax, setRoadTax] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [puc, setPuc] = useState(null);
    const [rc, setRc] = useState(null);
    const [mutaxExpiry, setMutaxExpiry] = useState('');
    const [roadTaxExpiry, setRoadTaxExpiry] = useState('');
    const [insuranceExpiry, setInsuranceExpiry] = useState('');
    const [pucExpiry, setPucExpiry] = useState('');
    const [rcExpiry, setRcExpiry] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [closingModal, setClosingModal] = useState(false);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleCreateOrUpdateVehicle = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('vehicleNo', vehicleNo);
        formData.append('ownerName', ownerName);
        formData.append('ownerNumber', ownerNumber);
        formData.append('driverName', driverName);
        formData.append('driverNumber', driverNumber);
        formData.append('rc', rc);  // Ensure that the correct file is appended
        formData.append('mutax', mutax);
        formData.append('roadTax', roadTax);
        formData.append('insurance', insurance);
        formData.append('puc', puc);
        formData.append('rcExpiry', rcExpiry);
        formData.append('mutaxExpiry', mutaxExpiry);
        formData.append('roadTaxExpiry', roadTaxExpiry);
        formData.append('insuranceExpiry', insuranceExpiry);
        formData.append('pucExpiry', pucExpiry);

        try {
            const response = await axios.post('http://localhost:5000/api/vehicles', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            fetchVehicles();  // Refresh vehicle list after creation
            resetForm();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const resetForm = () => {
        setVehicleNo('');
        setOwnerName('');
        setOwnerNumber('');
        setDriverName('');
        setDriverNumber('');
        setMutax(null);
        setRoadTax(null);
        setInsurance(null);
        setPuc(null);
        setRc(null);
        setMutaxExpiry('');
        setRoadTaxExpiry('');
        setInsuranceExpiry('');
        setPucExpiry('');
        setRcExpiry('');
        setSelectedVehicle(null);
        setShowModal(false);
        setClosingModal(false);
    };

    const handleDeleteVehicle = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleFileChange = (event, setter) => {
        setter(event.target.files[0]);
    };

    const handleDateChange = (event, setter) => {
        setter(event.target.value);
    };

    const handleEditVehicle = (vehicle) => {
        setVehicleNo(vehicle.vehicleNo);
        setOwnerName(vehicle.ownerName);
        setOwnerNumber(vehicle.ownerNumber);
        setDriverName(vehicle.driverName);
        setDriverNumber(vehicle.driverNumber);
        setRc(vehicle.rc);
        setMutax(vehicle.mutax);
        setRoadTax(vehicle.roadTax);
        setInsurance(vehicle.insurance);
        setPuc(vehicle.puc);
        setRcExpiry(vehicle.rcExpiry);
        setMutaxExpiry(vehicle.mutaxExpiry);
        setRoadTaxExpiry(vehicle.roadTaxExpiry);
        setInsuranceExpiry(vehicle.insuranceExpiry);
        setPucExpiry(vehicle.pucExpiry);
        setSelectedVehicle(vehicle);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setClosingModal(true);
    };

    const handleAnimationEnd = () => {
        if (closingModal) {
            setShowModal(false);
            setClosingModal(false);
        }
    };

    return (
        <div className="vehicles-container">
            <h2 className="vehicles-title">Vehicles</h2>
            <button className="vehicles-add-btn" onClick={() => setShowModal(true)}>Add Vehicle</button>

            <div className="vehicles-list">
                <h3 className="vehicles-list-title">Vehicle List</h3>
                {vehicles.length > 0 ? (
                    <div className="vehicles-table-container">
                        <table className="vehicles-table">
                            <thead>
                                <tr>
                                    <th>Vehicle No</th>
                                    <th>Owner Name</th>
                                    <th>Owner Number</th>
                                    <th>Driver Name</th>
                                    <th>Driver Number</th>
                                    <th>RC</th>
                                    <th>Mutax</th>
                                    <th>Road Tax</th>
                                    <th>Insurance</th>
                                    <th>PUC</th>
                                    <th>RC Expiry</th>
                                    <th>Mutax Expiry</th>
                                    <th>Road Tax Expiry</th>
                                    <th>Insurance Expiry</th>
                                    <th>PUC Expiry</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((vehicle) => (
                                    <tr key={vehicle._id}>
                                        <td>{vehicle.vehicleNo}</td>
                                        <td>{vehicle.ownerName}</td>
                                        <td>{vehicle.ownerNumber}</td>
                                        <td>{vehicle.driverName}</td>
                                        <td>{vehicle.driverNumber}</td>
                                        <td>
                                            {vehicle.rc && (
                                                <a href={`http://localhost:5000/${vehicle.rc}`} target="_blank" rel="noopener noreferrer">RC</a>
                                            )}
                                        </td>
                                        <td>
                                            {vehicle.mutax && (
                                                <a href={`http://localhost:5000/${vehicle.mutax}`} target="_blank" rel="noopener noreferrer">Mutax</a>
                                            )}
                                        </td>
                                        <td>
                                            {vehicle.roadTax && (
                                                <a href={`http://localhost:5000/${vehicle.roadTax}`} target="_blank" rel="noopener noreferrer">Road Tax</a>
                                            )}
                                        </td>
                                        <td>
                                            {vehicle.insurance && (
                                                <a href={`http://localhost:5000/${vehicle.insurance}`} target="_blank" rel="noopener noreferrer">Insurance</a>
                                            )}
                                        </td>
                                        <td>
                                            {vehicle.puc && (
                                                <a href={`http://localhost:5000/${vehicle.puc}`} target="_blank" rel="noopener noreferrer">PUC</a>
                                            )}
                                        </td>
                                        <td>{vehicle.rcExpiry}</td>
                                        <td>{vehicle.mutaxExpiry}</td>
                                        <td>{vehicle.roadTaxExpiry}</td>
                                        <td>{vehicle.insuranceExpiry}</td>
                                        <td>{vehicle.pucExpiry}</td>
                                        <td>
                                            <button className="vehicles-edit-btn" onClick={() => handleEditVehicle(vehicle)}>Edit</button>
                                            <button className="vehicles-delete-btn" onClick={() => handleDeleteVehicle(vehicle._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="vehicles-no-data">No vehicles available</p>
                )}
            </div>

            {showModal && (
                <div className={`vehicles-modal ${closingModal ? 'closing' : ''}`} onAnimationEnd={handleAnimationEnd}>
                    <div className="vehicles-modal-content">
                        <button className="vehicles-modal-close-btn" onClick={handleModalClose}>Close</button>
                        <form className="vehicles-form" onSubmit={handleCreateOrUpdateVehicle}>
                            <div className="vehicles-form-group">
                                <label htmlFor="vehicleNo">Vehicle No:</label>
                                <input
                                    type="text"
                                    id="vehicleNo"
                                    value={vehicleNo}
                                    onChange={(e) => setVehicleNo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="vehicles-form-group">
                                <label htmlFor="ownerName">Owner Name:</label>
                                <input
                                    type="text"
                                    id="ownerName"
                                    value={ownerName}
                                    onChange={(e) => setOwnerName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="vehicles-form-group">
                                <label htmlFor="ownerNumber">Owner Number:</label>
                                <input
                                    type="text"
                                    id="ownerNumber"
                                    value={ownerNumber}
                                    onChange={(e) => setOwnerNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="vehicles-form-group">
                                <label htmlFor="driverName">Driver Name:</label>
                                <input
                                    type="text"
                                    id="driverName"
                                    value={driverName}
                                    onChange={(e) => setDriverName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="vehicles-form-group">
                                <label htmlFor="driverNumber">Driver Number:</label>
                                <input
                                    type="text"
                                    id="driverNumber"
                                    value={driverNumber}
                                    onChange={(e) => setDriverNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <table className="vehicles-doc-table">
                                <thead>
                                    <tr>
                                        <th>Document</th>
                                        <th>Upload</th>
                                        <th>Expiry Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>RC</td>
                                        <td>
                                            <input type="file" onChange={(e) => handleFileChange(e, setRc)} />
                                        </td>
                                        <td>
                                            <input type="date" value={rcExpiry} onChange={(e) => handleDateChange(e, setRcExpiry)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mutax</td>
                                        <td>
                                            <input type="file" onChange={(e) => handleFileChange(e, setMutax)} />
                                        </td>
                                        <td>
                                            <input type="date" value={mutaxExpiry} onChange={(e) => handleDateChange(e, setMutaxExpiry)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Road Tax</td>
                                        <td>
                                            <input type="file" onChange={(e) => handleFileChange(e, setRoadTax)} />
                                        </td>
                                        <td>
                                            <input type="date" value={roadTaxExpiry} onChange={(e) => handleDateChange(e, setRoadTaxExpiry)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Insurance</td>
                                        <td>
                                            <input type="file" onChange={(e) => handleFileChange(e, setInsurance)} />
                                        </td>
                                        <td>
                                            <input type="date" value={insuranceExpiry} onChange={(e) => handleDateChange(e, setInsuranceExpiry)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PUC</td>
                                        <td>
                                            <input type="file" onChange={(e) => handleFileChange(e, setPuc)} />
                                        </td>
                                        <td>
                                            <input type="date" value={pucExpiry} onChange={(e) => handleDateChange(e, setPucExpiry)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <button type="submit" className="vehicles-submit-btn">
                                {selectedVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vehicles;
