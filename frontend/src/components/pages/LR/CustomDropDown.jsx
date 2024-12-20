import React, { Component } from "react";
import axios from "axios";
import Creatable from "react-select/creatable";

class CustomDropDown extends Component {
  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
    this.fetchConsignorsAndConsignees();
  }

  fetchConsignorsAndConsignees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lorryReceipts");
      const consignors = [...new Set(response.data.map(receipt => ({ value: receipt.consignor, label: receipt.consignor })))];
      const consignees = [...new Set(response.data.map(receipt => ({ value: receipt.consignee, label: receipt.consignee })))];
      const freightPayableCompanies = [...new Set(response.data.map(receipt => ({ value: receipt.freightPayableCompany, label: receipt.freightPayableCompany })))];
      this.setState({ consignors, consignees, freightPayableCompanies });
    } catch (error) {
      console.error("Error fetching consignors and consignees", error);
    }
  };

  handleChangeConsignor = (selectedOption) => {
    this.props.onChangeConsignor(selectedOption);
  };

  handleChangeConsignee = (selectedOption) => {
    this.props.onChangeConsignee(selectedOption);
  };

  handleChangeFreightPayableCompany = (selectedOption) => {
    this.props.onChangeFreightPayableCompany(selectedOption);
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="consignor">Consignor:</label>
          <Creatable
            value={this.props.selectedConsignor}
            onChange={this.handleChangeConsignor}
            options={this.state.consignors}
            placeholder="Select or Add Consignor"
          />
        </div>
        <div>
          <label htmlFor="consignee">Consignee:</label>
          <Creatable
            value={this.props.selectedConsignee}
            onChange={this.handleChangeConsignee}
            options={this.state.consignees}
            placeholder="Select or Add Consignee"
          />
        </div>
        <div>
          <label htmlFor="freightPayableCompany">Freight Payable Company:</label>
          <Creatable
            value={this.props.selectedFreightPayableCompany}
            onChange={this.handleChangeFreightPayableCompany}
            options={this.state.freightPayableCompanies}
            placeholder="Select or Add Freight Payable Company"
          />
        </div>
      </div>
    );
  }
}

export default CustomDropDown;
