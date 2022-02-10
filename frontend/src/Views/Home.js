import React from "react";
import ChatBox from "../components/ChatBox"
import "../styles/home.css";


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Book Time!</h1>
        <p className="text-muted">Browse all our books!</p>
        <ChatBox></ChatBox>
      </div>
    </div>
  );
}
