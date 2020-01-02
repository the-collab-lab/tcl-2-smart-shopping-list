import React, { useState } from 'react';
import ListDetails from './ListDetails';

const TopBar = ({ token, setToken }) => {
  const [listDetails, setListDetails] = useState(false);

  const toggleListDetails = event => {
    event.preventDefault();
    setListDetails(!listDetails);
  };

  const renderListDetails = () => {
    if (listDetails) return <ListDetails token={token} setToken={setToken} />;
  };

  return (
    <React.Fragment>
      <nav className="top-bar">
        <button
          className="button-link"
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
