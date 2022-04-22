import React, { Component } from "react";
import axios from "axios";

class CustomerDetails extends Component {
  state = {
    data: {
      name: "",
      gender: "",
      addressLine1: "",
      state: "",
      city: "",
      dob: "",
      PAN: "",
    },
    toggleSubmit: false,
    readOnly: true,
  };
  async componentDidMount() {
    let name = localStorage.getItem("name");
    let url = "http://localhost:2450/getCustomer/" + name;
    let { data } = await axios.get(url);
    if (data === "")
      this.setState({ data: {}, toggleSubmit: true, readOnly: false });
    else {
      data.day = data.dob.split("-")[0];
      data.month = data.dob.split("-")[1];
      data.year = data.dob.split("-")[2];
      this.setState({ data });
    }
  }

  handleChange = (e) => {
    let { data } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = async () => {
    let { data } = this.state;
    let name = localStorage.getItem("name");
    let url = "http://localhost:2450/customerDetails";
    let obj = {};
    obj.name = name;
    obj.gender = data.gender;
    obj.addressLine1 = data.addressLine1;
    obj.state = data.state;
    obj.city = data.city;
    obj.dob = data.day + "-" + data.month + "-" + data.year;
    obj.PAN = data.PAN;
    let res = await axios.post(url, obj);
    if (res.status === 200) this.props.history.push("/customer");
  };

  render() {
    const { data } = this.state;

    let dayOP = [];
    for (let i = 1; i <= 31; i++) {
      dayOP.push(i);
    }
    let monthOP = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let yearOP = [];
    for (let i = 1970; i <= 2020; i++) {
      yearOP.push(i);
    }
    return (
      <div className="container">
        <h3 className="pt-4 mt-4">Customer Details</h3>
        <div className="row">
          <div className="col-3">
            <label htmlFor="gender">Gender</label>
          </div>
          <div className="col-3">
            <input
              type="radio"
              name="gender"
              id="gender"
              className="m-2"
              readOnly={true}
              value="Male"
              checked={data.gender === "Male" ? true : false}
              onChange={this.state.readOnly ? false : this.handleChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="col-3">
            <input
              type="radio"
              name="gender"
              id="gender"
              className="m-2"
              readOnly={true}
              value="Female"
              checked={data.gender === "Female" ? true : false}
              onChange={this.state.readOnly ? false : this.handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="col-12">
            <hr />
          </div>
          <div className="col-12">Date of Birth</div>
          <div className="col-4">
            <select
              className="custom-select"
              defaultValue={"Day"}
              value={data.day}
              id="day"
              onChange={this.state.readOnly ? false : this.handleChange}
            >
              <option disabled={true}>Day</option>
              {dayOP.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <select
              className="custom-select"
              defaultValue={"Month"}
              value={data.month}
              id="month"
              onChange={this.state.readOnly ? false : this.handleChange}
            >
              <option disabled={true}>Month</option>
              {monthOP.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <select
              className="custom-select"
              defaultValue={"Year"}
              value={data.year}
              id="year"
              onChange={this.state.readOnly ? false : this.handleChange}
            >
              <option disabled={true}>Year</option>
              {yearOP.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          {/* PAN */}
          <div className="col-12">Pan</div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              id="PAN"
              value={data.PAN}
              onChange={this.handleChange}
              readOnly={this.state.readOnly}
            />
          </div>
          {/* Address */}
          <div className="col-12">Address</div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="addressLine1"
              value={data.addressLine1}
              onChange={this.handleChange}
              readOnly={this.state.readOnly}
            />
          </div>
          <div className="col-6">
            <input type="text" className="form-control" />
          </div>
          {/* State */}
          <div className="col-6">State</div>
          <div className="col-6">City</div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="state"
              value={data.state}
              onChange={this.handleChange}
              readOnly={this.state.readOnly}
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="city"
              value={data.city}
              onChange={this.handleChange}
              readOnly={this.state.readOnly}
            />
          </div>
        </div>
        {this.state.toggleSubmit && (
          <button
            className="btn btn-primary m-2"
            disabled={
              "gender" in data &&
              "addressLine1" in data &&
              "state" in data &&
              "city" in data &&
              "day" in data &&
              "month" in data &&
              "year" in data &&
              "PAN" in data
                ? false
                : true
            }
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    );
  }
}

export default CustomerDetails;
