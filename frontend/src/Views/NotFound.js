import React from "react";
import "../styles/404.css";

// If somebody tries to access a page that doesn't exist.
export default function NotFound() {
  return (
    <div className="NotFound text-center">
      <h3>Sorry, page not found!</h3>
    </div>
  );
}
