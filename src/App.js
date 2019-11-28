import React, { useState } from "react";
import "./App.css";
import RouterComponent from "./component/Router";


// For now, the App simply returns our RouterComponent, which holds all the links
// and all of the components for each of those links.
function App() {
    const [token, setToken] = useState(null)

    return <RouterComponent state={{ token: [token, setToken] }}/>;
}

export default App;
