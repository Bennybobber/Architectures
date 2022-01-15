import React, { Component, useState, useEffect  } from "react";
import jwt_decode from "jwt-decode";
export default function Requests() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isEmployee, setEmployee] = useState("");
  const [isAuthorizer , setAuthorizor]= useState("");
  let user = {};
  useEffect(() => {
    onLoad();
  }, []);
  async function onLoad() {
    try {
      user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      const exp = jwt_decode(user.token);
      if (Date.now() >= exp * 1000){
        userHasAuthenticated(false);
      }else {
        userHasAuthenticated(true);
      }
      setEmployee(user.isEmployee);
      setAuthorizor(user.isAuthorizer);
    }
    catch(e) {
    }
  }
  if (isAuthenticated && (isAuthorizer || isEmployee)){
    return (
      <div>
        <h2>Your Assigned Requests</h2>
        <p>Mauris sem velit, vehicula eget sodales vitae,
        rhoncus eget sapien:</p>
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
      </div>
    );
  }
  else{
    return(
    <div>
      <h3> NOT STUFF</h3>
    </div>
    )
  }
}
