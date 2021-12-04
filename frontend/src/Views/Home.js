import React from "react";
import "../styles/home.css";
import { useAppContext } from "../lib/contextLib";


export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
    </div>
  );
}
