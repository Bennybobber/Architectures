import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { BrowserRouter as Router } from 'react-router-dom';
import "./styles/index.css";

 
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Main />
    </Router>
  </React.StrictMode>, 
  document.getElementById("root")
);