import React, { Component, useState  } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink
  } from "react-router-dom";
import Home from "./Views/Home";
import Stuff from "./Views/Stuff";
import Contact from "./Views/Contact";
import Login from "./Views/Login"; 
import { AppContext } from "./lib/contextLib";
const [isAuthenticated, userHasAuthenticated] = useState(false);
class Main extends Component {
    render() {
      return (
        <BrowserRouter>
          <div>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/stuff">Stuff</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="content">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/stuff" element={<Stuff />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/login" element={<Login />}/>
            </Routes>
            </div>
          </div>
        </BrowserRouter>
      );
    }
  }
 
export default Main;