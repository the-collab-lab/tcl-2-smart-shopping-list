// This page uses the React Router library to make links to navigate from page to page
import React from 'react';
import './App.css';
import Home from './Home';
import List from './List';
import Add from './Add';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function RouterComponent() {
    return (
        <Router>
            {/* Our links. So far, we have three, though 
            that might change as the project grows */}
            <Link to="/">Home</Link>
            <Link to="/list">List</Link>
            <Link to="/add">Add</Link>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/list">
                    <List />
                </Route>
                <Route exact path="/add">
                    <Add />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterComponent
