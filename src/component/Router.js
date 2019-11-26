// This page uses the React Router library to make links to navigate from view to view

import React from 'react';
import '../App.css';
import Home from './Home';
import FetchItems from './FetchItems';
import AddItem from './AddItem';
import JoinList from './JoinList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function RouterComponent() {
    const checkToken = localStorage.getItem("uniqueToken");

    return (
        <Router>
            <Switch>
                <Route path="/list">
                    <FetchItems />
                </Route>
                <Route path="/add">
                    <AddItem />
                </Route>
                <Route path="/join">
                    <JoinList />
                </Route>
                <Route path="">
                    { checkToken === null ? <Home/> : <FetchItems/> }
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterComponent
