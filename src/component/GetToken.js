import React from 'react';
import { Redirect } from 'react-router-dom';

import getToken from '../token';

const GetToken = ({ token, setToken }) => {
  const onButtonClickHandler = () => {
    const uniqueToken = getToken();
    localStorage.setItem('uniqueToken', uniqueToken);
    setToken(localStorage.getItem('uniqueToken'));
    return <Redirect to="/list" />;
  };

  return (
    <React.Fragment>
      <button
        onClick={onButtonClickHandler}
        className="button-link"
        id="tokenButton"
      >
        Start Your New List!
      </button>
    </React.Fragment>
  );
};

export default GetToken;
