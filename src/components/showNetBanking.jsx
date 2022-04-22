import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";

class ShowNetBanking extends Component {
  state = { data: { items: [] } };
  async componentDidMount() {
    let name = localStorage.getItem("name");
    let url =
      "http://localhost:2450/getNetBankingByName/" +
      name +
      this.props.location.search;
    let { data } = await axios.get(url);
    this.setState({ data });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let name = localStorage.getItem("name");
      let url =
        "http://localhost:2450/getNetBankingByName/" +
        name +
        this.props.location.search;
      let { data } = await axios.get(url);
      this.setState({ data });
    }
  }

  goToPage = (step) => {
    let { page } = queryString.parse(this.props.location.search);
    page = Number(page) + step;
    let params = "?page=" + page;
    let url = "/getAllNetBankings" + params;
    this.props.history.push(url);
  };

  render() {
    return (
      <div className="container">
        <h3 className="pt-4 mt-4">All Net Banking Details</h3>
        {(this.state.data.page - 1) * this.state.data.totalItems + 1} -{" "}
        {this.state.data.page * this.state.data.totalItems} of{" "}
        {this.state.data.totalNum}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Payee Name</th>
              <th>Amount</th>
              <th>Bank</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.items.map((a, i) => (
              <tr key={i}>
                <td>{a.payeeName}</td>
                <td>{a.amount}</td>
                <td>{a.bankName}</td>
                <td>{a.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col-6">
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
              onClick={() => this.goToPage(1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowNetBanking;
