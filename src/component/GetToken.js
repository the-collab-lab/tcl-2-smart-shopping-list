import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import GenerateToken from "../token";

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
    const uniqueToken = GenerateToken();
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

// 11-27-19 renamed getToken to GenerateToken, because that seems more clear to me
