import React, {useState, useEffect} from "react";
import Report from "../components/Report.js"
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function CompletedRequests() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isEmployee, setEmployee] = useState(false);
    const [isAuthorizer , setAuthorizor]= useState(false);
    const [BookRequests, setBookRequests] = useState([]);
   // Verifies the user is logged in.
    useEffect(() => {
        onLoad();
        if (isAuthenticated && (!isEmployee && !isAuthorizer)) {
          GetUserRequests();
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
          await setEmployee(user.isEmployee);
          await setAuthorizor(user.isAuthorizer);
        }
        catch(e) {
          console.log(e);
        }  
    }

// Retrieves all of the user requests and only takes out the processed ones.
async function GetUserRequests() {
  try{
    const user = JSON.parse(localStorage.getItem('user'));
    const request = await axios.get(`http://localhost:3001/api/user/requests/${user._id}`,
    {
      headers: {
        'x-access-token': user.token
      }
    })
    const bookRequests = await request.data;
    let books = [];
    
    

    for (let request = 0; request < bookRequests.length; request++) {
      if (bookRequests[request].isProcessed === true){
        books.push(bookRequests[request]);
      }
    }
    await setBookRequests(books);

  } catch (error) {
    console.log(error);
  }
    
  }
    if (isAuthenticated) {
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
              approved = {request.isProcessed}
              />
          ));
        return (
            <div className="content">
                <h1> Approved Book Requests </h1>
                {bookRequests}
            </div>
        )
    } else {
        return (
            <div className="unauthorised">
                <h1> You're Unauthorised To View This Page </h1>
            </div>
        )

    }
}