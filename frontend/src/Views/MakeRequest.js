import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import "../styles/makeRequest.css"

export default function MakeRequest() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
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
    // Retrieve the user from storage to see if they're logged in.
    async function onLoad() {
        try {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            const exp = jwt_decode(user.token).exp;
            if (Date.now() >= exp * 1000){
                userHasAuthenticated(false);
            }else {
                userHasAuthenticated(true);
            }
            }
        catch(e) {
        }
    }
    // Ensures that a book name has been given to a request
    function validateForm() {
        return (bookName.length > 0);
      }

    // Validate the price to only be a number with 1 decimal point
    function validatePrice(e) {
        //eslint-disable-next-line
        var regexp = /^[0-9\b\.]+$/;
        if (e.target.value === "" || regexp.test(e.target.value))
            if(e.target.value.split(".").length -1 <= 1){
                setBookPrice(e.target.value);
            }
            
    }  
    // If they're authenticated show them the form, otherwise tell them they're unauthorised.
    if (isAuthenticated){
        return (
            <div className="Form">
                <div className="heading">
                    <h1> Request A Book Form </h1>
                    <p> Please fill out the following form to request a new book in stock</p>
                </div>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group size="lg" controlId = "bookName">
                        <Form.Label> Name of book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookName"
                            maxLength= "64"
                            value = {bookName}
                            onChange = {(e) => setBookName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookAuthor">
                        <Form.Label> Author of book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookAuthor"
                            maxLength= "64"
                            value = {bookAuthor}
                            onChange = {(e) => setBookAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookDesc">
                        <Form.Label> Brief Description of Book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookDesc"
                            maxLength= "256"
                            value = {bookDesc}
                            onChange = {(e) => setBookDesc(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookPrice">
                        <Form.Label> Price of book ??(GBP)</Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookPrice"
                            maxLength= "32"
                            value = {bookPrice}
                            onChange = {(e) => validatePrice(e)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookGenre">
                        <Form.Label> Genre of book</Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookGenre"
                            maxLength= "128"
                            value = {bookGenre}
                            onChange = {(e) => setBookGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Button block id='submit' size="lg" type="submit" disabled={!validateForm()} >
                        Submit Request
                    </Button>
                    <>

                        { errMsg ? (
                            <h3 className="error"> { errMsg } </h3>
                        ) : (
                            <> </>
                        ) }
                        { succMsg ? (
                            <h3 className="success"> {succMsg} </h3>
                        ) : (
                            <> </>
                        )} 
                    </>
                        
                </Form>
            </div>
        );
    }
    return (
        <h1> Please Log In With An Account To Make Book Requests </h1>
    )

    function handleSubmit(event) {
        event.preventDefault();
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
                setSuccMsg("Successfully Created Ticket");
                setBookName("");
                setBookAuthor("");
                setBookDesc("");
                setBookGenre("");
                setBookPrice("");

              })
            } catch (err) {
              alert(err.message);
              setErrMsg(err.data);
            }
          
    }
}