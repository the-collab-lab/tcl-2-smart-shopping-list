// This page uses the React Router library to make links to navigate from page to page
import React, { useState } from 'react';
import '../App.css';
import Home from './Home';
import FetchItems from './FetchItems';
import AddItem from './AddItem';
import JoinList from './JoinList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemDetails from './ItemDetails';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

function RouterComponent() {
  const [token, setToken] = useState(localStorage.getItem('uniqueToken'));

  return (
    <Router>
      <Switch>
        <Route path="/list">
          <FetchItems token={token} setToken={setToken} />
        </Route>
        <Route path="/add">
          <AddItem token={token} setToken={setToken} />
        </Route>
        <Route path="/join">
          <JoinList token={token} setToken={setToken} />
        </Route>
        <Route path="/:itemId">
          <ItemDetails token={token} setToken={setToken} />
        </Route>
        <Route path="">
          {token === null ? (
            <>
              <ArchivalNoticeModal />
              <Home token={token} setToken={setToken} />
            </>
          ) : (
            <FetchItems token={token} setToken={setToken} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterComponent;
