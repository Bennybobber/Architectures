import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function MakeRequest() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isEmployee, setEmployee] = useState("");
    const [isAuthorizer , setAuthorizor]= useState("");
    const [errMsg, setErrMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");

    const [bookName, setBookName] = useState("");
    const [bookDesc, setBookDesc] = useState("");
    const [bookPrice, setBookPrice] = useState("");
    const [bookGenre, setBookGenre] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");

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
            setEmployee(user.isEmployee);
            setAuthorizor(user.isAuthorizer);
            }
        catch(e) {
        }
    }
    function validateForm() {
        return bookName.length > 0;
      }   
    if (isAuthenticated){
        return (
            <div class="Form">
                <div class="heading">
                    <h1> Request A Book Form </h1>
                    <p> Please fill out the following form to request a new book in stock</p>
                </div>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group size="lg" controlId = "bookName">
                        <Form.Label> Name of book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookName"
                            value = {bookName}
                            onChange = {(e) => setBookName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookAuthor">
                        <Form.Label> Author of book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookAuthor"
                            value = {bookAuthor}
                            onChange = {(e) => setBookAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookDesc">
                        <Form.Label> Brief Description of Book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookDesc"
                            value = {bookDesc}
                            onChange = {(e) => setBookDesc(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookPrice">
                        <Form.Label> Price of book £(GBP)</Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookPrice"
                            value = {bookPrice}
                            onChange = {(e) => setBookPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookGenre">
                        <Form.Label> Genre of book</Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookGenre"
                            value = {bookGenre}
                            onChange = {(e) => setBookGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()} >
                        Submit Request
                    </Button>
                    <>

                        { errMsg ? (
                            <h3 className="error"> { errMsg } </h3>
                            ) : (
                            <h3 className="success"> {succMsg} </h3>
                            ) }
                    </>
                        
                </Form>
            </div>
        );
    }
    return (
        <h1> Please Log In With A Client Account </h1>
    )

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(bookName);
        try{
            axios.post(`http://localhost:3001/api/requests`,
              {
                bookName:bookName,
                bookDesc:bookDesc,
                bookGenre: bookGenre,
                bookPrice: bookPrice,
                bookAuthor: bookAuthor,
                date: Date.now(),
                token: JSON.parse(localStorage.getItem('user')).token,
              },
              {
                validateStatus: false
              } 
            )
              .then(res => {
                console.log(res.data);
                if (res.status === 200){
                    setSuccMsg("Successfully Created Ticket");

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
}