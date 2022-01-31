import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../styles/Report.css";
import axios from 'axios';


export default function AssignedReport(props) {
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
    function giveAdminApproval() {
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

    function giveAdminApproval() {
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
            try{
                axios.patch(url, data, config)
                .then(res => {
                    setSuccMsg("Successfully Denied Ticket");
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

    function approveBookRequest() {
        const data = {
            isProcessed: true,
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
                setSuccMsg("Successfully Denied Ticket");
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
    };
    function denyBookRequest() {
        const data = {
            isProcessed: true,
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
                setSuccMsg("Successfully Denied Ticket");
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
                                (props.assignedTo !== "" && props.approvalStatus === 'In Progress') ? (
                                    <Button variant="success" className="buttons" onClick={ () => askApproval()}>
                                        Request Approval
                                    </Button>
                                ) : (
                                    <></>
                                )
                                
                            )}

                            {(!props.needsMoreDetail && props.assignedTo !== "" && !props.needsApproval && props.approvalStatus === 'In Progress') ? ( 
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
                            {(props.assignedTo === "") ? (
                                <Button variant="success" onClick={ () => assignRequest()}>
                                    Assign Book Request
                                </Button>
                            ) :
                            (   !props.needsApproval && props.approvalStatus === 'In Progress' ? (
                                    <Button variant="success" className="buttons" onClick={ () => unassignRequest()}>
                                        Unassign Book
                                    </Button>
                                ) : (
                                    <></>
                                )
                                
                            )}
                            {((props.approvalStatus === 'Approved' || props.approvalStatus === 'In Progress') && !props.needsAuthorizer) ? (
                                <div>
                                    <Button variant="success" className="buttons" onClick={ () => unassignRequest()}>
                                        Approve Book Request
                                    </Button>
                                    <h1> An Authorisor has approved this request</h1>
                                </div>
                                
                            ) : (
                                <></>
                            )}
                            {((props.approvalStatus === 'Denied' || props.approvalStatus === 'In Progress') && !props.needsAuthorizer) ? (
                                <div>
                                <Button variant="danger" className="buttons" onClick={ () => unassignRequest()}>
                                    Deny Book Request
                                </Button>
                                <h1> An Authorisor has denied this request</h1>
                            </div>
                            ) : (
                                <></>
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
                            <Button variant="danger" className="buttons" onClick={ () => giveAdminApproval()}>
                                Deny Request
                            </Button>
                            
                        </div>
                    </div>
            </div>
        </div>
        )
    }
    
}