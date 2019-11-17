// This page uses the React Router library to make links to navigate from page to page
import React from 'react';
import './App.css';
import Home from './component/Home';
import FetchItems from './component/FetchItems';
import AddItem from './component/AddItem';
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
                    <FetchItems />
                </Route>
                <Route exact path="/add">
                    <AddItem />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterComponent
