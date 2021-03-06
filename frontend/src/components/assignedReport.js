import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../styles/Report.css";
import axios from 'axios';


export default function AssignedReport(props) {

    // Unassigns a report from the current employee, so it can be picked up by others.
    function unassignRequest() {
        try{
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
            
                axios.patch(url, data, config)
                .then(res => {
                    window.location.reload(false);
                  })
                .catch (err => {
                  alert(err.message);
                })
            }
        }
        
        catch (error){
                console.log()
        }
    }

    // Set the status on a report that it requires more details, this notifies and moves from the available reports.
    function askForDetails() {
        try{
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
            
                    axios.patch(url, data, config)
                    .then(res => {
                        window.location.reload(false);
                      })
                    .catch (err => {
                      alert(err.message);
                    })
                }
        }
        catch (error){
            console.log()
        }
    }
    
    // Sets the status on a report to ask for approval from an authorizor
    function askApproval() {
        try{
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
            
                axios.patch(url, data, config)
                .then(res => {
                    window.location.reload(false);
                })
                .catch (err => {
                    alert(err.message);
                })
            }
        }catch (err) {
            alert(err.message);
        }
    }

    // Assigns the request to the current employee user
    function assignRequest() {
        try{
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
            
                axios.patch(url, data, config)
                .then(res => {
                    window.location.reload(false);
                })
                .catch (err => {
                    alert(err.message);
                })
            }
        }catch (err) {
            alert(err.message);
        }
    }

    // If an admin, they can give the approval for the request, which means an employee can complete the request
    function giveAdminApproval() {
        try{
            if (window.confirm("Are you sure you want to be assigned this request?")){ 
                const data = {
                    approvalStatus: 'Approved',
                    needsAuthorizer: false,
                }
                const config = {
                    headers: {
                        'x-access-token': JSON.parse(localStorage.getItem('user')).token
                    }
                
                }
                const url = (`http://localhost:3001/api/requests/` + props.bookId);
            
                axios.patch(url, data, config)
                .then(res => {
                    window.location.reload(false);
                })
                .catch (err => {
                    alert(err.message);
                })
            }
        }catch (err) {
            alert(err.message);
        }
    }
    // If an admin, they can deny approval for a request, marking it to be deleted.
    function denyApproval() {
        try{
            if (window.confirm("Are you sure you want to be assigned this request?")){ 
                const data = {
                    approvalStatus: 'Denied',
                    needsAuthorizer: false,
                }
                const config = {
                    headers: {
                        'x-access-token': JSON.parse(localStorage.getItem('user')).token
                    }
                }
                const url = (`http://localhost:3001/api/requests/` + props.bookId);
                axios.patch(url, data, config)
                .then(res => {
                    window.location.reload(false);
                })
                .catch (err => {
                    alert(err.message);
                })
            }
        }catch (err) {
            alert(err.message);
        }
    }
    // If an Employee, they can mark the request as approved.
    function approveBookRequest() {
        try{
            const data = {
                isProcessed: true,
            }
            const config = {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('user')).token
                }
            
            }
            const url = (`http://localhost:3001/api/requests/` + props.bookId);
        
            axios.patch(url, data, config)
            .then(res => {
                window.location.reload(false);
            })
            .catch (err => {
                alert(err.message);
            })
        
        }catch (err) {
            alert(err.message);
        }
    };

    // If an Employee, they can deny the book request.
    function denyBookRequest() {
        try{
            if (window.confirm("This action will delete this book request, are you sure?")){ 
                const url = (`http://localhost:3001/api/requests/` + props.bookId);
                const config = {
                    headers: {
                        'x-access-token': JSON.parse(localStorage.getItem('user')).token
                    }
                }
                axios.delete(url, config)
                .then(res => {
                    window.location.reload(false);
                })
            }
        }
        catch (err) {
            alert(err.message);
        } 
    }
    //Render HTML... 
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
                            
                            {(props.needsApproval ) ? ( 
                            
                                <>
                                <div className="waiting">
                                    <h4> Awaiting Approval </h4>
                                </div>
                                </>

                            ) : (
                                (props.assignedTo !== "" && props.approvalStatus === 'In Progress' && !props.needsMoreDetail) ? (
                                    <Button variant="info" className="buttons" onClick={ () => askApproval()}>
                                        Request Approval
                                    </Button>
                                ) : (
                                    <></>
                                )
                                
                            )}

                            {(!props.needsMoreDetail && props.assignedTo !== "" && !props.needsApproval && props.approvalStatus === 'In Progress') ? ( 
                                <Button variant="primary" className="buttons" onClick={ () => askForDetails()}>
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
                            {(props.assignedTo === "" && !props.needsMoreDetail) ? (
                                <Button variant="success" onClick={ () => assignRequest()}>
                                    Assign Book Request
                                </Button>
                            ) :
                            (   !props.needsApproval && !props.needsMoreDetail && props.approvalStatus === 'In Progress' ? (
                                    <Button variant="warning" className="buttons" onClick={ () => unassignRequest()}>
                                        Unassign Book
                                    </Button>
                                ) : (
                                    <></>
                                )
                                
                            )}
                            {((props.approvalStatus === 'In Progress') && !props.needsApproval && props.assignedTo !== "" && !props.needsMoreDetail) ? (
                                <div>
                                    <Button variant="success" className="buttons" onClick={ () => approveBookRequest()}>
                                        Approve Book Request
                                    </Button>
                                    <Button variant="danger" className="buttons" onClick={ () => denyBookRequest()}>
                                        Deny (Cancel) Book Request
                                    </Button>
                                </div>
                                
                            ) : (
                                <></>
                            )}
                            {(props.approvalStatus === 'Approved') ? (
                                <>
                                    <h1> An Authorisor has Approved this request</h1>
                                    <Button variant="success" className="buttons" onClick={ () => approveBookRequest()}>
                                        Approve Book Request
                                    </Button>
                                    </>
                                ) : (
                                <> </>
                            )}
                            {(props.approvalStatus === 'Denied') ? (
                                <>
                                    <h1> An Authorisor has denied this request</h1>
                                    <Button variant="danger" className="buttons" onClick={ () => denyBookRequest()}>
                                        Deny (Cancel) Book Request
                                    </Button>
                                </>
                                ) : (
                                <> </>
                            )}
                            
                        </div>
                    </div>
            </div>
        </div>
        )
    } else if (props.isAdmin && !props.isEmployee) {
        // The view that the admins can see, they will see if any requests need approval and can then approve deny them.
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
                            
                            <Button variant="success" className="buttons" onClick={ () => giveAdminApproval()}>
                                Approve Request
                            </Button>
                            <Button variant="danger" className="buttons" onClick={ () => denyApproval()}>
                                Deny Request
                            </Button>
                            
                        </div>
                    </div>
            </div>
        </div>
        )
    }
    
}