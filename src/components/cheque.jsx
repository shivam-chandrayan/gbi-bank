import React, { Component } from "react";
import axios from "axios";

class Cheque extends Component {
  state = { data: {}, errors: {} };

  handleChange = (e) => {
    let { data } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    let errors = this.handleValidation(data);
    this.setState({ data, errors });
  };

  handleValidation = (data) => {
    let { errors } = this.state;
    if ("chequeNumber" in data && data.chequeNumber.length !== 12) {
      errors.chequeNumber = true;
    } else {
      errors.chequeNumber = false;
    }
    if ("branch" in data && data.branch.length !== 4) {
      errors.branch = true;
    } else {
      errors.branch = false;
    }
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let { data, errors } = this.state;
    if (!errors.chequeNumber && !errors.branch) {
      data.name = localStorage.getItem("name");
      let url = "http://localhost:2450/postCheque";
      let res = await axios.post(url, data);
      if (res.status === 200) {
        alert("Details added successfully");
        this.props.history.push("/customer");
      }
    }
  };

  render() {
    let banks = ["SBI", "ICICI", "HDFC", "AXIS", "DBS", "GBI"];
    let { errors, data } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-12">
              <h3 className="mt-4 pt-4">Deposite Cheque</h3>
            </div>
          </div>
          <div className="row form-froup">
            <div className="col-12">
              <label htmlFor="chequeNumber">Cheque Number</label>
              <input
                type="text"
                id="chequeNumber"
                className="form-control"
                required={true}
                onChange={this.handleChange}
              />
              {errors.chequeNumber ? (
                <div className="alert alert-danger" role="alert">
                  Enter your 12 Digit Cheque Number
                </div>
              ) : (
                ""
              )}
              <hr />
            </div>
          </div>
          <div className="row form-froup">
            <div className="col-12">
              <label htmlFor="bankName">Bank Name</label>
              <select
                id="bankName"
                className="custom-select"
                required={true}
                onChange={this.handleChange}
              >
                <option selected={true}>Select Bank</option>
                {banks.map((a, i) => (
                  <option key={i}>{a}</option>
                ))}
              </select>
              <hr />
            </div>
          </div>
          <div className="row form-froup">
            <div className="col-12">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                className="form-control"
                required={true}
                onChange={this.handleChange}
              />
              {errors.branch ? (
                <div className="alert alert-danger" role="alert">
                  Enter 4 Digit Code of Branch
                </div>
              ) : (
                ""
              )}
              <hr />
            </div>
          </div>
          <div className="row form-froup">
            <div className="col-12">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                required={true}
                onChange={this.handleChange}
              />
              <hr />
              <button
                className="btn btn-primary my-2"
                type="submit"
                disabled={
                  "chequeNumber" in data &&
                  "bankName" in data &&
                  "branch" in data &&
                  "amount" in data
                    ? false
                    : true
                }
              >
                Add Cheque
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Cheque;
