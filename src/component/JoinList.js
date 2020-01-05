import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import { Redirect, Link } from 'react-router-dom';

const JoinList = ({ token, setToken, firestore }) => {
  const [redirect, setRedirect] = useState(false);

  // checks if token exists and if it does, sends to that specific tokens
  // list page, and adds token to local storage if token does ot exist,
  // alert pops up telling you that
  const checkTokenExists = token => {
    // This conditional allows the Join List button to be accidentally clicked
    // when the input is blank without throwing an error. Is there a better
    // fix? - ethan
    if (token === null) {
      return;
    } else {
      firestore
        .collection('lists')
        .doc(token)
        .get()
        .then(doc => {
          if (doc.exists) {
            addToLocalStorage(token);
            setRedirect(true);
          } else {
            alert('Enter a valid share code and try again.');
          }
        });
    }
  };

  // event listner watching the value of the form change and setting it to token state
  const handleChange = event => {
    setToken(event.target.value);
  };
  // add token to local storage
  const addToLocalStorage = token => {
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
    <main>
      <div id="pseudo-TopBar"></div>
      <h1>Join Existing List</h1>
      <p>Did someone share a code with you to join their list?</p>
      <form onSubmit={handleSubmit} className="join-list-field">
        <input
          // Setting value to token or a blank string deals with a react
          //  warning regarding controlled vs uncontrolled components
          value={token || ''}
          type="text"
          placeholder="Enter share code"
          id="uniqueToken"
          onChange={handleChange}
          className="searchField"
        />
        <button
          onClick={handleSubmit}
          className="button-link"
          id="join-list-button"
        >
          Join List
        </button>
      </form>
      <Link to="/" className="button-link" id="start-new-list-button">
        Nevermind, start a new list instead
      </Link>
    </main>
  );
};

export default withFirestore(JoinList);
