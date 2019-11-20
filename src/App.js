import React, { useState } from "react";
import "./App.css";
import RouterComponent from "./RouterComponent";
import GetToken from "./component/GetToken";

// For now, the App simply returns our RouterComponent, which holds all the links
// and all of the components for each of those links.
function App() {
  const [gotToken, setGotToken] = useState(true);

  if (gotToken === false) {
    return <GetToken />;
  } else {
    return <RouterComponent />;
  }
}

export default App;
