import React, { Component, useState, useEffect  } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User.js"


export default function ManageAccounts() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthorizer , setAuthorizor]= useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [clientUsers, setClientUsers] = useState([]);
    const [empUsers, setEmpUsers] = useState([]);

    useEffect(() => {
        onLoad();
        if (isAuthorizer) {
            getAllUsers();
        }
      }, [userHasAuthenticated, isAuthorizer]);
      
    async function onLoad() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const date = new Date();
        const token = jwt_decode(user.token);
        setAuthorizor(user.isAuthorizer);
        if ((date.getTime()/1000) > token.exp ){
            userHasAuthenticated(false);
          }else {
            userHasAuthenticated(true);
          }
        }
        catch(e) {
            console.log(e);
        }
      }

    async function getAllUsers() {
        const user = JSON.parse(localStorage.getItem('user'));
        const request = await axios.get(`http://localhost:3001/api/users`,
        {
            headers: {
                'x-access-token': user.token
            }
        })
        const users =  await request.data
        setAllUsers(users)
        let employees = []
        let customers = []
        for (let user = 0; user < users.length; user++ ) {
            if (users[user].isEmployee ) {
                if (!users[user].isAuthorizer){
                    employees.push(users[user]);
                }
            }
            else {
                customers.push(users[user]);
            }
        }
        setClientUsers(customers);
        setEmpUsers(employees);
    }
    if( isAuthenticated && isAuthorizer){
    const customerUsers = clientUsers?.map((user, i) => (
        <User key = {user._id}
            userId = {user._id}
            username = {user.username}
            firstName = {user.firstName}
            lastName = {user.lastName}
            isEmployee = {user.isEmployee}
            isAuthorizer = {user.isAuthorizer}
            />
    ));

    const employeeUsers = empUsers?.map((user, i) => (
        <User key = {user._id}
            userId = {user._id}
            username = {user.username}
            firstName = {user.firstName}
            lastName = {user.lastName}
            isEmployee = {user.isEmployee}
            isAuthorizer = {user.isAuthorizer}
            />
    ));
    return (
        <div className="content">
            <div> 
                <h1> Manage Customers </h1>
                {customerUsers}
            </div>

            <div>
                <h1>Mange Employees </h1>
                {employeeUsers}
            </div>
        </div>
        
    )
    }
    else {
        return (
            <h1> YOU'RE UNAUTHORISED TO VIEW THIS PAGE </h1>
        )
    }
    
}