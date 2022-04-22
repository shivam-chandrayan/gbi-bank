import React, { Component } from "react";

class AdminPage extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center text-danger">
            <h1 className="text-danger">Welcome to GBI Bank</h1>
            <img
              className="rounded-circle"
              src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
