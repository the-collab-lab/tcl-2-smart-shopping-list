// This page uses the React Router library to make links to navigate from page to page
import React from 'react';
import '../App.css';
import Home from './Home';
import FetchItems from './FetchItems';
import AddItem from './AddItem';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function RouterComponent() {
    return (
        <Router>
            <Link to="/list">List</Link>
            <Link to="/add">Add</Link>
            <Switch>
                <Route exact path="/list">
                    <FetchItems />
                </Route>
                <Route exact path="/add">
                    <AddItem />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterComponent
