import React, { useState } from "react";
import { Router, Redirect } from "react-router-dom";

import getToken from "../token";

const GetToken = () => {
  const [needToken, setNeedToken] = useState(true);
  // Function triggered on button click which
  // will create a unique token, save it to
  // local storage & reload browser
  const renderRedirect = () => {
    if (needToken === false) {
      console.log("render redirect");
      return <Redirect to="/list" />;
    }
  };
  const onButtonClickHandler = () => {
    const uniqueToken = getToken();
    localStorage.setItem("uniqueToken", uniqueToken);
    setNeedToken(false);
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
