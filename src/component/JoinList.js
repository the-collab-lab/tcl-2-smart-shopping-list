import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import { Redirect } from 'react-router-dom'

const JoinList = ({ firestore }, props) => {
  const [redirect, setRedirect] = useState(false)
  const { token: [token, setToken] } = { token: useState(null), ...(props.state || {}) };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/list' />
    }
  }

  // checks if token exists and if it does, sends to that specific tokens list page, and adds token to local storage
  //if token does ot exist, alert pops up telling you that
  const checkTokenExists = token => {
    firestore
      .collection('lists')
      .doc(token)
      .get().then(doc => {
        if (doc.exists) {
          addToLS(token)
          setRedirect(true)
        } else {
          alert("Enter a valid share code and try again.");
        }
      })
  }

  // event listner watching the value of the form change and setting it to token state
  const handleChange = event => {
    setToken(event.target.value);
  }
// add token to local storage
  const addToLS = token => {
    localStorage.setItem("uniqueToken", token);
  }
// handles submitting form event then fires the checkToken function and sets the state token back to  an empty string 
  const handleSubmit = event => {
    event.preventDefault();
    checkTokenExists(token);
    setToken("");

  }


  return (
    <div>
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
        { renderRedirect() }
        <button onClick={handleSubmit} className="joinListButton">
          Join List
        </button>
      </form>

      <p>Nevermind! <a href="/" className="newListLink">Start a New List</a></p>
    </div>
  )
}

export default withFirestore(JoinList);
