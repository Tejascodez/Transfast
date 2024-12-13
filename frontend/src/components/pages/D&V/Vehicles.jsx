import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Vehicle.css'
const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [mutax, setMutax] = useState('');
    const [roadTax, setRoadTax] = useState('');
    const [insurance, setInsurance] = useState('');
    const [rc, setRc] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
        formData.append('rc', rc);
        formData.append('mutax', mutax);
        formData.append('roadTax', roadTax);
        formData.append('insurance', insurance);

        try {
            if (selectedVehicle) {
                await axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle._id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/vehicles', formData);
            }
            fetchVehicles();
            setMutax('');
            setRoadTax('');
            setInsurance('');
            setRc(null);
            setSelectedVehicle(null);
            setShowModal(false);
        } catch (error) {
            console.error('Error creating/updating vehicle:', error);
        }
    };

    const handleDeleteVehicle = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleFileChange = (event) => {
        setRc(event.target.files[0]);
    };

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setMutax(vehicle.mutax);
        setRoadTax(vehicle.roadTax);
        setInsurance(vehicle.insurance);
        setShowModal(true);
    };

    const handleAddVehicle = () => {
        setSelectedVehicle(null);
        setMutax('');
        setRoadTax('');
        setInsurance('');
        setRc(null);
        setShowModal(true);
    };

    return (
        <div className="vehicle-container">
            <h1 className="page-title">Vehicles</h1>
            <button className="add-vehicle-btn" onClick={handleAddVehicle}>Add Vehicle</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedVehicle ? 'Update Vehicle' : 'Create Vehicle'}</h2>
                        <form className="vehicle-form" onSubmit={handleCreateOrUpdateVehicle}>
                            <div className="form-group">
                                <label htmlFor="rc">RC Document:</label>
                                <input type="file" id="rc" onChange={handleFileChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mutax">MUTAX:</label>
                                <input
                                    type="text"
                                    id="mutax"
                                    value={mutax}
                                    onChange={(e) => setMutax(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="roadTax">Road Tax:</label>
                                <input
                                    type="text"
                                    id="roadTax"
                                    value={roadTax}
                                    onChange={(e) => setRoadTax(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="insurance">Insurance:</label>
                                <input
                                    type="text"
                                    id="insurance"
                                    value={insurance}
                                    onChange={(e) => setInsurance(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="submit-btn" type="submit">
                                {selectedVehicle ? 'Update Vehicle' : 'Create Vehicle'}
                            </button>
                        </form>
                        <button className="close-modal-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}

            <h2 className="vehicle-list-title">Vehicle List</h2>
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
                <table className="vehicle-table">
                    <thead>
                        <tr>
                            <th>RC</th>
                            <th>MUTAX</th>
                            <th>Road Tax</th>
                            <th>Insurance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td>
                                    {vehicle.rc ? (
                                        <img
                                            src={`http://localhost:5000${vehicle.rc}`}
                                            alt="RC Document"
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>{vehicle.mutax}</td>
                                <td>{vehicle.roadTax}</td>
                                <td>{vehicle.insurance}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditVehicle(vehicle)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteVehicle(vehicle._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No vehicles available</p>
            )}
        </div>
    );
};

export default Vehicles     ;
