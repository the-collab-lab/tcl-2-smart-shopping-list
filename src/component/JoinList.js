import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import { db } from '../lib/firebase.js';

const JoinList = ({ firestore }) => {
  const [token, setToken] = useState("");

<<<<<<< HEAD
  const checkTokenExists = token => {

    firestore
      .collection('lists')
      .doc(token)
      .onSnapshot(snapshot => {
        console.log(snapshot, 'HERE')
      })
       
  }

||||||| merged common ancestors
  const checkTokenExists = token => {
      firestore
        .collection("lists")
        .doc(token).onSnapshot(snapshot => {
          console.log('hello world')
        });
  }

=======
>>>>>>> 8a9ded28d4c30dd6d2930d41b41faca20b36ead8
  const handleChange = event => {
    setToken(event.target.value);
  }

  const addToLS = token => {
    localStorage.setItem("uniqueToken", token);
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    db
      .collection("lists")
      .doc(token)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          addToLS(token) 
        } else {
          alert("Enter a valid share code and try again.");
        }
      })

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