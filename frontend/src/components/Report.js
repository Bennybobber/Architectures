import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Report.css";
import axios from 'axios';



export default function Report(props) {
    const [isEdit, setIsEdit] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");
    const [bookName, setBookName] = useState(props.bookName);
    const [bookDesc, setBookDesc] = useState(props.bookDesc);
    const [bookPrice, setBookPrice] = useState(props.bookPrice);
    const [bookGenre, setBookGenre] = useState(props.bookGenre);
    const [bookAuthor, setBookAuthor] = useState(props.bookAuthor);
    const cancelRequest = () =>{
        if (window.confirm("Are you sure you want to delete this request?")){ 
            const url = (`http://localhost:3001/api/requests/` + props.bookId);
            const config = {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('user')).token
                }
            
            }
            try{
                axios.delete(url, config)
                .then(res => {
                    console.log(res);
                    window.location.reload(false);
                })
            }
            catch (err) {
                alert(err.message);
            }
        }
    }
    const  moveBackToReview = () => {
        if (window.confirm("Are you sure you want to move this back onto the queue for review?")){ 
            const data = {
                needsMoreDetail: false,
            }
            const config = {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('user')).token
                }
                
            }
            const url = (`http://localhost:3001/api/requests/` + props.bookId);
            try{
                axios.patch(url, data, config)
                .then(res => {
                    setSuccMsg("Moved back to queue");
                    window.location.reload(false);
                  })
                .catch (err => {
                  alert(err.message);
                  setErrMsg(err.data);
                })
            }
            catch (error){
                console.log()
            }
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(bookName);
        setIsEdit(false);
        const data = {
            bookName:bookName,
            bookDesc:bookDesc,
            bookGenre: bookGenre,
            bookPrice: bookPrice,
            bookAuthor: bookAuthor,
        }
        const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('user')).token
            }
            
          }
        const url = (`http://localhost:3001/api/requests/` + props.bookId);
        try{
            axios.patch(url, data, config)
              .then(res => {
                console.log(res.data);
                if (res.status === 200){
                    setSuccMsg("Successfully Edited Ticket");

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
    
        return(
        <div className ="request">
            <h1> Book Request for {props.bookName} </h1>
            
            <div className = "innerBox" >
                { isEdit ? (
                    <div>
                        <Form onSubmit = {handleSubmit}>
                    <Form.Group size="lg" controlId = "bookName">
                        <Form.Label> Name of book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookName"
                            value = {bookName}
                            maxLength="64"
                            onChange = {(e) => setBookName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookAuthor">
                        <Form.Label> Author of book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookAuthor"
                            value = {bookAuthor}
                            maxLength="64"
                            onChange = {(e) => setBookAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookDesc">
                        <Form.Label> Brief Description of Book </Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookDesc"
                            value = {bookDesc}
                            maxLength="256"
                            onChange = {(e) => setBookDesc(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookPrice">
                        <Form.Label> Price of book £(GBP)</Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookPrice"
                            maxLength= "32"
                            value = {bookPrice}
                            onChange = {(e) => setBookPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId = "bookGenre">
                        <Form.Label> Genre of book</Form.Label>
                        <Form.Control
                            autoFocus
                            type="bookGenre"
                            maxLength="128"
                            value = {bookGenre}
                            onChange = {(e) => setBookGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" >
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
                ) : (
                    <div className="editForm">
                        <Table striped bordered hover size>
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Book Author</th>
                                    <th>Book Desc</th>
                                    <th>Book Price (£)</th>
                                    <th>Book Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{bookName}</td>
                                    <td>{bookAuthor}</td>
                                    <td>{bookDesc}</td>
                                    <td>{bookPrice}</td>
                                    <td>{bookGenre}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className = "buttonBox">
                            {(props.assignedTo !== "" && !props.needsMoreDetail) ? (
                                props.approved ? (
                                    <></>
                                ) : (
                                    <h1> Request is being processed...</h1>
                                )
                                
                            ) : (
                                props.approved ? (
                                    <>
                                    </>
                                ) : (
                                    <div>
                                        <Button variant="success" className="buttons"  onClick={ () => setIsEdit(true)}>
                                            Edit Book Request
                                        </Button>
                                        <Button variant="danger" className="buttons"  onClick={ () => cancelRequest()}>
                                            Cancel Request
                                        </Button>
                                    </div>
                                )
                            )}
                            {props.needsMoreDetail && !props.approved ? (
                                <Button variant="info" className="buttons" onClick={ () => moveBackToReview()}>
                                    Notify Edits Have Been Made
                                </Button>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        )
    
}