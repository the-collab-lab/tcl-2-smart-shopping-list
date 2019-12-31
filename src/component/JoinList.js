import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import { Redirect, Link } from 'react-router-dom';

const JoinList = ({ token, setToken, firestore }) => {
  const [redirect, setRedirect] = useState(false);

  // checks if token exists and if it does, sends to that specific tokens
  // list page, and adds token to local storage if token does ot exist,
  // alert pops up telling you that
  const checkTokenExists = token => {
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
          setToken(null);
        }
      });
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
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Type in list token:
          <input
            // Setting value to token or a blank string deals with a react
            //  warning regarding controlled vs uncontrolled components
            value={token || ''}
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
    </React.Fragment>
  );
};

export default withFirestore(JoinList);
