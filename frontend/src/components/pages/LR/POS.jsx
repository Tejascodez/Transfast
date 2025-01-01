import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Creatable from 'react-select/creatable';
import './POS.css';
import axios from 'axios';

const POS = () => {
  const [customerName, setCustomerName] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    partsAndRates: [{ part: '', rate: '' }] // Array to store multiple parts and rates
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // To track the data being edited

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newPartsAndRates = [...formData.partsAndRates];
    newPartsAndRates[index][name] = value;
    setFormData({ ...formData, partsAndRates: newPartsAndRates });
  };

  const handleSelectChange = (newValue) => {
    setFormData({ ...formData, customerName: newValue ? newValue.value : '' });
  };

  const handleAddPartRate = () => {
    setFormData({
      ...formData,
      partsAndRates: [...formData.partsAndRates, { part: '', rate: '' }]
    });
  };

  const handleRemovePartRate = (index) => {
    const newPartsAndRates = formData.partsAndRates.filter((_, i) => i !== index);
    setFormData({ ...formData, partsAndRates: newPartsAndRates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = [...submittedData];
    if (editingIndex !== null) {
      // Update the existing data when editing
      newData[editingIndex] = formData;
    } else {
      // Add new data when submitting
      newData.push(formData);
    }
    setSubmittedData(newData);

    // Send data to backend for storage
    try {
      const response = await axios.post('http://localhost:5000/api/customers/parts', {
        customerName: formData.customerName,
        partsAndRates: formData.partsAndRates
      });

      // Optionally handle the response if necessary
      console.log('Parts and rates saved successfully:', response.data);

      setFormData({ customerName: '', partsAndRates: [{ part: '', rate: '' }] });
      handleClose();
      setEditingIndex(null); // Reset editing mode
    } catch (error) {
      console.error('Error submitting parts and rates:', error);
    }
  };

  // Edit Submission
  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setEditingIndex(index); // Set index to edit the selected submission
    setShowModal(true);
  };

  // Delete Submission
  const handleDelete = (index) => {
    const newData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newData);
  };

  // Fetch customer names from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        const data = response.data;

        // Extract customer names and set them as options
        const customerNames = [...new Set(data.map(item => item.name))];
        const customerOptions = customerNames.map(name => ({ value: name, label: name }));
        setCustomerName(customerOptions);
      } catch (error) {
        console.log('Error fetching customer data', error);
      }
    };

    fetchData();
  }, []);

  // Fetch submitted data from the backend
  useEffect(() => {
    const fetchSubmittedData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');  // Assuming this endpoint returns all submitted parts and rates
        setSubmittedData(response.data);
      } catch (error) {
        console.error('Error fetching submitted data', error);
      }
    };

    fetchSubmittedData();
  }, []);

  return (
    <div>
      <button onClick={handleShow} className="btn btn-primary add-btn">Add Parts and Rates</button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><h1>Materials and Parts</h1></Modal.Title>
          <button className="custom-close-button" onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body>
          <div className="materialsDetails">
            <form onSubmit={handleSubmit}>
              <label htmlFor="Customer">Customer Name</label>
              <Creatable
                id="CustomerName"
                name="customerName"
                placeholder="Enter Customer Name"
                options={customerName}
                isClearable
                required
                className="creatable-select"
                onChange={handleSelectChange}
                value={formData.customerName ? { value: formData.customerName, label: formData.customerName } : null}
              />
              <br />

              {formData.partsAndRates.map((partRate, index) => (
                <div key={index} className="part-rate">
                  <label htmlFor={`Parts-${index}`}>Part</label>
                  <input
                    type="text"
                    name="part"
                    placeholder="Enter Part"
                    value={partRate.part}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <br />

                  <label htmlFor={`Rates-${index}`}>Rate</label>
                  <input
                    type="text"
                    name="rate"
                    placeholder="Enter Rate"
                    value={partRate.rate}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <br />

                  {formData.partsAndRates.length > 1 && (
                    <Button variant="danger" onClick={() => handleRemovePartRate(index)}>
                      Remove Part
                    </Button>
                  )}
                  <hr />
                </div>
              ))}

              <Button variant="secondary" onClick={handleAddPartRate}>
                Add Another Part/Rate
              </Button>
              <br />

              <Button variant="primary" type="submit">
                {editingIndex !== null ? 'Update' : 'Submit'}
              </Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="submitted-data">
        <h2>Submitted Data</h2>
        {submittedData.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Part</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <React.Fragment key={index}>
                  {data.partsAndRates.map((partRate, idx) => (
                    <tr key={idx}>
                      {idx === 0 ? (
                        <td rowSpan={data.partsAndRates.length}>{data.name}</td>
                      ) : null}
                      <td>{partRate.part}</td>
                      <td>{partRate.rate}</td>
                      {idx === 0 && (
                        <td rowSpan={data.partsAndRates.length}>
                          <Button variant="warning" onClick={() => handleEdit(index)} className="edit-btn">Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(index)} className="delete-btn">Delete</Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default POS;
