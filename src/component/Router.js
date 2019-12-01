// This page uses the React Router library to make links to navigate from page to page
import React, { useState } from "react";
import "../App.css";
import Home from "./Home";
import FetchItems from "./FetchItems";
import AddItem from "./AddItem";
import JoinList from "./JoinList";
import DeleteToken from "./DeleteToken"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function RouterComponent() {
  const [token, setToken] = useState(localStorage.getItem("uniqueToken"))


  return (
    <Router>
      <Switch>
        <Route path="/list">
          <FetchItems token={token} setToken={setToken}/>
        </Route>
        <Route path="/add">
          <AddItem />
        </Route>
        <Route path="/join">
          <JoinList />
        </Route>
        <Route path="">{token === null ? <Home token={token} setToken={setToken}/> : <FetchItems token={token} setToken={setToken}/>}</Route>
        <Route>
          <DeleteToken token={token} setToken={setToken}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterComponent;
