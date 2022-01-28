import React from "react";
import "../styles/home.css";
import { useAppContext } from "../lib/contextLib";


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Book Time!</h1>
        <p className="text-muted">Browse all our books!</p>
      </div>
    </div>
  );
}
