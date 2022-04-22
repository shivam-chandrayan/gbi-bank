import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";

class AllCustomers extends Component {
  state = { data: { items: [] } };
  async componentDidUpdate() {
    let url = "http://localhost:2450/getCustomers" + this.props.location.search;
    const { data } = await axios.get(url);
    this.setState({ data: data });
  }
  goToPage = (p) => {
    let { page } = queryString.parse(this.props.location.search);
    page = Number(page) + p;
    let params = "?page=" + page;
    let url = "/allCustomers" + params;
    this.props.history.push(url);
  };
  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <h3>All Customers</h3>
        {data.page} - {data.page * data.totalItems} of {data.totalNum}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>City</th>
              <th>PAN</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.items.map((a, i) => (
              <tr key={i}>
                <td>{a.name}</td>
                <td>{a.state}</td>
                <td>{a.city}</td>
                <td>{a.PAN}</td>
                <td>{a.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col-6 text-left">
            {this.state.data.page > 1 ? (
              <button
                className="btn btn-secondary m-2"
                onClick={() => this.goToPage(-1)}
              >
                Prev
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="col-6 text-right">
            <button
              className="btn btn-secondary m-2"
              onClick={() => this.goToPage(+1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AllCustomers;
