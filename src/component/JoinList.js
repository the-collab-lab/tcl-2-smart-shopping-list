import React, { useState } from "react";
// import { withFirestore } from "react-firestore";

const JoinList = ({ firestore }) => {
  const [token, setToken] = useState("");

  // const checkTokenExists = token => {
  //   return (
  //     (firestore
  //       .collection("lists")
  //       .doc(token)) === null
  //   )
  // }

  const handleChange = event => {
    setToken(event.target.value);
  }

  const addToLS = token => {
    localStorage.setItem("uniqueToken", token);
    window.location.reload(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
    // let exists = checkTokenExists(token);
    // if (exists) { addToLS(token) }
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

export default JoinList;