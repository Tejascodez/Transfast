import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

class VehicleDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        vehicleNumber: "",
        driversName: "",
        driversContact: "",
        loadType: null
      },
      loadTypes: [ { value: "Full Load", label: "Full Load" },
        { value: "Part Load", label: "Part Load" },
        { value: "Special Vehicle", label: "Special Vehicle" }],
    };
  }



  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleLoadTypeChange = (selectedOption) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        loadType: selectedOption,
      },
    }));
  };

  render() {
    const { formData, loadTypes } = this.state;

    return (
      <div className="Vehicle-details">
        <label htmlFor="lorry-details">VEHICLE DETAILS</label><br />
        <label htmlFor="vehicleNumber">VEHICLE NUMBER :</label>
        <input
          type="text"
          id="vehicleNumber"
          name="vehicleNumber"
          placeholder="Enter Vehicle Number"
          value={formData.vehicleNumber}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="driversName">DRIVER'S NAME :</label>
        <input
          type="text"
          id="driversName"
          name="driversName"
          placeholder="Enter Driver's Name"
          value={formData.driversName}
          onChange={this.handleChange}
        />
        <label htmlFor="driversContact">DRIVER'S CONTACT :</label>
        <input
          type="tel"
          id="driversContact"
          name="driversContact"
          placeholder="Enter Driver's Mobile No."
          value={formData.driversContact}
          onChange={this.handleChange}
          required
        />
        <label htmlFor="loadType">LOAD TYPE :</label>
        <Select
          id="loadType"
          name="loadType"
          value={formData.loadType}
          onChange={this.handleLoadTypeChange}
          options={loadTypes}
          placeholder="Select Load Type"
          isSearchable
        />
      </div>
    );
  }
}

export default VehicleDetailsForm;
