import React, { Component } from "react";
import axios from "axios";

class AddPayee extends Component {
  state = { data: { bankName: "GBI", IFSC: "" }, toggleBank: false };

  handleChange = (e) => {
    let { data } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = this.state;
    data.name = localStorage.getItem("name");
    let url = "http://localhost:2450/addPayee";
    let res = await axios.post(url, data);
    if (res.status === 200) {
      alert("Details added successfully");
      this.props.history.push("/customer");
    }
  };

  render() {
    let banks = ["SBI", "ICICI", "HDFC", "AXIS", "DBS", "GBI"];
    let { data } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-12">
              <h3 className="mt-4 pt-4">Add Payee</h3>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12">
              <label htmlFor="payeeName">Payee Name</label>
              <input
                type="text"
                id="payeeName"
                className="form-control"
                required={true}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12">
              <label htmlFor="accNumber">Account Number</label>
              <input
                type="number"
                id="accNumber"
                className="form-control"
                required={true}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12">
              <input
                type="radio"
                name="bank"
                className="mx-2"
                checked={!this.state.toggleBank}
                onClick={() => this.setState({ toggleBank: false })}
              />
              <label htmlFor="same">Same Bank</label>
            </div>
            <div className="col-12">
              <input
                type="radio"
                name="bank"
                className="mx-2"
                checked={this.state.toggleBank}
                onClick={() => this.setState({ toggleBank: true })}
              />
              <label htmlFor="other">Other Bank</label>
            </div>
          </div>
          {this.state.toggleBank && (
            <div className="row form-group">
              <div className="col-12">
                <label htmlFor="bankName">Bank Name</label>
                <select
                  id="bankName"
                  className="custom-select"
                  required={true}
                  onChange={this.handleChange}
                  defaultValue="Select Bank"
                >
                  <option>Select Bank</option>
                  {banks.map((a, i) => (
                    <option key={i}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="IFSC">IFSC</label>
                <input
                  type="number"
                  id="IFSC"
                  className="form-control"
                  required={true}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary my-2"
                type="submit"
                disabled={
                  "payeeName" in data &&
                  "IFSC" in data &&
                  "accNumber" in data &&
                  "bankName" in data
                    ? false
                    : true
                }
              >
                Add Payee
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddPayee;
