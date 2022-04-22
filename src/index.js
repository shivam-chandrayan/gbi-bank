import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Movies from "./components/movies";
import Main from "./components/main";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Main />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
