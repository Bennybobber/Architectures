import React, {useState, useEffect  } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../styles/Report.css";
import {useHistory} from "react-router-dom";
import axios from 'axios';


export default function AssignedReport(props) {
    const history = useHistory();
    const [errMsg, setErrMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");
    function unassignRequest() {
        console.log(JSON.parse(localStorage.getItem('user'))._id);
        if (window.confirm("Are you sure you want to be assigned this request?")){ 
            const data = {
                assignedTo: "",
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
                    setSuccMsg("Request has been unassigned");
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
    function askForDetails() {
        if (window.confirm("Are you sure you want to ask for more details from the user?")){
            const data = {
                needsMoreDetail: true,
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
                    setSuccMsg("Details requested");
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
    function askApproval() {
        if (window.confirm("Are you sure you want to ask for approval for this request?")){
            const data = {
                needsAuthorizer: true,
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
                    setSuccMsg("Successfully Assigned Ticket");
                    window.location.reload(false);
                })
                .catch (err => {
                    alert(err.message);
                    setErrMsg(err.data);
                })
            }catch (err) {
                alert(err.message);
                setErrMsg(err.data);
            }
        }
    }
    function assignRequest() {
        console.log(JSON.parse(localStorage.getItem('user'))._id);
        if (window.confirm("Are you sure you want to be assigned this request?")){ 
            const data = {
                assignedTo: JSON.parse(localStorage.getItem('user'))._id,
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
                    setSuccMsg("Successfully Assigned Ticket");
                    window.location.reload(false);
                })
                .catch (err => {
                    alert(err.message);
                    setErrMsg(err.data);
                })
            }catch (err) {
                alert(err.message);
                setErrMsg(err.data);
            }
    }
    }
    if(props.isEmployee) {

    
        return(
        <div className ="request">
            <h1> Book Request for {props.bookName} </h1>
            
            <div className = "innerBox" >
                    <div className="editForm">
                        <Table striped bordered hover size>
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Book Author</th>
                                    <th>Book Desc</th>
                                    <th>Book Price</th>
                                    <th>Book Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.bookName}</td>
                                    <td>{props.bookAuthor}</td>
                                    <td>{props.bookDesc}</td>
                                    <td>{props.bookPrice}</td>
                                    <td>{props.bookGenre}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className = "buttonBox">
                            
                            {props.isAdmin ? ( 
                            
                                <></>

                            ) : (
                                <Button variant="success" className="buttons" onClick={ () => askApproval()}>
                                    Request Approval
                                </Button>
                            )}
                            
                            {(!props.needsMoreDetail && props.assignedTo != "" ) ? ( 
                                <Button variant="success" className="buttons" onClick={ () => askForDetails()}>
                                    Request More Details
                                </Button>
                            ) : (
                                props.needsMoreDetail ? (
                                    <>
                                    <div className="waiting">
                                        <h4> Awaiting Details </h4>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )   
                            )}
                            {props.assignedTo == "" ? (
                                <Button variant="success" onClick={ () => assignRequest()}>
                                    Assign Book Request
                                </Button>
                            ) :
                            (
                                <Button variant="success" className="buttons" onClick={ () => unassignRequest()}>
                                Unassign Book
                                </Button>
                            )}
                            {props.isAdmin ? (
                                <div>
                                <Button variant="info" className="buttons" >
                                    Approve Ticket
                                </Button>
                                <Button variant="info" className="buttons" >
                                    Disapprove Ticket
                                </Button>
                                </div>
                            ) : (
                                <>
                                </>
                            )}
                            
                        </div>
                    </div>
            </div>
        </div>
        )
    } else if (props.isAdmin && !props.isEmployee) {
        return (
            <div className ="request">
            <h1> Book Request for {props.bookName} </h1>
            
            <div className = "innerBox" >
                    <div className="editForm">
                        <Table striped bordered hover size>
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Book Author</th>
                                    <th>Book Desc</th>
                                    <th>Book Price</th>
                                    <th>Book Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.bookName}</td>
                                    <td>{props.bookAuthor}</td>
                                    <td>{props.bookDesc}</td>
                                    <td>{props.bookPrice}</td>
                                    <td>{props.bookGenre}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className = "buttonBox">
                            
                            {props.isAdmin ? ( 
                            
                                <></>

                            ) : (
                                <Button variant="success" className="buttons" onClick={ () => askApproval()}>
                                    Request Approval
                                </Button>
                            )}
                            
                            {(!props.needsMoreDetail && props.assignedTo != "" ) ? ( 
                                <Button variant="success" className="buttons" onClick={ () => askForDetails()}>
                                    Request More Details
                                </Button>
                            ) : (
                                props.needsMoreDetail ? (
                                    <>
                                    <div className="waiting">
                                        <h4> Awaiting Details </h4>
                                    </div>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )   
                            )}
                            {props.assignedTo == "" ? (
                                <Button variant="success" onClick={ () => assignRequest()}>
                                    Assign Book Request
                                </Button>
                            ) :
                            (
                                <Button variant="success" className="buttons" onClick={ () => unassignRequest()}>
                                Unassign Book
                                </Button>
                            )}
                            
                        </div>
                    </div>
            </div>
        </div>
        )
    }
    
}