import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useAppContext } from "../lib/contextLib";
import "../styles/login.css"

export default function Login() {
  const { isAuthenticated ,userHasAuthenticated } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [errMsg, setErrMsg] = useState("");
  
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      if (isAuthenticated) window.location = '/';
    }
    catch(e) {
    }
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    try{
    axios.post(`http://localhost:3001/api/login`,
      {
        username:username,
        password:password
      },
      {
        validateStatus: false
      } 
    )
      .then(res => {
        console.log(res.data);
        if (res.status === 200){
          const persons = res.data;
          const user = persons
          console.log(user);
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
      <h1>Login Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        { errMsg &&
          <h3 className="error"> { errMsg } </h3> }
      </Form>
    </div>
  );
}
