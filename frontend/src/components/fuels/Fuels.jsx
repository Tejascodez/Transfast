import React, { useState } from 'react';
import Creatable from 'react-select/creatable';
import Modal from 'react-modal';
import './Fuels.css';

Modal.setAppElement('#root'); // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

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

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const calculateAvg = () => {
        if (oldReading && newReading && fuelInLiters) {
            const avg = (newReading - oldReading) / fuelInLiters;
            return avg.toFixed(2); // Limit to 2 decimal places
        }
        return '';
    };

    const handleAddVehicle = () => {
        const avg = calculateAvg();
        setFuelData([
            ...fuelData,
            {
                vehicleNumber,
                driverName,
                from,
                to,
                oldReading,
                newReading,
                fuelInLiters,
                fuelCost,
                avg
            }
        ]);
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>Add Vehicle</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Vehicle Modal"
            >
                <h2>Add Vehicle</h2>
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

                    <button onClick={handleAddVehicle}>Add Vehicle</button>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default Fuels;
