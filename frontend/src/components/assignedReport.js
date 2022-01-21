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
                    console.log(res.data);
                    if (res.status === 200){
                        setSuccMsg("Successfully Assigned Ticket");
                        window.location.reload(false);
    
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
                    console.log(res.data);
                    if (res.status === 200){
                        setSuccMsg("Successfully Assigned Ticket");
                        window.location.reload(false);
    
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
                    console.log(res.data);
                    if (res.status === 200){
                        setSuccMsg("Successfully Assigned Ticket");
                        window.location.reload(false);
    
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
    }
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
                            <Button variant="success" onClick={ () => unassignRequest()}>
                                Unassign Book
                            </Button>
                            <Button variant="success" onClick={ () => unassignRequest()}>
                                Request More Details
                            </Button>
                            <Button variant="success" onClick={ () => unassignRequest()}>
                                Request Approval
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
        )
    
}