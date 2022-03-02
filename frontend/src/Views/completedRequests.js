import React, {useState, useEffect} from "react";
import Report from "../components/Report.js"
import axios from "axios";
import jwt_decode from "jwt-decode";
import Form from 'react-bootstrap/Form';

export default function CompletedRequests() {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isEmployee, setEmployee] = useState(false);
    const [isAuthorizer , setAuthorizor]= useState(false);
    const [BookRequests, setBookRequests] = useState([]);
    const [sort, setSort] = useState('bookName');
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
  // Sorts by field, if it's a float it will turn it into float from a string.
  const sort_by = (field, reverse, primer) => {
    //eslint-disable-next-line
    const regexp = /^[0-9\b\.]+$/;
    const key = primer ?
      function(x) {
        if (regexp.test(x[field])){
          return parseFloat(x[field])
        }
        return primer(x[field])
      } :
      function(x) {
        return x[field]
      };
  
    reverse = !reverse ? 1 : -1;
    
    return function(a, b) {
      return (a = key(a), b = key(b), reverse * ((a > b) - (b > a)));
    }
  }

   // Sort box HTML 
   let sort_box = <div>
    <Form.Control 
      onChange = {(e) => handleSort(e)}
      as="select"
      aria-label="Sort Box For Requests">
        <option>Sort By...</option>
        <option value="bookName">Book Name</option>
        <option value="bookAuthor">Book Author</option>
        <option value="bookPrice">Book Price </option>
    </Form.Control>
    </div>

    //Ensure nobody is trying to inject a different sort param.
    const handleSort = (e) => {
      if (e.target.value === "bookName" || e.target.value === "bookAuthor" || e.target.value === "bookPrice") {
        setSort(e.target.value);
      }
    }
    if (isAuthenticated) {
        const bookRequests = BookRequests.sort(sort_by(sort, false, (a) =>  a.toUpperCase()))?.map((request, i) => (
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
                {sort_box}
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