import React, { useState, useEffect } from 'react';
import Creatable from 'react-select/creatable';
import Modal from 'react-modal';
import axios from 'axios';
import './Fuels.css'; // Ensure this import is present

Modal.setAppElement('#root');

const Fuels = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [driverName, setDriverName] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [oldReading, setOldReading] = useState('');
    const [newReading, setNewReading] = useState('');
    const [fuelInLiters, setFuelInLiters] = useState('');
    const [fuelCost, setFuelCost] = useState('');
    const [fuelData, setFuelData] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const fetchFuelData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fuels');
                setFuelData(response.data);
            } catch (error) {
                console.error('Error fetching fuel data:', error);
            }
        };

        fetchFuelData();
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentId(null);
        resetForm();
    };

    const resetForm = () => {
        setVehicleNumber('');
        setDriverName('');
        setFrom('');
        setTo('');
        setOldReading('');
        setNewReading('');
        setFuelInLiters('');
        setFuelCost('');
    };

    const calculateAvg = () => {
        if (oldReading && newReading && fuelInLiters) {
            const avg = (newReading - oldReading) / fuelInLiters;
            return avg.toFixed(2);
        }
        return '';
    };

    const handleAddOrUpdate = async () => {
        const avg = calculateAvg();

        const newFuelData = {
            vehicleNumber,
            driverName,
            from,
            to,
            oldReading: parseFloat(oldReading),
            newReading: parseFloat(newReading),
            fuelInLiters: parseFloat(fuelInLiters),
            fuelCost: parseFloat(fuelCost),
            avg: parseFloat(avg)
        };

        try {
            let response;
            if (currentId) {
                response = await axios.put(`http://localhost:5000/api/fuels/${currentId}`, newFuelData);
            } else {
                response = await axios.post('http://localhost:5000/api/fuels', newFuelData);
            }
            console.log('Vehicle data posted successfully:', response);

            const fetchFuelData = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/fuels');
                    setFuelData(response.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchFuelData();

        } catch (error) {
            console.error('Error posting vehicle data:', error);
            alert('Error posting vehicle data: ' + error.message);
        }

        setModalIsOpen(false);
        resetForm();
    };

    const handleEdit = (fuel) => {
        setVehicleNumber(fuel.vehicleNumber);
        setDriverName(fuel.driverName);
        setFrom(fuel.from);
        setTo(fuel.to);
        setOldReading(fuel.oldReading);
        setNewReading(fuel.newReading);
        setFuelInLiters(fuel.fuelInLiters);
        setFuelCost(fuel.fuelCost);
        setCurrentId(fuel._id);
        setModalIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/fuels/${id}`);
            setFuelData(fuelData.filter(fuel => fuel._id !== id));
        } catch (error) {
            console.error('Error deleting fuel data:', error);
        }
    };

    return (
        <div>
            <button onClick={openModal}>Add Vehicle</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Vehicle Modal"
            >
                <h2>{currentId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
                <button onClick={closeModal}>Close</button>
                <div>
                    <label htmlFor="VehicleNo">Vehicle Number: </label>
                    <Creatable
                        id="VehicleNo"
                        name="VehicleNumber"
                        value={{ label: vehicleNumber, value: vehicleNumber }}
                        onChange={e => setVehicleNumber(e.value)}
                        isClearable
                        required
                    /><br />

                    <label htmlFor="DriverName">Driver Name:</label>
                    <input
                        type="text"
                        id="DriverName"
                        name="DriverName"
                        value={driverName}
                        onChange={e => setDriverName(e.target.value)}
                        required
                    />
                    <label htmlFor="from">From:</label>
                    <input
                        type="text"
                        id='from'
                        name='place'
                        placeholder='Enter place Name'
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                    />
                    <label htmlFor="to">To:</label>
                    <input
                        type="text"
                        id='to'
                        name='place'
                        placeholder='Enter destination place'
                        value={to}
                        onChange={e => setTo(e.target.value)}
                    />

                    <label htmlFor="oldreading">Old Reading :</label>
                    <input
                        type="text"
                        id='oldreading'
                        name='oldreading'
                        placeholder='Enter the old reading'
                        value={oldReading}
                        onChange={e => setOldReading(e.target.value)}
                    />

                    <label htmlFor="newreading">New Reading :</label>
                    <input
                        type="text"
                        id='newreading'
                        name='newreading'
                        placeholder='Enter new reading'
                        value={newReading}
                        onChange={e => setNewReading(e.target.value)}
                    />

                    <label htmlFor="fuel">Fuel in liters:</label>
                    <input
                        type="text"
                        placeholder='Enter fuel'
                        value={fuelInLiters}
                        onChange={e => setFuelInLiters(e.target.value)}
                    />
                    <label htmlFor="fuel">Cost of Fuel:</label>
                    <input
                        type="text"
                        placeholder='Enter cost of fuel'
                        value={fuelCost}
                        onChange={e => setFuelCost(e.target.value)}
                    />

                    <button onClick={handleAddOrUpdate}>{currentId ? 'Update Vehicle' : 'Add Vehicle'}</button>
                </div>
            </Modal>
            <div className='stored-info'>
                <p className='txt'>Tabular Information</p>
                <table className='tabular-storation'>
                    <thead>
                        <tr>
                            <th>SrNo:</th>
                            <th>Vehicle Number</th>
                            <th>Driver Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Old Readings</th>
                            <th>New Readings</th>
                            <th>Liters</th>
                            <th>Cost of Fuel</th>
                            <th>Avg</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fuelData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.vehicleNumber}</td>
                                <td>{data.driverName}</td>
                                <td>{data.from}</td>
                                <td>{data.to}</td>
                                <td>{data.oldReading}</td>
                                <td>{data.newReading}</td>
                                <td>{data.fuelInLiters}</td>
                                <td>{data.fuelCost}</td>
                                <td>{data.avg}</td>
                                <td>
                                    <button onClick={() => handleEdit(data)}>Edit</button>
                                    <button onClick={() => handleDelete(data._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Fuels;
