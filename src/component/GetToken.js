import React from "react";
import getToken from "../token";

const GetToken = () => {
  // Function triggered on button click which
  // will create a unique token, save it to
  // local storage & reload browser
  const onButtonClickHandler = () => {
    const uniqueToken = getToken();
    localStorage.setItem("uniqueToken", uniqueToken);
    window.location.reload(false);
  };
  return <button onClick={onButtonClickHandler}>Get Token</button>;
};

export default GetToken;
