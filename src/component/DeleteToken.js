import React from "react"

const DeleteToken = ({token, setToken}) => {

  const onButtonClickHandler = () => {
    localStorage.removeItem("uniqueToken")
    setToken(localStorage.getItem("uniqueToken"))
  };



  return (
    <React.Fragment>
      <button onClick={onButtonClickHandler} className="deleteButton">
        Delete Token
      </button>
    </React.Fragment>
  );
}

export default DeleteToken