import React from "react";
import getToken from "../token";

const GetToken = () => {
  const onButtonClickHandler = () => {
    const uniqueToken = getToken();
    localStorage.setItem("uniqueToken", uniqueToken);
  };
  return (
    <React.Fragment>
      <button onClick={onButtonClickHandler}>Get Token</button>
    </React.Fragment>
  );
};

export default GetToken;
