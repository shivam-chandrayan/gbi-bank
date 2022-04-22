import React, { Component } from "react";
import axios from "axios";

class AddCustomer extends Component {
  state = {
    data: { name: "", password: "", confpassword: "" },
    error: {},
  };
  async componentDidUpdate(prevProps, prevState) {
    const url = "http://localhost:2450/register";
    const { data, error } = this.state;
    if (data.password.localeCompare(data.confpassword))
      error.confpassword = "passwords do not match";
    else delete error.confpassword;
    if (data.password.length < 7)
      error.password =
        "Password cannot be blank. Minimum length should be 7 characters";
    else delete error.password;
  }
  addCustomer = async () => {
    const url = "http://localhost:2450/register";
    const { data, error } = this.state;
    try {
      let obj = {};
      obj.name = data.name;
      obj.password = data.password;
      let response = await axios.post(url, obj);
      console.log(response);
      alert("Customer added Successfully");
      window.location = "/admin";
    } catch (error) {
      console.log("error");
    }
  };
  handleChange = (e) => {
    let { data } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="container">
        <h3>New Customer</h3>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            type="password"
            id="password"
            className={
              this.state.error.password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div className="invalid-feedback">{this.state.error.password}</div>
        </div>
        <div className="form-group">
          <label htmlFor="confpassword">Confirm Password</label>
          <input
            onChange={this.handleChange}
            type="password"
            id="confpassword"
            className={
              this.state.error.confpassword
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div className="invalid-feedback">
            {this.state.error.confpassword}
          </div>
        </div>
        <button className="btn btn-primary m-2" onClick={this.addCustomer}>
          Create
        </button>
      </div>
    );
  }
}

export default AddCustomer;
