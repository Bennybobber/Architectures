import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import jwt_decode from "jwt-decode";

export default function Report(props) { 
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [response, setResponse] = useState(undefined);
    const [msgHistory, setMsgHistory] = useState([]);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.username != '') {
                userHasAuthenticated(true);
                setUsername(user.username);
            };
        } catch (error) {
            userHasAuthenticated(false);
        };
        const newSocket = io(`http://${window.location.hostname}:3001`);
        newSocket.on("connect", () => {
            console.log("connected to chat");
        });
        newSocket.on("message", message => {
            let messages = []
            messages.push(message);
            setMsgHistory(msgHistory => [...msgHistory, message])
        });
        setSocket(newSocket);
        return () => {
            newSocket.removeAllListeners();
        }
      }, [setSocket]);

      function handleSubmit(event) {
          event.preventDefault();
          let token = '';
          try{
            const user = JSON.parse(localStorage.getItem('user'));
            token = user.token
          } catch (e)
          {

          }
          socket.emit("message", {message: message, username: username});
          setMessage('');
      }
      

      const chatLog = msgHistory?.map((message, i) => (
        <p key={message.message} >{message.username} : {message.message}</p>
      ));
      return (
          <div className="chatBox">
            <h1> {chatLog} </h1>
            <Form onSubmit = {handleSubmit}>
                <Form.Group size="lg" controlId = "messageBox">
                    <Form.Label> Message Box </Form.Label>
                    <Form.Control 
                        autoFocus
                        type="message"
                        value = {message}
                        maxLength = "256"
                        onChange = {(e) => setMessage(e.target.value)}
                        />
                </Form.Group>
                <Button block size="lg" type="submit" >
                        Submit Message
                </Button>
            </Form>
          </div>
        
      )
}