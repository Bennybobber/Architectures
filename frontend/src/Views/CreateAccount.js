import React, { useState, useEffect  } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function CreateAccount (){
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [isEmployee, setIsEmployee] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthorizer, setAuthorizor] = useState(false);
    
    const [errMsg, setErrMsg] = useState("");
    
    React.useEffect(() => {
      onLoad();
    }, []);
    
    useEffect(() => {
        onLoad();
      }, [userHasAuthenticated, isAuthorizer]);
    
    // Checks the user is logged in.
    async function onLoad() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const date = new Date();
        const token = jwt_decode(user.token);
        setAuthorizor(user.isAuthorizer);
        if ((date.getTime()/1000) > token.exp ){
            userHasAuthenticated(false);
          }else {
            userHasAuthenticated(true);
          }
        }
        catch(e) {
            console.log(e);
        }
      }
    // Ensures that there is a username and a password before being able to submit.
    function validateForm() {
      return username.length > 0 && password.length > 0;
    }
    
    // Handles the submit of creating a new account.
    function handleSubmit(event) {
        event.preventDefault();
        try{
            const data = {
                firstName:firstName,
                lastName:lastName,
                username:username.toLowerCase(),
                password:password,
                isAuthorizer: isAdmin,
                isEmployee: (isAdmin) ? true : isEmployee,
            }
            const config = {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('user')).token
                }
            
            }
            const url = (`http://localhost:3001/api/users`);
            axios.post(url, data, config)
                .then(res => {
                    console.log(res.status);
                    setErrMsg('');
                })
                .catch (err => {
                  setErrMsg(err.response.data);
                })
      } catch (err) {
        alert(err);
        setErrMsg(err);
      }
    }
   if(isAuthenticated && isAuthorizer) {
    return (
      <div className="Form">
        <h1>Account Registration Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="firstName"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
                type="checkbox"
                label="Make Employee"
                disabled = {isAdmin}
                onChange={(e) => setIsEmployee(e.target.checked)}
                />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox1">
            <Form.Check
                type="checkbox"
                label="Make Administrator"
                disabled = {isEmployee}
                onChange={(e) => setIsAdmin(e.target.checked)}
             />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Register Account
          </Button>
          { errMsg &&
            <h3 className="error"> { errMsg } </h3> }
        </Form>
      </div>
    )
          }
    else {
        return (
            <div className = "unauthorised">

            <h1> UNAUTHORISED PAGE </h1>
        </div>
        )
    }
}