import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import { Redirect, Link } from 'react-router-dom';

const JoinList = ({ token, setToken, firestore }) => {
  const [redirect, setRedirect] = useState(false);

  // checks if token exists and if it does, sends to that specific tokens list page, and adds token to local storage
  //if token does ot exist, alert pops up telling you that
  const checkTokenExists = token => {
    firestore
      .collection('lists')
      .doc(token)
      .get()
      .then(doc => {
        if (doc.exists) {
          addToLS(token);
          setRedirect(true);
        } else {
          alert('Enter a valid share code and try again.');
        }
      });
  };

  // event listner watching the value of the form change and setting it to token state
  const handleChange = event => {
    setToken(event.target.value);
  };
  // add token to local storage
  const addToLS = token => {
    localStorage.setItem('uniqueToken', token);
  };
  // handles submitting form event then fires the checkToken function and sets the state token back to  an empty string
  const handleSubmit = event => {
    event.preventDefault();
    checkTokenExists(token);
  };

  return redirect ? (
    <Redirect to="/list" />
  ) : (
    <p>
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
        <button
          onClick={handleSubmit}
          className="button-link"
          id="joinListButton"
        >
          Join List
        </button>
      </form>
      <span> - OR - </span>
      <Link to="/" className="button-link" id="newListButton">
        Start a New List
      </Link>
    </p>
  );
};

export default withFirestore(JoinList);
