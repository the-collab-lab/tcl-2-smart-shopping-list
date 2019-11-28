import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import generateToken from "../token";

const GetToken = (props) => {
  const { token: [token, setToken] } = { token: useState(null), ...(props.state || {}) };

  // Function triggered on button click which
  // will create a unique token, save it to
  // local storage, change state & redirect
  const renderRedirect = () => {
    if (token !== null) {
      console.log("render redirect");
      return <Redirect to="/list" />;
    }
  };
  const onButtonClickHandler = () => {
    const uniqueToken = generateToken();
    localStorage.setItem("uniqueToken", uniqueToken);
    setToken(uniqueToken);
  };

  return (
    <React.Fragment>
      {renderRedirect()}
      <button onClick={onButtonClickHandler} className="tokenButton">
        Get Token
      </button>
    </React.Fragment>
  );
};

export default GetToken;
