import React, { Component } from "react";
import axios from "axios";

class LoginForm extends Component {
  state = {
    data: {},
    error: {},
    toggleLogin: false,
  };
  apiEndpoint = "http://localhost:2450/login";
  loginUser = async () => {
    const { data } = this.state;
    try {
      let { data: res } = await axios.post(this.apiEndpoint, data);
      localStorage.setItem("name", res.name);
      localStorage.setItem("role", res.role);
      window.location = "/admin";
    } catch (ex) {}
  };
  handleChange = (e) => {
    let { data, error } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    if ("name" in data && "password" in data) {
      if (data.password.length < 7)
        error.password = "password must be of 7 characters";
      else this.setState({ toggleLogin: true, error: {} });
    }
    this.setState({ data });
  };
  render() {
    return (
      <div className="container">
        <div className="row p-4 m-4">
          <div className="col-3"></div>
          <div className="col-6 text-center">
            <h1 className="mt-4 mb-4">Welcome to GBI Bank</h1>
            <div className="form-group" style={{ position: "relative" }}>
              <label htmlFor="name">username</label>
              <input
                type="text"
                id="name"
                className="form-control"
                onChange={this.handleChange}
                placeholder="Enter user name"
              />
              <small id="usernameHelp" className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className={
                  this.state.error.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={this.handleChange}
                placeholder="Password"
              />
              <div className="invalid-feedback">
                {this.state.error.password}
              </div>
            </div>
            <button
              className="btn btn-primary my-2"
              disabled={!this.state.toggleLogin}
              onClick={this.loginUser}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
