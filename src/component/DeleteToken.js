import React from "react";
import { Redirect } from "react-router-dom";

const DeleteToken = ({ token, setToken }) => {
  const onButtonClickHandler = () => {
    localStorage.removeItem("uniqueToken");
    setToken(null);
    return <Redirect to="" />;
  };

  return (
    <React.Fragment>
      <button onClick={onButtonClickHandler} className="deleteButton">
        Delete Token
      </button>
    </React.Fragment>
  );
};

export default DeleteToken;
