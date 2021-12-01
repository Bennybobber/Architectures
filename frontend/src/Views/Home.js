import React, { Component, useState } from "react";
 
class Home extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    if (this.useState.user !== undefined){
      console.log(this.useState.persons);
    }
  }
  render() {
    return (
      <div>
        <h2>Available Books For Request</h2>
        <p>Have a browse of books, and if you're logged in you can even 
          eat a book
        </p>
 
        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </div>
    );
  }
}
 
export default Home;