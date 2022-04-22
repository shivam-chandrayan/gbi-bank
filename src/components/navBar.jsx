import React from "react";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-warning">
      <a href="/" className="navbar-brand">
        Home
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {user.name && (
            <React.Fragment>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  View
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/getAllCheques?page=1">
                    Cheque
                  </a>
                  <a className="dropdown-item" href="/getAllNetBankings?page=1">
                    Net Banking
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Details
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/customerDetails">
                    Customer Details
                  </a>
                  <a className="dropdown-item" href="/nomineeDetails">
                    Nominee Details
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Transaction
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/addPayee">
                    Add Payee
                  </a>
                  <a className="dropdown-item" href="/cheque">
                    Cheques
                  </a>
                  <a className="dropdown-item" href="/netBanking">
                    Net Banking
                  </a>
                </div>
              </li>
            </React.Fragment>
          )}
          {!user.name && (
            <React.Fragment>
              <li className="nav-item">
                <a href="/login" className="nav-link">
                  Login
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {user.name && (
            <React.Fragment>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Welcome {user.name}
                </a>
              </li>
              <li className="nav-item">
                <a href="/logout" className="nav-link">
                  Logout
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
