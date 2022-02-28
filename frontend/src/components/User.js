import React, { useState } from "react";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../styles/User.css";
export default function User (props) {
    const [isEdit, setIsEdit] = useState(false);
    const [username, setUsername] = useState(props.username);
    const [firstName, setfirstName] = useState(props.firstName);
    const [lastName, setlastName] = useState(props.lastName);
    const [isEmployee, setIsEmployee] = useState(props.isEmployee);
    const [isAdmin, setIsAdmin] = useState(props.isAuthorizer);
    const [errMsg, setErrMsg] = useState("");

    // Sends a request to delete the user
    function deleteUser() {
        try{
          const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('user')).token
            }
          }
          const url = (`http://localhost:3001/api/users/` + props.userId);
            if (window.confirm("Are sure you want to delete this user?")){
            axios.delete(url, config)
              .then(res => {
                window.location.reload(false);
              })
            }
          } catch (err) {
            alert(err.message);
          }    
    }
    // Handles the submit from the form, and posts a new user to the server
    function handleSubmit(event) {
        event.preventDefault();
        try{
            const data = {
                firstName:firstName,
                lastName:lastName,
                username:username.toLowerCase(),
                isAuthorizer: isAdmin,
                isEmployee: (isAdmin) ? true : isEmployee,
            }
            const config = {
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('user')).token
                }
            
            }
            const url = (`http://localhost:3001/api/users/`+props.userId);
            axios.patch(url, data, config)
                .then(res => {
                    if (res.status === 200){
                        console.log("Created");
                        setIsEdit(false);
                    }
                })
                .catch (err => {
                  setErrMsg(err.response.data);
                })
      } catch (err) {
        alert(err);
        setErrMsg(err);
      }
    }
    // Ensure that the username field is filled. 
    function validateForm() {
        return username.length > 0;
    }
    return (
            <div>
            { isEdit ? (
                <div className="Form">
                <h1>Account Registration Form</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      autoFocus
                      type="firstName"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="lastName"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                   {(props.isEmployee && props.isAdmin) === false ? (<></>
                    ) : (
                    <> 
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Make Employee"
                            disabled = {isAdmin}
                            checked = {isEmployee}
                            onChange={(e) => setIsEmployee(e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox1">
                            <Form.Check
                                type="checkbox"
                                label="Make Administrator"
                                disabled = {isEmployee}
                                checked = {isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>
                    </>
                    )}
                  
                  <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Submit Changes
                  </Button>
                  { errMsg !== '' ? (<> <h3 className="error"> { errMsg } </h3>  </>) : (<> arse</>)
                    }
                </Form>
              </div>
            ) : ( <div className = "userBox">
                <h1>User: {props.username}</h1>
                <Table>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Status </th>
                            <th> Admin Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{props.userId}</td>
                            <td>{props.firstName}</td>
                            <td>{props.lastName}</td>
                            <td>{(props.isEmployee) || (props.isAuthorizer) ? 'Employee' : 'Client'}</td>
                            <td>{(props.isAuthorizer) ? 'Admin' : 'Not Admin'}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="Buttons">
                    <Button className="button" onClick={ () => deleteUser()} variant="danger">
                        Delete User 
                    </Button>
                    <Button variant="success" className="buttons"  onClick={ () => setIsEdit(true)}>
                        Edit user
                    </Button>
                </div>
              </div>
            )
            }
            </div>
        )

}