import React, { useState } from 'react';
import ListDetails from './ListDetails';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const TopBar = ({ token, setToken, isOnListView }) => {
  const [listDetails, setListDetails] = useState(false);

  if (!token) return <Redirect to="" />;

  const toggleListDetails = event => {
    event.preventDefault();
    setListDetails(!listDetails);
  };

  const renderBackButton = () => {
    if (isOnListView) {
      return <span></span>;
    } else {
      return (
        <Link
          to="/list"
          className="top-bar-buttons"
          id="top-bar-back-button"
          data-cy="Back"
        >
          &lt;
        </Link>
      );
    }
  };

  const renderListDetails = () => {
    if (listDetails) return <ListDetails token={token} setToken={setToken} />;
  };

  return (
    <React.Fragment>
      <nav className="top-bar">
        {renderBackButton()}
        <button
          className="top-bar-buttons"
          id="toggle-list-details"
          onClick={toggleListDetails}
        >
          ≡
        </button>
      </nav>
      {renderListDetails()}
    </React.Fragment>
  );
};

export default TopBar;
