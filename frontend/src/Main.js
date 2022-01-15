import React, { Component, useState, useEffect  } from "react";
import { AppContext } from "./lib/contextLib";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/app.css"
import jwt_decode from "jwt-decode";
import NavLink from "react-bootstrap/esm/NavLink";



function Main() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      const exp = jwt_decode(user.token);
      if (Date.now() >= exp * 1000){
        userHasAuthenticated(false);
      }else {
        userHasAuthenticated(true);
      }
    }
    catch(e) {
    }
  }
  
  try{
    
  } catch (err){
    console.log(err);
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Home
          </Navbar.Brand>
        </LinkContainer>
        <LinkContainer to ="/makeRequest">
        <Nav.Link>Make Request</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/requests">
        {isAuthenticated ? (
            <Nav.Link>Requests</Nav.Link>
            ) : (
              <>
              </>
            )}
            
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated}}>
      <Routes />
      </AppContext.Provider>

    </div>
  );
  function handleLogout() {
    localStorage.setItem('user', '');
    userHasAuthenticated(false);
  }
  function showRequests(){
    if (isAuthenticated) {
      <LinkContainer to="/requests">
            <Nav.Link>Requests</Nav.Link>
        </LinkContainer>
    }
  }
  
}

export default Main;