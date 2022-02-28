import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/chat.css";

export default function Report(props) { 
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [msgHistory, setMsgHistory] = useState([]);

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.username !== '') {
                setUsername(user.username);
            };
        } catch (error) {
            console.log(error);
        };
        // Socket setup with the chat server. 
        try{
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
        } catch (error) {
            console.log(error);
        }
        
      }, [setSocket]);

      // Sends the messages up to the server via socket.io
      function handleSubmit(event) {
        try{
            event.preventDefault();
            socket.emit("message", {message: message, username: username});
            setMessage('');
        } catch (error) {
            console.log(error);
        }
          
      }
      
      // Renders the list of messages 
      const chatLog = msgHistory?.map((message, i) => (
            <li key={message.message} >
                <h5>{message.username} </h5>
                <p> : {message.message}</p>
            </li>
        
      ));
      return (
          <div className="messages">
            <section id="chatLog" className="chatLog">
                <ul>
                    {chatLog}
                    
                </ul>

            </section>
            <Form onSubmit = {handleSubmit}>
                <Form.Group size="lg" controlId="messageBox">
                    <Form.Label> Message Box </Form.Label>
                    <Form.Control 
                        autoFocus
                        type="message"
                        value = {message}
                        maxLength = "256"
                        onChange = {(e) => setMessage(e.target.value)}
                        />
                </Form.Group>
                <Button block size="lg" id='chatB' type="submit" >
                        Submit Message
                </Button>
            </Form>
          </div>
        
      )
}