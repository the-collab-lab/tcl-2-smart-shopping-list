import React from "react";
import getToken from "../token";

const GetToken = () => {
  const onButtonClickHandler = () => {
    const uniqueToken = getToken();
    localStorage.setItem("uniqueToken", uniqueToken);
    // console.log('is this the get token page?')
    window.location.reload(false)
  };
  return (
    <React.Fragment>
      <button onClick={onButtonClickHandler}>Get Token</button>
    </React.Fragment>
  );
};

export default GetToken;
