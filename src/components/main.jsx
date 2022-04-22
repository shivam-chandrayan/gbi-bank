import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "./navBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import Movies from "./movies";
import Logout from "./logout";
import AdminPage from "./adminPage";
import AllCustomers from "./allCustomers";
import AddCustomer from "./addCustomer";
import ShowCheque from "./showCheque";
import ShowNetBanking from "./showNetBanking";
import CustomerDetails from "./customerDetails";
import NomineeDetails from "./nomineeDetails";
import Cheque from "./cheque";
import NetBanking from "./netBanking";
import AddPayee from "./addPayee";

class Main extends Component {
  state = { user: {} };
  componentDidMount() {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    let user = {};
    name ? (user.name = name) : (user.name = "");
    role ? (user.role = role) : (user.role = "");
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/customer" component={AdminPage} />
              <Route path="/allCustomers" component={AllCustomers} />
              <Route path="/addCustomers" component={AddCustomer} />
              <Route path="/getAllCheques" component={ShowCheque} />
              <Route path="/getAllNetBankings" component={ShowNetBanking} />
              <Route path="/customerDetails" component={CustomerDetails} />
              <Route path="/nomineeDetails" component={NomineeDetails} />
              <Route path="/addPayee" component={AddPayee} />
              <Route path="/cheque" component={Cheque} />
              <Route path="/netBanking" component={NetBanking} />
              <Route exact path="/" component={LoginForm} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default Main;
