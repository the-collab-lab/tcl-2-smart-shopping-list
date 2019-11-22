import React from "react";
import "./App.css";
import Router from "./component/Router"
import GetToken from "./component/GetToken";


// For now, the App simply returns our RouterComponent, which holds all the links
// and all of the components for each of those links.
function App() {
  // making 
  const checkToken = localStorage.getItem('uniqueToken')
  // console.log(checkToken)

  if (checkToken === null) {
    return <GetToken />;
  } else {
    return <Router />;
  }
}

export default App;
