import React, { useState, useEffect  } from "react";
import jwt_decode from "jwt-decode";
import ChatBox from "../components/ChatBox"
import "../styles/home.css";


export default function Home() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isAuthorizer , setAuthorizor]= useState(false);

   // Get the login status of the user. 
   useEffect(() => {
    onLoad();
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
        userHasAuthenticated(false);
      }
    
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>Welcome to the book request system</h1>
        <p className="text-muted">Need help? Use our online chat to connect to 
        people who can help with any questions you may have.</p>
        <div className ="chatBox">
          {isAuthenticated ? (
            <ChatBox></ChatBox>
          )
          :
          ( <h1 id="chat"> You Must Be Logged In To Use The Chat Function</h1>)}
          
        </div>
      </div>
    </div>
  );
}
