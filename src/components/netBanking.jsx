import React, { Component } from "react";
import axios from "axios";

class NetBanking extends Component {
  state = { data: { bankName: "GBI" }, payee: [] };

  async componentDidMount() {
    let name = localStorage.getItem("name");
    let url = "http://localhost:2450/getPayees/" + name;
    let { data: payee } = await axios.get(url);
    this.setState({ payee });
  }

  handleChange = (e) => {
    let { data } = this.state;
    data[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let { data } = this.state;
    data.name = localStorage.getItem("name");
    let url = "http://localhost:2450/postNet";
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
              <h3 className="mt-4 pt-4">Net Banking Details</h3>
            </div>
          </div>
          <div className="row form-froup">
            <div className="col-12">
              <label htmlFor="chequeNumber">Payee Name</label>
              <select
                id="payeeName"
                className="custom-select"
                defaultValue="Select Payee"
                onChange={this.handleChange}
              >
                <option>Select Payee</option>
                {this.state.payee.map((a, i) => (
                  <option key={i}>{a.payeeName}</option>
                ))}
              </select>
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
            </div>
          </div>
          <div className="row form-froup">
            <div className="col-12">
              <label htmlFor="comment">Comment</label>
              <input
                type="text"
                id="comment"
                className="form-control"
                required={true}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-primary my-2"
                type="submit"
                disabled={
                  "payeeName" in data &&
                  "bankName" in data &&
                  "comment" in data &&
                  "amount" in data
                    ? false
                    : true
                }
              >
                Add Transaction
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NetBanking;
