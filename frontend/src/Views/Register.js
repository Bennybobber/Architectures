import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useAppContext } from "../lib/contextLib";
import "../styles/login.css"

export default function Register() {
  const { isAuthenticated ,userHasAuthenticated } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  
  const [errMsg, setErrMsg] = useState("");
  
  // Move to home screen if they're authenitcated.
  useEffect(() => {
    onLoad();
    async function onLoad() {
      try {
        if (isAuthenticated) window.location = '/';
      }
      catch(e) {
      }
    }
  }, [isAuthenticated]);
  
  
  // Ensure that they've given a username and  password.
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  // Submits the users details to the server, if they're valid will be issued with a web token.
  function handleSubmit(event) {
    event.preventDefault();
    try{
    axios.post(`http://localhost:3001/api/register`,
      {
        firstName:firstName,
        lastName:lastName,
        username:username.toLowerCase(),
        password:password
      },
      {
        validateStatus: false
      } 
    )
      .then(res => {
        if (res.status === 201){
          const persons = res.data;
          const user = persons
          // Store the user token in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          userHasAuthenticated(true);
          window.location = '/';
        }
        else{
          setErrMsg(res.data);
        }
      })
    } catch (err) {
      alert(err.message);
      setErrMsg(err.data);
    }
  }

  return (
    <div className="Form">
      <h1>Registration Form</h1>
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
        <Button block size="lg" type="submit" id='register' disabled={!validateForm()}>
          Register
        </Button>
        { errMsg &&
          <h3 className="error"> { errMsg } </h3> }
      </Form>
    </div>
  );
}
