import React, { useState, useEffect } from "react";
import {withRouter} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useAppContext } from "../lib/contextLib";


export default function Login() {
  const { isAuthenticated ,userHasAuthenticated } = useAppContext();
  let { user, setUser } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
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
      }
    )
      .then(res => {
        console.log('b');
        console.log(res.status);
        const persons = res.data;
        user = persons
        localStorage.setItem('user', JSON.stringify(user));
        userHasAuthenticated(true);
        window.location = '/';
      })
    } catch (err) {
      console.log('a');
      alert(err.message);
    }
    console.log('ab');
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
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
      </Form>
    </div>
  );
}
