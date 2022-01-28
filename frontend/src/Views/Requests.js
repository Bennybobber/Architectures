import React, { Component, useState, useEffect  } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Requests.css"
import axios from "axios";
import Report from "../components/Report.js"
import AdminReport from "../components/adminReport.js"
import AssignedReport from "../components/assignedReport.js"

export default function Requests() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isAuthorizer , setAuthorizor]= useState(false);
  const [BookRequests, setBookRequests] = useState([]);
  const [availableBookRequests, setAvailableBookRequests] = useState([]);
  const [assignedToEmp, setAssignedToEmp] = useState([]);
  const [needsWorkRequests, setWorkRequests] = useState([]);


   useEffect(() => {
    onLoad();
    if (isAuthenticated && (!isEmployee && !isAuthorizer)) {
      GetUserRequests();
    }
    else if (isAuthenticated && (isEmployee || isAuthorizer)) {
      getAllUserRequests();
    }
  }, [isEmployee, isAuthorizer, isAuthenticated]);
  async function onLoad() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const exp = jwt_decode(user.token);
      const date = new Date();
      if (date.getTime() >= exp ){
        userHasAuthenticated(false);
      }else {
        userHasAuthenticated(true);
      }
      setEmployee(user.isEmployee);
      setAuthorizor(user.isAuthorizer);
    }
    catch(e) {
      console.log(e);
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
    let needsWork = [];
    let inQueueRequests = [];
    setBookRequests(bookRequests);

    for (let request = 0; request < bookRequests.length; request++) {
      if (bookRequests[request].needsMoreDetail) {
        needsWork.push(bookRequests[request]);
      } else {
        inQueueRequests.push(bookRequests[request]);
      }
    }
    setBookRequests(inQueueRequests);
    setWorkRequests(needsWork);
  }

  async function getAllUserRequests() {
    const user = JSON.parse(localStorage.getItem('user'));
    const request = await axios.get(`http://localhost:3001/api/requests`,
    {
      headers: {
        'x-access-token': user.token
      }
    })
    const bookRequests = await request.data;

    // Sort out the requests the employee have assigned.
    let assignedToBookRequests = [];
    let availableRequests = [];
    for (let book = 0; book < bookRequests.length; book++) {
      if (bookRequests[book].assignedTo == user._id ) {
        assignedToBookRequests.push(bookRequests[book])
      }
      else if (bookRequests[book].assignedTo == "" && !bookRequests.needsMoreDetail) {
        availableRequests.push(bookRequests[book])
      }
    }
    setAvailableBookRequests(availableRequests);
    setAssignedToEmp(assignedToBookRequests);
  }
  if (isAuthenticated && !isEmployee && !isAuthorizer) {
    const bookRequests = BookRequests?.map((request, i) => (
      <Report key={request._id}
        bookName = {request.bookName}
        bookAuthor = {request.bookAuthor} 
        bookDesc = {request.bookDesc}
        bookPrice =  {request.bookPrice}
        bookGenre =  {request.bookGenre}
        bookId = {request._id}
        assignedTo = {request.assignedTo}
        needsMoreDetail = {request.needsMoreDetail}
        isAdmin = {isAuthorizer}
        />
    ));
    const requiresWorkRequests = needsWorkRequests?.map((request, i) => (
      <Report key={request._id}
        bookName = {request.bookName}
        bookAuthor = {request.bookAuthor} 
        bookDesc = {request.bookDesc}
        bookPrice =  {request.bookPrice}
        bookGenre =  {request.bookGenre}
        bookId = {request._id}
        assignedTo = {request.assignedTo}
        needsMoreDetail = {request.needsMoreDetail}
        isAdmin = {isAuthorizer}
        />
    )); 
        return (
            <div className = "content">
                <div className = 'showRequests'>
                    <h1>Your Requests</h1>
                    {bookRequests}
                </div>
                <div className = 'showRequests'>
                  <h1> Requires Work </h1>
                  {requiresWorkRequests}
                </div>
            </div>
        )
  }
  else{
    const availableRequests = availableBookRequests?.map((request, i) => (
      <AdminReport key={request._id}
        bookName = {request.bookName}
        bookAuthor = {request.bookAuthor} 
        bookDesc = {request.bookDesc}
        bookPrice =  {request.bookPrice}
        bookGenre =  {request.bookGenre}
        bookId = {request._id}
        assignedTo = {request.assignedTo}
        needsMoreDetail = {request.needsMoreDetail}
        isAdmin = {isAuthorizer}
        />
    ));
    const yourRequests = assignedToEmp?.map((request, i) => (
      <AssignedReport key={request._id}
        bookName = {request.bookName}
        bookAuthor = {request.bookAuthor} 
        bookDesc = {request.bookDesc}
        bookPrice =  {request.bookPrice}
        bookGenre =  {request.bookGenre}
        bookId = {request._id}
        assignedTo = {request.assignedTo}
        needsMoreDetail = {request.needsMoreDetail}
        isAdmin = {isAuthorizer}
        />
    ));
    return(
    <div className = "content">
      <div className = "showAssignedRequests">
          <h1>Your Assigned Requests</h1>
          {yourRequests}
      </div>
      <div className = "showAssignedRequests">
        <h1> Available Requests</h1>
        {availableRequests}
      </div>
    </div>
    )
  }
}
