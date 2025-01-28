import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'; // Import Semantic UI Dropdown
import './Fuels.css'; // Custom CSS

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
    const [filteredData, setFilteredData] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [date, setDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFuelData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/fuels');
                setFuelData(response.data);
                setFilteredData(response.data);
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
        setDate('');
        setFrom('');
        setTo('');
        setOldReading('');
        setNewReading('');
        setFuelInLiters('');
        setFuelCost('');
    };

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0');
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return '';
    };

    const parseDate = (dateStr) => {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1] - 1;
            const year = parts[2];
            return new Date(year, month, day);
        }
        return null;
    };

    const handleAddOrUpdate = async () => {
        const avg = calculateAvg();

        const newFuelData = {
            vehicleNumber,
            driverName,
            date: parseDate(date),
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
                response = await axios.put(`http://localhost:8080/api/fuels/${currentId}`, newFuelData);
            } else {
                response = await axios.post('http://localhost:8080/api/fuels', newFuelData);
            }

            console.log('Vehicle data posted successfully:', response);

            const fetchFuelData = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/fuels');
                    setFuelData(response.data);
                    setFilteredData(response.data);
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

    const calculateAvg = () => {
        if (oldReading && newReading && fuelInLiters) {
            const avg = (newReading - oldReading) / fuelInLiters;
            return avg.toFixed(2);
        }
        return '';
    };

    const handleEdit = (fuel) => {
        setVehicleNumber(fuel.vehicleNumber);
        setDriverName(fuel.driverName);
        setDate(formatDate(fuel.date));
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
            await axios.delete(`http://localhost:8080/api/fuels/${id}`);
            setFuelData(fuelData.filter(fuel => fuel._id !== id));
            setFilteredData(filteredData.filter(fuel => fuel._id !== id));
        } catch (error) {
            console.error('Error deleting fuel data:', error);
        }
    };

    const handleSearchChange = (selectedOption) => {
        setSearchTerm(selectedOption ? selectedOption.value : '');

        if (selectedOption) {
            const filtered = fuelData.filter(fuel => {
                return Object.values(fuel).some(value =>
                    String(value).toLowerCase().includes(selectedOption.value.toLowerCase())
                );
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(fuelData);
        }
    };

    const searchOptions = fuelData.map((fuel, index) => ({
        key: index,
        text: `Vehicle: ${fuel.vehicleNumber}, Driver: ${fuel.driverName}, Date: ${formatDate(fuel.date)}`,
        value: fuel.vehicleNumber
    }));

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
                    <Dropdown
                        id="VehicleNo"
                        placeholder="Select Vehicle"
                        fluid
                        selection
                        value={vehicleNumber}
                        options={searchOptions}
                        onChange={(e, { value }) => setVehicleNumber(value)}
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
                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        id='date'
                        name='date'
                        placeholder='dd-mm-yyyy'
                        value={date || ''}
                        onChange={e => setDate(e.target.value)}
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
                <Dropdown
                    placeholder="Search..."
                    fluid
                    selection
                    options={searchOptions}
                    onChange={handleSearchChange}
                    value={searchTerm}
                    clearable
                />
                <table className='tabular-storation'>
                    <thead>
                        <tr>
                            <th>SrNo:</th>
                            <th>Date</th>
                            <th>Vehicle Number</th>
                            <th>Driver Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Old Readings</th>
                            <th>New Readings</th>
                            <th>Liters</th>
                            <th>Cost of Fuel</th>
                            <th>Avg</th>
                            <th>Acknowledgement</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{formatDate(data.date)}</td>
                                <td>{data.vehicleNumber}</td>
                                <td>{data.driverName}</td>
                                <td>{data.from}</td>
                                <td>{data.to}</td>
                                <td>{data.oldReading}</td>
                                <td>{data.newReading}</td>
                                <td>{data.fuelInLiters}</td>
                                <td>{data.fuelCost}</td>
                                <td>{data.avg}</td>
                                <td></td>
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
};

export default Fuels;
