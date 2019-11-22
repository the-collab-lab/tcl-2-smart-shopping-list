import React, { useState } from "react";
import { withFirestore } from "react-firestore";
// import { db } from '../lib/firebase.js';

const JoinList = ({ firestore }) => {
  const [token, setToken] = useState("");

  const checkTokenExists = token => {
    firestore
      .collection('lists')
      .doc(token)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          addToLS(token)
        } else {
          alert("Enter a valid share code and try again.");
        }
      })
   
  }

  const handleChange = event => {
    setToken(event.target.value);
  }

  const addToLS = token => {
    localStorage.setItem("uniqueToken", token);
  }

  const handleSubmit = event => {
    event.preventDefault();
    checkTokenExists(token);
    // db
    //   .collection("lists")
    //   .doc(token)
      // .get()
      // .then(function(doc) {
      //   if (doc.exists) {
      //     addToLS(token) 
      //   } else {
      //     console.log('no')
      //     alert("Enter a valid share code and try again.");
      //   }
      // })

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