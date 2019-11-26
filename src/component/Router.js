// This page uses the React Router library to make links to navigate from page to page
import React from 'react';
import '../App.css';
import Home from './Home';
import FetchItems from './FetchItems';
import AddItem from './AddItem';
import JoinList from './JoinList';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function RouterComponent() {

    return (
        <Router>
            <Link to="/list">List</Link>
            <Link to="/add">Add</Link>
            {/* For next week we will take these and move them 
            to a nav component, and then we will import that nav
            into the FetchItems component */}

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
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterComponent
