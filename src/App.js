import React from "react";
import "./App.css";
import RouterComponent from "./component/Router";
import Home from "./component/Home";

// For now, the App simply returns our RouterComponent, which holds all the links
// and all of the components for each of those links.
function App() {
  // making
  const checkToken = localStorage.getItem("uniqueToken");
  // console.log(checkToken)

  if (checkToken === null) {
    return <Home />;
  } else {
    return <RouterComponent />;
  }
}

export default App;
