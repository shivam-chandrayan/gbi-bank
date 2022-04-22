import React, { Component } from "react";
import axios from "axios";

class RegisterForm extends Component {
  state = {
    data: {},
    error: "",
  };
  apiEndpoint = "http://localhost:3900/api/users";
  registerUser = async () => {
    let obj = { ...this.state.data };
    try {
      const response = await axios.post(this.apiEndpoint, obj);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      this.setState({ error: ex.response.data });
    }
  };
  handleChange = (e) => {
    let data = { ...this.state.data };
    if (e.currentTarget.type === "checkbox")
      data[e.currentTarget.id] = e.currentTarget.checked;
    else data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <div className="form-group" style={{ position: "relative" }}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className={
              this.state.error ? "form-control is-invalid" : "form-control"
            }
            onChange={this.handleChange}
          />
          <div class="invalid-tooltip">{this.state.error}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input type="checkbox" id="isAdmin" onChange={this.handleChange} />
          Is this an admin account?
        </div>
        <button className="btn btn-primary my-2" onClick={this.registerUser}>
          Register
        </button>
      </div>
    );
  }
}

export default RegisterForm;
