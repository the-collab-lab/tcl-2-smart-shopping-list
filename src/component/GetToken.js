import React from 'react';

const GetToken = ({ token, setToken }) => {
  const onButtonClickHandler = () => {
    // const uniqueToken = 'the collab lab';
    // localStorage.setItem('uniqueToken', uniqueToken);
    // setToken(localStorage.getItem('uniqueToken'));
    // return <Redirect to="/list" />;
    console.log('Creating new lists is no longer supported.');
  };

  return (
    <React.Fragment>
      <button
        onClick={onButtonClickHandler}
        className="button-link"
        id="tokenButton"
      >
        Start a New List
      </button>
    </React.Fragment>
  );
};

export default GetToken;
