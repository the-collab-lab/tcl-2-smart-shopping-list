import React from "react";
import { Redirect } from "react-router-dom";

import getToken from "../token";

const GetToken = ({ token, setToken }) => {
  // go to list if there is already a token

  // console.log(token.value !== undefined)

  // if (token !== undefined) {
  //   console.log("there is a token, go to the list");
  //   return <Redirect to="/list" />;
  // }

  // const renderRedirect = () => {
  //   if (token !== null) {
  //     console.log("render redirect");
  //     return <Redirect to="/" />;
  //   }
  // };
  const onButtonClickHandler = () => {
    const uniqueToken = getToken();
    localStorage.setItem("uniqueToken", uniqueToken);
    setToken(localStorage.getItem("uniqueToken"));
    return <Redirect to="/list" />;
  };

  return (
    <React.Fragment>
      {/* {renderRedirect()} */}
      <button onClick={onButtonClickHandler} className="tokenButton">
        Get Token
      </button>
    </React.Fragment>
  );
};

export default GetToken;
