import React, { Component, useState, useEffect  } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Requests.css"
import axios from "axios";
import Report from "../components/Report.js"

export default function Requests() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isEmployee, setEmployee] = useState("");
  const [isAuthorizer , setAuthorizor]= useState("");
  const [BookRequests, setBookRequests] = useState([]);


   useEffect(() => {
     onLoad();
     GetUserRequests();
  }, []);
  async function onLoad() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const exp = jwt_decode(user.token);
      if (Date.now() >= exp * 1000){
        userHasAuthenticated(false);
      }else {
        userHasAuthenticated(true);
      }
      setEmployee(user.isEmployee);
      setAuthorizor(user.isAuthorizer);
      // getUserRequests(user._id, user.token);
      GetUserRequests();
    }
    catch(e) {
    }
  }
  // Retrieve a specific users book requests
  async function GetUserRequests() {
    const user = JSON.parse(localStorage.getItem('user'));
    const request = await axios.get(`http://localhost:3001/api/user/requests/${user._id}`,
    {
      headers: {
        'x-access-token': user.token
      }
    })
    const bookRequests = await request.data;
    
    setBookRequests(bookRequests);
    
  }

  if (isAuthenticated) {
    const bookRequests = BookRequests?.map((request, i) => (
      <li key={i} className="Arse"> {request.bookName}</li>
    ));
        return (
            <div className = "content">
                <div className = 'showRequests'>
                    <h1>Your Requests</h1>
                    {bookRequests}
                </div>
            </div>
        )
  }
  else{
    return(
    <div>
      <h3> NOT STUFF</h3>
    </div>
    )
  }
}
