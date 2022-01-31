import React, { useState, useEffect  } from "react";
import { AppContext } from "./lib/contextLib";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/app.css"
import jwt_decode from "jwt-decode";
import { useHistory  } from 'react-router-dom';



function Main() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthorizer , setAuthorizor]= useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("");
  const history = useHistory();
  useEffect(() => {
    onLoad();
    async function onLoad() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await setAuthorizor(user.isAuthorizer);
        await setEmployee(user.isEmployee);
        await setUsername(user.username);

        const date = new Date();
        const token = jwt_decode(user.token);
        console.log(token);
        
        if ((date.getTime()/1000) > token.exp ){
          await userHasAuthenticated(false);
          localStorage.removeItem('user');
          history.push("/login");
        }else {
          await userHasAuthenticated(true);
          if (user.isEmployee) {
            await setAccountType("Employee");
          }
          else if (user.isAuthorizer) {
            await setAccountType("Admin");
          }
          else {
            await setAccountType("Client");
          }
        }
          
        
      }
      catch(e) {
      }
    }
  }, [userHasAuthenticated, history, setAuthorizor, setEmployee]);
  
  
  
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
          {!isEmployee && !isAuthorizer && isAuthenticated ? (
            <Nav.Link>Make Request</Nav.Link>
          ) : (
            <>
            </>
          )}
        </LinkContainer>
        <LinkContainer to="/requests">
        {isAuthenticated ? (
            <Nav.Link>Requests</Nav.Link>
            ) : (
              <>
              </>
            )}
            
        </LinkContainer>
        <LinkContainer to ="/requests/approved">
          {isAuthenticated && !isEmployee && !isAuthorizer ? (
            <Nav.Link> View Approved Requests </Nav.Link>
          ) : (
            <> </>
          )}
        </LinkContainer>
        <LinkContainer to="/admin/users">
          {isAuthorizer ? (
            <Nav.Link> Manage Users </Nav.Link>
          ) : (
            <>
            </>
          )}
        </LinkContainer>
        
        <LinkContainer to="/account/create">
          {isAuthorizer ? (
            <Nav.Link> Create Account </Nav.Link>
          ) : (
            <>
            </>
          )}
          </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <div className="login">
            <p className="username"> Welcome, {username} </p>
            <p className="username"> ({accountType}) </p>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </div>
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
    setAuthorizor(false);
    setEmployee(false);
    history.push("/");
  }
  
}

export default Main;