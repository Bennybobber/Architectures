import React from "react";
import axios from 'axios';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../styles/User.css";
export default function User (props) {
    function deleteUser() {
        const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('user')).token
            }
            
          }
        const url = (`http://localhost:3001/api/users/` + props.userId);
        try{
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
        return (
            <div className = "userBox">
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
                <Button className="button" onClick={ () => deleteUser()} variant="danger"> Delete User </Button>
                </div>
                
            </div>
        )

}