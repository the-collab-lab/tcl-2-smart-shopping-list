import React, { useState } from "react";
import { withFirestore } from "react-firestore";

const JoinList = ({ firestore }) => {
  const [token, setToken] = useState("");

  const checkTokenExists = token => {

    firestore
      .collection('lists')
      .doc(token)
      .onSnapshot(snapshot => {
        console.log(snapshot, 'HERE')
      })
       
  }

  const handleChange = event => {
    setToken(event.target.value);
  }

  const addToLS = token => {
    localStorage.setItem("uniqueToken", token);
    window.location.reload(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
    let exists = checkTokenExists(token);
    console.log('here', exists)
    if (exists) { 
      addToLS(token) 
    } else { 
      alert("Enter a valid share code and try again.")}
    addToLS(token)
    setToken("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type in list token:
        <input
          value={token}
          type="text"
          id="uniqueToken"
          onChange={handleChange}
          className="inputField"
        />  
      </label>
      <button onClick={handleSubmit} className="joinListButton">
        Join List
      </button>
    </form>
  )
}

export default withFirestore(JoinList);