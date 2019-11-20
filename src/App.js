import React, { useState } from "react";
import "./App.css";
import RouterComponent from "./RouterComponent";
import GetToken from "./component/GetToken";


function checkToken() {
  const checkToken = localStorage.getItem('uniqueToken')
  // console.log(checkToken)

  if (checkToken === "") {
    console.log("no token found")
  } else {
    console.log("there is a token there")
  }
}

checkToken()

// For now, the App simply returns our RouterComponent, which holds all the links
// and all of the components for each of those links.
function App() {
  const [gotToken, setGotToken] = useState(false);

  if (gotToken === false) {
    return <GetToken />;
  } else {
    return <RouterComponent />;
  }
}

export default App;
